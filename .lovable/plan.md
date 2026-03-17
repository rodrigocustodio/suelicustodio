

# Roda da Vida — Full UI/UX Overhaul

## Changes Overview

### 1. Replace slider with clickable number buttons (0–10)
**File:** `src/components/roda-vida/RodaSliderQuestion.tsx`
- Remove `Slider` import and usage
- Render a grid of 11 buttons (0–10), no pre-selected value (`value` starts as `null`)
- Selected button gets `bg-brand-500 text-white`, others get `bg-white border-brand-200`
- "Próximo" button disabled until a value is selected
- Change subtitle from "Como você avalia essa área hoje?" → "Qual nota você daria para essa área hoje?"
- Better typography: topic name as `font-playfair text-3xl`, step counter styled subtly
- Wrap in a card with padding and shadow for polish

### 2. Make the radar chart much bigger and responsive
**File:** `src/components/roda-vida/RodaChart.tsx`
- Change `ResponsiveContainer` height from fixed `400` to responsive: `h-[70vw] max-h-[600px] min-h-[320px]`
- Remove `max-w-lg`, use `max-w-2xl` so it fills more width
- Increase `outerRadius` from `70%` to `80%`
- Increase font sizes slightly for mobile readability

### 3. Full page redesign with proper typography and section cadence
**File:** `src/pages/RodaDaVidaPage.tsx`
- Match Index.tsx patterns: use `Section` component, proper `font-playfair` headings hierarchy (h1/h2/h3), `text-ink-*` body text, divider lines (`w-24 h-px bg-brand-300 mx-auto`)
- Header section: add decorative subtitle label above h1 (like "SUELI CUSTÓDIO" on Index), proper spacing
- Result section: add dividers between chart, result text, packages, and CTA
- WhatsApp CTA: match the rounded-full CTA style from Index hero

### 4. Polish the registration form
**File:** `src/components/roda-vida/RodaRegistrationForm.tsx`
- Wrap in a styled card (`bg-white rounded-2xl shadow-card p-6 sm:p-8`)
- Add a form header: small h2 + subtitle text
- Add subtle divider before the submit button
- Name + Sobrenome on the same row (grid-cols-2) on desktop

### 5. Polish RodaResult text section
**File:** `src/components/roda-vida/RodaResult.tsx`
- Add divider line above
- Proper h2 sizing, paragraph spacing matching Index patterns

### 6. Polish RodaPackages intro
**File:** `src/components/roda-vida/RodaPackages.tsx`
- Add divider line above the section heading

## Files to modify
1. `src/components/roda-vida/RodaSliderQuestion.tsx` — replace slider with button grid
2. `src/components/roda-vida/RodaChart.tsx` — bigger, responsive chart
3. `src/pages/RodaDaVidaPage.tsx` — proper section cadence, typography, dividers
4. `src/components/roda-vida/RodaRegistrationForm.tsx` — polished card form
5. `src/components/roda-vida/RodaResult.tsx` — typography fix
6. `src/components/roda-vida/RodaPackages.tsx` — divider addition

