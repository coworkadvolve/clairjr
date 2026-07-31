import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import contentService from '@/lib/content';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await contentService.getSiteSettings();

  return (
    <SiteSettingsProvider value={siteSettings}>
      <JsonLd data={[organizationJsonLd(siteSettings), websiteJsonLd()]} />
      <Header siteSettings={siteSettings} />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
    </SiteSettingsProvider>
  );
}
