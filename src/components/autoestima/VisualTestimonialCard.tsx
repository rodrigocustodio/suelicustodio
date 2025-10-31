interface VisualTestimonialCardProps {
  image: string;
  label: string;
  alt: string;
}

export const VisualTestimonialCard = ({ image, label, alt }: VisualTestimonialCardProps) => {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft group cursor-pointer">
      <img 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-brand-900/50"></div>
      
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-6 md:p-8 pb-8 md:pb-10">
        <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide text-center">
          {label}
        </h3>
      </div>
    </div>
  );
};
