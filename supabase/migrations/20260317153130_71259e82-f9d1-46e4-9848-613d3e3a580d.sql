
CREATE TABLE public.roda_vida_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_name text NOT NULL,
  user_lastname text NOT NULL,
  email text NOT NULL,
  age integer NOT NULL,
  whatsapp text NOT NULL,
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  whatsapp_clicked boolean NOT NULL DEFAULT false
);

ALTER TABLE public.roda_vida_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on roda_vida_responses"
ON public.roda_vida_responses
FOR INSERT
TO public
WITH CHECK (
  (length(user_name) > 0) AND (length(user_name) <= 100) AND
  (length(user_lastname) > 0) AND (length(user_lastname) <= 100) AND
  (length(email) > 0) AND (length(email) <= 320) AND
  (email ~ '^[^@]+@[^@]+\.[^@]+$'::text) AND
  (age >= 10) AND (age <= 120) AND
  (length(whatsapp) > 0) AND (length(whatsapp) <= 30)
);

CREATE POLICY "Admins can view roda_vida_responses"
ON public.roda_vida_responses
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roda_vida_responses"
ON public.roda_vida_responses
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roda_vida_responses"
ON public.roda_vida_responses
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow public update for whatsapp_clicked and scores (by matching on id)
CREATE POLICY "Allow public update scores and whatsapp_clicked"
ON public.roda_vida_responses
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
