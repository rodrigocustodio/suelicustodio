import { useState } from 'react';

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { track } from '@/lib/analytics';
import { Section } from '@/components/Section';
import { RodaRegistrationForm, type RegistrationData } from '@/components/roda-vida/RodaRegistrationForm';
import { RodaSliderQuestion } from '@/components/roda-vida/RodaSliderQuestion';
import { RodaChart } from '@/components/roda-vida/RodaChart';
import { RodaAIReport, type RodaReport } from '@/components/roda-vida/RodaAIReport';
import { RodaSueliCredibility } from '@/components/roda-vida/RodaSueliCredibility';
import { RodaPackages } from '@/components/roda-vida/RodaPackages';
import { RodaPdfExport } from '@/components/roda-vida/RodaPdfExport';

type Step = 'intro' | 'questionnaire' | 'result';

const RodaDaVidaPage = () => {
  const [step, setStep] = useState<Step>('intro');
  const [recordId, setRecordId] = useState<string | null>(null);
  const [regData, setRegData] = useState<RegistrationData | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [report, setReport] = useState<RodaReport | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (data: RegistrationData) => {
    setLoading(true);
    try {
      const newId = crypto.randomUUID();
      const { error } = await supabase
        .from('roda_vida_responses')
        .insert({
          id: newId,
          user_name: data.user_name,
          user_lastname: data.user_lastname,
          email: data.email,
          age: data.age,
          whatsapp: data.whatsapp,
        });

      if (error) throw error;
      setRecordId(newId);
      setRegData(data);
      setStep('questionnaire');
      track('roda_vida_start');
    } catch (err) {
      console.error('Roda da Vida insert error:', err);
      toast({ variant: 'destructive', title: 'Erro ao salvar', description: 'Não foi possível iniciar a análise. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleScoresComplete = async (finalScores: Record<string, number>) => {
    setScores(finalScores);
    setStep('result');
    track('roda_vida_complete');

    if (recordId) {
      await supabase
        .from('roda_vida_responses')
        .update({ scores: finalScores })
        .eq('id', recordId);
    }
  };

  const handleWhatsAppClick = async () => {
    track('roda_vida_whatsapp_click');
    if (recordId) {
      await supabase
        .from('roda_vida_responses')
        .update({ whatsapp_clicked: true })
        .eq('id', recordId);
    }
    const message = encodeURIComponent(
      'Olá Sueli, acabei de fazer minha Roda da Vida no site e gostaria de saber mais sobre as sessões de mentoria.'
    );
    window.open(`https://wa.me/5511951701226?text=${message}`, '_blank');
  };

  const fullName = regData ? `${regData.user_name} ${regData.user_lastname}` : '';

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Header */}
      <header className="bg-gradient-to-b from-brand-50 to-paper-50 pt-10 pb-3 md:pt-14 md:pb-4 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-brand-500 font-medium mb-2">
            Sueli Custódio · Mentoria Relacional
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-ink-900 mb-2 leading-tight">
            Análise do Estado Emocional
          </h1>
          <div className="w-24 h-px bg-brand-300 mx-auto" />
        </div>
      </header>

      {/* Content */}
      <main>
        {step === 'intro' && (
          <Section className="!pt-0 !pb-4">
            <RodaRegistrationForm onSubmit={handleRegistration} loading={loading} />
          </Section>
        )}

        {step === 'questionnaire' && (
          <Section className="!py-3 sm:!py-4">
            <RodaSliderQuestion onComplete={handleScoresComplete} />
          </Section>
        )}

        {step === 'result' && regData && (
          <>
            {/* 1. Personalized Chart */}
            <Section id="roda-chart-container" className="!py-3 sm:!py-4">
              <div className="text-center mb-3">
                <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900 mb-1">
                  Sua Roda da Vida, {regData.user_name}
                </h2>
                <div className="w-16 h-px bg-brand-300 mx-auto" />
              </div>
              <RodaChart scores={scores} id="roda-chart" />
            </Section>

            <div className="w-24 h-px bg-brand-200 mx-auto" />

            {/* 2. AI-Powered Personalized Report */}
            <Section className="!py-4 sm:!py-5">
              <RodaAIReport
                scores={scores}
                userName={fullName}
                age={regData.age}
                recordId={recordId}
                onReportGenerated={setReport}
              />
            </Section>

            <div className="w-24 h-px bg-brand-200 mx-auto" />

            {/* 3. PDF Download */}
            <Section className="!py-3 sm:!py-4 flex flex-col items-center gap-3">
              <RodaPdfExport
                userName={fullName}
                age={regData.age}
                report={report}
              />
            </Section>

            <div className="w-24 h-px bg-brand-200 mx-auto" />

            {/* 4. Sueli Credibility */}
            <Section className="!py-4 sm:!py-5">
              <RodaSueliCredibility />
            </Section>

            <div className="w-24 h-px bg-brand-200 mx-auto" />

            {/* 5. Packages */}
            <Section className="!py-4 sm:!py-5">
              <RodaPackages onWhatsAppClick={handleWhatsAppClick} />
            </Section>

            <div className="w-24 h-px bg-brand-200 mx-auto" />

            {/* 6. Final CTA */}
            <Section className="!py-4 sm:!py-5 pb-10">
              <div className="max-w-md mx-auto px-4 text-center space-y-3">
                <p className="text-ink-700 text-sm leading-relaxed">
                  Sua roda mostrou áreas que pedem cuidado. O próximo passo é conversar com
                  a Sueli e entender como a mentoria pode te ajudar.
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-base font-medium shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversar com a Mentora Sueli
                </Button>
                <p className="text-xs text-ink-500">
                  Atendimento personalizado · Resposta em até 24h
                </p>
              </div>
            </Section>
          </>
        )}
      </main>
    </div>
  );
};

export default RodaDaVidaPage;
