import { ProductsPage } from '@/views/ProductsPage';
import dataService from '@/lib/data';
import { resolveProductsDisplayImages } from '@/lib/imageUtils';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.products;

export default async function Page() {
  const [products, categories] = await Promise.all([
    dataService.getProducts(),
    dataService.getCategories(),
  ]);

  return (
    <ProductsPage
      initialProducts={resolveProductsDisplayImages(products)}
      initialCategories={categories}
    />
  );
}
