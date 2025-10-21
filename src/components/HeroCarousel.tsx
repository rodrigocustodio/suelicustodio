import { useState, useEffect } from "react";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  interval?: number;
}

export const HeroCarousel = ({ images, interval = 3000 }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <img
      src={images[currentIndex].src}
      alt={images[currentIndex].alt}
      className={`rounded-3xl w-full aspect-[3/4] object-cover shadow-soft transition-opacity duration-300 ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};
