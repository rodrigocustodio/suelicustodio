

# Redesign RodaSueliCredibility — 100% New Layout

## Current State
A single card with photo+info side-by-side, stats row, bio paragraph, and a small testimonial blockquote. Feels generic and compact.

## New Design: Full-width split layout with visual impact

**Layout**: No card wrapper. Full-width section with a two-column split on desktop:
- **Left column (40%)**: Large photo with rounded corners and a decorative brand-colored border/ring accent, overlapping a subtle gradient background panel
- **Right column (60%)**: Name as large serif heading, subtitle with a thin decorative line, then stats in pill/badge style (rounded bg-brand-100 chips), bio text with generous line height

**Stats**: Displayed as horizontal pill badges (`bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5`) instead of plain numbers — e.g., `✦ 20+ anos de experiência`

**Testimonial**: Moved below both columns as a centered, larger italic quote with a decorative quotation mark icon (large `"` in brand-300), no border-left line

**Visual accents**:
- Subtle gradient blob behind the photo (`bg-gradient-to-br from-brand-100 to-transparent` as a positioned div)
- Thin horizontal decorative divider (brand-300) between name/stats and bio

**Mobile**: Stacks vertically — photo centered on top, content below, stats wrap into 2-col grid

### File: `src/components/roda-vida/RodaSueliCredibility.tsx`
Complete rewrite — same data (photo, stats, bio, testimonial) but entirely new structure and styling as described above. No new dependencies needed.

