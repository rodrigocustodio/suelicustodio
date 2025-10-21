import { useState } from 'react';
import { Section } from '@/components/Section';
import { Header } from '@/components/Header';
import { Stat } from '@/components/Stat';
import { HeroCarousel } from '@/components/HeroCarousel';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { track, scrollToId } from '@/lib/analytics';
import { Mail, Phone, Instagram, Youtube, MapPin, Heart, Sparkles, Mic, Users, User, Play, BookOpen, Sunrise, Quote, Clock, Calendar } from 'lucide-react';

import sueliPortrait from '@/assets/sueli-portrait-warm.jpg';
import palestrando from '@/assets/palestrando.jpg';
import sueliCircle from '@/assets/suelicicle.png';
import heroHills from '@/assets/hero-hills.jpg';
import session1 from '@/assets/session-1.jpg';
import groupMentoring from '@/assets/group-mentoring.jpg';
import talkStage from '@/assets/talk-stage.jpg';
import windowFlowers from '@/assets/window-flowers.jpg';
import sunsetReflection from '@/assets/sunset-reflection.jpg';
import leavesPattern from '@/assets/leaves-pattern.svg';
import teamGroup from '@/assets/team-group.jpg';
import palestraCorporativa from '@/assets/palestra-corporativa.jpg';
import mentoriaGrupo from '@/assets/mentoria-grupo.jpg';
import atendimentoIndividual from '@/assets/atendimento-individual.jpg';
import cursosGravados from '@/assets/cursos-gravados.jpg';
import heroCarousel1 from '@/assets/hero-carousel-1.jpg';
import heroCarousel2 from '@/assets/hero-carousel-2.jpg';
import heroCarousel3 from '@/assets/hero-carousel-3.jpg';
import heroCarousel4 from '@/assets/hero-carousel-4.webp';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const heroImages = [
    { src: heroCarousel1, alt: "Equipe profissional colaborando" },
    { src: heroCarousel2, alt: "Mulher confiante sorrindo" },
    { src: heroCarousel3, alt: "Casal feliz se abraçando" },
    { src: heroCarousel4, alt: "Grupo diverso de pessoas felizes" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('cta_contact_submit');
    toast({
      title: "Mensagem enviada!",
      description: "Obrigada por entrar em contato. Retornarei em breve.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const services = [
    {
      img: palestraCorporativa,
      alt: "Profissional apresentando em ambiente corporativo",
      title: "Palestras Interativas e Motivacionais",
      desc: "Palestras dinâmicas e envolventes que combinam teoria e prática. Durante 1h30, sua equipe aprenderá técnicas concretas de gestão emocional que podem ser aplicadas imediatamente no dia a dia. Inclui momentos de reflexão, exercícios práticos e ferramentas para fortalecer a autoestima individual e coletiva.",
      icon: Mic,
      objectPosition: 'object-top'
    },
    {
      img: mentoriaGrupo,
      alt: "Sessão de mentoria em grupo online",
      title: "Mentorias em Grupo (Zoom)",
      desc: "Encontros semanais online com até 8 participantes, criando um ambiente seguro de acolhimento e transformação. Você compartilha experiências, aprende com outras mulheres e recebe orientação estruturada para desenvolver inteligência emocional. Inclui materiais de apoio e práticas guiadas entre sessões.",
      icon: Users,
      objectPosition: 'object-top'
    },
    {
      img: atendimentoIndividual,
      alt: "Conversa acolhedora em atendimento individual",
      title: "Atendimentos Individuais",
      desc: "Sessões personalizadas de 1h focadas 100% em você e sua jornada emocional. Através de técnicas de ressignificação mental, ferramentas validadas e método próprio desenvolvido ao longo de 13 anos, trabalhamos traumas, bloqueios e padrões limitantes. Atendimento presencial em São Paulo ou online, com acompanhamento contínuo entre sessões.",
      icon: User,
      objectPosition: 'object-center'
    },
    {
      img: cursosGravados,
      alt: "Pessoa estudando com cursos online",
      title: "Cursos e Aulas Gravadas",
      desc: "Conteúdos estruturados que você pode acessar no seu próprio ritmo, incluindo vídeo-aulas, apostilas e exercícios práticos. Ideal para quem busca autonomia no processo de desenvolvimento emocional, com suporte via grupo exclusivo no WhatsApp e encontros ao vivo mensais para tira-dúvidas.",
      icon: Play,
      objectPosition: 'object-top'
    }
  ];

  const talks = [
    {
      title: "Autoestima Inabalável",
      tagline: "Mulheres fortes, equilibradas e saudáveis.",
      desc: "Fortaleça sua base emocional e construa uma autoestima que resiste aos desafios do dia a dia."
    },
    {
      title: "Cuidando de Quem Cuida",
      tagline: "Fortalecimento emocional para profissionais da saúde.",
      desc: "Técnicas específicas para lidar com o desgaste emocional em ambientes de alta pressão."
    }
  ];

  const testimonials = [
    { benefit: "Transformação", name: "Juliana", quote: "A mentoria me ajudou a recuperar minha identidade e confiança. Aprendi a valorizar quem eu sou." },
    { benefit: "Leveza", name: "Aline", quote: "Finalmente consegui lidar com a ansiedade que me paralisava. As sessões foram transformadoras." },
    { benefit: "Resiliência", name: "Jô", quote: "Sueli me ensinou a ressignificar experiências difíceis. Hoje me sinto mais forte e preparada." },
    { benefit: "Acolhimento", name: "Janair", quote: "O trabalho em grupo trouxe acolhimento e aprendizado. Não estou sozinha nessa jornada." },
    { benefit: "Equilíbrio", name: "Fátima", quote: "Consegui melhorar minha relação com minha equipe e comigo mesma. Gratidão!" },
    { benefit: "Motivação", name: "Doralice", quote: "As palestras inspiram mudanças reais. Saí motivada e com ferramentas práticas." },
    { benefit: "Autocuidado", name: "Letícia", quote: "Aprendi a cuidar da minha saúde emocional com a mesma dedicação que cuido dos pacientes." },
    { benefit: "Clareza", name: "Mariana", quote: "As técnicas de ressignificação mudaram minha forma de lidar com conflitos. Hoje me sinto mais equilibrada." },
    { benefit: "Autoconfiança", name: "Camila", quote: "O acolhimento e a escuta da Sueli me deram coragem para reconstruir minha autoestima. Sou grata por cada sessão." }
  ];

  return (
    <div className="min-h-screen bg-paper-50 font-inter">
      <Header />
      
      {/* Header/Hero - Full Height, Anna Keller Style */}
      <header className="relative flex items-center pt-16 sm:pt-20">
        {/* Gradient background with subtle image */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50 via-brand-50/30 to-paper-50">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url(${heroHills})` }}
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-20 w-full">
          <div className="grid lg:grid-cols-[1fr_400px_1fr] gap-16 items-center">
            {/* Left: Headline */}
            <div className="space-y-6">
              <p className="text-brand-600 font-medium tracking-widest uppercase text-sm">
                Sueli Custódio
              </p>
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-ink-900">
                Redescubra sua força interior.
              </h1>
              <p className="text-xl text-ink-700 leading-relaxed">
                Processo de transformação emocional, coaching e mentoria para restaurar autoestima e propósito.
              </p>
              <Button 
                className="mt-8 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transition-smooth w-full sm:w-auto"
                onClick={() => {
                  track('cta_hero_book');
                  scrollToId('contato');
                }}
              >
                Agende sua sessão
              </Button>
            </div>

            {/* Center: Portrait */}
            <div className="order-first lg:order-none">
              <div className="relative">
                <HeroCarousel images={heroImages} interval={5000} />
              </div>
            </div>

            {/* Right: Stats - Minimal, No Borders */}
            <div className="space-y-8 sm:space-y-12">
              <Stat value="500+" label="mulheres transformadas" />
              <Stat value="87%" label="relatam melhora significativa em autoestima" />
              <Stat value="13+" label="anos de experiência" />
              <button 
                className="text-brand-600 underline-offset-4 hover:underline transition-smooth"
                onClick={() => scrollToId('depoimentos')}
              >
                Veja depoimentos reais →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About - Professional Profile with Featured Portrait */}
      <Section id="sobre" className="bg-paper-50 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          
          {/* Top Section: Featured Portrait + Opening Bio */}
          <div className="grid lg:grid-cols-[minmax(300px,400px)_1fr] gap-8 lg:gap-12 mb-16">
            {/* Featured Professional Portrait */}
            <div>
              <img 
                src={sueliPortrait} 
                alt="Foto de Sueli Custódio sorrindo" 
                className="rounded-2xl aspect-[3/4] object-cover shadow-card w-full" 
              />
            </div>

            {/* Opening Bio + Credentials */}
            <div className="space-y-6">
              <h2 className="font-playfair text-4xl text-ink-900 mb-6">Quem sou</h2>
              <p className="text-2xl text-ink-900 leading-[1.6] font-medium">
                Sou Sueli Custódio, Coach, Mentora e Palestrante especializada em desenvolvimento emocional e ressignificação mental.
              </p>
              <p className="text-lg text-ink-700 leading-[1.8]">
                Com mais de <span className="font-semibold text-brand-600">13 anos de experiência</span> e formação em <span className="font-semibold">Coaching Comportamental, Inteligência Emocional Aplicada e Análise Comportamental</span>, além de <span className="font-semibold">ferramentas validadas e método próprio desenvolvido ao longo de 13 anos de atuação</span>, dedico-me ao fortalecimento emocional de mulheres que enfrentam ambientes de alta pressão e desafios emocionais complexos.
              </p>
              <p className="text-lg text-ink-700 leading-[1.8]">
                Minha jornada começou quando percebi que muitas mulheres brilhantes estavam silenciosamente sofrendo com ansiedade, autocrítica devastadora e uma sensação de nunca serem "suficientes". Essa dor me tocou profundamente — eu mesma havia enfrentado esses desafios. Foi então que decidi dedicar minha vida a ajudar outras mulheres a reconectarem-se com sua essência, valor e poder interior.
              </p>
              <p className="text-lg text-ink-700 leading-[1.8]">
                Trabalho com metodologias integradas e cientificamente validadas, combinando técnicas práticas de ressignificação mental, ferramentas validadas e coaching ontológico para criar transformações reais e duradouras. Não se trata apenas de teoria — cada sessão é estruturada para gerar mudanças concretas na forma como você pensa, sente e age.
              </p>
            </div>
          </div>

          {/* Pull Quote - Featured Philosophy */}
          <div className="max-w-4xl mx-auto mb-16">
            <blockquote className="border-l-4 border-brand-400 pl-8 py-4 relative">
              <p className="text-2xl text-brand-600 italic leading-[1.8]">
                "Cada mulher possui em si a força necessária para superar traumas e reconstruir sua identidade — meu papel é guiá-la nessa jornada de autodescoberta e fortalecimento."
              </p>
            </blockquote>
          </div>

          {/* Methodology + Impact - Soft Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-soft mb-16">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Heart className="w-6 h-6 text-brand-400 opacity-60 mt-1" />
                  <h3 className="font-playfair text-2xl text-ink-900">Minha Abordagem</h3>
                </div>
                <p className="text-lg text-ink-700 leading-[1.8] mb-4">
                  Combino técnicas práticas de ressignificação mental com acolhimento genuíno e escuta ativa. Através dessa metodologia integrada, ajudo mulheres a reconectarem-se com seu propósito, estabelecerem limites saudáveis e desenvolverem uma inteligência emocional que as sustenta nos desafios do dia a dia.
                </p>
                <p className="text-lg text-ink-700 leading-[1.8]">
                  Utilizo ferramentas validadas e método próprio para ressignificar memórias limitantes, técnicas de ancoragem emocional para criar novos padrões de resposta, e práticas de autocompaixão para reconstruir a relação com você mesma. Cada sessão é estruturada para gerar insights profundos e mudanças práticas.
                </p>
              </div>
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Sunrise className="w-6 h-6 text-brand-400 opacity-60 mt-1" />
                  <h3 className="font-playfair text-2xl text-ink-900">Impacto & Resultados</h3>
                </div>
                <p className="text-lg text-ink-700 leading-[1.8] mb-4">
                  Ao longo da minha carreira, já transformei a vida de mais de <span className="font-semibold text-brand-600">500 mulheres</span>, especialmente profissionais da área da saúde que lidam diariamente com estresse crônico, ansiedade e esgotamento emocional. Através de mentorias individuais, sessões em grupo e palestras corporativas, crio espaços de transformação real e duradoura.
                </p>
                <p className="text-lg text-ink-700 leading-[1.8]">
                  Minhas clientes relatam redução significativa de ansiedade, melhora na qualidade do sono, aumento da autoconfiança e reconstrução de relacionamentos mais saudáveis. Muitas conseguiram estabelecer limites claros no trabalho, superar traumas do passado e redescobrir a alegria de viver.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <img 
                src={sueliCircle} 
                alt="Sueli Custódio" 
                className="w-24 h-24 rounded-full object-cover mx-auto shadow-md"
              />
            </div>
            <h3 className="text-2xl text-ink-900 leading-[1.8] font-semibold mb-2">
              Minha missão é clara:
            </h3>
            <p className="text-xl text-brand-600 leading-[1.8] font-medium italic mb-6">
              ressignificar mentes, curar emoções e fortalecer vidas.
            </p>
            <div className="w-24 h-px bg-brand-300 mx-auto mb-6"></div>
            <p className="text-lg text-ink-700 leading-[1.8]">
              Seja em atendimentos presenciais em São Paulo ou através de mentorias online, trabalho para que cada mulher redescubra o poder transformador que existe dentro dela. Você não precisa carregar esse peso sozinha — estou aqui para caminhar ao seu lado nessa jornada de cura e fortalecimento.
            </p>
          </div>

          {/* Dynamic Photo Gallery - Uniform Size, Boxed, Rounded */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Photo 1 */}
            <div>
              <img 
                className="rounded-2xl aspect-square object-cover shadow-soft hover:shadow-card transition-smooth w-full" 
                src={session1} 
                alt="Atendimento individual em consultório acolhedor"
                loading="lazy"
              />
              <p className="text-sm text-ink-500 mt-3 text-center">
                Atendimento individual personalizado
              </p>
            </div>
            
            {/* Photo 2 */}
            <div>
              <img 
                className="rounded-2xl aspect-square object-cover shadow-soft hover:shadow-card transition-smooth w-full" 
                src={palestrando} 
                alt="Sueli Custódio palestrando em evento corporativo sobre autoestima"
                loading="lazy"
              />
              <p className="text-sm text-ink-500 mt-3 text-center">
                Palestra corporativa sobre autoestima inabalável
              </p>
            </div>

            {/* Photo 3 */}
            <div>
              <img 
                className="rounded-2xl aspect-square object-cover shadow-soft hover:shadow-card transition-smooth w-full" 
                src={groupMentoring} 
                alt="Mentoria em grupo via Zoom com participantes engajadas"
                loading="lazy"
              />
              <p className="text-sm text-ink-500 mt-3 text-center">
                Mentoria em grupo
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Problem → Solution - Side-by-Side Minimal Cards */}
      <Section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 grid xl:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Problem Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-soft">
            <h2 className="font-playfair text-3xl text-ink-900 mb-6">
              O desafio emocional
            </h2>
            <p className="text-lg text-ink-700 leading-[1.8] mb-8">
              Ambientes de alta pressão, especialmente na área da saúde, ampliam ansiedade, estresse e insônia. Isso corrói autoestima e desempenho.
            </p>
            <ul className="space-y-4 text-ink-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-500 mt-1">•</span>
                <span className="text-lg leading-relaxed">Ansiedade e estresse crônicos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 mt-1">•</span>
                <span className="text-lg leading-relaxed">Insônia e exaustão</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 mt-1">•</span>
                <span className="text-lg leading-relaxed">Autocrítica e baixa autoestima</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-soft border-2 border-brand-200 relative">
            <Sunrise className="w-8 h-8 text-brand-400 opacity-40 absolute top-8 right-8" />
            <h3 className="font-playfair text-3xl text-ink-900 mb-6">
              Existe solução
            </h3>
            <p className="text-lg text-ink-700 leading-[1.8] mb-8">
              A autoestima é base de emoções saudáveis. Com técnicas de ressignificação, é possível recuperar identidade, foco e bem-estar.
            </p>
            <Button 
              className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transition-smooth w-full sm:w-auto"
              onClick={() => scrollToId('servicos')}
            >
              Quero fortalecer meu emocional
            </Button>
          </div>
        </div>
      </Section>

      {/* Services - Light Background, Minimal Cards */}
      <Section id="servicos" className="bg-brand-50 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl text-ink-900 mb-4">
              Personalize sua jornada
            </h2>
            <p className="text-xl text-ink-700">
              Escolha o formato que melhor se adapta a você.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((s, i) => {
              const IconComponent = s.icon;
              return (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-smooth">
                  <img className={`w-full aspect-[16/10] object-cover ${s.objectPosition}`} src={s.img} alt={s.alt} loading="lazy" />
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start gap-3 mb-3">
                      <IconComponent className="w-6 h-6 text-brand-400 opacity-60 mt-1" />
                      <h3 className="font-playfair text-2xl text-ink-900">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-lg text-ink-700 leading-[1.8]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Button 
              className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transition-smooth w-full sm:w-auto"
              onClick={() => {
                track('cta_services_start');
                scrollToId('contato');
              }}
            >
              Quero começar meu processo
            </Button>
          </div>
        </div>
      </Section>

      {/* Featured Talks - Refined Cards */}
      <Section id="palestras" className="bg-paper-50 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <h2 className="font-playfair text-4xl text-center text-ink-900 mb-10">
            Palestras em destaque
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {talks.map((t, i) => (
              <article key={i} className="bg-white rounded-3xl p-10 shadow-soft">
                <h3 className="font-playfair text-2xl text-ink-900 mb-3">
                  {t.title}
                </h3>
                <p className="text-brand-600 italic text-lg mb-6">
                  "{t.tagline}"
                </p>
                <p className="text-ink-700 leading-[1.8]">
                  {t.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-brand-200/30">
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <span className="flex items-center gap-2 text-ink-700">
                <Clock className="w-5 h-5 text-brand-500" />
                Duração: 1h30
              </span>
              <span className="text-ink-300">|</span>
              <span className="flex items-center gap-2 text-ink-700">
                <Calendar className="w-5 h-5 text-brand-500" />
                Atendimento: a combinar
              </span>
              <span className="text-ink-300">|</span>
              <span className="flex items-center gap-2 text-ink-700">
                <MapPin className="w-5 h-5 text-brand-500" />
                Local: presencial ou online
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-ink-700">
            <div className="flex items-start gap-3">
              <span className="text-brand-500 mt-1 text-xl">✓</span>
              <span className="text-lg leading-relaxed">Equipe mais motivada e emocionalmente estável</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-500 mt-1 text-xl">✓</span>
              <span className="text-lg leading-relaxed">Redução do estresse e desgaste emocional</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-500 mt-1 text-xl">✓</span>
              <span className="text-lg leading-relaxed">Melhora nas relações interpessoais</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-500 mt-1 text-xl">✓</span>
              <span className="text-lg leading-relaxed">Fortalecimento de identidade colaboradora</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials - Minimal Cards */}
      <Section id="depoimentos" className="bg-brand-50/30 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h2 className="font-playfair text-4xl text-center text-ink-900 mb-10">
            Depoimentos reais
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft relative">
                <Quote className="w-6 h-6 text-brand-300 opacity-40 absolute top-6 right-6" />
                <h4 className="text-brand-600 font-semibold text-lg mb-4 uppercase tracking-wide">
                  {t.benefit}
                </h4>
                <p className="text-ink-700 leading-[1.8] mb-6">
                  "{t.quote}"
                </p>
                <footer className="font-medium text-brand-600">
                  — {t.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact - Anna Keller Style */}
      <Section id="contato" className="bg-paper-50 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="font-playfair text-4xl text-ink-900 mb-6">
              Vamos conversar?
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed mb-12">
              Envie sua mensagem e eu retorno pessoalmente.
            </p>

            <ul className="space-y-4 sm:space-y-6">
              <li>
                <a 
                  href="mailto:sueliscustodio@gmail.com" 
                  className="flex items-start gap-4 hover:text-brand-600 transition-smooth group"
                  aria-label="Enviar email para Sueli Custódio"
                >
                  <Mail className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0 group-hover:text-brand-600" />
                  <span className="text-ink-700 group-hover:text-brand-600">sueliscustodio@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+5511951701226" 
                  className="flex items-start gap-4 hover:text-brand-600 transition-smooth group"
                  aria-label="Ligar para Sueli Custódio"
                >
                  <Phone className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0 group-hover:text-brand-600" />
                  <span className="text-ink-700 group-hover:text-brand-600">(11) 95170-1226</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/sueli_scustodio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:text-brand-600 transition-smooth group"
                  aria-label="Seguir Sueli Custódio no Instagram"
                >
                  <Instagram className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0 group-hover:text-brand-600" />
                  <span className="text-ink-700 group-hover:text-brand-600">@sueli_scustodio</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@suelicustodio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:text-brand-600 transition-smooth group"
                  aria-label="Inscrever-se no canal do YouTube de Sueli Custódio"
                >
                  <Youtube className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0 group-hover:text-brand-600" />
                  <span className="text-ink-700 group-hover:text-brand-600">Sueli Custódio Inteligência Emocional</span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0" />
                <span className="text-ink-700">São Paulo, Brasil</span>
              </li>
            </ul>
          </div>

          {/* Right: Form (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-soft">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label className="text-ink-700 mb-2 block">Nome</Label>
                <Input 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl border-2 border-brand-200 focus:border-brand-500 px-4 py-3 text-base"
                />
              </div>
              <div>
                <Label className="text-ink-700 mb-2 block">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-xl border-2 border-brand-200 focus:border-brand-500 px-4 py-3 text-base"
                />
              </div>
              <div>
                <Label className="text-ink-700 mb-2 block">Mensagem</Label>
                <Textarea 
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="rounded-xl border-2 border-brand-200 focus:border-brand-500 px-4 py-3 text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-full bg-brand-500 hover:bg-brand-600 text-white py-6 text-lg transition-smooth"
              >
                Enviar mensagem
              </Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer - Minimal */}
      <footer className="bg-white border-t border-brand-200 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 text-center">
          <nav className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8">
            <a href="#sobre" className="text-ink-700 hover:text-brand-600 transition-smooth">
              Sobre
            </a>
            <a href="#servicos" className="text-ink-700 hover:text-brand-600 transition-smooth">
              Serviços
            </a>
            <a href="#depoimentos" className="text-ink-700 hover:text-brand-600 transition-smooth">
              Depoimentos
            </a>
            <a href="#contato" className="text-ink-700 hover:text-brand-600 transition-smooth">
              Contato
            </a>
          </nav>
          <p className="text-ink-500">
            © 2025 Sueli Custódio — Coach e Mentora de Desenvolvimento Emocional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
