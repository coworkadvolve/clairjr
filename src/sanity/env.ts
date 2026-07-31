/**
 * NEXT_PUBLIC_* vars must be read with static property access so Next.js
 * can inline them into client bundles (required for embedded Studio).
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://clairjg.com';

export function isSanityProductsEnabled(): boolean {
  if (!projectId) return false;

  const value = process.env.NEXT_PUBLIC_USE_SANITY_PRODUCTS;
  if (value == null || value === '') return false;
  const normalized = value.trim().toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

export function assertSanityConfig(): void {
  if (!projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env and restart the dev server.',
    );
  }
}
