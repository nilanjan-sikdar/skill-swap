
-- First, let's check if there are any duplicate usernames causing issues
-- and fix the profiles table constraints

-- Drop the existing unique constraint on username if it exists
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_username_key;

-- Make username nullable since Google auth doesn't always provide a username
ALTER TABLE public.profiles ALTER COLUMN username DROP NOT NULL;

-- Update the handle_new_user function to handle Google auth better
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, skills, age)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(
      CASE 
        WHEN NEW.raw_user_meta_data->>'skills' IS NOT NULL 
        THEN string_to_array(NEW.raw_user_meta_data->>'skills', ',')
        ELSE ARRAY[]::TEXT[]
      END
    ),
    COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    username = COALESCE(EXCLUDED.username, profiles.username),
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    skills = COALESCE(EXCLUDED.skills, profiles.skills),
    age = COALESCE(EXCLUDED.age, profiles.age),
    updated_at = now();
  
  RETURN NEW;
END;
$function$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
