

# UI Design Upgrade — Roda da Vida Results Page

Matching the reference design: card-based dashboard layout, two-column report areas, compact credibility card, and pricing packages.

## Key Changes

### 1. `src/components/roda-vida/RodaAIReport.tsx` — Two-column layout
- Change weak/strong areas from stacked single-column to a **side-by-side two-column grid** on desktop (`grid md:grid-cols-2 gap-6`)
- Left column: "Áreas que pedem atenção" with weak area cards (red/warm accent border)
- Right column: "Seus Recursos Internos" with strong area cards (green/brand accent border)
- Each area card: icon left, title + score badge right, description below — inside a bordered rounded card
- Remove the holistic interpretation card and recommendation card as separate blocks — fold the summary into a brief intro paragraph above the grid
- Score badges show percentage style (e.g., "10%" for score 1, "90%" for score 9) to match the reference

### 2. `src/components/roda-vida/RodaSueliCredibility.tsx` — Compact card layout
- Wrap everything in a single rounded card with subtle border
- Photo + name/title on the left, stats row (20+, 500+, 12) inline next to name — matching reference layout
- Bio text below the photo+stats row, more compact
- Remove the testimonial blockquote (or move it smaller)
- Stats displayed horizontally right next to the name area, not in a separate grid below

### 3. `src/components/roda-vida/RodaPackages.tsx` — Pricing cards with price
- Add a price to each package (placeholder values matching reference: R$ 750/mo, R$ 29,00/mo, R$ 39,00/mo — or more realistic values the user can edit)
- Green CTA buttons on all packages ("Quero saber mais" → WhatsApp)
- Cleaner card style: remove description paragraph, keep title + session count + checklist + price + button

### 4. `src/pages/RodaDaVidaPage.tsx` — Tighter section spacing
- Reduce overall section padding from `py-8 md:py-12` to `py-6 md:py-10`
- PDF download button moved inline near the chart section header (not its own full section)
- Remove the separate PDF section — integrate the download button into the chart header area

### 5. `src/components/roda-vida/RodaChart.tsx` — Contained in card
- Wrap the chart in a subtle bordered card matching the reference aesthetic
- Reduce max chart height slightly for better proportion

## No new files. No database changes. Pure UI/layout restructuring.

