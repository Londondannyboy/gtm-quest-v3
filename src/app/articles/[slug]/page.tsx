import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getArticleBySlug, getArticles, getRelatedArticles, ArticleMeta } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | GTM Agency Quest',
    };
  }

  const { title, description, tags } = article.meta;

  return {
    title: `${title} | GTM Agency Quest`,
    description,
    keywords: tags,
    openGraph: {
      title: `${title} | GTM Agency Quest`,
      description,
      type: 'article',
      url: `https://gtm.quest/articles/${slug}`,
      siteName: 'GTM Agency Quest',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | GTM Agency Quest`,
      description,
    },
    alternates: {
      canonical: `https://gtm.quest/articles/${slug}`,
    },
  };
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
      className="block p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300 group"
    >
      <span className="inline-block text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-3">
        {article.category}
      </span>
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

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'GTM Agency Quest',
      url: 'https://gtm.quest',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gtm.quest/articles/${slug}`,
    },
  };

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-zinc-900 to-black border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
          <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-16">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-white/50">
                <li>
                  <Link href="/" className="hover:text-emerald-400 transition">
                    GTM Agency
                  </Link>
                </li>
                <li className="text-white/30">/</li>
                <li>
                  <Link href="/articles" className="hover:text-emerald-400 transition">
                    Articles
                  </Link>
                </li>
                <li className="text-white/30">/</li>
                <li className="text-white/70 truncate max-w-[250px]">{article.meta.title}</li>
              </ol>
            </nav>

            {/* Article Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/20">
                {article.meta.category}
              </span>
              <span className="text-white/50 text-sm">{article.meta.readingTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.meta.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              {article.meta.description}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article className="prose prose-lg prose-invert prose-emerald max-w-none
              prose-headings:font-bold prose-headings:text-white
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-white/80 prose-ol:text-white/80
              prose-li:marker:text-emerald-500
              prose-table:border-collapse prose-table:w-full
              prose-th:bg-zinc-800/50 prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-zinc-700
              prose-td:p-3 prose-td:border prose-td:border-zinc-800 prose-td:text-white/70
              prose-code:text-emerald-400 prose-code:bg-zinc-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:border-l-emerald-500 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
            ">
              <MDXRemote source={article.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Image
                      src="/gtm-agency-quest-logo.png"
                      alt="GTM Agency Quest"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <span className="font-semibold text-white text-sm">GTM Agency Quest</span>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    Need help building your go-to-market strategy?
                  </p>
                  <Link
                    href="https://calendly.com/my-first-quest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center px-4 py-2.5 rounded-lg font-medium text-sm transition"
                  >
                    Book a Strategy Call
                  </Link>
                </div>

                {/* Tags */}
                {article.meta.tags.length > 0 && (
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                    <h4 className="text-white font-medium text-sm mb-3">Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-zinc-800 text-white/60 text-xs px-2.5 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Mobile Tags */}
          {article.meta.tags.length > 0 && (
            <div className="lg:hidden mt-12 pt-8 border-t border-white/10">
              <h4 className="text-white font-medium text-sm mb-3">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {article.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-800 text-white/60 text-xs px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <RelatedArticleCard key={related.slug} article={related} />
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="mt-16 pt-12 border-t border-white/10">
            <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to accelerate your GTM?</h3>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                Our <Link href="/" className="text-emerald-400 hover:underline">GTM agency</Link> builds
                revenue engines for B2B SaaS companies with Clay-powered ABM.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://calendly.com/my-first-quest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition"
                >
                  Book a Strategy Call
                </Link>
                <Link
                  href="/agencies"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition"
                >
                  Browse 200+ GTM Agencies →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
