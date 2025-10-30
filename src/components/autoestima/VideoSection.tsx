import { Play } from 'lucide-react';

interface VideoSectionProps {
  title: string;
  subtitle: string;
}

export const VideoSection = ({ title, subtitle }: VideoSectionProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-ink-900 mb-2">
          {title}
        </h2>
        <p className="text-base text-ink-700">
          {subtitle}
        </p>
      </div>
      
      <div className="relative aspect-video bg-gradient-to-br from-brand-100 to-accent-100 rounded-2xl shadow-soft overflow-hidden group cursor-pointer">
        {/* Placeholder for video - can be replaced with actual embed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-10 h-10 text-brand-600 ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Optional: Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-brand-200 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
