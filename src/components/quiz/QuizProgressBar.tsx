interface QuizProgressBarProps {
  current: number;
  total: number;
}

export const QuizProgressBar = ({ current, total }: QuizProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
