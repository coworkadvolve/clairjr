import { ReactNode } from 'react';
import { Section } from './Section';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-neutral-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <Section background="white">
        <article className="max-w-4xl mx-auto legal-prose">{children}</article>
      </Section>
    </div>
  );
}
