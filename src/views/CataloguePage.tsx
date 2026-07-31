'use client';

import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { handleCatalogueDownload } from '../lib/catalogues';
import { routes } from '@/lib/routes';
import type { Catalogue } from '@/lib/content-types';

interface CataloguePageProps {
  catalogues: Catalogue[];
}

export function CataloguePage({ catalogues }: CataloguePageProps) {
  return (
    <div>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Download Catalogues</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Access our comprehensive product catalogues and company information. Download PDF documents to explore our complete range of lighting solutions.
          </p>
        </div>
      </section>

      <Section background="gray">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {catalogues.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-neutral-200">
              <p className="text-neutral-600 text-lg">No catalogues available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {catalogues.map((catalogue) => (
                <div
                  key={catalogue.id}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-80 bg-neutral-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={catalogue.coverImage}
                      alt={catalogue.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      {catalogue.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {catalogue.description}
                    </p>

                    <div className="flex items-center gap-4 pt-6 border-t border-neutral-200">
                      <Button
                        variant="primary"
                        onClick={() => handleCatalogueDownload(catalogue.filePath, catalogue.fileName)}
                        className="flex items-center gap-2"
                      >
                        <Download size={20} />
                        Download PDF
                      </Button>
                      <a
                        href={catalogue.viewUrl ?? catalogue.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-600 hover:text-brand-orange transition-colors font-medium"
                      >
                        <FileText size={20} />
                        View Online
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section background="white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900">
                Need More Information?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our team is ready to provide detailed product information, custom solutions, and technical support.
                Contact us for personalized assistance with your lighting requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={routes.contact}>
                  <Button variant="primary" size="lg">
                    Contact Us
                  </Button>
                </Link>
                <Link href={routes.products}>
                  <Button variant="outline" size="lg">
                    View Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
