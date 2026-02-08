import Link from 'next/link';
import { Agency } from '@/lib/agencies';

interface TopAgencies2026Props {
  agencies: Agency[];
}

// Default data for agencies without listicle fields populated
const defaultListicleData = {
  badge: 'GTM Agency',
  fee: 'Contact',
  engagement: '6+ months',
  icon: '🎯',
  bestFor: 'B2B Marketing'
};

export function TopAgencies2026({ agencies }: TopAgencies2026Props) {
  const top10 = agencies.slice(0, 10);

  return (
    <section id="top-agencies-2026" className="py-16 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            2026 Rankings
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            10 Best GTM Agencies UK
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Ranked comparison of the <strong className="text-white">best GTM agencies</strong> for B2B SaaS,
            demand generation, and go-to-market execution in 2026.
          </p>
        </div>

        {/* What is a GTM Agency - Educational Content */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            What is a GTM Agency?
          </h3>
          <div className="space-y-4 text-white/70">
            <p>
              A <strong className="text-white">GTM agency</strong> (Go-To-Market agency) specialises in helping
              B2B companies launch products, enter new markets, and build predictable revenue engines. Unlike
              traditional marketing agencies, GTM agencies focus on the entire revenue motion—from positioning
              and messaging to demand generation and sales enablement.
            </p>
            <p>
              The best <strong className="text-white">GTM agencies</strong> combine strategic consulting with
              hands-on execution across multiple channels: content marketing, ABM campaigns, LinkedIn outbound,
              paid media, and sales development. They understand that marketing and sales must work together
              to drive pipeline and revenue.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-full">
              Demand Generation
            </span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm rounded-full">
              Account-Based Marketing
            </span>
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm rounded-full">
              Sales Enablement
            </span>
            <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm rounded-full">
              Revenue Operations
            </span>
          </div>
        </div>

        {/* Ranked Listicle */}
        <div className="space-y-6">
          {top10.map((agency, index) => {
            // Use database listicle fields, fall back to defaults
            const data = {
              badge: agency.listicle_badge || defaultListicleData.badge,
              fee: agency.listicle_fee || defaultListicleData.fee,
              engagement: agency.listicle_engagement || defaultListicleData.engagement,
              icon: agency.listicle_icon || defaultListicleData.icon,
              bestFor: agency.listicle_best_for || defaultListicleData.bestFor,
            };
            const isHighlighted = agency.listicle_highlight || false;

            return (
              <Link
                key={agency.id}
                href={`/agencies/${agency.slug}`}
                className={`relative block border-2 rounded-2xl p-6 md:p-8 transition-all group ${
                  isHighlighted
                    ? 'border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10'
                    : 'border-white/10 bg-zinc-900/50 hover:border-emerald-500/30 hover:bg-zinc-900'
                }`}
              >
                {/* Rank Badge */}
                <div className={`absolute -top-4 -left-2 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg ${
                  isHighlighted ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-white border border-white/20'
                }`}>
                  #{index + 1}
                </div>

                {/* Award Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    isHighlighted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-white/80'
                  }`}>
                    {data.badge}
                  </span>
                </div>

                <div className="ml-8 mt-2">
                  {/* Agency Name & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{data.icon}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition">
                      {agency.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 mb-4 line-clamp-2">
                    {agency.b2b_description || agency.description}
                  </p>

                  {/* Stats Chips */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className={`px-4 py-2 rounded-lg ${
                      isHighlighted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/70'
                    }`}>
                      <span className="font-bold">Fee:</span> {data.fee}
                    </div>
                    <div className="bg-white/5 text-white/70 px-4 py-2 rounded-lg">
                      <span className="font-bold">Engagement:</span> {data.engagement}
                    </div>
                    <div className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-lg">
                      Best for: {data.bestFor}
                    </div>
                    {agency.headquarters && (
                      <div className="bg-white/5 text-white/50 px-4 py-2 rounded-lg">
                        📍 {agency.headquarters}
                      </div>
                    )}
                  </div>

                  {/* Specializations */}
                  {agency.specializations && agency.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {agency.specializations.slice(0, 4).map((spec) => (
                        <span
                          key={spec}
                          className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-emerald-400 font-bold">View Profile →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition text-lg"
          >
            View All 200+ GTM Agencies
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Key Services Grid */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition">
            <div className="text-2xl mb-3">📈</div>
            <h4 className="font-semibold text-white mb-2">Demand Generation</h4>
            <p className="text-white/50 text-sm">Creating awareness and pipeline through content, paid media, and inbound marketing.</p>
            <Link href="/agencies?specialization=demand-generation" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies →
            </Link>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition">
            <div className="text-2xl mb-3">🎯</div>
            <h4 className="font-semibold text-white mb-2">Account-Based Marketing</h4>
            <p className="text-white/50 text-sm">Targeted campaigns for high-value enterprise accounts with personalized outreach.</p>
            <Link href="/agencies?specialization=abm" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies →
            </Link>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition">
            <div className="text-2xl mb-3">🤝</div>
            <h4 className="font-semibold text-white mb-2">Sales Enablement</h4>
            <p className="text-white/50 text-sm">Tools, content, and processes to improve sales effectiveness and close rates.</p>
            <Link href="/agencies?specialization=sales-enablement" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies →
            </Link>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition">
            <div className="text-2xl mb-3">⚙️</div>
            <h4 className="font-semibold text-white mb-2">Revenue Operations</h4>
            <p className="text-white/50 text-sm">Systems and processes aligning marketing, sales, and customer success.</p>
            <Link href="/agencies?specialization=revops" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies →
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">GTM Agency FAQ</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                How much does a GTM agency cost?
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-white/60">
                GTM agency fees typically range from £5,000-£40,000 per month depending on scope and agency tier.
                Boutique agencies charge £5k-15k/mo, mid-market agencies £10k-25k/mo, and enterprise agencies £20k-40k+/mo.
                Most require 6-12 month minimum engagements.
              </p>
            </details>
            <details className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                What's the difference between a GTM agency and a marketing agency?
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-white/60">
                A GTM agency focuses on revenue outcomes and works across the entire funnel—from awareness to closed deals.
                Traditional marketing agencies often focus on top-of-funnel activities like brand and content.
                GTM agencies typically integrate with sales teams and measure success by pipeline generated, not just MQLs.
              </p>
            </details>
            <details className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                When should I hire a GTM agency?
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-white/60">
                Consider a GTM agency when: (1) You're launching a new product or entering new markets,
                (2) Your current marketing isn't generating qualified pipeline, (3) You need to scale faster than
                you can hire, or (4) You want proven playbooks rather than learning through trial and error.
              </p>
            </details>
            <details className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                What results should I expect from a GTM agency?
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-white/60">
                Good GTM agencies measure by revenue metrics: pipeline generated, opportunities created,
                and deals closed. Expect 3-6 months before seeing significant results.
                Typical outcomes include 2-3x improvement in qualified leads, 30-50% reduction in CAC,
                and measurable increase in sales velocity.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
