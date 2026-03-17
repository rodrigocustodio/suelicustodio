

# Fix spacing, remove crossed sentence, darken borders

## Changes

### 1. `src/pages/RodaDaVidaPage.tsx`
- Remove the second paragraph (lines 95-100) — the crossed-out sentence about "Responda algumas perguntas rápidas..."
- Remove the gap between header and form: change `<Section>` wrapper for the intro form to use reduced top padding (e.g. `className="!pt-0"`) so the form sits right under the header text
- Reduce header bottom padding from `pb-12` / `md:pb-16` to `pb-6` / `md:pb-8`

### 2. `src/components/roda-vida/RodaRegistrationForm.tsx`
- Change input borders from `border-brand-200` to `border-gray-400` for stronger contrast
- Change card border: add `border border-gray-200` to the card wrapper for definition

### 3. `src/components/roda-vida/RodaSliderQuestion.tsx`
- Reduce all `mb-8` spacings to `mb-5` to tighten everything
- Change number button unselected border from `border-brand-200` to `border-gray-400` for better pop
- Change card wrapper: add `border border-gray-200`
- Reduce `p-6 sm:p-8` to `p-5 sm:p-6` for tighter card

