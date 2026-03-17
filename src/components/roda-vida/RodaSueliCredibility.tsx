import sueliImg from '@/assets/sueli-portrait-warm.jpg';

const stats = [
  { value: '20+', label: 'anos de experiência' },
  { value: '500+', label: 'mulheres acompanhadas' },
  { value: '12', label: 'áreas da inteligência relacional' },
];

export const RodaSueliCredibility = () => (
  <div className="max-w-3xl mx-auto px-4">
    <div className="text-center mb-6 space-y-2">
      <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900">
        Quem vai te acompanhar nessa jornada
      </h2>
      <div className="w-16 h-px bg-brand-300 mx-auto" />
    </div>

    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      {/* Photo */}
      <div className="shrink-0">
        <img
          src={sueliImg}
          alt="Mentora Sueli Custódio"
          className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-card"
        />
      </div>

      {/* Bio */}
      <div className="space-y-3 text-center md:text-left">
        <h3 className="text-2xl font-playfair text-ink-900 mb-0">
          Sueli Custódio
        </h3>
        <p className="text-brand-600 text-sm font-medium uppercase tracking-wide">
          Mentora em Inteligência Relacional
        </p>
        <p className="text-ink-700 text-sm leading-relaxed">
          Há mais de 20 anos acompanhando mulheres em momentos de transição emocional, Sueli desenvolveu
          uma metodologia própria baseada na <strong>Inteligência Relacional</strong> — a capacidade de
          compreender, reorganizar e transformar a forma como nos relacionamos conosco mesmas e com quem
          está ao nosso redor.
        </p>
        <p className="text-ink-700 text-sm leading-relaxed">
          Seu trabalho combina escuta ativa profunda, ferramentas práticas de reorganização emocional e
          um olhar acolhedor que respeita o ritmo de cada mulher. Não é terapia — é mentoria com
          direcionamento, clareza e ação.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-brand-100">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-2xl sm:text-3xl font-playfair text-brand-600 font-bold">
            {stat.value}
          </p>
          <p className="text-xs text-ink-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* Testimonial */}
    <blockquote className="mt-6 border-l-4 border-brand-300 pl-4 py-2">
      <p className="text-ink-700 text-sm italic leading-relaxed">
        "A Sueli me ajudou a enxergar padrões que eu repetia há anos sem perceber.
        Em poucas sessões, eu já sentia uma clareza que nunca tive antes sobre meus
        relacionamentos e sobre mim mesma."
      </p>
      <footer className="text-xs text-ink-500 mt-2">— Participante da Mentoria Relacional</footer>
    </blockquote>
  </div>
);
