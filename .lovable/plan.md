

# Add Detail Views to Admin Dashboard

## Problem
All four admin tables show summary rows but critical content is hidden or truncated:
- **Contact Messages**: The actual `message` text is never displayed
- **Quiz Responses**: The `answers` JSONB field is not shown
- **Mentoria Inscrições**: `expectativa` is truncated with "..."
- **Roda da Vida**: `scores` (per-area breakdown) and `ai_report` are not displayed

## Solution
Add expandable detail rows to each table. Clicking a row (or a "Ver" button) toggles an expanded panel below it showing the full content.

### Implementation in `src/pages/Admin.tsx`

1. **Add expand state**: `expandedId` state (string | null) per section, toggled on row click

2. **Contact Messages** — Add a collapsible row below each entry showing:
   - Full `message` text (whitespace-pre-wrap)
   - Consent flags (contact + privacy)

3. **Quiz Responses** — Expandable row showing:
   - Full `answers` JSONB rendered as a readable list (question → answer)

4. **Mentoria Inscrições** — Expandable row showing:
   - Full `expectativa` text (untruncated)

5. **Roda da Vida** — Expandable row showing:
   - `scores` rendered as a labeled list (area → value out of 10)
   - `ai_report` content (if exists) rendered as formatted text

### UX Pattern
- Each table row gets a "Ver detalhes" button or the row itself is clickable
- Expanded content appears in a full-width cell spanning all columns below the clicked row, with a light background (`bg-paper-100`)
- Only one row expanded at a time per section

### Data Changes
- `fetchQuizResponses` needs to also select `answers`
- No other fetch changes needed (messages already select `*`, roda already has `scores` and `ai_report`)

### No new dependencies needed — uses existing UI components (Table, Badge, Card).

