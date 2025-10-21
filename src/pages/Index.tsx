import { useState } from 'react';
import { Section } from '@/components/Section';
import { Stat } from '@/components/Stat';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { track, scrollToId } from '@/lib/analytics';
import { Quote, Mail, Phone, Instagram, Youtube, MapPin } from 'lucide-react';

import sueliPortrait from '@/assets/sueli-portrait.jpg';
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
    { name: "Letícia", quote: "Aprendi a cuidar da minha saúde emocional com a mesma dedicação que cuido dos pacientes." }
  ];

  return (
    <div className="min-h-screen bg-paper-50 font-inter">
      {/* Header/Hero */}
      <header className="relative">
        <div 
          className="h-24 md:h-28 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroHills})` }}
        />

        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="bg-paper-50 -mt-10 rounded-soft shadow-card p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left: headline */}
              <div>
                <p className="text-brand-500 font-semibold tracking-wide">Sueli Custódio</p>
                <h1 className="font-playfair text-3xl md:text-4xl leading-tight mt-2 text-ink-900">
                  Redescubra o poder da sua mente e a força da sua identidade.
                </h1>
                <p className="text-ink-700 mt-3">
                  Terapia emocional, coaching e mentoria para restaurar autoestima e propósito.
                </p>
                <Button 
                  className="mt-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white"
                  onClick={() => {
                    track('cta_hero_book');
                    scrollToId('contato');
                  }}
                >
                  Agende sua sessão
                </Button>
              </div>

              {/* Center: photo */}
              <div className="order-first md:order-none">
                <img 
                  src={sueliPortrait} 
                  alt="Foto de Sueli Custódio sorrindo" 
                  className="rounded-xl w-full object-cover aspect-[3/4]" 
                />
              </div>

              {/* Right: stats */}
              <div className="space-y-5">
                <Stat value="500+" label="mulheres transformadas" />
                <Stat value="87%" label="relatam melhora significativa em autoestima" />
                <Stat value="13+" label="anos de experiência" />
                <button 
                  className="text-brand-600 underline underline-offset-4 text-sm hover:text-brand-700"
                  onClick={() => scrollToId('depoimentos')}
                >
                  Veja depoimentos reais
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <Section id="sobre">
        <div className="mx-auto max-w-3xl bg-white rounded-soft shadow-card p-8 text-center relative">
          <Quote className="absolute -top-4 left-6 w-8 text-brand-200" />
          <p className="text-lg text-ink-700 leading-relaxed">
            Sou Sueli Custódio, Coach, Mentora e Palestrante especializada em desenvolvimento emocional e ressignificação mental.
            Há mais de 13 anos ajudo mulheres a superarem traumas, curarem feridas emocionais e reconstruírem sua identidade.
            Minha missão é: ressignificar mentes, curar emoções e fortalecer vidas. Atendo presencialmente e online, individual e em grupo.
          </p>
          <Quote className="absolute -bottom-4 right-6 w-8 text-brand-200 rotate-180" />
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 px-4">
          <img 
            className="rounded-xl aspect-video object-cover" 
            src={session1} 
            alt="Sueli em atendimento individual" 
          />
          <img 
            className="rounded-xl aspect-video object-cover" 
            src={groupMentoring} 
            alt="Mentoria em grupo" 
          />
          <img 
            className="rounded-xl aspect-video object-cover" 
            src={talkStage} 
            alt="Sueli palestrando" 
          />
        </div>
      </Section>

      {/* Problem → Solution */}
      <Section className="bg-paper-100">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-playfair text-2xl text-ink-900">O desafio emocional</h2>
            <p className="mt-3 text-ink-700">
              Ambientes de alta pressão (especialmente saúde) ampliam ansiedade, estresse, insônia, 
              sentimento de não reconhecimento e depressão. Isso corrói autoestima e desempenho.
            </p>
            <ul className="mt-4 space-y-2 text-ink-700 list-disc pl-5">
              <li>Ansiedade e estresse crônicos</li>
              <li>Insônia e exaustão</li>
              <li>Autocrítica e baixa autoestima</li>
            </ul>
          </div>
          <div className="bg-white rounded-soft shadow-card p-6">
            <h3 className="font-playfair text-xl text-ink-900">Existe solução</h3>
            <p className="mt-2 text-ink-700">
              Autoestima é base de emoções saudáveis. Com métodos práticos de ressignificação, 
              é possível recuperar identidade, foco e bem-estar.
            </p>
            <Button 
              className="mt-5 rounded-full bg-brand-500 hover:bg-brand-600 text-white"
              onClick={() => scrollToId('servicos')}
            >
              Quero fortalecer meu emocional
            </Button>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section id="servicos" className="relative bg-brand-700 text-white">
        <div 
          className="absolute inset-0 opacity-10 bg-cover" 
          style={{ backgroundImage: `url(${leavesPattern})` }}
        />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl mb-2">Personalize sua jornada</h2>
          <p className="text-white/90 mb-8">Escolha o formato que melhor se adapta a você.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white text-ink-900 rounded-soft p-6 shadow-card">
                <img className="rounded-lg aspect-video object-cover mb-4" src={s.img} alt={s.alt} />
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-ink-700 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-3"
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

      {/* Featured Talks */}
      <Section>
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl mb-8 text-ink-900">Palestras em destaque</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {talks.map((t, i) => (
              <article key={i} className="bg-white rounded-soft shadow-card p-6">
                <h3 className="text-xl font-semibold text-ink-900">{t.title}</h3>
                <p className="text-ink-700 italic">"{t.tagline}"</p>
                <p className="mt-3 text-ink-700">{t.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-ink-700">
            <Badge>Duração: 1h30</Badge>
            <Badge>Atendimento: a combinar</Badge>
            <Badge>Local: presencial ou online</Badge>
          </div>

          <ul className="mt-6 grid md:grid-cols-2 gap-2 text-ink-700 list-disc pl-6">
            <li>Equipe mais motivada e emocionalmente estável</li>
            <li>Redução do estresse e desgaste emocional</li>
            <li>Melhora nas relações interpessoais</li>
            <li>Fortalecimento de identidade colaboradora</li>
          </ul>
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="depoimentos" className="bg-paper-100">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <h2 className="font-playfair text-2xl text-center mb-6 text-ink-900">Depoimentos reais</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-soft p-6 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div className="font-medium text-ink-900">{t.name}</div>
                </div>
                <p className="text-ink-700">"{t.quote}"</p>
              </blockquote>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contato">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="font-playfair text-2xl text-ink-900">Vamos conversar?</h2>
            <p className="mt-2 text-ink-700">Envie sua mensagem e eu retorno pessoalmente.</p>

            <ul className="mt-6 space-y-3 text-ink-700">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-500" />
                sueliscustodio@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-500" />
                (11) 95170-1226
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-brand-500" />
                @sueli_scustodio
              </li>
              <li className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-brand-500" />
                Sueli Custódio Inteligência Emocional
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-500" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-soft shadow-card overflow-hidden">
            <img 
              src={windowFlowers} 
              alt="Janela clara com flores em vaso" 
              className="w-full h-40 object-cover"
            />
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-1"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-full bg-brand-500 hover:bg-brand-600 text-white"
              >
                Enviar mensagem
              </Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-brand-100 py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-center">
          <nav className="space-x-6 text-sm">
            <a href="#sobre" className="text-ink-700 hover:text-brand-600">Sobre</a>
            <a href="#servicos" className="text-ink-700 hover:text-brand-600">Serviços</a>
            <a href="#depoimentos" className="text-ink-700 hover:text-brand-600">Depoimentos</a>
            <a href="#contato" className="text-ink-700 hover:text-brand-600">Contato</a>
          </nav>
          <p className="mt-4 text-sm text-ink-500">
            © 2025 Sueli Custódio — Coach e Mentora de Desenvolvimento Emocional. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
