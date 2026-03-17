

# Fix excessive spacing across Roda da Vida

The `Section` component applies `py-8 sm:py-section(48px) md:py-sectionLg(64px)` to every section. Combined with the header padding, divider gaps, and card internal spacing, this creates too much whitespace.

## Changes

### 1. `src/pages/RodaDaVidaPage.tsx`
- **Header**: reduce `pt-16 pb-6 md:pt-24 md:pb-8` → `pt-12 pb-4 md:pt-16 md:pb-6`, reduce `mb-6` on h1 → `mb-3`, reduce `mb-4` on subtitle → `mb-2`, remove the description paragraph entirely (user crossed it out in the screenshot)
- **Intro section**: keep `!pt-0`, add `!pb-4`
- **Questionnaire section**: override to `!py-4 sm:!py-6`
- **Result sections**: override all `Section` wrappers to use compact padding `!py-4 sm:!py-6`
- **PDF section**: `!py-3 sm:!py-4`
- **Dividers between sections**: keep them but they already have no extra padding so they're fine
- **WhatsApp CTA section**: `!py-4 sm:!py-6 pb-12`

### 2. `src/components/roda-vida/RodaSliderQuestion.tsx`
- Reduce `mb-5` on progress → `mb-4`
- Reduce `mb-5` on question → `mb-4`
- Reduce `mb-5` on buttons grid → `mb-3`
- Reduce `mb-5` on scale labels → `mb-3`
- Reduce `mb-6` on divider → `mb-4`
- Reduce nav button height `h-12` → `h-11`

### 3. `src/components/roda-vida/RodaResult.tsx`
- Reduce `space-y-5` → `space-y-3`

These are all spacing-only changes — no structural or content changes beyond removing the description paragraph the user already crossed out.

