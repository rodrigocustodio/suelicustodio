import { useState } from 'react';

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { track } from '@/lib/analytics';

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

  const headerTitle = 'Análise do Estado Emocional';

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Header */}
      <header className="bg-gradient-to-b from-brand-50 to-paper-50 pt-8 pb-5 md:pt-12 md:pb-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-brand-500 font-medium mb-2">
            Sueli Custódio · Mentoria Relacional
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-ink-900 mb-2 leading-tight">
            {headerTitle}
          </h1>
          {step === 'result' && (
            <p className="text-base text-ink-600 font-medium mt-1">Conheça sua Roda da Vida</p>
          )}
          <div className="w-24 h-px bg-brand-300 mx-auto mt-3" />
        </div>
      </header>

      {/* Content */}
      <main>
        {step === 'intro' && (
          <div className="py-4 md:py-8">
            <RodaRegistrationForm onSubmit={handleRegistration} loading={loading} />
          </div>
        )}

        {step === 'questionnaire' && (
          <div className="py-4 md:py-8">
            <RodaSliderQuestion onComplete={handleScoresComplete} />
          </div>
        )}

        {step === 'result' && regData && (
          <>
            {/* 1. Chart + PDF inline — white bg */}
            <div id="roda-chart-container" className="bg-white py-6 md:py-10">
              <div className="text-center mb-4">
                <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900 mb-1">
                  Sua Roda da Vida, {regData.user_name}
                </h2>
                <div className="w-16 h-px bg-brand-300 mx-auto" />
              </div>
              <RodaChart scores={scores} id="roda-chart" />
              {/* PDF inline */}
              <div className="flex justify-center mt-5">
                <RodaPdfExport
                  userName={fullName}
                  age={regData.age}
                  report={report}
                />
              </div>
            </div>

            {/* 2. AI Report — warm tint */}
            <div className="bg-brand-50/40 py-6 md:py-10">
              <RodaAIReport
                scores={scores}
                userName={fullName}
                age={regData.age}
                recordId={recordId}
                onReportGenerated={setReport}
              />
            </div>

            {/* 3. Credibility — white */}
            <div className="bg-white py-6 md:py-10">
              <RodaSueliCredibility />
            </div>

            {/* 4. Packages — warm tint */}
            <div className="bg-brand-50/40 py-6 md:py-10">
              <RodaPackages onWhatsAppClick={handleWhatsAppClick} />
            </div>

            {/* 5. Final CTA — gradient */}
            <div className="bg-gradient-to-b from-brand-50 to-paper-50 py-6 md:py-10 pb-14">
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
                <p className="text-xs text-muted-foreground">
                  Atendimento personalizado · Resposta em até 24h
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default RodaDaVidaPage;
