-- Drop existing overly permissive INSERT policies
DROP POLICY IF EXISTS "Allow public insert on quiz_responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Allow public insert" ON public.contact_messages;

-- Re-create with basic input validation constraints
CREATE POLICY "Allow public insert on quiz_responses" ON public.quiz_responses
  FOR INSERT
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND length(email) > 0 AND length(email) <= 320
    AND email ~ '^[^@]+@[^@]+\.[^@]+$'
    AND length(whatsapp) > 0 AND length(whatsapp) <= 30
  );

CREATE POLICY "Allow public insert" ON public.contact_messages
  FOR INSERT
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND length(email) > 0 AND length(email) <= 320
    AND email ~ '^[^@]+@[^@]+\.[^@]+$'
    AND length(message) > 0 AND length(message) <= 5000
  );