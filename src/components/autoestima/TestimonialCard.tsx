import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  quote: string;
  rating: number;
  photo?: string;
}

export const TestimonialCard = ({ name, quote, rating, photo }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-shadow duration-300">
      {/* Photo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-200 to-accent-200 flex items-center justify-center overflow-hidden">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-playfair font-bold text-brand-600">
              {name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      
      {/* Quote */}
      <div className="mb-4">
        <svg className="w-6 h-6 text-brand-300 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-ink-700 leading-relaxed text-sm">
          "{quote}"
        </p>
      </div>
      
      {/* Name and Rating */}
      <div className="border-t border-brand-100 pt-4">
        <p className="font-semibold text-ink-900 mb-2">{name}</p>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
};
