-- Fix Row Level Security policies for demo_requests table
-- This allows anonymous users to submit demo requests

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert demo requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Authenticated users can view demo requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Authenticated users can update demo requests" ON public.demo_requests;

-- Create policy to allow anonymous (anon) role to insert demo requests
-- This allows public form submissions without authentication
CREATE POLICY "Allow anonymous demo request submissions" ON public.demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to insert (for server-side operations)
CREATE POLICY "Allow service role to insert demo requests" ON public.demo_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all demo requests (for admin dashboard)
CREATE POLICY "Authenticated users can view all demo requests" ON public.demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow service role to view all (for admin operations)
CREATE POLICY "Service role can view all demo requests" ON public.demo_requests
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy to allow authenticated users to update demo requests (for admin dashboard)
CREATE POLICY "Authenticated users can update demo requests" ON public.demo_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy to allow service role to update (for admin operations)
CREATE POLICY "Service role can update demo requests" ON public.demo_requests
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
