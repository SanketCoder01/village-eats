-- Authentication Setup for VillageEats
-- Run this in your Supabase SQL Editor after schema.sql

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, phone, name, name_marathi)
  VALUES (
    new.id,
    new.email,
    new.phone,
    COALESCE(new.raw_user_meta_data->>'name', 'User'),
    new.raw_user_meta_data->>'name_marathi'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function for OTP verification
CREATE OR REPLACE FUNCTION public.verify_otp(phone_number text, token text)
RETURNS json AS $$
DECLARE
  user_record auth.users;
BEGIN
  -- This is a mock function for development
  -- In production, you would integrate with a real SMS service
  
  -- For demo purposes, accept any 6-digit OTP
  IF LENGTH(token) = 6 AND token ~ '^[0-9]+$' THEN
    -- Check if user exists
    SELECT * INTO user_record FROM auth.users WHERE phone = phone_number;
    
    IF user_record IS NULL THEN
      -- Create new user
      INSERT INTO auth.users (
        id,
        phone,
        phone_confirmed_at,
        raw_user_meta_data,
        created_at,
        updated_at
      ) VALUES (
        gen_random_uuid(),
        phone_number,
        NOW(),
        jsonb_build_object('phone', phone_number),
        NOW(),
        NOW()
      ) RETURNING * INTO user_record;
    ELSE
      -- Update existing user
      UPDATE auth.users 
      SET phone_confirmed_at = NOW(), updated_at = NOW()
      WHERE id = user_record.id;
    END IF;
    
    RETURN json_build_object(
      'success', true,
      'user_id', user_record.id,
      'message', 'OTP verified successfully'
    );
  ELSE
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid OTP format'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to send OTP (mock implementation)
CREATE OR REPLACE FUNCTION public.send_otp(phone_number text)
RETURNS json AS $$
BEGIN
  -- This is a mock function for development
  -- In production, you would integrate with a real SMS service like Twilio
  
  -- For demo purposes, always return success
  RETURN json_build_object(
    'success', true,
    'message', 'OTP sent successfully',
    'otp', '123456'  -- Remove this in production!
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.verify_otp(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.send_otp(text) TO anon;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Create custom JWT claims function
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  claims jsonb;
  user_role text;
BEGIN
  -- Fetch the user role from the profiles table
  SELECT role INTO user_role FROM public.users WHERE id = (event->>'user_id')::uuid;

  claims := event->'claims';

  IF user_role IS NOT NULL THEN
    -- Set the claim
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  ELSE
    claims := jsonb_set(claims, '{user_role}', 'customer');
  END IF;

  -- Update the 'claims' object in the original event
  event := jsonb_set(event, '{claims}', claims);

  -- Return the modified or original event
  RETURN event;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook(jsonb) TO service_role;

-- Add role column to users table if not exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer';

-- Create index on role column
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
