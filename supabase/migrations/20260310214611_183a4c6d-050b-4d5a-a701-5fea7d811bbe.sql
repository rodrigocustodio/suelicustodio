ALTER TABLE public.mentoria_inscricoes ADD COLUMN source_page text NOT NULL DEFAULT 'mentoria';

-- Update RLS insert policy to allow source_page values
DROP POLICY "Allow public insert on mentoria_inscricoes" ON public.mentoria_inscricoes;
CREATE POLICY "Allow public insert on mentoria_inscricoes"
ON public.mentoria_inscricoes
FOR INSERT
TO public
WITH CHECK (
  (length(nome_completo) > 0) AND (length(nome_completo) <= 200) AND
  (length(email) > 0) AND (length(email) <= 320) AND
  (email ~ '^[^@]+@[^@]+\.[^@]+$'::text) AND
  (length(contato) > 0) AND (length(contato) <= 30) AND
  (length(expectativa) > 0) AND (length(expectativa) <= 2000) AND
  (forma_pagamento = ANY (ARRAY['pix'::text, 'cartao'::text, 'remitly'::text])) AND
  (consent_privacy = true) AND
  (source_page = ANY (ARRAY['mentoria'::text, 'gosix'::text]))
);