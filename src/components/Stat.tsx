interface StatProps {
  value: string;
  label: string;
}

export const Stat = ({ value, label }: StatProps) => {
  return (
    <div className="rounded-lg border border-brand-200 p-4 bg-paper-50">
      <div className="text-3xl font-playfair text-brand-600">{value}</div>
      <div className="text-sm text-ink-700 mt-1">{label}</div>
    </div>
  );
};
