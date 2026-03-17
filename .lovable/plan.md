

# Fix: Grant table permissions on `roda_vida_responses`

## Root Cause
The `roda_vida_responses` table was created without granting any privileges to the `anon` or `authenticated` roles. RLS policies exist but are useless without base table grants. Every insert fails with "row-level security policy violation" (misleading Postgres error).

## Fix
Run a migration with:
```sql
GRANT SELECT, INSERT, UPDATE ON public.roda_vida_responses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roda_vida_responses TO authenticated;
```

This grants:
- `anon`: INSERT (public form), UPDATE (scores + whatsapp_clicked), SELECT (needed for `.select('id').single()` after insert)
- `authenticated`: full CRUD for admin access

No code changes needed — only this database migration.

