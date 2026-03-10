import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import sueliPortrait from '@/assets/sueli-portrait-warm.jpg';

const inscricaoSchema = z.object({
  nome_completo: z.string().trim().min(1, 'Nome é obrigatório').max(200),
  data_nascimento: z.date({ required_error: 'Data de nascimento é obrigatória' }),
  email: z.string().trim().email('Email inválido').max(320),
  whatsapp: z.string().trim().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Use o formato (11) 99999-9999'),
  expectativa: z.string().trim().min(10, 'Mínimo de 10 caracteres').max(2000),
  forma_pagamento: z.enum(['pix', 'cartao'], { required_error: 'Selecione a forma de pagamento' }),
  consent_privacy: z.literal(true, { errorMap: () => ({ message: 'Você precisa aceitar a Política de Privacidade' }) }),
});

const MentoriaPage = () => {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState<Date>();
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [expectativa, setExpectativa] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<'pix' | 'cartao' | ''>('');
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.substring(0, 2);
    if (digits.length >= 3) formatted += ') ' + digits.substring(2, 7);
    if (digits.length >= 7) formatted += '-' + digits.substring(7, 11);
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inscricaoSchema.safeParse({
      nome_completo: nome,
      data_nascimento: dataNasc,
      email,
      whatsapp,
      expectativa,
      forma_pagamento: formaPagamento || undefined,
      consent_privacy: consentPrivacy,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('mentoria_inscricoes').insert({
        nome_completo: result.data.nome_completo,
        data_nascimento: format(result.data.data_nascimento, 'yyyy-MM-dd'),
        email: result.data.email,
        contato: result.data.whatsapp,
        expectativa: result.data.expectativa,
        forma_pagamento: result.data.forma_pagamento,
        consent_privacy: result.data.consent_privacy,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch {
      toast({
        title: 'Erro ao enviar inscrição',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-brand-500 mx-auto mb-6" />
          <h1 className="font-playfair text-3xl text-ink-900 mb-3">
            Inscrição recebida!
          </h1>
          <p className="font-inter text-ink-500 leading-relaxed">
            Obrigada pelo seu interesse na Mentoria Reconstruindo a Mulher Interior. Entrarei em contato em breve.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-brand-100 bg-white text-ink-900 font-inter text-base focus:border-brand-500 focus:outline-none transition-colors';

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Header */}
      <div className="bg-brand-700 text-white py-12 md:py-20 px-4">
        <div className="max-w-container-narrow mx-auto text-center">
          <p className="font-inter text-brand-200 uppercase tracking-widest text-sm mb-3">
            Ficha de Inscrição
          </p>
          <h1 className="font-playfair text-3xl md:text-5xl leading-tight mb-4">
            Mentoria
          </h1>
          <p className="font-playfair text-xl md:text-2xl text-brand-200 italic">
            Reconstruindo a Mulher Interior
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-container-narrow mx-auto px-4 py-12 md:py-16">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          {/* Nome completo */}
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1.5">
              Nome completo *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className={inputClass}
            />
            {errors.nome_completo && (
              <p className="text-sm text-destructive mt-1">{errors.nome_completo}</p>
            )}
          </div>

          {/* Data de nascimento */}
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1.5">
              Data de nascimento *
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal px-4 py-3 h-auto rounded-xl border-2 border-brand-100 bg-white text-base hover:bg-white hover:border-brand-500',
                    !dataNasc && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataNasc
                    ? format(dataNasc, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    : 'Selecione sua data de nascimento'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataNasc}
                  onSelect={setDataNasc}
                  captionLayout="dropdown-buttons"
                  fromYear={1940}
                  toYear={2010}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className={cn('p-3 pointer-events-auto')}
                />
              </PopoverContent>
            </Popover>
            {errors.data_nascimento && (
              <p className="text-sm text-destructive mt-1">{errors.data_nascimento}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1.5">
              E-mail *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1.5">
              WhatsApp *
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className={inputClass}
            />
            {errors.whatsapp && (
              <p className="text-sm text-destructive mt-1">{errors.whatsapp}</p>
            )}
          </div>

          {/* Expectativa */}
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-1.5">
              O que você espera conquistar no final da Mentoria? *
            </label>
            <textarea
              value={expectativa}
              onChange={(e) => setExpectativa(e.target.value)}
              placeholder="Conte um pouco sobre suas expectativas..."
              rows={4}
              className={cn(inputClass, 'resize-none')}
            />
            {errors.expectativa && (
              <p className="text-sm text-destructive mt-1">{errors.expectativa}</p>
            )}
          </div>

          {/* Forma de pagamento */}
          <div>
            <label className="block font-inter text-sm text-ink-700 mb-3">
              Forma de pagamento *
            </label>
            <div className="space-y-3">
              <label
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                  formaPagamento === 'pix'
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-brand-100 bg-white hover:border-brand-200'
                )}
              >
                <input
                  type="radio"
                  name="forma_pagamento"
                  value="pix"
                  checked={formaPagamento === 'pix'}
                  onChange={() => setFormaPagamento('pix')}
                  className="h-5 w-5 text-brand-500 focus:ring-brand-500"
                />
                <span className="font-inter text-ink-900">PIX</span>
              </label>
              <label
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors',
                  formaPagamento === 'cartao'
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-brand-100 bg-white hover:border-brand-200'
                )}
              >
                <input
                  type="radio"
                  name="forma_pagamento"
                  value="cartao"
                  checked={formaPagamento === 'cartao'}
                  onChange={() => setFormaPagamento('cartao')}
                  className="h-5 w-5 text-brand-500 focus:ring-brand-500"
                />
                <span className="font-inter text-ink-900">Cartão de Crédito</span>
              </label>
            </div>
            {errors.forma_pagamento && (
              <p className="text-sm text-destructive mt-1">{errors.forma_pagamento}</p>
            )}
          </div>

          {/* Consentimento LGPD */}
          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={consentPrivacy}
              onChange={(e) => setConsentPrivacy(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-brand-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="font-inter text-sm text-ink-500 leading-snug">
              Li e aceito a{' '}
              <a href="/politica-de-privacidade" target="_blank" className="text-brand-500 underline">
                Política de Privacidade
              </a>{' '}
              e autorizo o uso dos meus dados para fins de inscrição na mentoria, conforme a LGPD (Lei nº 13.709/2018). *
            </span>
          </label>
          {errors.consent_privacy && (
            <p className="text-sm text-destructive">{errors.consent_privacy}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar inscrição'}
          </button>
        </form>

        {/* Mentora footer */}
        <div className="flex flex-col items-center mt-16 pt-10 border-t border-brand-100">
          <img
            src={sueliPortrait}
            alt="Sueli Custódio"
            className="w-20 h-20 rounded-full object-cover mb-4"
          />
          <p className="font-playfair text-xl text-ink-900">Sueli Custódio</p>
          <p className="font-inter text-ink-500 text-sm">Mentora</p>
        </div>
      </div>
    </div>
  );
};

export default MentoriaPage;
