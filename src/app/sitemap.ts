import type { MetadataRoute } from 'next';

import dataService from '@/lib/data';
import blogService from '@/lib/blog';
import { siteConfig } from '@/lib/seo/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogPosts] = await Promise.all([
    dataService.getProducts(),
    blogService.getPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/products',
    '/catalogue',
    '/about',
    '/services',
    '/blog',
    '/franchise',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
