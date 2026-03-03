import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import quizIntroImg from '@/assets/quiz-intro.webp';
import { quizQuestions, calculateOverloadScore, calculateAwarenessLevel, calculateDiscProfile } from '@/lib/quiz-data';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizLeadCapture, type LeadData } from '@/components/quiz/QuizLeadCapture';
import { QuizResult } from '@/components/quiz/QuizResult';
import { QuizProgressBar } from '@/components/quiz/QuizProgressBar';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/analytics';

type Phase = 'intro' | 'quiz' | 'lead' | 'result';

const QuizPage = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [overloadResult, setOverloadResult] = useState('');

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

      setLeadName(data.name);
      setOverloadResult(overloadScore);
      setPhase('result');
    } catch (err) {
      
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
              <h1 className="font-playfair text-3xl md:text-4xl text-ink-900 mb-6 leading-snug max-w-md animate-fade-in" style={{ animationDuration: '0.6s' }}>
                Você diz sim…<br />
                quando queria dizer não.
              </h1>
              <img
                src={quizIntroImg}
                alt="Mulher pensativa no sofá"
                className="w-full max-w-sm aspect-[3/4] object-cover rounded-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDuration: '0.8s', animationDelay: '0.3s', animationFillMode: 'both' }}
              />
              <p className="font-inter text-ink-600 text-base md:text-lg mb-2 max-w-sm leading-relaxed animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '0.6s', animationFillMode: 'both' }}>
                E isso vai acumulando.
              </p>
              <p className="font-inter text-ink-500 text-base md:text-lg mb-8 max-w-sm leading-relaxed animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '0.8s', animationFillMode: 'both' }}>
                Responsabilidades.<br />
                Culpa.<br />
                Cansaço que ninguém vê.
              </p>
              <p className="font-inter text-ink-600 text-base md:text-lg mb-2 max-w-sm leading-relaxed animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '1.0s', animationFillMode: 'both' }}>
                Mas talvez não seja falta de força.
              </p>
              <p className="font-inter text-ink-500 text-sm md:text-base mb-8 max-w-sm leading-relaxed animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '1.2s', animationFillMode: 'both' }}>
                Pode ser apenas um padrão que você aprendeu sem perceber.
              </p>
              <p className="font-inter text-ink-500 text-sm md:text-base mb-1 max-w-sm leading-relaxed animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '1.4s', animationFillMode: 'both' }}>
                Responda algumas perguntas rápidas
              </p>
              <p className="font-inter text-ink-400 text-sm md:text-base mb-3 max-w-sm leading-relaxed animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '1.5s', animationFillMode: 'both' }}>
                (eu prometo que leva cerca de 2 minutos)
              </p>
              <p className="font-inter text-ink-600 text-sm md:text-base mb-10 max-w-sm leading-relaxed font-medium animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '1.6s', animationFillMode: 'both' }}>
                E descubra qual padrão está por trás da sua sobrecarga.
              </p>
              <button
                onClick={handleStart}
                className="w-full max-w-xs py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors animate-fade-in" style={{ animationDuration: '0.6s', animationDelay: '1.8s', animationFillMode: 'both' }}
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

          {phase === 'result' && <QuizResult name={leadName} overloadScore={overloadResult} />}
        </div>

        <footer className="py-4 text-center">
          <div className="flex items-center justify-center gap-3 font-inter text-xs text-ink-400">
            <Link to="/politica-de-privacidade" className="underline hover:text-ink-600 transition-colors">
              Política de Privacidade
            </Link>
            <span>•</span>
            <Link to="/termos-de-uso" className="underline hover:text-ink-600 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default QuizPage;
