import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const packages = [
  {
    title: 'Pacote Essencial',
    sessions: '4 Sessões',
    description:
      'Ideal para quem deseja começar a organizar emoções e ganhar clareza sobre o momento atual da vida.',
    items: [
      'Entender os pontos principais da sua roda emocional',
      'Identificar padrões de desgaste emocional',
      'Iniciar mudanças práticas no dia a dia',
    ],
  },
  {
    title: 'Pacote Transformação',
    sessions: '8 Sessões',
    description:
      'Para quem deseja aprofundar o processo e construir mudanças mais consistentes na vida emocional e relacional.',
    items: [
      'Trabalhar bloqueios emocionais',
      'Fortalecer sua identidade emocional',
      'Aprender novas formas de lidar com conflitos e sobrecarga',
    ],
    featured: true,
  },
  {
    title: 'Pacote Reconstrução',
    sessions: '16 Sessões',
    description:
      'Um processo profundo de reorganização emocional e relacional. Indicado para quem sente que precisa de uma mudança real na forma de viver e se relacionar.',
    items: [
      'Reconstruir sua base emocional',
      'Restaurar autoestima e força interior',
      'Criar uma nova direção para sua vida e relacionamentos',
    ],
  },
];

export const RodaPackages = () => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="text-center mb-10 space-y-4">
      <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900">
        Transforme consciência em mudança real
      </h2>
      <p className="text-ink-700 max-w-2xl mx-auto leading-relaxed">
        Agora que você visualizou sua roda emocional, talvez tenha percebido áreas da sua vida que precisam
        de mais equilíbrio, apoio ou clareza.
      </p>
      <p className="text-ink-700 max-w-2xl mx-auto leading-relaxed">
        Muitas mulheres vivem sobrecarregadas emocionalmente sem perceber que é possível reorganizar a vida
        com mais leveza e direção.
      </p>
      <p className="text-ink-700 max-w-2xl mx-auto leading-relaxed">
        Nas sessões com a Mentora Sueli Custódio, você terá um espaço seguro para compreender sua história,
        reorganizar emoções e construir um caminho de relacionamento mais saudável consigo mesma e com quem
        está ao seu redor.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <Card
          key={pkg.title}
          className={`rounded-2xl border transition-shadow hover:shadow-cardHover ${
            pkg.featured
              ? 'border-brand-400 shadow-card ring-2 ring-brand-200'
              : 'border-brand-100 shadow-soft'
          }`}
        >
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-playfair text-ink-900">{pkg.title}</CardTitle>
            <p className="text-brand-600 font-semibold text-sm">{pkg.sessions}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-ink-700 leading-relaxed">{pkg.description}</p>
            <p className="text-xs text-ink-500 font-medium uppercase tracking-wide">
              Nessas sessões você irá:
            </p>
            <ul className="space-y-2">
              {pkg.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                  <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
