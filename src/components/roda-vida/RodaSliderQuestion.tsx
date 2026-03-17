import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const TOPICS = [
  'Energia emocional',
  'Peso mental',
  'Ser ouvida',
  'Relacionamento conjugal',
  'Carga de responsabilidades',
  'Alegria no dia a dia',
  'Pensamentos repetitivos',
  'Sentimento de solidão',
  'Tempo para si mesma',
  'Esperança no relacionamento',
  'Reconhecimento',
  'Força interior',
];

export { TOPICS };

interface Props {
  onComplete: (scores: Record<string, number>) => void;
}

export const RodaSliderQuestion = ({ onComplete }: Props) => {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [value, setValue] = useState<number | null>(null);

  const topic = TOPICS[current];
  const progress = ((current + 1) / TOPICS.length) * 100;

  const handleNext = () => {
    if (value === null) return;
    const updated = { ...scores, [topic]: value };
    setScores(updated);

    if (current < TOPICS.length - 1) {
      setCurrent(current + 1);
      setValue(updated[TOPICS[current + 1]] ?? null);
    } else {
      onComplete(updated);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      const prev = current - 1;
      setCurrent(prev);
      setValue(scores[TOPICS[prev]] ?? null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Card wrapper */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-5 sm:p-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-ink-500 mt-2 text-center tracking-wide uppercase">
            Pergunta {current + 1} de {TOPICS.length}
          </p>
        </div>

        {/* Question */}
        <div className="text-center mb-8 animate-in fade-in duration-300" key={current}>
          <h3 className="text-2xl sm:text-3xl font-playfair text-ink-900 mb-2">{topic}</h3>
          <div className="w-12 h-px bg-brand-300 mx-auto my-3" />
          <p className="text-sm text-ink-500">Qual nota você daria para essa área hoje?</p>
        </div>

        {/* Number buttons grid */}
        <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-8">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setValue(i)}
              className={`
                h-11 sm:h-12 rounded-xl text-sm sm:text-base font-medium
                border transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1
                ${i === 5 ? 'col-start-1 sm:col-start-auto' : ''}
                ${
                  value === i
                    ? 'bg-brand-500 text-white border-brand-500 shadow-md scale-105'
                    : 'bg-paper-50 text-ink-700 border-brand-200 hover:border-brand-400 hover:bg-brand-50'
                }
              `}
            >
              {i}
            </button>
          ))}
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-xs text-ink-500 mb-8 px-1">
          <span>Muito baixo</span>
          <span>Muito alto</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-brand-100 mb-6" />

        {/* Navigation */}
        <div className="flex gap-3">
          {current > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 h-12 rounded-xl border-brand-200 text-ink-700 hover:bg-brand-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={value === null}
            className="flex-1 h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {current === TOPICS.length - 1 ? 'Ver minha Roda' : 'Próximo'}
            {current < TOPICS.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
