import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { track } from '@/lib/analytics';

const YOUTUBE_ID = 'rdrjoe4LZjI';
const CHECKOUT_URL = 'https://pay.kiwify.com.br/GX9EKPK';

const VSLPage = () => {
  const [showCTA, setShowCTA] = useState(false);
  const playerRef = useRef<any>(null);
  const hasTriggeredRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // PageView pixel
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  // YouTube API
  useEffect(() => {
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    function createPlayer() {
      playerRef.current = new (window as any).YT.Player('vsl-player', {
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING && !hasTriggeredRef.current) {
              startProgressCheck();
            }
          },
        },
      });
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startProgressCheck = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (!playerRef.current?.getCurrentTime || hasTriggeredRef.current) return;
      const current = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      if (current && duration && (current / duration) >= 0.6) {
        hasTriggeredRef.current = true;
        setShowCTA(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000);
  };

  const handleCheckout = () => {
    track('vsl_initiate_checkout');
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Autoestima Inabalável',
        value: 47.90,
        currency: 'BRL',
      });
    }
    window.open(CHECKOUT_URL, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Autoestima Inabalável | Sueli Custódio</title>
        <meta name="description" content="Descubra o comportamento silencioso que faz muitas mulheres se sobrecarregarem sem perceber." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-paper-50">
        {/* Hero + Video */}
        <section className="px-4 pt-8 pb-6 max-w-2xl mx-auto">
          <h1 className="font-playfair text-2xl md:text-3xl text-ink-900 text-center mb-3 leading-snug">
            Talvez o seu cansaço não seja falta de descanso.
          </h1>
          <p className="font-inter text-ink-500 text-sm md:text-base text-center mb-6 max-w-md mx-auto leading-relaxed">
            Existe um comportamento silencioso que faz muitas mulheres se sobrecarregarem sem perceber. Assista ao vídeo.
          </p>

          {/* YouTube Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card bg-ink-900">
            <iframe
              id="vsl-player"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=1`}
              title="Autoestima Inabalável"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* CTA after 60% */}
          <div
            className={`mt-6 transition-all duration-700 ${
              showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors"
            >
              COMEÇAR AGORA
            </button>
          </div>
        </section>

        {/* Offer section — visible after CTA appears */}
        <div
          className={`transition-all duration-700 delay-300 ${
            showCTA ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* What you get */}
          <section className="px-4 py-8 max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl text-ink-900 text-center mb-6">
              Autoestima Inabalável
            </h2>

            <div className="space-y-3 mb-8">
              {[
                'Aulas curtas e práticas',
                'Acesso imediato',
                'Pode assistir no próprio ritmo',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                  <svg className="w-5 h-5 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-inter text-ink-700 text-base">{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 shadow-card text-center mb-8">
              <p className="font-inter text-ink-500 text-sm mb-1">Investimento</p>
              <p className="font-playfair text-4xl text-ink-900 font-bold mb-1">R$47,90</p>
              <p className="font-inter text-ink-500 text-sm">à vista</p>
              <p className="font-inter text-ink-500 text-sm mt-1">ou <strong className="text-ink-700">10x R$5,76</strong></p>
            </div>

            {/* Bonuses */}
            <div className="mb-8">
              <h3 className="font-playfair text-xl text-ink-900 text-center mb-4">Bônus inclusos</h3>
              <div className="space-y-3">
                {[
                  'Material de apoio',
                  'Aula ao vivo',
                  'Exercícios guiados',
                ].map((bonus) => (
                  <div key={bonus} className="flex items-center gap-3 bg-brand-50 rounded-xl px-4 py-3">
                    <svg className="w-5 h-5 text-cta-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-inter text-ink-700 text-base">{bonus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-brand-50 rounded-2xl p-6 text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="font-playfair text-lg text-ink-900 font-semibold mb-2">Garantia de 7 dias</p>
              <p className="font-inter text-ink-500 text-sm leading-relaxed">
                7 dias para testar. Se não fizer sentido, devolução integral.
              </p>
            </div>

            {/* Final CTA */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-semibold text-lg transition-colors"
            >
              QUERO COMEÇAR
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default VSLPage;
