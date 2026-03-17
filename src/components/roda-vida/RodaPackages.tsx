import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle } from 'lucide-react';

const packages = [
  {
    title: 'Pacote Essencial',
    sessions: '4 Sessões',
    price: 'R$ 497',
    items: [
      'Entender os pontos principais da sua roda emocional',
      'Identificar padrões de desgaste emocional',
      'Iniciar mudanças práticas no dia a dia',
    ],
  },
  {
    title: 'Pacote Transformação',
    sessions: '8 Sessões',
    price: 'R$ 897',
    items: [
      'Trabalhar bloqueios emocionais',
      'Fortalecer sua identidade emocional',
      'Aprender novas formas de lidar com conflitos',
    ],
    featured: true,
  },
  {
    title: 'Pacote Reconstrução',
    sessions: '16 Sessões',
    price: 'R$ 1.497',
    items: [
      'Reconstruir sua base emocional',
      'Restaurar autoestima e força interior',
      'Criar uma nova direção para sua vida',
    ],
  },
];

interface Props {
  onWhatsAppClick?: () => void;
}

export const RodaPackages = ({ onWhatsAppClick }: Props) => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="text-center mb-6 space-y-2">
      <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900">
        Transforme consciência em mudança real
      </h2>
      <div className="w-16 h-px bg-brand-300 mx-auto" />
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      {packages.map((pkg) => (
        <Card
          key={pkg.title}
          className={`rounded-2xl transition-shadow hover:shadow-md flex flex-col ${
            pkg.featured
              ? 'border-brand-400 shadow-md ring-2 ring-brand-200'
              : 'border-border shadow-sm'
          }`}
        >
          <CardHeader className="text-center pb-1 pt-5">
            <CardTitle className="text-lg font-playfair text-ink-900">{pkg.title}</CardTitle>
            <p className="text-brand-600 font-semibold text-sm">{pkg.sessions}</p>
            <p className="text-2xl font-bold text-ink-900 mt-2">{pkg.price}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col pt-3">
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
                className="w-full rounded-xl mt-2 bg-green-600 hover:bg-green-700 text-white"
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
