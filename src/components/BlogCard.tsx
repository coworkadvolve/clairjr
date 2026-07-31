import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, Lightbulb } from 'lucide-react';

import type { BlogPostSummary } from '@/lib/blog';
import { formatBlogDate } from '@/lib/blog';
import { routes } from '@/lib/routes';

interface BlogCardProps {
  post: BlogPostSummary;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={routes.blogPost(post.slug)}
        className="block aspect-[16/9] overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-brand-orange"
        aria-label={`Read ${post.title}`}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full items-center justify-center">
            <Lightbulb className="text-white/80" size={52} />
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
          <span className="bg-brand-orange/10 px-3 py-1 font-semibold uppercase tracking-wider text-brand-orange">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
            {formatBlogDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 size={14} />
            {post.readingTime} min read
          </span>
        </div>

        <h2 className="mb-3 text-2xl font-bold leading-tight text-neutral-900">
          <Link
            href={routes.blogPost(post.slug)}
            className="transition-colors hover:text-brand-orange"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mb-6 line-clamp-3 leading-relaxed text-neutral-600">{post.excerpt}</p>

        <Link
          href={routes.blogPost(post.slug)}
          className="mt-auto inline-flex items-center gap-2 font-semibold text-brand-orange transition-all hover:gap-3"
        >
          Read article
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
