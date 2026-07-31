import { HomePage } from '@/views/HomePage';
import dataService from '@/lib/data';
import contentService from '@/lib/content';
import { resolveProductsDisplayImages } from '@/lib/imageUtils';
import { pageMetadata } from '@/lib/seo/metadata';
import blogService from '@/lib/blog';

export const metadata = pageMetadata.home;

export default async function Page() {
  const [featuredProducts, testimonials, catalogues, latestPosts] = await Promise.all([
    dataService.getFeaturedProducts(),
    contentService.getTestimonials(),
    contentService.getCatalogues(),
    blogService.getLatestPosts(3),
  ]);

  const initialProducts = resolveProductsDisplayImages(featuredProducts);

  return (
    <HomePage
      initialProducts={initialProducts}
      testimonials={testimonials}
      catalogues={catalogues}
      latestPosts={latestPosts}
    />
  );
}
