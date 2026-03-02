import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { track } from '@/lib/analytics';
import { Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import sueliPortrait from '@/assets/sueli-portrait-warm.jpg';
import juliana from '@/assets/juliana.png';
import aline from '@/assets/aline.png';
import jo from '@/assets/jo.png';
import janair from '@/assets/janair.png';

const YOUTUBE_ID = 'IIEezIOz0LM';
const CHECKOUT_URL = 'https://pay.kiwify.com.br/GX9EKPK';

const VSLPage = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
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
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                setVideoEnded(true);
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
              {/* Custom thumbnail before play */}
              {!videoStarted && (
                <div
                  className="absolute inset-0 z-10 cursor-pointer group"
                  onClick={() => {
                    setVideoStarted(true);
                    // Small delay to let iframe load, then play
                    setTimeout(() => {
                      playerRef.current?.playVideo();
                    }, 500);
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                    alt="Capa do vídeo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-cta-500/90 group-hover:bg-cta-500 flex items-center justify-center shadow-[0_4px_20px_rgba(255,107,53,0.5)] group-hover:scale-110 transition-all">
                      <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
              )}
              <iframe
                id="vsl-player"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?enablejsapi=1&rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&disablekb=1`}
                title="Autoestima Inabalável"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Overlay to hide end screen suggestions */}
              {videoEnded && (
                <div 
                  className="absolute inset-0 z-10 bg-ink-900 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => {
                    setVideoEnded(false);
                    playerRef.current?.seekTo(0);
                    playerRef.current?.playVideo();
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p className="font-inter text-white/70 text-sm">Assistir novamente</p>
                </div>
              )}
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
              <div className="absolute -inset-2 bg-gradient-to-br from-cta-500/25 to-brand-400/25 rounded-3xl blur-lg animate-pulse" />
              <div className="relative bg-gradient-to-br from-white to-brand-50 rounded-2xl p-8 shadow-card text-center border-2 border-cta-500/30">
                <div className="inline-block bg-cta-500 text-white font-inter font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  Oferta especial
                </div>
                
                {/* Installment - PROMINENT */}
                <p className="font-inter text-ink-500 text-sm mb-1">em até</p>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="font-inter text-cta-500 text-2xl font-bold">10x</span>
                  <span className="font-inter text-ink-500 text-xl">de</span>
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="font-inter text-cta-600 text-2xl font-bold">R$</span>
                  <span className="font-playfair text-6xl text-cta-600 font-bold leading-none">5</span>
                  <span className="font-playfair text-3xl text-cta-600 font-bold">,76</span>
                </div>
                
                {/* Divider */}
                <div className="flex items-center justify-center gap-3 my-4">
                  <div className="h-px w-16 bg-brand-200" />
                  <span className="font-inter text-ink-400 text-xs uppercase tracking-wider">ou</span>
                  <div className="h-px w-16 bg-brand-200" />
                </div>
                
                {/* Cash - secondary */}
                <p className="font-inter text-ink-500 text-base">
                  <span className="font-semibold text-ink-700">R$ 47,90</span> à vista
                </p>
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

        {/* Bio Section */}
        <section className="px-4 py-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-brand-200" />
            <div className="w-2 h-2 rounded-full bg-brand-300" />
            <div className="h-px w-12 bg-brand-200" />
          </div>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-br from-brand-300/40 to-brand-500/30 rounded-full blur-sm" />
              <img
                src={sueliPortrait}
                alt="Sueli Custódio - Mentora de Autoestima"
                className="relative w-28 h-28 rounded-full object-cover shadow-lg ring-2 ring-white"
              />
            </div>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-brand-500 mb-2">Conheça sua mentora</p>
            <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 mb-4">Sueli Custódio</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft border border-brand-100/50 space-y-4">
            <p className="font-inter text-ink-700 text-base leading-relaxed">
              Coach, Mentora e Palestrante especializada em desenvolvimento emocional e ressignificação mental, com mais de <strong className="text-brand-600">13 anos de experiência</strong> e formação em Coaching Comportamental, Inteligência Emocional Aplicada e Análise Comportamental.
            </p>
            <p className="font-inter text-ink-700 text-base leading-relaxed">
              Já transformou a vida de mais de <strong className="text-brand-600">500 mulheres</strong>, especialmente profissionais que lidam com estresse crônico, ansiedade e esgotamento emocional, através de mentorias, sessões individuais e palestras corporativas.
            </p>
            <blockquote className="border-l-3 border-brand-400 pl-4 py-2 mt-4">
              <p className="font-playfair text-lg text-brand-600 italic leading-relaxed">
                "Cada mulher possui em si a força necessária para superar traumas e reconstruir sua identidade."
              </p>
            </blockquote>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 pb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-brand-200" />
            <div className="w-2 h-2 rounded-full bg-brand-300" />
            <div className="h-px w-12 bg-brand-200" />
          </div>

          <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 text-center mb-2">
            Histórias de Transformação
          </h2>
          <p className="font-inter text-ink-500 text-sm text-center mb-8">
            Veja o que mulheres reais alcançaram
          </p>

          <div className="space-y-4">
            {[
              { name: 'Juliana Zamarian', photo: juliana, quote: 'Passar pelo processo com a Sueli Custódio foi um divisor de águas em minha vida eu fui curada da depressão e fibromialgia' },
              { name: 'Aline Lima', photo: aline, quote: 'Antes de passar pelo Processo com a Sueli eu não sabia me amar, na verdade eu não me conhecia. Hoje eu sei quem sou e tenho conquistado tudo o que sempre sonhei' },
              { name: 'Jô Souza', photo: jo, quote: 'Eu estava num relacionamento abusivo onde eu apanhava do meu marido e após sair de casa praticamente expulsa depois de 21 anos de casamento eu pude através do processo mudar totalmente minha história' },
              { name: 'Janair Lisboa', photo: janair, quote: 'Eu recomendo o processo individual que mudou minha vida e a forma como eu me enxergava, hoje eu sou outra pessoa' },
            ].map((t) => (
              <div key={t.name} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-brand-100/50">
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-100" />
                  <div>
                    <p className="font-inter font-semibold text-ink-900 text-sm">{t.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-inter text-ink-700 text-sm leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </div>

          {/* Final final CTA */}
          <div className={`mt-10 transition-all duration-700 ${showCTA ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={handleCheckout}
              className="group w-full py-5 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-bold text-xl transition-all shadow-[0_4px_20px_rgba(255,107,53,0.35)] hover:shadow-[0_6px_28px_rgba(255,107,53,0.45)]"
            >
              QUERO COMEÇAR AGORA
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
            <p className="font-inter text-xs text-ink-500 text-center mt-3 opacity-70">
              Garantia de 7 dias • Pagamento seguro
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 max-w-2xl mx-auto text-center border-t border-brand-100/50">
          <p className="font-inter text-ink-500 text-xs mb-2">
            © {new Date().getFullYear()} Sueli Custódio. Todos os direitos reservados.
          </p>
          <Link to="/politica-de-privacidade" className="font-inter text-xs text-brand-500 hover:text-brand-600 underline underline-offset-2 transition-colors">
            Política de Privacidade
          </Link>
        </footer>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/5511945300128?text=Olá! Tenho uma dúvida sobre o curso Autoestima Inabalável."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)] transition-all hover:scale-110"
          aria-label="Tirar dúvidas no WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </a>
      </div>
    </>
  );
};

export default VSLPage;
