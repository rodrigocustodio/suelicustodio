

# Plano: Página "Análise do Estado Emocional" — Roda da Vida Digital

## Visão Geral

Nova página `/roda-da-vida` com fluxo multi-etapas: cadastro → questionário com sliders (12 áreas) → gráfico radar → texto de reflexão → pacotes de mentoria → CTA WhatsApp → exportação PDF.

## Banco de Dados

**Nova tabela `roda_vida_responses`** com colunas:
- `id` (uuid, PK)
- `created_at` (timestamptz)
- `user_name` (text)
- `user_lastname` (text)
- `email` (text)
- `age` (integer)
- `whatsapp` (text)
- `scores` (jsonb — objeto com as 12 pontuações)
- `whatsapp_clicked` (boolean, default false)

**RLS**: insert público com validações (lengths, email regex); select/update/delete apenas admin.

**Admin**: adicionar seção no `/admin` para visualizar respostas da Roda da Vida.

## Estrutura de Arquivos

```text
src/pages/RodaDaVidaPage.tsx          ← página principal (fluxo multi-step)
src/components/roda-vida/
  ├── RodaRegistrationForm.tsx        ← Step 1: formulário de cadastro
  ├── RodaSliderQuestion.tsx          ← Step 2: slider individual por área
  ├── RodaChart.tsx                   ← Step 3: gráfico radar (recharts)
  ├── RodaResult.tsx                  ← texto de reflexão + resultado
  ├── RodaPackages.tsx                ← 3 cards de pacotes
  └── RodaPdfExport.tsx              ← botão de download PDF
```

## Detalhes Técnicos

### Step 1 — Formulário
- Campos: Nome, Sobrenome, Email, Idade, WhatsApp (máscara BR)
- Validação com `zod`
- Salva no banco e avança para o questionário

### Step 2 — Questionário (12 Sliders)
- Uma pergunta por vez com transição animada (fade)
- Usa o componente `Slider` do shadcn/radix já existente
- Barra de progresso (padrão do projeto: `QuizProgressBar`)
- 12 tópicos conforme especificado
- Label: "Como você avalia essa área hoje?"

### Step 3 — Gráfico Radar
- Usa `recharts` (já instalado) — `RadarChart` com `PolarGrid`, `PolarAngleAxis`
- Paleta: fill `#7BAA9B` semi-transparente, stroke `#7BAA9B`, grid `#EAEAEA`
- Responsivo via `ResponsiveContainer`
- Salva scores (jsonb) no banco via update do registro criado no Step 1

### Step 4 — Resultado + Pacotes + CTA
- Texto personalizado de reflexão (conforme brief)
- 3 cards de pacotes (Essencial 4 sessões, Transformação 8, Reconstrução 16) com gradiente suave
- Botão WhatsApp verde: abre `https://wa.me/5511951701226?text=...`
- Tracking do clique (analytics + update `whatsapp_clicked`)

### PDF Export
- Usa a API nativa do browser: `window.print()` com CSS `@media print`, ou canvas-based approach com o chart convertido para imagem via `recharts` + criação de um layout A4 em um elemento oculto e `window.print()`
- Alternativa mais robusta: `html2canvas` + `jsPDF` — porém requer instalar dependências. Usaremos a abordagem de `window.print()` com uma view dedicada formatada para A4, que funciona em mobile sem dependências extras.
- Conteúdo do PDF: título, gráfico, nome, idade, data, footer com dados da Sueli

### Rota
- Adicionar `/roda-da-vida` em `App.tsx`

### Estilo
- Mobile-first, paleta feminina suave (#7BAA9B, #E6CFC5)
- Cards arredondados, espaçamento confortável
- Segue padrões do projeto: `font-playfair` para títulos, `font-inter` para corpo
- Sliders com thumb grande (touch-friendly)

### Analytics
- Track: `roda_vida_start`, `roda_vida_complete`, `roda_vida_whatsapp_click`
- Contagem de rodas geradas e cliques WhatsApp visíveis no Admin

## Resumo das Etapas de Implementação

1. Criar migration para tabela `roda_vida_responses` + RLS
2. Criar componentes em `src/components/roda-vida/`
3. Criar página `RodaDaVidaPage.tsx` com fluxo multi-step
4. Adicionar rota no `App.tsx`
5. Adicionar seção de Roda da Vida no Admin
6. Testar fluxo completo

