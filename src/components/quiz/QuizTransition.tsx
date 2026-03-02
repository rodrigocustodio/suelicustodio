import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const QuizTransition = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to VSL after 5 seconds
    const timer = setTimeout(() => {
      navigate('/vsl');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Track ViewContent
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: 'Quiz Completed' });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Animated checkmark */}
      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 mb-3 leading-snug">
        Seu resultado está sendo preparado.
      </h2>
      <p className="font-inter text-ink-500 text-base mb-8 max-w-sm">
        Você receberá um relatório detalhado no seu email em alguns minutos.
      </p>

      <div className="bg-brand-50 rounded-2xl p-6 max-w-sm w-full mb-6">
        <p className="font-inter text-ink-700 text-sm leading-relaxed">
          Gravei um vídeo explicando exatamente o que isso significa.
        </p>
      </div>

      <button
        onClick={() => navigate('/vsl')}
        className="w-full max-w-sm py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors"
      >
        ASSISTIR AGORA
      </button>

      <p className="font-inter text-xs text-ink-500 mt-4">
        Redirecionando automaticamente em alguns segundos...
      </p>
    </div>
  );
};
