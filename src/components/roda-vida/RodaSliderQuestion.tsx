import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
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
  const [value, setValue] = useState(5);

  const topic = TOPICS[current];
  const progress = ((current + 1) / TOPICS.length) * 100;

  const handleNext = () => {
    const updated = { ...scores, [topic]: value };
    setScores(updated);

    if (current < TOPICS.length - 1) {
      setCurrent(current + 1);
      setValue(updated[TOPICS[current + 1]] ?? 5);
    } else {
      onComplete(updated);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      const prev = current - 1;
      setCurrent(prev);
      setValue(scores[TOPICS[prev]] ?? 5);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-ink-500 mt-2 text-center">
          {current + 1} de {TOPICS.length}
        </p>
      </div>

      {/* Question */}
      <div className="text-center mb-10 animate-in fade-in duration-300" key={current}>
        <h3 className="text-2xl font-playfair text-ink-900 mb-2">{topic}</h3>
        <p className="text-sm text-ink-500">Como você avalia essa área hoje?</p>
      </div>

      {/* Slider */}
      <div className="mb-6 px-2">
        <Slider
          value={[value]}
          onValueChange={(v) => setValue(v[0])}
          min={0}
          max={10}
          step={1}
          className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:border-brand-500 [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-md [&_.bg-primary]:bg-brand-500 [&_.bg-secondary]:bg-brand-100"
        />
        <div className="flex justify-between mt-2 text-xs text-ink-500">
          <span>0</span>
          <span className="text-2xl font-playfair text-brand-600 font-bold">{value}</span>
          <span>10</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {current > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 h-12 rounded-xl border-brand-200"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="flex-1 h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white"
        >
          {current === TOPICS.length - 1 ? 'Ver minha Roda' : 'Próximo'}
          {current < TOPICS.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};
