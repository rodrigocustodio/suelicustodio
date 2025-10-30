import { useEffect } from 'react';
import { Section } from '@/components/Section';
import { VideoSection } from '@/components/autoestima/VideoSection';
import { VisualTestimonialCard } from '@/components/autoestima/VisualTestimonialCard';
import { TestimonialCard } from '@/components/autoestima/TestimonialCard';
import { AutoestimaContactForm } from '@/components/autoestima/AutoestimaContactForm';
import { track } from '@/lib/analytics';

// Import images
import heroCarousel1 from '@/assets/hero-carousel-1.jpg';
import heroCarousel2 from '@/assets/hero-carousel-2.jpg';
import heroCarousel3 from '@/assets/hero-carousel-3.jpg';
import heroCarousel4 from '@/assets/hero-carousel-4.webp';
import sueliPortrait from '@/assets/sueli-portrait-warm.jpg';
import sessionImage from '@/assets/session-1.jpg';

const AutoestimaLanding = () => {
  useEffect(() => {
    track('autoestima_page_view');
  }, []);

  const scrollToForm = () => {
    track('autoestima_cta_scroll_to_form');
    const formElement = document.getElementById('contact-form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Conquiste sua{' '}
            <span className="text-brand-600">Autoestima Inabalável</span>
          </h1>
          <p className="text-xl md:text-2xl text-ink-700 mb-3">
            Descubra seu valor e brilhe com confiança
          </p>
          <p className="text-lg text-ink-600 mb-8">
            Descubra como transformar sua autoestima
          </p>
          
          <button
            onClick={scrollToForm}
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-soft hover:shadow-elegant"
          >
            Assista agora e descubra o método comprovado
          </button>
        </div>
      </Section>

      {/* Video Section */}
      <Section className="bg-white">
        <div className="container-narrow px-4">
          <VideoSection
            title="Transforme sua Autoestima"
            subtitle="Assista agora e descubra o método comprovado"
          />
          
          <div className="text-center mt-8">
            <button
              onClick={scrollToForm}
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Agende sua Sessão Agora
            </button>
          </div>
        </div>
      </Section>

      {/* Visual Testimonials */}
      <Section>
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-900 mb-4">
              Seu momento de brilhar
            </h2>
            <p className="text-lg text-ink-700 max-w-2xl mx-auto">
              Mulheres reais que se reconectaram consigo mesmas. Você também merece se sentir assim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VisualTestimonialCard
              image="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
              label="Confiante"
              alt="Mulher confiante e feliz"
            />
            <VisualTestimonialCard
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
              label="Resiliente"
              alt="Mulher resiliente e determinada"
            />
            <VisualTestimonialCard
              image="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
              label="Empoderada"
              alt="Mulher empoderada e segura"
            />
            <VisualTestimonialCard
              image="https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
              label="Autêntica"
              alt="Mulher autêntica e verdadeira"
            />
          </div>
        </div>
      </Section>

      {/* About Sueli */}
      <Section className="bg-brand-100/50">
        <div className="container-narrow px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-900 text-center mb-12">
            Conheça sua mentora
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="bg-white p-4 rounded-2xl shadow-soft">
                <img
                  src={sueliPortrait}
                  alt="Sueli Custódio - Mentora de Autoestima especializada em empoderamento feminino"
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                />
              </div>
              <p className="text-center mt-4 text-ink-700 font-medium">
                Sueli Custódio
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-ink-900">
                Sueli Custódio
              </h3>
              
              <p className="text-ink-700 leading-relaxed">
                Mentora especializada em autoestima feminina, dedico minha carreira a ajudar mulheres a descobrirem seu valor único e resgatarem a confiança que sempre esteve dentro delas.
              </p>
              
              <p className="text-ink-700 leading-relaxed">
                Com mais de 10 anos de experiência, desenvolvi uma metodologia acolhedora que combina técnicas de coaching, psicologia positiva e empoderamento feminino.
              </p>
              
              <p className="text-ink-700 leading-relaxed">
                Acredito que toda mulher merece se sentir amada, valorizada e confiante. Minha missão é guiá-la nessa jornada de transformação pessoal, onde você se reconectará com sua essência e aprenderá a brilhar autenticamente.
              </p>

              <button
                onClick={scrollToForm}
                className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-4"
              >
                Quero Transformar Minha Autoestima
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Detailed Testimonials */}
      <Section className="bg-white">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-900 mb-4">
              Histórias de Transformação
            </h2>
            <p className="text-lg text-ink-700">
              Veja o que mulheres como você alcançaram
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <TestimonialCard
              name="Juliana Zamarian"
              quote="Passar pelo processo com a Sueli Custódio foi um divisor de águas em minha vida eu fui curada da depressão e fibromialgia"
              rating={5}
            />
            <TestimonialCard
              name="Aline Lima"
              quote="Antes de passar pelo Processo com a Sueli eu não sabia me amar, na verdade eu não me conhecia. Hoje eu sei quem sou e tenho conquistado tudo o que sempre sonhei"
              rating={5}
            />
            <TestimonialCard
              name="Jô Souza"
              quote="Eu estava num relacionamento abusivo onde eu apanhava do meu marido e após sair de casa praticamente expulsa depois de 21 anos de casamento eu pude através do processo mudar totalmente minha história"
              rating={5}
            />
            <TestimonialCard
              name="Janair Lisboa"
              quote="Eu recomendo o processo individual que mudou minha vida e a forma como eu me enxergava, hoje eu sou outra pessoa"
              rating={5}
            />
          </div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section id="contact-form" className="bg-gradient-to-br from-brand-50 to-accent-50">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-900 mb-4">
              Dê o Primeiro Passo
            </h2>
            <p className="text-lg text-ink-700">
              Vamos conversar sobre sua jornada de transformação
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <AutoestimaContactForm />
            </div>

            <div className="relative order-first md:order-last">
              <img
                src={sessionImage}
                alt="Mulher confiante tomando decisão positiva sobre seu futuro"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-700 to-brand-800 text-white py-12">
        <div className="container-narrow px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-playfair text-xl font-bold mb-2">
                Sueli Custódio
              </h3>
              <p className="text-brand-100">
                Mentora de Autoestima Feminina
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contato</h4>
              <p className="text-brand-100 mb-1">
                contato@suelicustodio.com.br
              </p>
              <p className="text-brand-100">
                (11) 99999-9999
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-brand-100">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-600 pt-6 text-center text-brand-200">
            <p>© 2025 Sueli Custódio - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoestimaLanding;
