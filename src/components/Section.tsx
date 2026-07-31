import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
  noPadding?: boolean;
}

export function Section({
  children,
  className = '',
  background = 'white',
  noPadding = false
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    dark: 'bg-neutral-900 text-white'
  };

  const padding = noPadding ? '' : 'py-16 md:py-24';

  return (
    <section className={`${backgrounds[background]} ${padding} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
