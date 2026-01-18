-- Fix infinite recursion in user_roles RLS policies
-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Superadmins can manage all roles" ON user_roles;

-- Create a security definer function to check user role without recursion
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Create new non-recursive policies using the security definer function
CREATE POLICY "Users can view their own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins and superadmins can view all roles" ON user_roles
  FOR SELECT USING (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Superadmins can insert roles" ON user_roles
  FOR INSERT WITH CHECK (auth.user_role() = 'superadmin');

CREATE POLICY "Superadmins can update roles" ON user_roles
  FOR UPDATE USING (auth.user_role() = 'superadmin');

CREATE POLICY "Superadmins can delete roles" ON user_roles
  FOR DELETE USING (auth.user_role() = 'superadmin');

-- Update other table policies to use the new function
-- Fix blogs policies
DROP POLICY IF EXISTS "Admins can view all blogs" ON blogs;
DROP POLICY IF EXISTS "Admins can manage blogs" ON blogs;

CREATE POLICY "Admins can view all blogs" ON blogs
  FOR SELECT USING (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Admins can insert blogs" ON blogs
  FOR INSERT WITH CHECK (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Admins can update blogs" ON blogs
  FOR UPDATE USING (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Admins can delete blogs" ON blogs
  FOR DELETE USING (auth.user_role() IN ('admin', 'superadmin'));

-- Fix analytics_events policies
DROP POLICY IF EXISTS "Admins can view all analytics" ON analytics_events;

CREATE POLICY "Admins can view all analytics" ON analytics_events
  FOR SELECT USING (auth.user_role() IN ('admin', 'superadmin'));

-- Fix payments policies
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
DROP POLICY IF EXISTS "Admins can manage payments" ON payments;

CREATE POLICY "Admins can view all payments" ON payments
  FOR SELECT USING (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Admins can insert payments" ON payments
  FOR INSERT WITH CHECK (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Admins can update payments" ON payments
  FOR UPDATE USING (auth.user_role() IN ('admin', 'superadmin'));

CREATE POLICY "Admins can delete payments" ON payments
  FOR DELETE USING (auth.user_role() IN ('admin', 'superadmin'));
