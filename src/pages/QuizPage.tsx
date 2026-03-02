import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { quizQuestions, calculateOverloadScore, calculateAwarenessLevel, calculateDiscProfile } from '@/lib/quiz-data';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizLeadCapture, type LeadData } from '@/components/quiz/QuizLeadCapture';
import { QuizTransition } from '@/components/quiz/QuizTransition';
import { QuizProgressBar } from '@/components/quiz/QuizProgressBar';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/analytics';

type Phase = 'intro' | 'quiz' | 'lead' | 'transition';

const QuizPage = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PageView pixel
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  const handleStart = () => {
    track('quiz_start');
    setPhase('quiz');
  };

  const handleAnswer = useCallback((questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        setPhase('lead');
      }
    }, 300);
  }, [currentQ]);

  const handleLeadSubmit = async (data: LeadData) => {
    setIsSubmitting(true);
    track('quiz_lead_submit');

    const overloadScore = calculateOverloadScore(answers);
    const awarenessLevel = calculateAwarenessLevel(answers);
    const discProfile = calculateDiscProfile(answers);

    try {
      const { error } = await (supabase as any)
        .from('quiz_responses')
        .insert({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          answers: answers,
          overload_score: overloadScore,
          awareness_level: awarenessLevel,
          disc_profile: discProfile,
          consent_marketing: data.consent,
        });

      if (error) throw error;

      // Facebook Lead event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Quiz Autoestima',
          content_category: 'Quiz',
        });
      }

      setPhase('transition');
    } catch (err) {
      console.error('Error saving quiz response:', err);
      alert('Erro ao salvar. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preload VSL page
  useEffect(() => {
    if (phase === 'quiz' && currentQ >= 6) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/vsl';
      document.head.appendChild(link);
    }
  }, [phase, currentQ]);

  return (
    <>
      <Helmet>
        <title>Teste de Sobrecarga Emocional | Autoestima Inabalável</title>
        <meta name="description" content="Responda algumas perguntas rápidas e receba um relatório sobre seu padrão de sobrecarga emocional." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-paper-50 flex flex-col">
        {/* Progress bar — visible during quiz and lead phases */}
        {(phase === 'quiz' || phase === 'lead') && (
          <div className="pt-6 pb-2">
            <QuizProgressBar
              current={phase === 'lead' ? quizQuestions.length : currentQ + 1}
              total={quizQuestions.length + 1}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {phase === 'intro' && (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
              <h1 className="font-playfair text-3xl md:text-4xl text-ink-900 mb-4 leading-snug max-w-md">
                Você não está exagerando.
              </h1>
              <p className="font-inter text-ink-500 text-base md:text-lg mb-10 max-w-sm leading-relaxed">
                Responda algumas perguntas rápidas e receba no seu email um relatório sobre seu padrão de sobrecarga.
              </p>
              <button
                onClick={handleStart}
                className="w-full max-w-xs py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors"
              >
                COMEÇAR TESTE
              </button>
            </div>
          )}

          {phase === 'quiz' && (
            <QuizQuestion
              question={quizQuestions[currentQ]}
              selectedAnswer={answers[quizQuestions[currentQ].id]}
              onSelect={handleAnswer}
            />
          )}

          {phase === 'lead' && (
            <QuizLeadCapture onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} />
          )}

          {phase === 'transition' && <QuizTransition />}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
