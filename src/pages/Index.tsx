import { useState } from 'react';
import { Section } from '@/components/Section';
import { Stat } from '@/components/Stat';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { track, scrollToId } from '@/lib/analytics';
import { Mail, Phone, Instagram, Youtube, MapPin } from 'lucide-react';

import sueliPortrait from '@/assets/sueli-professional.jpg';
import heroHills from '@/assets/hero-hills.jpg';
import session1 from '@/assets/session-1.jpg';
import groupMentoring from '@/assets/group-mentoring.jpg';
import talkStage from '@/assets/talk-stage.jpg';
import windowFlowers from '@/assets/window-flowers.jpg';
import sunsetReflection from '@/assets/sunset-reflection.jpg';
import leavesPattern from '@/assets/leaves-pattern.svg';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
      img: talkStage,
      alt: "Sueli palestrando em evento corporativo",
      title: "Palestras Interativas e Motivacionais",
      desc: "Técnicas de fortalecimento emocional aplicadas à rotina."
    },
    {
      img: groupMentoring,
      alt: "Mentoria em grupo via Zoom",
      title: "Mentorias em Grupo (Zoom)",
      desc: "Segurança, apoio e evolução contínua."
    },
    {
      img: session1,
      alt: "Atendimento individual em consultório",
      title: "Atendimentos Individuais",
      desc: "Ressignificação mental personalizada."
    },
    {
      img: sunsetReflection,
      alt: "Pessoa em momento de reflexão",
      title: "Cursos e Aulas Gravadas",
      desc: "Aprendizado no seu ritmo, com exercícios práticos."
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
    { name: "Juliana", quote: "A mentoria me ajudou a recuperar minha identidade e confiança. Aprendi a valorizar quem eu sou." },
    { name: "Aline", quote: "Finalmente consegui lidar com a ansiedade que me paralisava. As sessões foram transformadoras." },
    { name: "Jô", quote: "Sueli me ensinou a ressignificar experiências difíceis. Hoje me sinto mais forte e preparada." },
    { name: "Janair", quote: "O trabalho em grupo trouxe acolhimento e aprendizado. Não estou sozinha nessa jornada." },
    { name: "Fátima", quote: "Consegui melhorar minha relação com minha equipe e comigo mesma. Gratidão!" },
    { name: "Doralice", quote: "As palestras inspiram mudanças reais. Saí motivada e com ferramentas práticas." },
    { name: "Letícia", quote: "Aprendi a cuidar da minha saúde emocional com a mesma dedicação que cuido dos pacientes." },
    { name: "Mariana", quote: "As técnicas de ressignificação mudaram minha forma de lidar com conflitos. Hoje me sinto mais equilibrada." },
    { name: "Camila", quote: "O acolhimento e a escuta da Sueli me deram coragem para reconstruir minha autoestima. Sou grata por cada sessão." }
  ];

  return (
    <div className="min-h-screen bg-paper-50 font-inter">
      {/* Header/Hero - Full Height, Anna Keller Style */}
      <header className="relative min-h-screen flex items-center">
        {/* Gradient background with subtle image */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50 via-brand-50/30 to-paper-50">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url(${heroHills})` }}
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-8 py-32 w-full">
          <div className="grid lg:grid-cols-[1fr_400px_1fr] gap-16 items-center">
            {/* Left: Headline */}
            <div className="space-y-6">
              <p className="text-brand-600 font-medium tracking-widest uppercase text-sm">
                Sueli Custódio
              </p>
              <h1 className="font-playfair text-5xl lg:text-6xl leading-[1.15] text-ink-900">
                Redescubra o poder da sua mente e a força da sua identidade.
              </h1>
              <p className="text-xl text-ink-700 leading-relaxed">
                Terapia emocional, coaching e mentoria para restaurar autoestima e propósito.
              </p>
              <Button 
                className="mt-8 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transition-smooth"
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
                <img 
                  src={sueliPortrait} 
                  alt="Foto de Sueli Custódio sorrindo" 
                  className="rounded-3xl w-full aspect-[3/4] object-cover shadow-soft" 
                />
              </div>
            </div>

            {/* Right: Stats - Minimal, No Borders */}
            <div className="space-y-12">
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
      <Section id="sobre" className="bg-paper-50">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="font-playfair text-4xl text-center text-ink-900 mb-16">Quem sou</h2>
          
          {/* Top Section: Featured Portrait + Opening Bio */}
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 mb-16">
            {/* Featured Professional Portrait */}
            <div>
              <img 
                src={sueliPortrait} 
                alt="Sueli Custódio - Coach e Mentora especializada em desenvolvimento emocional" 
                className="rounded-2xl aspect-[3/4] object-cover shadow-card w-full" 
              />
            </div>

            {/* Opening Bio + Credentials */}
            <div className="space-y-6">
              <p className="text-2xl text-ink-900 leading-[1.6] font-medium">
                Sou Sueli Custódio, Coach, Mentora e Palestrante especializada em desenvolvimento emocional e ressignificação mental.
              </p>
              <p className="text-lg text-ink-700 leading-[1.8]">
                Com mais de <span className="font-semibold text-brand-600">13 anos de experiência</span> e formação em <span className="font-semibold">técnicas avançadas de coaching comportamental, programação neurolinguística e inteligência emocional aplicada</span>, dedico-me ao fortalecimento emocional de mulheres que enfrentam ambientes de alta pressão.
              </p>
              <p className="text-lg text-ink-700 leading-[1.8]">
                Meu trabalho é fundamentado em metodologias comprovadas que transformam vidas através da ressignificação mental e do desenvolvimento de uma autoestima sólida e duradoura.
              </p>
            </div>
          </div>

          {/* Pull Quote - Featured Philosophy */}
          <div className="max-w-4xl mx-auto mb-16">
            <blockquote className="border-l-4 border-brand-400 pl-8 py-4">
              <p className="text-2xl text-brand-600 italic leading-[1.8]">
                "Cada mulher possui em si a força necessária para superar traumas e reconstruir sua identidade — meu papel é guiá-la nessa jornada de autodescoberta e fortalecimento."
              </p>
            </blockquote>
          </div>

          {/* Methodology + Impact - Soft Card */}
          <div className="bg-white rounded-3xl p-10 md:p-12 shadow-soft mb-16">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-playfair text-2xl text-ink-900 mb-4">Minha Abordagem</h3>
                <p className="text-lg text-ink-700 leading-[1.8]">
                  Combino técnicas práticas de ressignificação mental com acolhimento genuíno e escuta ativa. Através dessa metodologia integrada, ajudo mulheres a reconectarem-se com seu propósito, estabelecerem limites saudáveis e desenvolverem uma inteligência emocional que as sustenta nos desafios do dia a dia.
                </p>
              </div>
              <div>
                <h3 className="font-playfair text-2xl text-ink-900 mb-4">Impacto & Resultados</h3>
                <p className="text-lg text-ink-700 leading-[1.8]">
                  Ao longo da minha carreira, já transformei a vida de mais de <span className="font-semibold text-brand-600">500 mulheres</span>, especialmente profissionais da área da saúde que lidam diariamente com estresse crônico, ansiedade e esgotamento emocional. Através de mentorias individuais, sessões em grupo e palestras corporativas, crio espaços de transformação real e duradoura.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="text-2xl text-ink-900 leading-[1.8] font-semibold">
              Minha missão é clara: ressignificar mentes, curar emoções e fortalecer vidas.
            </p>
            <p className="text-lg text-ink-700 leading-[1.8] mt-4">
              Seja em atendimentos presenciais em São Paulo ou através de mentorias online, trabalho para que cada mulher redescubra o poder transformador que existe dentro dela.
            </p>
          </div>

          {/* Dynamic Photo Gallery - Redesigned */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Large Featured Image - Spans 2 columns on desktop */}
            <div className="col-span-2">
              <img 
                className="rounded-2xl aspect-[16/9] object-cover shadow-soft hover:shadow-card transition-smooth w-full" 
                src={talkStage} 
                alt="Sueli Custódio palestrando em evento corporativo sobre autoestima" 
              />
              <p className="text-sm text-ink-500 mt-3 text-center">
                Palestra corporativa sobre autoestima inabalável
              </p>
            </div>
            
            {/* Two Smaller Images Stack on Right */}
            <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-6">
              <div>
                <img 
                  className="rounded-2xl aspect-square object-cover shadow-soft hover:shadow-card transition-smooth w-full" 
                  src={session1} 
                  alt="Atendimento individual em consultório" 
                />
                <p className="text-sm text-ink-500 mt-3 text-center">
                  Sessão individual
                </p>
              </div>
              <div>
                <img 
                  className="rounded-2xl aspect-square object-cover shadow-soft hover:shadow-card transition-smooth w-full" 
                  src={groupMentoring} 
                  alt="Mentoria em grupo via Zoom" 
                />
                <p className="text-sm text-ink-500 mt-3 text-center">
                  Mentoria em grupo
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Problem → Solution - Side-by-Side Minimal Cards */}
      <Section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-8 grid lg:grid-cols-2 gap-12">
          {/* Problem Card */}
          <div className="bg-white rounded-3xl p-12 shadow-soft">
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
          <div className="bg-white rounded-3xl p-12 shadow-soft border-2 border-brand-200">
            <h3 className="font-playfair text-3xl text-ink-900 mb-6">
              Existe solução
            </h3>
            <p className="text-lg text-ink-700 leading-[1.8] mb-8">
              A autoestima é base de emoções saudáveis. Com técnicas de ressignificação, é possível recuperar identidade, foco e bem-estar.
            </p>
            <Button 
              className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transition-smooth"
              onClick={() => scrollToId('servicos')}
            >
              Quero fortalecer meu emocional
            </Button>
          </div>
        </div>
      </Section>

      {/* Services - Light Background, Minimal Cards */}
      <Section id="servicos" className="bg-brand-50">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl text-ink-900 mb-4">
              Personalize sua jornada
            </h2>
            <p className="text-xl text-ink-700">
              Escolha o formato que melhor se adapta a você.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-smooth">
                <img className="w-full aspect-[16/10] object-cover" src={s.img} alt={s.alt} />
                <div className="p-10">
                  <h3 className="font-playfair text-2xl text-ink-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-lg text-ink-700 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transition-smooth"
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
      <Section className="bg-paper-50">
        <div className="mx-auto max-w-6xl px-8">
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

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-lg">
            <span className="text-ink-700">Duração: 1h30</span>
            <span className="text-ink-500">•</span>
            <span className="text-ink-700">Atendimento: a combinar</span>
            <span className="text-ink-500">•</span>
            <span className="text-ink-700">Local: presencial ou online</span>
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
      <Section id="depoimentos" className="bg-brand-50/30">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="font-playfair text-4xl text-center text-ink-900 mb-10">
            Depoimentos reais
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-3xl p-8 shadow-soft">
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
      <Section id="contato" className="bg-paper-50">
        <div className="mx-auto max-w-6xl px-8 grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="font-playfair text-4xl text-ink-900 mb-6">
              Vamos conversar?
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed mb-12">
              Envie sua mensagem e eu retorno pessoalmente.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0" />
                <span className="text-ink-700">sueliscustodio@gmail.com</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0" />
                <span className="text-ink-700">(11) 95170-1226</span>
              </li>
              <li className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0" />
                <span className="text-ink-700">@sueli_scustodio</span>
              </li>
              <li className="flex items-start gap-4">
                <Youtube className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0" />
                <span className="text-ink-700">Sueli Custódio Inteligência Emocional</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-500 mt-1 flex-shrink-0" />
                <span className="text-ink-700">São Paulo, Brasil</span>
              </li>
            </ul>
          </div>

          {/* Right: Form (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-10 shadow-soft">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label className="text-ink-700 mb-2 block">Nome</Label>
                <Input 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl border-2 border-brand-200 focus:border-brand-500 px-4 py-3"
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
                  className="rounded-xl border-2 border-brand-200 focus:border-brand-500 px-4 py-3"
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
                  className="rounded-xl border-2 border-brand-200 focus:border-brand-500 px-4 py-3"
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
      <footer className="bg-white border-t border-brand-200 py-16">
        <div className="mx-auto max-w-6xl px-8 text-center">
          <nav className="flex justify-center gap-8 mb-8">
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
