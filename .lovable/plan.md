

# Roda da Vida — Background Sections, Dynamic Title, Font & Spacing Balance

## What's Wrong
- Every section has the same `bg-paper-50` background — no visual rhythm or separation
- The title is static "Análise do Estado Emocional" instead of personalized with the user's name
- Spacing between sections feels unbalanced — some too tight, some too loose
- No alternating backgrounds to guide the eye through the sales flow

## Changes

### 1. `src/pages/RodaDaVidaPage.tsx` — Dynamic title + alternating section backgrounds

**Header title**: Change from static to dynamic:
- Before registration: "Análise do Estado Emocional"  
- After results: "Análise do Estado Emocional de {firstName} {lastName}" with subtitle "Conheça sua Roda da Vida"

**Section backgrounds** — alternate between `bg-paper-50`, `bg-white`, and `bg-brand-50/40` to create visual rhythm:
- Chart section: `bg-white` with subtle bottom border
- AI Report section: `bg-brand-50/40` (warm tinted)
- PDF section: `bg-white`
- Credibility section: `bg-brand-50/40`
- Packages section: `bg-white`
- Final CTA: `bg-gradient-to-b from-brand-50 to-paper-50`

Replace `<Section>` wrappers with full-width `<div>` containers that carry their own background color, with inner max-width content. Remove the thin divider lines between sections (the alternating backgrounds replace their purpose).

Balanced padding: `py-8 md:py-12` on each section for comfortable breathing room without excessive gaps.

### 2. `src/components/roda-vida/RodaAIReport.tsx` — Tighten internal spacing

- Reduce `space-y-6` to `space-y-5` on the root container
- Keep the rest as is — the cards are well-designed

### 3. `src/components/roda-vida/RodaSueliCredibility.tsx` — Minor font tuning

- Increase bio text from `text-sm` to `text-base` for better readability at desktop
- Stats section: keep as is

### 4. `src/components/roda-vida/RodaPackages.tsx` — Background-aware styling

- Remove card borders on the featured package since it will sit on white bg — the ring is enough
- Slight increase in description text size from `text-sm` to `text-sm/relaxed`

No new files. No database changes. Pure styling and layout improvements.

