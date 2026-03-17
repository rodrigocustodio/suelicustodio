
Do I know what the issue is? Yes.

## What is actually broken
The form is not stuck because of the button itself. The real blocker is in `src/pages/RodaDaVidaPage.tsx`:

```ts
await supabase
  .from('roda_vida_responses')
  .insert({...})
  .select('id')
  .single();
```

That call does two things:
1. inserts the row
2. immediately tries to read the inserted row back

Your backend currently allows:
- public `INSERT`
- public `UPDATE`

But it does **not** allow public `SELECT` on `roda_vida_responses` (only admins can select). So the “return the inserted id” part is blocked by RLS. The code then falls into a silent `catch {}` and the UI stays on the first form, which looks like “nothing happens”.

I also found a second issue: the app is using `useToast()`, but there is no mounted `<Toaster />`, so even when an error happens, the user still won’t see feedback.

## Plan to fix
### 1) Stop requiring a read after insert
Change the registration flow to generate the record id on the client first, then insert with that id.

Implementation in `src/pages/RodaDaVidaPage.tsx`:
- create `const newId = crypto.randomUUID()`
- insert with `id: newId`
- remove `.select('id').single()`
- on success:
  - `setRecordId(newId)`
  - `setRegData(data)`
  - `setStep('questionnaire')`
  - `track('roda_vida_start')`

This avoids adding a dangerous public SELECT policy.

### 2) Show the user when something fails
Still in `src/pages/RodaDaVidaPage.tsx`:
- replace the silent `catch {}` with:
  - `console.error(...)`
  - visible feedback with toast
  - optional inline error message under the form for extra clarity

### 3) Mount the toast system globally
In `src/App.tsx` or `src/main.tsx`:
- import the existing `Toaster` from `src/components/ui/toaster.tsx`
- render `<Toaster />` once at app level

Without this, any toast-based error handling remains invisible.

## Files to change
1. `src/pages/RodaDaVidaPage.tsx`
   - remove `.select('id').single()`
   - use `crypto.randomUUID()`
   - add real error handling
2. `src/App.tsx` or `src/main.tsx`
   - mount `<Toaster />`

## What I will not do
I will **not** fix this by adding a public SELECT policy on `roda_vida_responses`, because that would expose submitted leads/responses to anonymous visitors. The safer fix is to avoid needing a SELECT at all.

## Expected behavior after the fix
When the user clicks “Começar minha análise”:
1. frontend validates fields
2. frontend generates a UUID
3. row is inserted with that UUID
4. success path stores that UUID in state
5. page advances from `intro` to `questionnaire`
6. if anything fails, the user sees an actual error instead of silence

## Technical details
- Current table grants are present, so this is no longer a GRANT problem.
- Current blocker is the combination of:
  - anonymous insert flow
  - `.select('id').single()` after insert
  - no public RLS `SELECT` policy
  - silent catch block
- The lack of `<Toaster />` explains why prior failures felt like “nothing happens”.

