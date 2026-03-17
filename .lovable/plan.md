

# Make sueliscustodio@gmail.com Admin

## Problem Found
- `sueliscustodio@gmail.com` (user_id: `744871bd-...`) currently has role **`user`** — not admin
- A typo account `seilyscustodio@gmail.com` has the `admin` role (likely the first signup got auto-admin)

## Fix Required

**Data update** (no schema changes needed):
1. Update `user_roles` to set `sueliscustodio@gmail.com` role to `admin`
2. Optionally downgrade the typo account

## Admin Dashboard Status
The `/admin` page already exists and displays all 4 lead tables:
- **Contact Messages** (7 records) ✓
- **Quiz Responses** (4 records) ✓
- **Mentoria Inscrições** — split by Brasil vs GoSix (8 records) ✓
- **Roda da Vida Responses** (7 records) ✓

RLS policies are already configured: admin can SELECT/UPDATE/DELETE all tables. No code changes needed — just the role fix.

