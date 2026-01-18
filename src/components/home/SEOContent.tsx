import Link from 'next/link';
import { ArticleMeta } from '@/lib/content';
import { Agency } from '@/lib/agencies';

interface SEOContentProps {
  featuredArticles: ArticleMeta[];
  topAgencies: Agency[];
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block bg-zinc-900 rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded ${
          article.category === 'guide'
            ? 'bg-emerald-500/20 text-emerald-400'
            : article.category === 'comparison'
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-purple-500/20 text-purple-400'
        }`}>
          {article.category}
        </span>
        <span className="text-white/40 text-xs">{article.readingTime}</span>
      </div>
      <h3 className="font-bold text-white group-hover:text-emerald-400 transition mb-2">
        {article.title}
      </h3>
      <p className="text-white/50 text-sm line-clamp-2">
        {article.description}
      </p>
    </Link>
  );
}

function AgencyPreviewCard({ agency }: { agency: Agency }) {
  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
    >
      <h4 className="font-semibold text-white group-hover:text-emerald-400 transition">
        {agency.name}
      </h4>
      <p className="text-white/40 text-sm">{agency.headquarters || 'Global'}</p>
      {agency.specializations && agency.specializations.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {agency.specializations.slice(0, 2).map((spec) => (
            <span key={spec} className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded">
              {spec}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function SEOContent({ featuredArticles, topAgencies }: SEOContentProps) {
  const guides = featuredArticles.filter((a) => a.category === 'guide');
  const comparisons = featuredArticles.filter((a) => a.category === 'comparison');
  const directories = featuredArticles.filter((a) => a.category === 'directory');

  return (
    <section className="bg-zinc-950 border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Go-To-Market Resources</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Expert guides, tool comparisons, and agency directories to help you build
            and scale your B2B go-to-market strategy.
          </p>
        </div>

        {/* Featured Guides */}
        {guides.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-emerald-400">GTM Guides & Frameworks</span>
              </h3>
              <Link href="/articles?category=guide" className="text-emerald-400 hover:text-emerald-300 text-sm">
                View all guides &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.slice(0, 6).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-blue-400">Tool Comparisons</span>
              </h3>
              <Link href="/articles?category=comparison" className="text-blue-400 hover:text-blue-300 text-sm">
                View all comparisons &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparisons.slice(0, 8).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Agency Directories */}
        {directories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-purple-400">Agency Directories</span>
              </h3>
              <Link href="/articles?category=directory" className="text-purple-400 hover:text-purple-300 text-sm">
                View all directories &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {directories.slice(0, 6).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Top Agencies */}
        {topAgencies.length > 0 && (
          <div className="bg-zinc-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Top GTM Agencies</h3>
                <p className="text-white/50 text-sm">Hand-picked agencies for B2B growth</p>
              </div>
              <Link href="/agencies" className="text-emerald-400 hover:text-emerald-300 text-sm">
                Browse all agencies &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topAgencies.slice(0, 8).map((agency) => (
                <AgencyPreviewCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Ready to build your GTM strategy?</h3>
          <p className="text-white/60 mb-6">
            Our AI strategist will help you find the perfect agency match.
          </p>
          <Link
            href="/#chat"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}
