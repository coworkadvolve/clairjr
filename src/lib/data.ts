import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import { isSanityProductsEnabled } from '../sanity/env';
import {
  getCategoriesFromSanity,
  getFeaturedProductsFromSanity,
  getProductBySlugFromSanity,
  getProductsByCategoryFromSanity,
  getProductsFromSanity,
} from '../sanity/loaders';

// Re-export types
export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  specifications: Record<string, unknown>;
  features: string[];
  applications: string[];
  image_url: string;
  gallery_images: string[];
  datasheet_url: string | null;
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type: string;
  message: string;
  product_id?: string;
}

export interface FranchiseSubmission {
  name: string;
  email: string;
  phone: string;
  city: string;
  business_experience?: string;
  investment_capacity?: string;
  message: string;
}

async function withSanityFallback<T>(
  fetchFromSanity: () => Promise<T[]>,
  fallback: () => T[],
): Promise<T[]> {
  if (!isSanityProductsEnabled()) {
    return fallback();
  }

  try {
    const fromSanity = await fetchFromSanity();
    if (fromSanity.length > 0) {
      return fromSanity;
    }
  } catch (error) {
    console.error('Sanity fetch failed, falling back to local JSON:', error);
  }

  return fallback();
}

// Data service functions
export const dataService = {
  async getCategories(): Promise<Category[]> {
    return withSanityFallback(
      getCategoriesFromSanity,
      () => categoriesData as Category[],
    );
  },

  async getProducts(): Promise<Product[]> {
    return withSanityFallback(
      getProductsFromSanity,
      () => productsData as Product[],
    );
  },

  async getFeaturedProducts(): Promise<Product[]> {
    if (isSanityProductsEnabled()) {
      try {
        const fromSanity = await getFeaturedProductsFromSanity();
        if (fromSanity.length > 0) {
          return fromSanity;
        }
      } catch (error) {
        console.error('Sanity featured products fetch failed, falling back to local JSON:', error);
      }
    }

    const products = productsData as Product[];
    return products
      .filter((p) => p.is_featured)
      .sort((a, b) => a.display_order - b.display_order)
      .slice(0, 4);
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (isSanityProductsEnabled()) {
      try {
        const fromSanity = await getProductsByCategoryFromSanity(categoryId);
        if (fromSanity.length > 0) {
          return fromSanity;
        }
      } catch (error) {
        console.error('Sanity category products fetch failed, falling back to local JSON:', error);
      }
    }

    const products = productsData as Product[];
    return products
      .filter((p) => p.category_id === categoryId)
      .sort((a, b) => a.display_order - b.display_order);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSanityProductsEnabled()) {
      try {
        const fromSanity = await getProductBySlugFromSanity(slug);
        if (fromSanity) {
          return fromSanity;
        }
      } catch (error) {
        console.error('Sanity product fetch failed, falling back to local JSON:', error);
      }
    }

    const products = productsData as Product[];
    return products.find((p) => p.slug === slug) || null;
  },

  async submitContact(
    submission: ContactSubmission,
    recipientEmail = 'crm@clair.online',
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const formData = new FormData();
      formData.append('name', submission.name);
      formData.append('email', submission.email);
      if (submission.phone) formData.append('phone', submission.phone);
      if (submission.company) formData.append('company', submission.company);
      formData.append('inquiry_type', submission.inquiry_type);
      formData.append('message', submission.message);
      formData.append('_subject', `Contact Form Submission - ${submission.inquiry_type}`);
      formData.append('_template', 'box');
      formData.append('_captcha', 'false');
      formData.append('_autoresponse', `Thank you for contacting Clair Lighting Solutions. We have received your ${submission.inquiry_type} inquiry and will get back to you shortly.`);

      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      return { success: result.success !== false };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: 'Failed to submit form. Please try again.' };
    }
  },

  async submitFranchise(
    submission: FranchiseSubmission,
    recipientEmail = 'crm@clair.online',
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const formData = new FormData();
      formData.append('name', submission.name);
      formData.append('email', submission.email);
      formData.append('phone', submission.phone);
      formData.append('city', submission.city);
      if (submission.business_experience) formData.append('business_experience', submission.business_experience);
      if (submission.investment_capacity) formData.append('investment_capacity', submission.investment_capacity);
      formData.append('message', submission.message);
      formData.append('_subject', 'Franchise Application - Clair Lighting Solutions');
      formData.append('_template', 'box');
      formData.append('_captcha', 'false');
      formData.append('_autoresponse', 'Thank you for your interest in becoming a Clair Lighting Solutions franchise partner. We have received your application and will review it shortly. Our team will contact you soon.');

      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      return { success: result.success !== false };
    } catch (error) {
      console.error('Error submitting franchise form:', error);
      return { success: false, error: 'Failed to submit form. Please try again.' };
    }
  },
};

export default dataService;
