import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export const Badge = ({ children }: BadgeProps) => {
  return (
    <div className="inline-flex items-center rounded-full bg-brand-100 px-4 py-2 text-sm text-ink-700">
      {children}
    </div>
  );
};
