import type { PortableTextBlock } from '@portabletext/types';

import { projectId } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  blogPostsQuery,
} from '@/sanity/queries';

interface SanityBlogPostRow {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  author?: string;
  publishedAt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  coverImageAlt: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
}

export interface BlogPost extends BlogPostSummary {
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

function countWords(body: PortableTextBlock[] = []): number {
  return body.reduce((total, block) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return total;
    const text = block.children
      .map((child) => ('text' in child && typeof child.text === 'string' ? child.text : ''))
      .join(' ');
    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

function mapBlogPost(row: SanityBlogPostRow): BlogPost {
  const body = row.body || [];

  return {
    id: row._id,
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    coverImage: row.coverImageUrl || null,
    coverImageAlt: row.coverImageAlt || row.title || 'Blog article cover',
    author: row.author || 'Clair Lighting Team',
    publishedAt: row.publishedAt || '',
    category: row.category || 'Lighting Guides',
    tags: row.tags || [],
    featured: row.featured ?? false,
    readingTime: Math.max(1, Math.ceil(countWords(body) / 220)),
    body,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
  };
}

async function safelyLoad<T>(load: () => Promise<T>, fallback: T): Promise<T> {
  if (!projectId) return fallback;

  try {
    return await load();
  } catch (error) {
    console.error('Sanity blog fetch failed:', error);
    return fallback;
  }
}

export const blogService = {
  async getPosts(): Promise<BlogPostSummary[]> {
    return safelyLoad(async () => {
      const rows = await sanityFetch<SanityBlogPostRow[]>(blogPostsQuery);
      return rows.map(mapBlogPost);
    }, []);
  },

  async getLatestPosts(limit = 3): Promise<BlogPostSummary[]> {
    const posts = await this.getPosts();
    const featured = posts.filter((post) => post.featured);
    return (featured.length >= limit ? featured : posts).slice(0, limit);
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return safelyLoad(async () => {
      const row = await sanityFetch<SanityBlogPostRow | null>(blogPostBySlugQuery, { slug });
      return row ? mapBlogPost(row) : null;
    }, null);
  },

  async getSlugs(): Promise<string[]> {
    return safelyLoad(
      () => sanityFetch<string[]>(blogPostSlugsQuery),
      [],
    );
  },
};

export function formatBlogDate(value: string): string {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export default blogService;
