import cataloguesData from '../data/catalogues.json';
import aboutPageData from '../data/aboutPage.json';
import siteSettingsData from '../data/siteSettings.json';
import testimonialsData from '../data/testimonials.json';
import type { AboutPageContent, Catalogue, SiteSettings, Testimonial } from './content-types';
import { defaultSiteSettings } from './content-types';
import { isSanityProductsEnabled } from '../sanity/env';
import {
  getAboutPageFromSanity,
  getCataloguesFromSanity,
  getSiteSettingsFromSanity,
  getTestimonialsFromSanity,
} from '../sanity/loaders';

async function withSanityFallback<T>(
  fetchFromSanity: () => Promise<T>,
  fallback: () => T,
  isEmpty?: (value: T) => boolean,
): Promise<T> {
  if (!isSanityProductsEnabled()) {
    return fallback();
  }

  try {
    const fromSanity = await fetchFromSanity();
    if (isEmpty && isEmpty(fromSanity)) {
      return fallback();
    }
    return fromSanity;
  } catch (error) {
    console.error('Sanity content fetch failed, falling back to local JSON:', error);
    return fallback();
  }
}

export const contentService = {
  async getSiteSettings(): Promise<SiteSettings> {
    return withSanityFallback(
      getSiteSettingsFromSanity,
      () => siteSettingsData as SiteSettings,
    );
  },

  async getAboutPage(): Promise<AboutPageContent> {
    return withSanityFallback(
      getAboutPageFromSanity,
      () => aboutPageData as AboutPageContent,
    );
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return withSanityFallback(
      getTestimonialsFromSanity,
      () => testimonialsData as Testimonial[],
      (items) => items.length === 0,
    );
  },

  async getCatalogues(): Promise<Catalogue[]> {
    return withSanityFallback(
      getCataloguesFromSanity,
      () => cataloguesData as Catalogue[],
      (items) => items.length === 0,
    );
  },
};

export { defaultSiteSettings };

export default contentService;
