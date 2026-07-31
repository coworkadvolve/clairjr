'use client';

import { useEffect } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { Button } from './Button';
import { handleCatalogueDownload } from '../lib/catalogues';
import type { Catalogue } from '@/lib/content-types';

interface CataloguePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowseFull?: () => void;
  catalogues: Catalogue[];
}

export function CataloguePopup({ isOpen, onClose, onBrowseFull, catalogues }: CataloguePopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        <div className="flex-shrink-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Download Catalogues</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Choose a catalogue to download or view online
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-neutral-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {catalogues.length === 0 ? (
            <p className="text-center text-neutral-600 py-8">No catalogues available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {catalogues.map((catalogue) => (
                <div
                  key={catalogue.id}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative h-48 bg-neutral-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={catalogue.coverImage}
                      alt={catalogue.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-neutral-900 mb-2">{catalogue.title}</h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {catalogue.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCatalogueDownload(catalogue.filePath, catalogue.fileName)}
                        className="flex items-center gap-2"
                      >
                        <Download size={16} />
                        Download
                      </Button>
                      <a
                        href={catalogue.viewUrl ?? catalogue.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-600 hover:text-brand-orange transition-colors font-medium text-sm"
                      >
                        <FileText size={16} />
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 border-t border-neutral-200 px-6 py-4 flex items-center justify-between bg-neutral-50">
          <p className="text-sm text-neutral-600">
            Need more options? Browse our full catalogue page.
          </p>
          {onBrowseFull && (
            <Button variant="outline" size="sm" onClick={onBrowseFull}>
              Browse Full Catalogue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
