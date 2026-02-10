import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Top 10 GTM Agencies 2026 | Best Go-To-Market Agency Partners',
  description: 'GTM agency rankings for 2026. Compare the best go-to-market agencies by specialty, location, and what they\'re best for. Find your ideal GTM partner.',
  alternates: {
    canonical: 'https://gtm.quest/top-gtm-agencies',
  },
  openGraph: {
    title: 'Top 10 GTM Agencies 2026 | Best Go-To-Market Agency Partners',
    description: 'GTM agency rankings for 2026. Compare the best go-to-market agencies by specialty, location, and what they\'re best for.',
    url: 'https://gtm.quest/top-gtm-agencies',
    type: 'article',
  },
};

const agencies = [
  {
    rank: 1,
    name: 'GTM Quest',
    location: 'London, UK',
    specialty: 'Clay-powered ABM, systematic revenue engines',
    bestFor: 'B2B SaaS wanting GTM infrastructure they own',
    description: 'Builds systematic go-to-market engines using their proprietary "Quest System"—a 4-channel ABM methodology combining LinkedIn Ads, content syndication, intent data, and AI-powered outbound via Clay.',
    slug: 'gtm-quest',
    highlight: true,
    color: 'emerald',
  },
  {
    rank: 2,
    name: 'SalesCaptain',
    location: 'Remote',
    specialty: 'Outbound sales, pipeline generation',
    bestFor: 'Sales-led B2B companies needing predictable pipeline',
    description: 'Focuses on outbound sales execution for B2B and SaaS companies. Specializes in building SDR teams, cold email campaigns, and LinkedIn outreach programs.',
    slug: 'salescaptain',
    highlight: false,
    color: 'blue',
  },
  {
    rank: 3,
    name: 'Refine Labs',
    location: 'Boston, US',
    specialty: 'Demand generation, dark social, category creation',
    bestFor: 'Companies building new categories',
    description: 'Pioneered the "dark social" concept and focuses on demand creation over lead capture. Helps B2B companies build brand through ungated content.',
    slug: 'refine-labs',
    highlight: false,
    color: 'purple',
  },
  {
    rank: 4,
    name: 'Ironpaper',
    location: 'New York, US',
    specialty: 'Enterprise B2B, account-based marketing',
    bestFor: 'Complex enterprise sales cycles',
    description: 'Specializes in B2B marketing for companies selling to enterprise buyers. Excels at account-based marketing programs and marketing automation.',
    slug: 'ironpaper',
    highlight: false,
    color: 'orange',
  },
  {
    rank: 5,
    name: 'Ziggy',
    location: 'Remote',
    specialty: 'Demand generation, positioning, messaging',
    bestFor: 'B2B startups needing market positioning',
    description: 'Helps B2B startups define their positioning and build demand generation engines. Focuses on messaging frameworks and content strategy.',
    slug: 'ziggy',
    highlight: false,
    color: 'blue',
  },
  {
    rank: 6,
    name: 'Six & Flow',
    location: 'Manchester, UK',
    specialty: 'HubSpot Elite Partner, RevOps, inbound',
    bestFor: 'HubSpot-centric companies',
    description: 'HubSpot Elite Partner specializing in revenue operations, inbound marketing, and sales enablement.',
    slug: 'six-and-flow',
    highlight: false,
    color: 'orange',
  },
  {
    rank: 7,
    name: 'Arise GTM',
    location: 'Remote',
    specialty: 'B2B SaaS/Fintech, PLG architecture',
    bestFor: 'FinTech and PLG companies',
    description: 'Focuses on B2B SaaS and FinTech companies, helping them build full-funnel marketing programs with product-led growth architecture.',
    slug: 'arise-gtm',
    highlight: false,
    color: 'purple',
  },
  {
    rank: 8,
    name: 'Kalungi',
    location: 'Seattle, US',
    specialty: 'Fractional CMO, full-stack B2B SaaS marketing',
    bestFor: 'Early-stage SaaS needing marketing leadership',
    description: 'Provides fractional CMO services and full-stack marketing execution for B2B SaaS companies.',
    slug: 'kalungi',
    highlight: false,
    color: 'emerald',
  },
  {
    rank: 9,
    name: 'Single Grain',
    location: 'Los Angeles, US',
    specialty: 'Full-service digital marketing, performance',
    bestFor: 'Growth-stage companies with budget',
    description: 'Full-service digital marketing agency with strong B2B SaaS expertise in SEO, paid media, and content marketing.',
    slug: 'single-grain',
    highlight: false,
    color: 'blue',
  },
  {
    rank: 10,
    name: 'Deviate Labs',
    location: 'Remote',
    specialty: 'Growth hacking, unconventional GTM strategies',
    bestFor: 'Companies willing to experiment',
    description: 'Specializes in growth hacking and unconventional go-to-market strategies beyond traditional marketing playbooks.',
    slug: 'deviate-labs',
    highlight: false,
    color: 'purple',
  },
];

const colorClasses = {
  emerald: {
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    rank: 'bg-emerald-600 text-white',
    border: 'border-emerald-500/30 hover:border-emerald-500/50',
    glow: 'hover:shadow-emerald-500/20',
  },
  blue: {
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    rank: 'bg-blue-600 text-white',
    border: 'border-blue-500/30 hover:border-blue-500/50',
    glow: 'hover:shadow-blue-500/20',
  },
  purple: {
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    rank: 'bg-purple-600 text-white',
    border: 'border-purple-500/30 hover:border-purple-500/50',
    glow: 'hover:shadow-purple-500/20',
  },
  orange: {
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    rank: 'bg-orange-600 text-white',
    border: 'border-orange-500/30 hover:border-orange-500/50',
    glow: 'hover:shadow-orange-500/20',
  },
};

function AgencyCard({ agency }: { agency: typeof agencies[0] }) {
  const colors = colorClasses[agency.color as keyof typeof colorClasses];

  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className={`block relative bg-zinc-900/80 backdrop-blur rounded-2xl p-6 border-2 transition-all duration-300 ${colors.border} ${colors.glow} hover:shadow-lg ${
        agency.highlight ? 'ring-2 ring-emerald-500/50' : ''
      }`}
    >
      {/* Rank Badge */}
      <div className={`absolute -top-4 -left-2 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg ${colors.rank}`}>
        #{agency.rank}
      </div>

      {/* Highlight Badge */}
      {agency.highlight && (
        <div className="absolute top-4 right-4">
          <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Editor&apos;s Choice
          </span>
        </div>
      )}

      <div className="ml-8 mt-2">
        {/* Name & Location */}
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-xl font-bold text-white">{agency.name}</h3>
          <span className="text-white/40 text-sm">📍 {agency.location}</span>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">{agency.description}</p>

        {/* Specialty & Best For */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-white/40 text-xs uppercase tracking-wider w-20 flex-shrink-0">Specialty</span>
            <span className="text-white/80 text-sm">{agency.specialty}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-white/40 text-xs uppercase tracking-wider w-20 flex-shrink-0">Best for</span>
            <span className={`text-sm ${colors.badge.split(' ')[1]}`}>{agency.bestFor}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-white/40 text-xs">View full profile</span>
          <span className="text-emerald-400 font-medium text-sm">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function TopGTMAgenciesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center">
            <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              2026 Rankings
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Top 10 <span className="text-emerald-400">GTM Agencies</span> 2026
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              The definitive ranking of go-to-market agencies for B2B SaaS.
              Compared by specialty, location, and what they&apos;re best for.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#rankings"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                View Rankings
              </a>
              <Link
                href="/agencies"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                Browse All 200+ Agencies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is a GTM Agency */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">What is a GTM Agency?</h2>
              <p className="text-white/70 mb-4">
                A <strong className="text-white">GTM agency</strong> (Go-To-Market agency) specializes in helping B2B companies
                launch products, enter new markets, and build predictable revenue engines. Unlike traditional marketing agencies,
                GTM agencies focus on the entire revenue motion—from positioning and messaging to demand generation and sales enablement.
              </p>
              <p className="text-white/70">
                The best GTM agencies combine strategic consulting with hands-on execution across multiple channels:
                content marketing, ABM campaigns, LinkedIn outbound, paid media, and sales development.
              </p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#rankings" className="text-emerald-400 hover:text-emerald-300">→ Top 10 Rankings</a></li>
                <li><a href="#benefits" className="text-white/60 hover:text-white">→ Benefits of Hiring</a></li>
                <li><a href="#when-to-hire" className="text-white/60 hover:text-white">→ When to Hire</a></li>
                <li><a href="#how-to-choose" className="text-white/60 hover:text-white">→ How to Choose</a></li>
                <li><Link href="/agencies" className="text-white/60 hover:text-white">→ Full Directory</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section id="rankings" className="py-16 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top 10 GTM Agencies (Ranked)</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ranked by specialization, client results, and industry expertise.
              Click any agency to view their full profile.
            </p>
          </div>

          <div className="grid gap-6">
            {agencies.map((agency) => (
              <AgencyCard key={agency.rank} agency={agency} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & When to Hire */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div id="benefits" className="bg-zinc-900/50 rounded-2xl p-8 border border-white/10 scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6">Benefits of Hiring a GTM Agency</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">⚡</span>
                  <div>
                    <strong className="text-white">Increased Speed</strong>
                    <p className="text-white/60 text-sm">Accelerate launch timelines with proven playbooks and experienced teams.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">🎯</span>
                  <div>
                    <strong className="text-white">Alignment</strong>
                    <p className="text-white/60 text-sm">Neutral experts who break down silos between marketing, sales, and product.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🧠</span>
                  <div>
                    <strong className="text-white">Expertise</strong>
                    <p className="text-white/60 text-sm">Specialized knowledge that prevents costly mistakes first-time launchers make.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">📈</span>
                  <div>
                    <strong className="text-white">Scalability</strong>
                    <p className="text-white/60 text-sm">Flexible capacity that grows with your needs without fixed headcount costs.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* When to Hire */}
            <div id="when-to-hire" className="bg-zinc-900/50 rounded-2xl p-8 border border-white/10 scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6">When to Hire a GTM Agency</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">🚀</span>
                  <div>
                    <strong className="text-white">Launching a New Product</strong>
                    <p className="text-white/60 text-sm">Need to define market, audience, and messaging from scratch.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">🌍</span>
                  <div>
                    <strong className="text-white">Entering New Markets</strong>
                    <p className="text-white/60 text-sm">Expanding geographically or into verticals where you lack expertise.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">📊</span>
                  <div>
                    <strong className="text-white">Growth Has Plateaued</strong>
                    <p className="text-white/60 text-sm">Existing strategies stopped working; need fresh approaches.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">⏱️</span>
                  <div>
                    <strong className="text-white">Need to Move Fast</strong>
                    <p className="text-white/60 text-sm">Market window is narrow; can&apos;t wait months to hire a team.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section id="how-to-choose" className="py-16 border-t border-white/10 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">How to Choose a GTM Agency</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: '🏭', title: 'Industry Expertise', desc: 'Do they understand your market?' },
              { icon: '📊', title: 'Case Studies', desc: 'Have they solved similar challenges?' },
              { icon: '🤝', title: 'Engagement Model', desc: 'Project, retainer, or embedded?' },
              { icon: '⚙️', title: 'Tech Stack Fit', desc: 'Do they work with your tools?' },
              { icon: '🎭', title: 'Cultural Fit', desc: 'Will they integrate with your team?' },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/50 rounded-xl p-5 border border-white/10 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-white/50 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your GTM Agency?</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            This list features our top 10 picks, but GTM Quest maintains a directory of
            <strong className="text-white"> 200+ vetted GTM agencies</strong> across specializations and regions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/agencies"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-4 rounded-lg transition text-lg"
            >
              Browse All GTM Agencies
            </Link>
            <Link
              href="/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-lg transition text-lg"
            >
              Build Your GTM Strategy
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-4 gap-4 text-left">
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">By Region</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/agencies/country/us" className="text-white/60 hover:text-emerald-400">US Agencies</Link></li>
                <li><Link href="/agencies/country/uk" className="text-white/60 hover:text-emerald-400">UK Agencies</Link></li>
                <li><Link href="/agencies/country/au" className="text-white/60 hover:text-emerald-400">Australia</Link></li>
                <li><Link href="/agencies/country/ca" className="text-white/60 hover:text-emerald-400">Canada</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">By Specialty</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/agencies/specialization/demand-generation" className="text-white/60 hover:text-emerald-400">Demand Gen</Link></li>
                <li><Link href="/agencies/specialization/abm" className="text-white/60 hover:text-emerald-400">ABM</Link></li>
                <li><Link href="/agencies/specialization/sales-enablement" className="text-white/60 hover:text-emerald-400">Sales Enablement</Link></li>
                <li><Link href="/agencies/specialization/growth-marketing" className="text-white/60 hover:text-emerald-400">RevOps</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/articles/what-is-a-gtm-agency" className="text-white/60 hover:text-emerald-400">What is a GTM Agency?</Link></li>
                <li><Link href="/articles/gtm-agency-pricing-guide" className="text-white/60 hover:text-emerald-400">Pricing Guide</Link></li>
                <li><Link href="/articles/gtm-agency-vs-marketing-agency" className="text-white/60 hover:text-emerald-400">GTM vs Marketing Agency</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">Get Started</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href="/dashboard" className="text-white/60 hover:text-emerald-400">GTM Strategy Builder</Link></li>
                <li><Link href="/#quest-system" className="text-white/60 hover:text-emerald-400">The Quest System</Link></li>
                <li><a href="https://calendly.com" className="text-emerald-400 hover:text-emerald-300">Book a Call →</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Top 10 GTM Agencies 2026',
            description: 'Ranked list of the best Go-To-Market agencies for B2B SaaS companies in 2026.',
            numberOfItems: 10,
            itemListElement: agencies.map((agency) => ({
              '@type': 'ListItem',
              position: agency.rank,
              name: agency.name,
              description: agency.description,
              url: `https://gtm.quest/agencies/${agency.slug}`,
            })),
          }),
        }}
      />
    </div>
  );
}
