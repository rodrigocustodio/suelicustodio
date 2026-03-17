import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  user_name: z.string().trim().min(1, 'Nome é obrigatório').max(100),
  user_lastname: z.string().trim().min(1, 'Sobrenome é obrigatório').max(100),
  email: z.string().trim().email('Email inválido').max(320),
  age: z.number().min(10, 'Idade inválida').max(120, 'Idade inválida'),
  whatsapp: z.string().trim().min(1, 'WhatsApp é obrigatório').max(30),
});

export type RegistrationData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: RegistrationData) => void;
  loading?: boolean;
}

export const RodaRegistrationForm = ({ onSubmit, loading }: Props) => {
  const [form, setForm] = useState({
    user_name: '',
    user_lastname: '',
    email: '',
    age: '',
    whatsapp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      ...form,
      age: form.age ? parseInt(form.age, 10) : 0,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="user_name" className="text-ink-700">Nome</Label>
        <Input
          id="user_name"
          value={form.user_name}
          onChange={(e) => update('user_name', e.target.value)}
          placeholder="Seu nome"
          className="h-12 rounded-xl border-brand-200 focus-visible:ring-brand-400"
        />
        {errors.user_name && <p className="text-sm text-destructive">{errors.user_name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="user_lastname" className="text-ink-700">Sobrenome</Label>
        <Input
          id="user_lastname"
          value={form.user_lastname}
          onChange={(e) => update('user_lastname', e.target.value)}
          placeholder="Seu sobrenome"
          className="h-12 rounded-xl border-brand-200 focus-visible:ring-brand-400"
        />
        {errors.user_lastname && <p className="text-sm text-destructive">{errors.user_lastname}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-ink-700">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="seu@email.com"
          className="h-12 rounded-xl border-brand-200 focus-visible:ring-brand-400"
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="age" className="text-ink-700">Idade</Label>
        <Input
          id="age"
          type="number"
          value={form.age}
          onChange={(e) => update('age', e.target.value)}
          placeholder="Sua idade"
          className="h-12 rounded-xl border-brand-200 focus-visible:ring-brand-400"
        />
        {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="whatsapp" className="text-ink-700">WhatsApp</Label>
        <Input
          id="whatsapp"
          value={form.whatsapp}
          onChange={(e) => update('whatsapp', e.target.value)}
          placeholder="(11) 99999-9999"
          className="h-12 rounded-xl border-brand-200 focus-visible:ring-brand-400"
        />
        {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-base font-medium"
      >
        {loading ? 'Salvando...' : 'Começar minha análise'}
      </Button>
    </form>
  );
};
