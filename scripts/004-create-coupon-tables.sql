-- Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  credit_amount INTEGER NOT NULL,
  coupon_type TEXT NOT NULL CHECK (coupon_type IN ('superadmin', 'festival', 'promotional')),
  max_uses_per_user INTEGER, -- NULL means unlimited for superadmin
  max_total_uses INTEGER, -- NULL means unlimited
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupon_usage table to track usage
CREATE TABLE IF NOT EXISTS public.coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_awarded INTEGER NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON public.coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user ON public.coupon_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon ON public.coupon_usage(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_year ON public.coupon_usage(year);

-- Enable RLS
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for coupons
CREATE POLICY "Anyone can view active coupons"
  ON public.coupons FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage coupons"
  ON public.coupons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );

-- RLS Policies for coupon_usage
CREATE POLICY "Users can view their own coupon usage"
  ON public.coupon_usage FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all coupon usage"
  ON public.coupon_usage FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "System can insert coupon usage"
  ON public.coupon_usage FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Insert the superadmin 'GAN' coupon
INSERT INTO public.coupons (
  code,
  description,
  credit_amount,
  coupon_type,
  max_uses_per_user,
  is_active
) VALUES (
  'GAN',
  'Superadmin unlimited coupon - 1000 credits',
  1000,
  'superadmin',
  NULL, -- NULL means unlimited for superadmin
  true
) ON CONFLICT (code) DO NOTHING;

-- Function to check and apply coupon
CREATE OR REPLACE FUNCTION apply_coupon(
  p_coupon_code TEXT,
  p_user_id UUID
)
RETURNS JSON AS $$
DECLARE
  v_coupon RECORD;
  v_usage_count INTEGER;
  v_current_year INTEGER;
  v_credits_awarded INTEGER;
  v_is_superadmin BOOLEAN;
BEGIN
  v_current_year := EXTRACT(YEAR FROM NOW());
  
  -- Check if user is superadmin
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id AND role = 'superadmin'
  ) INTO v_is_superadmin;
  
  -- Get coupon details
  SELECT * INTO v_coupon
  FROM public.coupons
  WHERE code = p_coupon_code
    AND is_active = true
    AND (valid_from IS NULL OR valid_from <= NOW())
    AND (valid_until IS NULL OR valid_until >= NOW());
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Invalid or expired coupon');
  END IF;
  
  -- Check usage limits for non-superadmin users
  IF NOT v_is_superadmin OR v_coupon.coupon_type != 'superadmin' THEN
    -- Count usage in current year
    SELECT COUNT(*) INTO v_usage_count
    FROM public.coupon_usage
    WHERE coupon_id = v_coupon.id
      AND user_id = p_user_id
      AND year = v_current_year;
    
    -- Check max uses per user (12 times per year for regular users)
    IF v_coupon.max_uses_per_user IS NOT NULL AND v_usage_count >= v_coupon.max_uses_per_user THEN
      RETURN json_build_object('success', false, 'message', 'You have reached the maximum usage limit for this coupon this year');
    END IF;
  END IF;
  
  -- Record coupon usage
  INSERT INTO public.coupon_usage (coupon_id, user_id, credits_awarded, year)
  VALUES (v_coupon.id, p_user_id, v_coupon.credit_amount, v_current_year);
  
  -- Add credits to user
  INSERT INTO public.credits (user_id, credits)
  VALUES (p_user_id, v_coupon.credit_amount)
  ON CONFLICT (user_id) DO UPDATE
  SET credits = public.credits.credits + v_coupon.credit_amount,
      updated_at = NOW();
  
  RETURN json_build_object(
    'success', true,
    'message', 'Coupon applied successfully',
    'credits_awarded', v_coupon.credit_amount
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
