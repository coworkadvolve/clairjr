import type { Catalogue } from '@/lib/content-types';

export type { Catalogue } from '@/lib/content-types';

export function handleCatalogueDownload(filePath: string, fileName: string) {
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    window.open(filePath, '_blank');
  } else {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function sortCatalogues(catalogues: Catalogue[]): Catalogue[] {
  return [...catalogues].sort((a, b) => a.display_order - b.display_order);
}
