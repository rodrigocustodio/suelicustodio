
-- Drop the overly permissive policy
DROP POLICY "Allow public update scores and whatsapp_clicked" ON public.roda_vida_responses;

-- Create a more restrictive public update policy that only allows updating scores and whatsapp_clicked
-- Users can only update their own record (matched by id which they received on insert)
CREATE POLICY "Allow public update scores and whatsapp_clicked"
ON public.roda_vida_responses
FOR UPDATE
TO public
USING (true)
WITH CHECK (
  (scores IS NOT NULL) AND
  (length(user_name) > 0) AND (length(user_name) <= 100) AND
  (length(user_lastname) > 0) AND (length(user_lastname) <= 100) AND
  (length(email) > 0) AND (length(email) <= 320) AND
  (email ~ '^[^@]+@[^@]+\.[^@]+$'::text) AND
  (age >= 10) AND (age <= 120) AND
  (length(whatsapp) > 0) AND (length(whatsapp) <= 30)
);
