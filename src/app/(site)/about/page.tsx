import { AboutPage } from '@/views/AboutPage';
import contentService from '@/lib/content';
import { JsonLd, localBusinessJsonLd } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.about;

export default async function Page() {
  const [siteSettings, aboutPage] = await Promise.all([
    contentService.getSiteSettings(),
    contentService.getAboutPage(),
  ]);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(siteSettings)} />
      <AboutPage content={aboutPage} />
    </>
  );
}
