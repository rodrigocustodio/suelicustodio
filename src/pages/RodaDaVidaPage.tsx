import { useState } from 'react';

import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { track } from '@/lib/analytics';
import { RodaRegistrationForm, type RegistrationData } from '@/components/roda-vida/RodaRegistrationForm';
import { RodaSliderQuestion } from '@/components/roda-vida/RodaSliderQuestion';
import { RodaChart } from '@/components/roda-vida/RodaChart';
import { RodaResult } from '@/components/roda-vida/RodaResult';
import { RodaPackages } from '@/components/roda-vida/RodaPackages';
import { RodaPdfExport } from '@/components/roda-vida/RodaPdfExport';

type Step = 'intro' | 'questionnaire' | 'result';

const RodaDaVidaPage = () => {
  const [step, setStep] = useState<Step>('intro');
  const [recordId, setRecordId] = useState<string | null>(null);
  const [regData, setRegData] = useState<RegistrationData | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (data: RegistrationData) => {
    setLoading(true);
    try {
      const { data: inserted, error } = await supabase
        .from('roda_vida_responses')
        .insert({
          user_name: data.user_name,
          user_lastname: data.user_lastname,
          email: data.email,
          age: data.age,
          whatsapp: data.whatsapp,
        })
        .select('id')
        .single();

      if (error) throw error;
      setRecordId(inserted.id);
      setRegData(data);
      setStep('questionnaire');
      track('roda_vida_start');
    } catch {
      // silently handle
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

  return (
    <>
      <Helmet>
        <title>Análise do Estado Emocional | Mentora Sueli Custódio</title>
        <meta
          name="description"
          content="Descubra visualmente como estão as áreas mais importantes da sua vida emocional e relacional com a Roda da Vida."
        />
      </Helmet>

      <div className="min-h-screen bg-paper-50">
        {/* Header */}
        <header className="bg-gradient-to-b from-brand-50 to-paper-50 py-12 md:py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair text-ink-900 mb-4">
              Análise do Estado Emocional
            </h1>
            <p className="text-ink-700 text-lg leading-relaxed">
              Descubra visualmente como estão as áreas mais importantes da sua vida emocional e relacional.
            </p>
            <p className="text-ink-500 mt-3 leading-relaxed">
              Responda algumas perguntas rápidas e veja sua Roda da Vida personalizada, revelando onde
              está o equilíbrio e onde existe oportunidade de crescimento.
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="pb-20">
          {step === 'intro' && (
            <section className="py-10 px-4">
              <RodaRegistrationForm onSubmit={handleRegistration} loading={loading} />
            </section>
          )}

          {step === 'questionnaire' && (
            <section className="py-10 px-4">
              <RodaSliderQuestion onComplete={handleScoresComplete} />
            </section>
          )}

          {step === 'result' && regData && (
            <div className="space-y-16">
              {/* Chart */}
              <section className="py-6 px-4" id="roda-chart-container">
                <RodaChart scores={scores} id="roda-chart" />
              </section>

              {/* Result text */}
              <section>
                <RodaResult />
              </section>

              {/* PDF + WhatsApp actions */}
              <section className="flex flex-col items-center gap-4 px-4">
                <RodaPdfExport
                  userName={`${regData.user_name} ${regData.user_lastname}`}
                  age={regData.age}
                />
              </section>

              {/* Packages */}
              <section className="py-10">
                <RodaPackages />
              </section>

              {/* WhatsApp CTA */}
              <section className="px-4 pb-10">
                <div className="max-w-md mx-auto">
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-base font-medium shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Conversar com a Mentora Sueli
                  </Button>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default RodaDaVidaPage;
