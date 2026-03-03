import type { QuizQuestion as QuizQuestionType } from '@/lib/quiz-data';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer?: string;
  onSelect: (questionId: number, value: string) => void;
}

export const QuizQuestion = ({ question, selectedAnswer, onSelect }: QuizQuestionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <p className="text-xs font-inter uppercase tracking-widest text-brand-500 mb-4">
        Pergunta {question.id} de 9
      </p>
      <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 text-center mb-8 leading-snug max-w-lg">
        {question.text}
      </h2>
      <div className="w-full max-w-md space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(question.id, option.value)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-inter text-base
              ${selectedAnswer === option.value
                ? 'border-brand-500 bg-brand-50 text-ink-900'
                : 'border-brand-100 bg-white text-ink-700 hover:border-brand-300 active:bg-brand-50'
              }`}
          >
            <span className="font-semibold text-brand-600 mr-2">{option.label}.</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};
