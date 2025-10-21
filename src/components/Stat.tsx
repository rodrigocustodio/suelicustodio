interface StatProps {
  value: string;
  label: string;
}

export const Stat = ({ value, label }: StatProps) => {
  return (
    <div>
      <div className="text-5xl font-playfair text-brand-600 mb-2">{value}</div>
      <p className="text-ink-700 leading-relaxed">{label}</p>
    </div>
  );
};
