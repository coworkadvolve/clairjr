import { sanityFetch } from './client';
import {
  mapAboutPageRow,
  mapCatalogueRow,
  mapSiteSettingsRow,
  mapTestimonialRow,
} from './contentMappers';
import {
  aboutPageQuery,
  cataloguesQuery,
  categoriesQuery,
  productBySlugQuery,
  productsQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from './queries';
import { mapCategoryRow, mapProductRow, type SanityCategoryRow, type SanityProductRow } from './types';

export async function getSiteSettingsFromSanity() {
  const row = await sanityFetch<Parameters<typeof mapSiteSettingsRow>[0]>(siteSettingsQuery);
  return mapSiteSettingsRow(row);
}

export async function getAboutPageFromSanity() {
  const row = await sanityFetch<Parameters<typeof mapAboutPageRow>[0]>(aboutPageQuery);
  return mapAboutPageRow(row);
}

export async function getTestimonialsFromSanity() {
  const rows = await sanityFetch<Parameters<typeof mapTestimonialRow>[0][]>(testimonialsQuery);
  return rows.map((row) => mapTestimonialRow(row));
}

export async function getCataloguesFromSanity() {
  const rows = await sanityFetch<Parameters<typeof mapCatalogueRow>[0][]>(cataloguesQuery);
  return rows.map((row) => mapCatalogueRow(row));
}

export async function getCategoriesFromSanity() {
  const rows = await sanityFetch<SanityCategoryRow[]>(categoriesQuery);
  return rows.map((row) => mapCategoryRow(row));
}

export async function getProductsFromSanity() {
  const rows = await sanityFetch<SanityProductRow[]>(productsQuery);
  return rows.map((row) => mapProductRow(row));
}

export async function getFeaturedProductsFromSanity() {
  const products = await getProductsFromSanity();
  return products
    .filter((product) => product.is_featured)
    .sort((a, b) => a.display_order - b.display_order)
    .slice(0, 4);
}

export async function getProductsByCategoryFromSanity(categoryId: string) {
  const products = await getProductsFromSanity();
  return products
    .filter((product) => product.category_id === categoryId)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getProductBySlugFromSanity(slug: string) {
  const row = await sanityFetch<SanityProductRow | null>(productBySlugQuery, { slug });
  if (!row) return null;
  return mapProductRow(row);
}
