import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <a
          href="/articles"
          className="text-emerald-400 hover:text-emerald-300 text-sm mb-8 inline-block"
        >
          ← Back to Articles
        </a>

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
      </div>
    </div>
  );
}
