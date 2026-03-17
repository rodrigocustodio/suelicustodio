import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle } from 'lucide-react';

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

interface Props {
  onWhatsAppClick?: () => void;
}

export const RodaPackages = ({ onWhatsAppClick }: Props) => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="text-center mb-8 space-y-3">
      <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900">
        Transforme consciência em mudança real
      </h2>
      <div className="w-16 h-px bg-brand-300 mx-auto" />
      <p className="text-ink-700 max-w-2xl mx-auto leading-relaxed text-sm">
        Agora que você visualizou sua roda emocional, o próximo passo é transformar essa consciência
        em ação com o acompanhamento da Mentora Sueli.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      {packages.map((pkg) => (
        <Card
          key={pkg.title}
          className={`rounded-2xl border transition-shadow hover:shadow-cardHover flex flex-col ${
            pkg.featured
              ? 'border-brand-400 shadow-card ring-2 ring-brand-200'
              : 'border-brand-100 shadow-soft'
          }`}
        >
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-playfair text-ink-900">{pkg.title}</CardTitle>
            <p className="text-brand-600 font-semibold text-sm">{pkg.sessions}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <p className="text-sm/relaxed text-ink-700">{pkg.description}</p>
            <p className="text-xs text-ink-500 font-medium uppercase tracking-wide">
              Nessas sessões você irá:
            </p>
            <ul className="space-y-2 flex-1">
              {pkg.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                  <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {onWhatsAppClick && (
              <Button
                onClick={onWhatsAppClick}
                size="sm"
                className={`w-full rounded-xl mt-2 ${
                  pkg.featured
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-brand-500 hover:bg-brand-600 text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Quero saber mais
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
