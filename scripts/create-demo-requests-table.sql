-- Create demo_requests table to store all demo request form submissions
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled'))
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON public.demo_requests(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON public.demo_requests(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON public.demo_requests(status);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert demo requests (public form)
CREATE POLICY "Anyone can insert demo requests" ON public.demo_requests
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all demo requests (for admin dashboard)
CREATE POLICY "Authenticated users can view demo requests" ON public.demo_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update demo requests (for admin dashboard)
CREATE POLICY "Authenticated users can update demo requests" ON public.demo_requests
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_demo_requests_updated_at
  BEFORE UPDATE ON public.demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
