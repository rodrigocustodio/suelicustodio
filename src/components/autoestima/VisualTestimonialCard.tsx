interface VisualTestimonialCardProps {
  image: string;
  label: string;
  alt: string;
}

export const VisualTestimonialCard = ({ image, label, alt }: VisualTestimonialCardProps) => {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft group cursor-pointer">
      <img 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/40 to-transparent"></div>
      
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
          {label}
        </h3>
      </div>
    </div>
  );
};
