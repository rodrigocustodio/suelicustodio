CREATE TABLE public.quiz_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  overload_score TEXT NOT NULL DEFAULT 'baixo',
  awareness_level TEXT NOT NULL DEFAULT 'baixo',
  disc_profile TEXT NOT NULL DEFAULT 'S',
  consent_marketing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on quiz_responses" ON public.quiz_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view quiz_responses" ON public.quiz_responses
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete quiz_responses" ON public.quiz_responses
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));