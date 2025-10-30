import { useEffect, useRef } from 'react';

interface VideoSectionProps {
  title: string;
  subtitle: string;
  videoId: string;
  onProgressChange?: (showButton: boolean) => void;
}

export const VideoSection = ({ title, subtitle, videoId, onProgressChange }: VideoSectionProps) => {
  const playerRef = useRef<any>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Load YouTube iframe API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              checkProgress();
            }
          }
        }
      });
    };

    const checkProgress = () => {
      if (playerRef.current && !hasTriggered.current) {
        const interval = setInterval(() => {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          
          if (currentTime && duration) {
            const progress = (currentTime / duration) * 100;
            
            if (progress >= 80 && !hasTriggered.current) {
              hasTriggered.current = true;
              onProgressChange?.(true);
              clearInterval(interval);
            }
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    };
  }, [onProgressChange]);
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
          id="youtube-player"
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
