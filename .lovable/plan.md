

# Fix: Table grants not applied for `roda_vida_responses`

## Problem
The previous migration to add `GRANT` statements did not take effect. The `roda_vida_responses` table has **zero grants** for any role, confirmed by querying `information_schema.table_privileges`. Every insert fails with error 42501 (RLS violation) because without base table grants, no operations are possible.

## Fix
Run a new database migration with the same GRANT statements:

```sql
GRANT SELECT, INSERT, UPDATE ON public.roda_vida_responses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roda_vida_responses TO authenticated;
```

No code changes needed — only this database migration.

