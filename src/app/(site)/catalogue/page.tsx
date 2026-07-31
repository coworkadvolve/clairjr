import { CataloguePage } from '@/views/CataloguePage';
import contentService from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.catalogue;

export default async function Page() {
  const catalogues = await contentService.getCatalogues();

  return <CataloguePage catalogues={catalogues} />;
}
