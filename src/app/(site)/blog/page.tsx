import { BlogCard } from '@/components/BlogCard';
import blogService from '@/lib/blog';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.blog;
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await blogService.getPosts();

  return (
    <div>
      <section className="bg-neutral-900 py-20 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Insights & Ideas
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Lighting Knowledge Hub</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-neutral-300">
            Practical guidance, design ideas, and energy-efficiency insights from the Clair
            Lighting team.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="border border-neutral-200 bg-white px-6 py-20 text-center">
              <h2 className="mb-3 text-2xl font-bold text-neutral-900">Articles coming soon</h2>
              <p className="text-neutral-600">
                New posts can be created and published from Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
