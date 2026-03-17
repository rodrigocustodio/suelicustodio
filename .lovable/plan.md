

# Dedicated Detail Pages for Each Lead Type

Replace the expandable dropdown rows with dedicated detail pages. Each "Ver" link in the admin table navigates to a full page showing all collected information for that record, presented in a clean, readable card layout — no raw JSON or code.

## New Files

### 1. `src/pages/admin/LeadDetail.tsx`
Single detail page component that handles all 4 lead types via URL params:
- Route: `/admin/lead/:type/:id` where type = `message | quiz | mentoria | roda`
- Fetches the single record by ID from the appropriate table
- Renders all fields in labeled Card sections with human-readable formatting
- Back button returns to `/admin`
- Protected: uses `useAuth` to verify admin access

### Content per type:

**Contact Message** — Name, email, WhatsApp, source page, date, read status, full message text, consent flags

**Quiz Response** — Name, email, WhatsApp, date, overload score, awareness level, DISC profile, marketing consent, and each quiz answer rendered as "Question text → Selected answer text" (mapping from `quiz-data.ts` question IDs to their actual text and option labels)

**Mentoria Inscrição** — Full name, birth date, email, phone, payment method, source (Brasil/GoSix), full expectativa text

**Roda da Vida** — Name, email, age, WhatsApp, date, WhatsApp CTA clicked, scores rendered as labeled bars or a simple grid (area name → score/10), and the AI report rendered as readable sections: summary, weak areas (icon + topic + score + description), strong areas (same), holistic interpretation, recommendation, average score

## Changes to Existing Files

### 2. `src/pages/Admin.tsx`
- Remove all expand state, `ExpandButton`, `DetailRow` components
- Replace "Ver" buttons with `<Link to={/admin/lead/${type}/${id}}>Ver</Link>`

### 3. `src/App.tsx`
- Add route: `<Route path="/admin/lead/:type/:id" element={<LeadDetail />} />`

## Key Design Decisions
- All data rendered as labeled text fields in Cards — no JSON dumps, no code blocks
- Quiz answers mapped to actual question text from `quiz-data.ts`
- Roda AI report parsed into structured sections (summary, weak/strong areas with icons, recommendation)
- Scores shown as a clean grid with area labels and values

