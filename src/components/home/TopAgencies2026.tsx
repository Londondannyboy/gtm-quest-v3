import Link from 'next/link';
import { Agency } from '@/lib/agencies';

interface TopAgencies2026Props {
  agencies: Agency[];
}

// Unsplash images for agency cards (business/marketing themed)
const agencyImages: Record<string, string> = {
  gtmquest: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  salescaptain: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
  inbeat: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
  ironpaper: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  ziggy: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop',
  deviatelabs: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
  refinelabs: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
  sixandflow: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
  singlegrain: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
  kalungi: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
};

const defaultImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop';

export function TopAgencies2026({ agencies }: TopAgencies2026Props) {
  const top10 = agencies.slice(0, 10);

  return (
    <section id="top-agencies-2026" className="py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Updated January 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top 10 GTM Agencies in 2026
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            The best go-to-market agencies for B2B SaaS, demand generation, ABM, and revenue growth.
            Hand-picked based on expertise, client results, and industry reputation.
          </p>
        </div>

        {/* Agency Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {top10.map((agency, index) => (
            <Link
              key={agency.id}
              href={`/agencies/${agency.slug}`}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:shadow-emerald-500/5"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={agencyImages[agency.slug] || defaultImage}
                  alt={`${agency.name} - GTM Agency`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition mb-1">
                  {agency.name}
                </h3>
                <p className="text-white/50 text-sm mb-3">
                  {agency.headquarters || 'Global'}
                </p>
                <p className="text-white/60 text-sm line-clamp-2 mb-4">
                  {agency.description?.slice(0, 120)}...
                </p>
                <div className="flex flex-wrap gap-2">
                  {agency.specializations?.slice(0, 2).map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            View All 200+ GTM Agencies
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Key Services Highlight */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
            <h4 className="font-semibold text-white mb-2">Demand Generation</h4>
            <p className="text-white/50 text-sm">Creating awareness and pipeline through content, paid media, and inbound marketing.</p>
            <Link href="/agencies?specialization=demand-generation" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies &rarr;
            </Link>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
            <h4 className="font-semibold text-white mb-2">Account-Based Marketing</h4>
            <p className="text-white/50 text-sm">Targeted campaigns for high-value enterprise accounts with personalized outreach.</p>
            <Link href="/agencies?specialization=abm" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies &rarr;
            </Link>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
            <h4 className="font-semibold text-white mb-2">Sales Enablement</h4>
            <p className="text-white/50 text-sm">Tools, content, and processes to improve sales effectiveness and close rates.</p>
            <Link href="/agencies?specialization=sales-enablement" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies &rarr;
            </Link>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
            <h4 className="font-semibold text-white mb-2">Revenue Operations</h4>
            <p className="text-white/50 text-sm">Systems and processes aligning marketing, sales, and customer success.</p>
            <Link href="/agencies?specialization=revops" className="text-emerald-400 text-sm mt-3 inline-block hover:text-emerald-300">
              Find agencies &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
