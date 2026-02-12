import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getRelatedArticles, ArticleMeta } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function RelatedArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-emerald-500/50 transition group"
    >
      <span className="text-xs text-emerald-400 mb-2 block">{article.category}</span>
      <h3 className="font-semibold text-white group-hover:text-emerald-400 transition mb-2 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-white/50 text-sm line-clamp-2">{article.description}</p>
    </Link>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles for internal linking
  const relatedArticles = getRelatedArticles(slug, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb with keyword-rich anchor text */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-white/40">
            <li>
              <Link href="/" className="hover:text-white transition">
                GTM Agency
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/articles" className="hover:text-white transition">
                Articles
              </Link>
            </li>
            <li>/</li>
            <li className="text-white/60 truncate max-w-[200px]">{article.meta.title}</li>
          </ol>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
              {article.meta.category}
            </span>
            <span className="text-white/40 text-sm">{article.meta.readingTime}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{article.meta.title}</h1>
          <p className="text-white/60 text-lg">{article.meta.description}</p>
        </header>

        {/* Article content */}
        <article className="prose prose-invert max-w-none">
          <MDXRemote source={article.content} />
        </article>

        {/* Tags */}
        {article.meta.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {article.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 text-white/60 text-sm px-3 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles - Strategic internal linking */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <RelatedArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </section>
        )}

        {/* CTA with keyword-rich anchor text */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Need help with your GTM strategy?</h3>
            <p className="text-white/60 mb-4">
              Our <Link href="/" className="text-emerald-400 hover:underline">go-to-market agency</Link> builds revenue engines for B2B SaaS companies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://calendly.com/my-first-quest"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/agencies"
                className="text-emerald-400 hover:text-emerald-300 transition"
              >
                Or browse 200+ GTM agencies →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
