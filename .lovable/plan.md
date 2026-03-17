

# Roda da Vida — Transform Results Page into a Sales Machine + AI Report + Professional PDF

This is a major overhaul that turns the current weak results page into a powerful, personalized sales landing page with AI-generated emotional analysis.

## Current Problems
- Results page is generic static text — same for everyone regardless of scores
- PDF is just `window.print()` — unprofessional
- No personalization based on actual wheel results
- No compelling reason to contact Sueli specifically
- Sueli has no way to receive the lead's report to prepare for the conversation
- Page doesn't sell — it just shows data

## Proposed Architecture

### 1. AI-Powered Personalized Report (Edge Function)
**New file:** `supabase/functions/generate-roda-report/index.ts`

Uses Lovable AI (no API key needed) to generate a personalized emotional analysis report based on the user's scores. The AI will:
- Identify the 3 weakest areas and explain what they mean emotionally
- Identify the 2-3 strongest areas as internal resources
- Provide a holistic interpretation of the wheel shape (balanced vs. skewed)
- Explain WHY mentoring with Sueli specifically would help (her relational intelligence methodology)
- Write in warm, empathetic Portuguese — matching Sueli's voice

**Input:** scores object, user name, age
**Output:** structured JSON with sections: `summary`, `weak_areas[]`, `strong_areas[]`, `holistic_interpretation`, `recommendation`

### 2. Database: Store AI Report + Email Sueli
**Migration:** Add `ai_report` (jsonb) column to `roda_vida_responses`

After generating the report, save it to the DB. This way Sueli can see the full lead + report in the Admin panel.

### 3. New Component: `RodaAIReport`
**New file:** `src/components/roda-vida/RodaAIReport.tsx`

Replaces the static `RodaResult` with a dynamic, personalized report:
- Loading state with skeleton animation while AI generates
- **"Seu Mapa Emocional"** — personalized h2 with user's first name
- Weak areas shown as cards with icon + explanation
- Strong areas highlighted as "Seus recursos internos"
- Holistic interpretation paragraph
- Recommendation section leading into "Por que a Mentoria Relacional?"

### 4. New Component: `RodaSueliCredibility`
**New file:** `src/components/roda-vida/RodaSueliCredibility.tsx`

A selling section that connects the report findings to Sueli's expertise:
- Photo of Sueli (reuse `sueli-portrait-warm.jpg`)
- Brief bio focused on relational intelligence methodology
- Stats: years of experience, women helped, etc.
- Testimonial quote
- Bridges from "your wheel shows X" to "Sueli's method addresses exactly this"

### 5. Professional PDF Report (Edge Function)
**New file:** `supabase/functions/generate-roda-pdf/index.ts`

Generates a proper PDF report server-side using the AI report data. The PDF includes:
- Branded header with Sueli's logo/name
- User info (name, age, date)
- Radar chart (rendered as SVG server-side or captured via canvas)
- AI report sections formatted professionally
- Sueli's contact info footer
- CTA: "Agende sua primeira sessão"

**Alternative (simpler, recommended):** Generate a beautifully formatted HTML report page that the user can save as PDF via the browser, but with a proper print-optimized layout — NOT just `window.print()` on the current page.

### 6. Lead Notification to Sueli
**Enhancement to existing flow:** After AI report is generated, send a WhatsApp-formatted summary or email notification to Sueli with:
- Lead name, age, email, WhatsApp
- Top 3 weak areas with scores
- AI summary paragraph
- Direct WhatsApp link to contact the lead

This can be done via the existing edge function infrastructure — a simple webhook/notification.

### 7. Redesigned Results Page Flow (RodaDaVidaPage.tsx)
The new section order on the results page:

1. **Chart** — "Sua Roda da Vida, {nome}" (personalized)
2. **AI Report** — personalized emotional analysis (loading → content)
3. **Download PDF** — professional branded report
4. **Sueli Credibility** — why she's the right professional
5. **Packages** — mentoring options (keep existing but add WhatsApp CTA per package)
6. **Final CTA** — WhatsApp button with urgency copy

### 8. PDF Redesign: `RodaPdfExport`
Instead of `window.print()`, create a hidden print-optimized div that includes:
- Branded header
- User info
- The radar chart (captured)
- AI report text sections
- Sueli's contact footer
- Proper `@media print` styles for A4

## Files to Create
1. `supabase/functions/generate-roda-report/index.ts` — AI report edge function
2. `src/components/roda-vida/RodaAIReport.tsx` — personalized report component
3. `src/components/roda-vida/RodaSueliCredibility.tsx` — credibility/selling section

## Files to Modify
1. `src/pages/RodaDaVidaPage.tsx` — new results flow, pass scores to AI, personalized headings
2. `src/components/roda-vida/RodaPdfExport.tsx` — professional print layout with AI report
3. `src/components/roda-vida/RodaPackages.tsx` — add WhatsApp CTA per package card

## Database Migration
- Add `ai_report jsonb default '{}'::jsonb` to `roda_vida_responses`

## Technical Notes
- AI uses Lovable AI via edge function (LOVABLE_API_KEY already available)
- No new secrets needed
- Report generation happens on transition to results step — chart shows immediately, report streams in with loading skeleton
- PDF uses the AI report data stored in state, rendered in a hidden print area with proper formatting

