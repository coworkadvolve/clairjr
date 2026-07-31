import type { Category, Product } from '../lib/data';
import { getProductImageUrl } from '../lib/imageUtils';
import { urlForImage } from './image';

export type SanityCategoryRow = {
  _id: string;
  name?: string;
  slug?: string;
  description?: string;
  displayOrder?: number;
  categoryImage?: unknown;
  externalImageUrl?: string;
};

export type SanityProductModel = {
  code?: string;
  wattage?: string;
  dimensions?: string;
  outerDimensions?: string;
  cutout?: string;
  packing?: string;
  price?: string | null;
};

export type SanitySpecifications = {
  entries?: Array<{ key?: string; value?: string }>;
  models?: SanityProductModel[];
};

export type SanityProductRow = {
  _id: string;
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  specifications?: SanitySpecifications;
  features?: string[];
  applications?: string[];
  productImage?: unknown;
  externalImageUrl?: string;
  galleryImageUrls?: string[];
  datasheetUrl?: string;
  isFeatured?: boolean;
  displayOrder?: number;
  categoryId?: string;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
};

function resolveImageUrl(
  productImage: unknown,
  externalImageUrl: string | undefined,
  productName: string,
): string {
  if (productImage && typeof productImage === 'object') {
    try {
      return urlForImage(productImage as never).width(800).quality(85).url();
    } catch {
      // fall through
    }
  }

  const external = externalImageUrl?.trim();
  if (external && /^https?:\/\//i.test(external)) {
    return external;
  }

  return getProductImageUrl(productName);
}

function mapSpecifications(specs?: SanitySpecifications): Record<string, unknown> {
  if (!specs) return {};

  const result: Record<string, unknown> = {};

  for (const entry of specs.entries || []) {
    if (entry.key) {
      result[entry.key] = entry.value ?? '';
    }
  }

  if (specs.models && specs.models.length > 0) {
    result.models = specs.models.map((model) => {
      const row: Record<string, string | null> = {};
      if (model.code) row.code = model.code;
      if (model.wattage) row.wattage = model.wattage;
      if (model.dimensions) row.dimensions = model.dimensions;
      if (model.outerDimensions) row.outerDimensions = model.outerDimensions;
      if (model.cutout) row.cutout = model.cutout;
      if (model.packing) row.packing = model.packing;
      if (model.price != null && model.price !== '') row.price = model.price;
      return row;
    });
  }

  return result;
}

export function mapCategoryRow(row: SanityCategoryRow): Category {
  let imageUrl: string | null = null;

  if (row.categoryImage && typeof row.categoryImage === 'object') {
    try {
      imageUrl = urlForImage(row.categoryImage as never).width(640).quality(85).url();
    } catch {
      imageUrl = null;
    }
  } else if (row.externalImageUrl) {
    imageUrl = row.externalImageUrl;
  }

  return {
    id: row._id,
    name: row.name || '',
    slug: row.slug || '',
    description: row.description || '',
    image_url: imageUrl,
    display_order: row.displayOrder ?? 0,
  };
}

export function mapProductRow(row: SanityProductRow): Product {
  const name = row.name || '';

  return {
    id: row._id,
    category_id: row.categoryId || row.category?._id || '',
    name,
    slug: row.slug || '',
    description: row.description || '',
    short_description: row.shortDescription ?? null,
    specifications: mapSpecifications(row.specifications),
    features: row.features || [],
    applications: row.applications || [],
    image_url: resolveImageUrl(row.productImage, row.externalImageUrl, name),
    gallery_images: row.galleryImageUrls || [],
    datasheet_url: row.datasheetUrl ?? null,
    is_featured: row.isFeatured ?? false,
    display_order: row.displayOrder ?? 0,
  };
}
