DROP POLICY "Allow public insert on mentoria_inscricoes" ON public.mentoria_inscricoes;

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
  AND forma_pagamento IN ('pix', 'cartao', 'remitly')
  AND consent_privacy = true
);