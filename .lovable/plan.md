
# Remove user name from header title

Simple one-line change in `src/pages/RodaDaVidaPage.tsx`.

**Line 84-86**: Change the `headerTitle` logic to always show just "Análise do Estado Emocional" regardless of step, since the personalized name is already displayed in the chart section ("Sua Roda da Vida, {name}").

```typescript
// Before
const headerTitle = step === 'result' && regData
  ? `Análise do Estado Emocional de ${regData.user_name} ${regData.user_lastname}`
  : 'Análise do Estado Emocional';

// After
const headerTitle = 'Análise do Estado Emocional';
```

No other files affected.
