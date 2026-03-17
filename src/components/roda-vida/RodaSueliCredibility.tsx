import sueliImg from '@/assets/sueli-portrait-warm.jpg';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { value: '20+', label: 'anos de experiência' },
  { value: '500+', label: 'mulheres acompanhadas' },
  { value: '12', label: 'áreas da inteligência relacional' },
];

export const RodaSueliCredibility = () => (
  <div className="max-w-4xl mx-auto px-4">
    <Card className="rounded-2xl border-brand-100 shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
          {/* Photo */}
          <img
            src={sueliImg}
            alt="Mentora Sueli Custódio"
            className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover shadow-sm shrink-0"
          />

          {/* Info */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-playfair text-ink-900">Sueli Custódio</h3>
              <p className="text-brand-600 text-sm font-medium uppercase tracking-wide">
                Mentora em Inteligência Relacional
              </p>
            </div>

            {/* Stats inline */}
            <div className="flex justify-center md:justify-start gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-playfair text-brand-600 font-bold">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bio — compact */}
            <p className="text-ink-700 text-sm leading-relaxed">
              Há mais de 20 anos acompanhando mulheres em momentos de transição emocional, Sueli desenvolveu
              uma metodologia própria baseada na <strong>Inteligência Relacional</strong> — a capacidade de
              compreender, reorganizar e transformar a forma como nos relacionamos conosco mesmas e com quem
              está ao nosso redor.
            </p>
          </div>
        </div>

        {/* Testimonial — small */}
        <blockquote className="mt-5 border-l-4 border-brand-300 pl-4 py-1">
          <p className="text-muted-foreground text-xs italic leading-relaxed">
            "A Sueli me ajudou a enxergar padrões que eu repetia há anos sem perceber.
            Em poucas sessões, eu já sentia uma clareza que nunca tive antes."
          </p>
          <footer className="text-[10px] text-muted-foreground mt-1">— Participante da Mentoria</footer>
        </blockquote>
      </CardContent>
    </Card>
  </div>
);
