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
        <span className="text-white/60 text-xs">{article.readingTime}</span>
      </div>
      <h3 className="font-bold text-white group-hover:text-emerald-400 transition mb-2">
        {article.title}
      </h3>
      <p className="text-white/60 text-sm line-clamp-2">
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
      <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
        {agency.name}
      </span>
      <p className="text-white/60 text-sm">{agency.headquarters || 'Global'}</p>
      {agency.specializations && agency.specializations.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {agency.specializations.slice(0, 2).map((spec) => (
            <span key={spec} className="text-xs bg-white/5 text-white/60 px-2 py-0.5 rounded">
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
          <p className="text-lg text-emerald-400 font-medium mb-2">GTM Agency Guides &amp; Tools</p>
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
                <p className="text-white/60 text-sm">Hand-picked agencies for B2B growth</p>
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

        {/* Regional Agency Directories */}
        <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/10 mt-12">
          <h3 className="text-xl font-bold mb-4">Find GTM Agencies by Region</h3>
          <p className="text-white/60 mb-6">
            Browse specialized B2B marketing and GTM agencies in your region. Our directory covers agencies across North America, Europe, and APAC.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <span className="font-semibold text-white block mb-2">GTM Agencies in the Americas</span>
              <ul className="space-y-1 text-sm">
                <li><Link href="/agencies/country/us" className="text-white/60 hover:text-emerald-400 flex items-center gap-1"><span>🇺🇸</span> United States (25 agencies)</Link></li>
                <li><Link href="/agencies/country/ca" className="text-white/60 hover:text-emerald-400 flex items-center gap-1"><span>🇨🇦</span> Canada (9 agencies)</Link></li>
                <li><Link href="/agencies" className="text-white/60 hover:text-emerald-400">Remote / Global</Link></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-white block mb-2">GTM Agencies in Europe</span>
              <ul className="space-y-1 text-sm">
                <li><Link href="/agencies/country/uk" className="text-white/60 hover:text-emerald-400 flex items-center gap-1"><span>🇬🇧</span> United Kingdom (10 agencies)</Link></li>
                <li><Link href="/agencies/country/ie" className="text-white/60 hover:text-emerald-400 flex items-center gap-1"><span>🇮🇪</span> Ireland (5 agencies)</Link></li>
                <li><Link href="/articles/b2b-marketing-agency-barcelona" className="text-white/60 hover:text-emerald-400">Spain (Barcelona)</Link></li>
                <li><Link href="/articles/b2b-marketing-agency-rome" className="text-white/60 hover:text-emerald-400">Italy (Rome)</Link></li>
                <li><Link href="/articles/best-b2b-marketing-agency-belgium" className="text-white/60 hover:text-emerald-400">Belgium</Link></li>
                <li><Link href="/articles/best-b2b-marketing-agency-finland" className="text-white/60 hover:text-emerald-400">Finland</Link></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-white block mb-2">GTM Agencies in APAC</span>
              <ul className="space-y-1 text-sm">
                <li><Link href="/agencies/country/au" className="text-white/60 hover:text-emerald-400 flex items-center gap-1"><span>🇦🇺</span> Australia (10 agencies)</Link></li>
                <li><Link href="/agencies/country/nz" className="text-white/60 hover:text-emerald-400 flex items-center gap-1"><span>🇳🇿</span> New Zealand (5 agencies)</Link></li>
                <li><Link href="/agencies" className="text-white/60 hover:text-emerald-400">Singapore &amp; Global</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Public Sector GTM */}
        <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/10 mt-12">
          <h3 className="text-xl font-bold mb-4">Selling to Government?</h3>
          <p className="text-white/60 mb-4">
            Public sector contracts represent a significant B2B go-to-market channel, but winning tenders requires a specialized approach.
            From understanding evaluation criteria to crafting compliant responses, government procurement has its own playbook.
          </p>
          <p className="text-white/60">
            Our <a href="https://rfp.quest" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">RFP platform</a> provides AI-powered tender analysis for government contracts — helping B2B companies understand requirements, identify gaps, and craft winning bids.
          </p>
        </div>

        {/* Industry Insights - Authority Links */}
        <div className="bg-zinc-900/50 rounded-2xl p-8 border border-white/10 mt-12">
          <h3 className="text-xl font-bold mb-4">GTM Industry Insights</h3>
          <p className="text-white/60 mb-6">
            Stay informed with research and best practices from leading B2B marketing and GTM experts.
            These resources from industry authorities can help shape your go-to-market approach.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.hubspot.com/state-of-marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                HubSpot State of Marketing
              </span>
              <p className="text-white/60 text-sm">Annual trends in B2B marketing and demand generation</p>
            </a>
            <a
              href="https://www.gartner.com/en/sales"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                Gartner Sales Research
              </span>
              <p className="text-white/60 text-sm">Enterprise B2B sales and GTM strategy insights</p>
            </a>
            <a
              href="https://www.forrester.com/b2b-marketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                Forrester B2B Marketing
              </span>
              <p className="text-white/60 text-sm">Research on B2B buyer journeys and ABM</p>
            </a>
            <a
              href="https://www.demandgen.com/resources/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                Demand Gen Report
              </span>
              <p className="text-white/60 text-sm">B2B demand generation benchmarks and case studies</p>
            </a>
            <a
              href="https://www.saastr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                SaaStr
              </span>
              <p className="text-white/60 text-sm">SaaS go-to-market playbooks and scaling advice</p>
            </a>
            <a
              href="https://www.linkedin.com/business/marketing/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                LinkedIn Marketing Blog
              </span>
              <p className="text-white/60 text-sm">B2B marketing trends and thought leadership</p>
            </a>
            <a
              href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                McKinsey Growth & Sales
              </span>
              <p className="text-white/60 text-sm">Strategic insights on B2B growth and market entry</p>
            </a>
            <a
              href="https://www.cbinsights.com/research/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                CB Insights Research
              </span>
              <p className="text-white/60 text-sm">Market sizing and startup GTM analysis</p>
            </a>
            <a
              href="https://hbr.org/topic/subject/marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                Harvard Business Review
              </span>
              <p className="text-white/60 text-sm">Strategic marketing and go-to-market frameworks</p>
            </a>
            <a
              href="https://www.openviewpartners.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                OpenView Partners
              </span>
              <p className="text-white/60 text-sm">Product-led growth and SaaS GTM expertise</p>
            </a>
            <a
              href="https://www.reforge.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                Reforge Blog
              </span>
              <p className="text-white/60 text-sm">Growth strategy frameworks from industry leaders</p>
            </a>
            <a
              href="https://www.firstround.com/review"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition group"
            >
              <span className="font-semibold text-white block group-hover:text-emerald-400 transition">
                First Round Review
              </span>
              <p className="text-white/60 text-sm">Tactical startup GTM and growth advice</p>
            </a>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Ready to build your GTM strategy?</h3>
          <p className="text-white/60 mb-6">
            Our AI strategist will help you find the perfect GTM agency match for your business.
          </p>
          <Link
            href="/#chat"
            className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}
