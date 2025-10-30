import { Play } from 'lucide-react';

interface VideoSectionProps {
  title: string;
  subtitle: string;
  videoId: string;
}

export const VideoSection = ({ title, subtitle, videoId }: VideoSectionProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-900 mb-2">
          {title}
        </h2>
        <p className="text-base text-ink-700">
          {subtitle}
        </p>
      </div>
      
      <div className="relative aspect-video rounded-2xl shadow-soft overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
