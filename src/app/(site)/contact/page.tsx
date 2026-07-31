import { ContactPage } from '@/views/ContactPage';
import contentService from '@/lib/content';
import { JsonLd, localBusinessJsonLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.contact;

export default async function Page() {
  const siteSettings = await contentService.getSiteSettings();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(siteSettings)} />
      <ContactPage />
    </>
  );
}
