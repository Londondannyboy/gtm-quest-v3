import { getArticles } from '@/lib/content';
import Link from 'next/link';

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <a
            href="/"
            className="text-emerald-400 hover:text-emerald-300 text-sm mb-4 inline-block"
          >
            ← Back to Dashboard
          </a>
          <h1 className="text-4xl font-bold mb-4">GTM Articles</h1>
          <p className="text-white/60 text-lg">
            Strategies, frameworks, and guides for building your go-to-market motion.
          </p>
        </header>

        {/* Articles grid */}
        {articles.length === 0 ? (
          <div className="bg-zinc-900 rounded-xl p-12 text-center">
            <p className="text-white/60">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block bg-zinc-900 rounded-xl p-6 border border-white/10 hover:border-emerald-500/30 transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-white/40 text-sm">{article.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{article.title}</h2>
                <p className="text-white/60 line-clamp-2">{article.description}</p>
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 text-white/40 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
