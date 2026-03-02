import { useState } from 'react';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  whatsapp: z.string().trim().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Use o formato (11) 99999-9999'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Marque para continuar' }) }),
});

export type LeadData = z.infer<typeof leadSchema>;

interface QuizLeadCaptureProps {
  onSubmit: (data: LeadData) => void;
  isSubmitting: boolean;
}

export const QuizLeadCapture = ({ onSubmit, isSubmitting }: QuizLeadCaptureProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.substring(0, 2);
    if (digits.length >= 3) formatted += ') ' + digits.substring(2, 7);
    if (digits.length >= 7) formatted += '-' + digits.substring(7, 11);
    return formatted;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse({ name, email, whatsapp, consent });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md">
        <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 text-center mb-2 leading-snug">
          Quase lá!
        </h2>
        <p className="font-inter text-ink-500 text-center mb-8 text-sm">
          Preencha seus dados para receber o resultado no seu email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1">Nome *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você gostaria de ser chamada?"
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-100 bg-white text-ink-900 font-inter text-base focus:border-brand-500 focus:outline-none transition-colors"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-100 bg-white text-ink-900 font-inter text-base focus:border-brand-500 focus:outline-none transition-colors"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1">WhatsApp *</label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 rounded-xl border-2 border-brand-100 bg-white text-ink-900 font-inter text-base focus:border-brand-500 focus:outline-none transition-colors"
            />
            {errors.whatsapp && <p className="text-sm text-destructive mt-1">{errors.whatsapp}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-brand-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="font-inter text-sm text-ink-500 leading-snug">
              Quero receber meu resultado e orientações relacionadas ao teste.
            </span>
          </label>
          {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Enviando...' : 'Receber meu resultado'}
          </button>
        </form>
      </div>
    </div>
  );
};
