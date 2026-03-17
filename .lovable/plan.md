

# Fix: Roda da Vida not advancing + WhatsApp mask

## Problem 1: Form not advancing
The `scores` column in `roda_vida_responses` is `NOT NULL` with no default value. When the registration form submits, it inserts a row **without** scores (scores come later after the questionnaire). This causes a database error, caught silently, so the step never advances.

**Fix**: Run a migration to make `scores` nullable or add a default empty JSON object:
```sql
ALTER TABLE public.roda_vida_responses ALTER COLUMN scores SET DEFAULT '{}'::jsonb;
```

## Problem 2: WhatsApp field needs input mask
Currently the WhatsApp field is a plain text input with no formatting. Need to add an auto-formatting mask for the pattern `(XX) X-XXXX-XXXX`.

**Fix in `RodaRegistrationForm.tsx`**:
- Add a `formatWhatsApp` function that auto-inserts parentheses, space, and dashes as the user types
- Update the `onChange` handler for the WhatsApp input to apply the mask
- Update the zod validation regex to match the masked format: `(XX) X-XXXX-XXXX`
- Update placeholder to `(11) 9-8888-8989`

## Files to change
1. **Database migration**: `ALTER COLUMN scores SET DEFAULT '{}'::jsonb`
2. **`src/components/roda-vida/RodaRegistrationForm.tsx`**: Add WhatsApp mask function + update validation regex

