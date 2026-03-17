import sueliImg from '@/assets/sueli-portrait-warm.jpg';

const stats = [
  { icon: '✦', value: '20+', label: 'anos de experiência' },
  { icon: '✦', value: '500+', label: 'mulheres acompanhadas' },
  { icon: '✦', value: '12', label: 'áreas da inteligência relacional' },
];

export const RodaSueliCredibility = () => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
      {/* Left — Photo with decorative accent */}
      <div className="md:col-span-2 flex justify-center">
        <div className="relative">
          {/* Gradient blob behind photo */}
          <div className="absolute -inset-4 bg-gradient-to-br from-brand-100 to-transparent rounded-3xl opacity-60" />
          <img
            src={sueliImg}
            alt="Mentora Sueli Custódio"
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl object-cover ring-4 ring-brand-200 ring-offset-4 ring-offset-background shadow-card"
          />
        </div>
      </div>

      {/* Right — Content */}
      <div className="md:col-span-3 space-y-5 text-center md:text-left">
        <div>
          <h3 className="text-3xl md:text-4xl font-playfair text-ink-900 leading-tight">
            Sueli Custódio
          </h3>
          <p className="text-brand-600 text-sm font-medium uppercase tracking-[0.2em] mt-1">
            Mentora em Inteligência Relacional
          </p>
          <div className="w-16 h-px bg-brand-300 mt-3 mx-auto md:mx-0" />
        </div>

        {/* Stats as pills */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {stats.map((stat) => (
            <span
              key={stat.label}
              className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5 text-xs text-ink-700"
            >
              <span className="text-brand-500">{stat.icon}</span>
              <strong className="font-semibold">{stat.value}</strong> {stat.label}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-10 h-px bg-brand-200 mx-auto md:mx-0" />

        {/* Bio */}
        <p className="text-ink-700 text-sm md:text-base leading-[1.8] max-w-lg mx-auto md:mx-0">
          Há mais de 20 anos acompanhando mulheres em momentos de transição emocional, Sueli desenvolveu
          uma metodologia própria baseada na <strong className="text-ink-900">Inteligência Relacional</strong> — a capacidade de
          compreender, reorganizar e transformar a forma como nos relacionamos conosco mesmas e com quem
          está ao nosso redor.
        </p>
      </div>
    </div>

    {/* Testimonial — centered below */}
    <div className="mt-10 md:mt-14 text-center max-w-2xl mx-auto">
      <span className="block font-playfair text-6xl text-brand-300 leading-none select-none">"</span>
      <p className="text-ink-700 text-base md:text-lg italic leading-relaxed -mt-4">
        A Sueli me ajudou a enxergar padrões que eu repetia há anos sem perceber.
        Em poucas sessões, eu já sentia uma clareza que nunca tive antes.
      </p>
      <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest">
        — Participante da Mentoria
      </p>
    </div>
  </div>
);
