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

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

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

      <div className="min-h-screen bg-gradient-to-b from-[hsl(30,30%,97%)] via-paper-50 to-[hsl(30,20%,95%)]">
        {/* Hero + Video */}
        <section className="relative px-4 pt-10 pb-8 max-w-2xl mx-auto">
          {/* Subtle decorative element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300 opacity-60" />

          <p className="font-inter text-xs uppercase tracking-[0.2em] text-brand-500 text-center mb-4">
            Sueli Custódio apresenta
          </p>

          <h1 className="font-playfair text-3xl md:text-4xl text-ink-900 text-center mb-4 leading-[1.2]">
            Talvez o seu cansaço{' '}
            <span className="relative">
              não seja falta de descanso.
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-cta-500/30 rounded-full" />
            </span>
          </h1>
          <p className="font-inter text-ink-500 text-base md:text-lg text-center mb-8 max-w-md mx-auto leading-relaxed">
            Existe um comportamento silencioso que faz muitas mulheres se sobrecarregarem sem perceber. Assista ao vídeo.
          </p>

          {/* YouTube Player with decorative frame */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-200/40 via-transparent to-brand-300/30 rounded-3xl blur-sm" />
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-ink-900 ring-1 ring-brand-200/50">
              <iframe
                id="vsl-player"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=1`}
                title="Autoestima Inabalável"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* CTA after 60% */}
          <div
            className={`mt-8 transition-all duration-700 ease-out ${
              showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <button
              onClick={handleCheckout}
              className="group w-full py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-bold text-lg transition-all shadow-[0_4px_20px_rgba(255,107,53,0.35)] hover:shadow-[0_6px_28px_rgba(255,107,53,0.45)]"
            >
              COMEÇAR AGORA
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </section>

        {/* Offer section */}
        <div
          className={`transition-all duration-700 delay-300 ${
            showCTA ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="h-px w-12 bg-brand-200" />
            <div className="w-2 h-2 rounded-full bg-brand-300" />
            <div className="h-px w-12 bg-brand-200" />
          </div>

          <section className="px-4 pb-12 max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 text-center mb-2">
              Autoestima Inabalável
            </h2>
            <p className="font-inter text-ink-500 text-sm text-center mb-8">
              Tudo o que você precisa para começar sua transformação
            </p>

            {/* Features */}
            <div className="space-y-3 mb-10">
              {[
                { icon: '▶', text: 'Aulas curtas e práticas' },
                { icon: '⚡', text: 'Acesso imediato' },
                { icon: '🕐', text: 'Pode assistir no próprio ritmo' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-soft border border-brand-100/50">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-inter text-ink-700 text-base">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Pricing Card */}
            <div className="relative mb-10">
              <div className="absolute -inset-1 bg-gradient-to-br from-cta-500/20 to-brand-400/20 rounded-3xl blur-md" />
              <div className="relative bg-white rounded-2xl p-8 shadow-card text-center border border-brand-100/60">
                <p className="font-inter text-brand-500 text-xs uppercase tracking-widest mb-3">Investimento</p>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="font-inter text-ink-500 text-lg">R$</span>
                  <span className="font-playfair text-5xl text-ink-900 font-bold">47</span>
                  <span className="font-playfair text-2xl text-ink-900 font-bold">,90</span>
                </div>
                <p className="font-inter text-ink-500 text-sm">à vista</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="h-px w-8 bg-brand-200" />
                  <p className="font-inter text-ink-500 text-sm">ou <strong className="text-ink-900">10x R$5,76</strong></p>
                  <div className="h-px w-8 bg-brand-200" />
                </div>
              </div>
            </div>

            {/* Bonuses */}
            <div className="mb-10">
              <div className="flex items-center justify-center gap-2 mb-5">
                <div className="h-px w-6 bg-cta-500/40" />
                <h3 className="font-playfair text-xl text-ink-900">Bônus inclusos</h3>
                <div className="h-px w-6 bg-cta-500/40" />
              </div>
              <div className="space-y-3">
                {[
                  { emoji: '📖', text: 'Material de apoio' },
                  { emoji: '🎥', text: 'Aula ao vivo' },
                  { emoji: '✍️', text: 'Exercícios guiados' },
                ].map((bonus) => (
                  <div key={bonus.text} className="flex items-center gap-4 bg-gradient-to-r from-brand-50 to-white rounded-2xl px-5 py-4 border border-brand-100/40">
                    <span className="text-xl">{bonus.emoji}</span>
                    <span className="font-inter text-ink-700 text-base">{bonus.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="relative mb-10">
              <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-2xl p-7 text-center border border-brand-200/40">
                <div className="w-14 h-14 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="font-playfair text-xl text-ink-900 font-semibold mb-2">Garantia de 7 dias</p>
                <p className="font-inter text-ink-500 text-sm leading-relaxed max-w-xs mx-auto">
                  7 dias para testar. Se não fizer sentido, devolução integral.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <button
              onClick={handleCheckout}
              className="group w-full py-5 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-bold text-xl transition-all shadow-[0_4px_20px_rgba(255,107,53,0.35)] hover:shadow-[0_6px_28px_rgba(255,107,53,0.45)]"
            >
              QUERO COMEÇAR
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>

            <p className="font-inter text-xs text-ink-500 text-center mt-4 opacity-70">
              Pagamento seguro • Acesso imediato
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default VSLPage;
