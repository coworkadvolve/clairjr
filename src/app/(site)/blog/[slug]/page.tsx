import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';

import blogService, { formatBlogDate } from '@/lib/blog';
import { routes } from '@/lib/routes';
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from '@/lib/seo/jsonld';
import { createPageMetadata, siteConfig } from '@/lib/seo/metadata';

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await blogService.getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found', robots: { index: false, follow: false } };
  }

  const metadata = createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: routes.blogPost(post.slug),
    image: post.coverImage || undefined,
  });

  return {
    ...metadata,
    authors: [{ name: post.author }],
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      const openInNewTab = Boolean(value?.openInNewTab);
      return (
        <a
          href={href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.url) return null;
      return (
        <figure>
          <img src={value.url} alt={value.alt || ''} />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Home', url: siteConfig.url },
            { name: 'Blog', url: `${siteConfig.url}${routes.blog}` },
            { name: post.title, url: `${siteConfig.url}${routes.blogPost(post.slug)}` },
          ]),
        ]}
      />

      <article className="bg-white">
        <header className="bg-neutral-900 py-16 text-white md:py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
            <Link
              href={routes.blog}
              className="mb-8 inline-flex items-center gap-2 text-neutral-300 transition-colors hover:text-brand-orange"
            >
              <ArrowLeft size={18} />
              Back to all articles
            </Link>
            <span className="mb-5 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {post.category}
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
            <p className="mb-8 text-xl leading-relaxed text-neutral-300">{post.excerpt}</p>
            <div className="flex flex-wrap gap-5 text-sm text-neutral-300">
              <span className="flex items-center gap-2">
                <UserRound size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays size={16} />
                {formatBlogDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 size={16} />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </header>

        {post.coverImage ? (
          <div className="container mx-auto -mt-1 max-w-5xl px-4 md:px-6 lg:px-8">
            <div className="aspect-[16/7] overflow-hidden bg-neutral-100">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
          <div className="blog-prose">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {post.tags.length > 0 ? (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-neutral-200 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
}
