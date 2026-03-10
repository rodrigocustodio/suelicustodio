
CREATE TABLE public.mentoria_inscricoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nome_completo text NOT NULL,
  data_nascimento date NOT NULL,
  email text NOT NULL,
  contato text NOT NULL,
  expectativa text NOT NULL
);

ALTER TABLE public.mentoria_inscricoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on mentoria_inscricoes"
ON public.mentoria_inscricoes
FOR INSERT
TO public
WITH CHECK (
  length(nome_completo) > 0 AND length(nome_completo) <= 200
  AND length(email) > 0 AND length(email) <= 320
  AND email ~ '^[^@]+@[^@]+\.[^@]+$'
  AND length(contato) > 0 AND length(contato) <= 30
  AND length(expectativa) > 0 AND length(expectativa) <= 2000
);

CREATE POLICY "Admins can view mentoria_inscricoes"
ON public.mentoria_inscricoes
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete mentoria_inscricoes"
ON public.mentoria_inscricoes
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
