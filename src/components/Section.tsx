import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = '', id }: SectionProps) => {
  return (
    <section id={id} className={cn('py-12 sm:py-section md:py-sectionLg', className)}>
      {children}
    </section>
  );
};
