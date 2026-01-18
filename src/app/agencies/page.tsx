import { getAllAgencies, getSpecializations, Agency } from '@/lib/agencies';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GTM Agencies Directory | GTM Quest',
  description: 'Browse 200+ go-to-market agencies specializing in demand generation, ABM, sales enablement, and B2B growth. Find the perfect partner for your GTM strategy.',
};

// Revalidate every hour
export const revalidate = 3600;

function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="block bg-zinc-900 rounded-xl p-6 border border-white/10 hover:border-emerald-500/30 transition group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
          {agency.name}
        </h3>
        {agency.global_rank && agency.global_rank <= 50 && (
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
            Top {agency.global_rank}
          </span>
        )}
      </div>

      <p className="text-white/60 text-sm mb-4 line-clamp-2">
        {agency.description || 'GTM agency specializing in B2B growth and demand generation.'}
      </p>

      <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {agency.headquarters || 'Global'}
        </span>
        {agency.min_budget && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            From ${agency.min_budget.toLocaleString()}/mo
          </span>
        )}
      </div>

      {agency.specializations && agency.specializations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {agency.specializations.slice(0, 4).map((spec) => (
            <span
              key={spec}
              className="bg-white/5 text-white/50 text-xs px-2 py-1 rounded"
            >
              {spec}
            </span>
          ))}
          {agency.specializations.length > 4 && (
            <span className="text-white/30 text-xs py-1">
              +{agency.specializations.length - 4} more
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ specialization?: string }>;
}) {
  const params = await searchParams;
  const [agencies, specializations] = await Promise.all([
    getAllAgencies(),
    getSpecializations(),
  ]);

  // Filter by specialization if provided
  const filteredAgencies = params.specialization
    ? agencies.filter((a) =>
        a.specializations?.some((s) =>
          s.toLowerCase().includes(params.specialization!.toLowerCase())
        )
      )
    : agencies;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">GTM Agency Directory</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Browse {agencies.length}+ go-to-market agencies specializing in demand generation,
            ABM, sales enablement, and B2B growth strategies.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/agencies"
              className={`px-4 py-2 rounded-lg text-sm transition ${
                !params.specialization
                  ? 'bg-emerald-500 text-white'
                  : 'bg-zinc-800 text-white/60 hover:bg-zinc-700'
              }`}
            >
              All
            </Link>
            {['Demand Generation', 'ABM', 'Content Marketing', 'SEO', 'Paid Media', 'Sales Enablement'].map((spec) => (
              <Link
                key={spec}
                href={`/agencies?specialization=${encodeURIComponent(spec.toLowerCase())}`}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  params.specialization?.toLowerCase() === spec.toLowerCase()
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-800 text-white/60 hover:bg-zinc-700'
                }`}
              >
                {spec}
              </Link>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-white/40 text-sm mb-6">
          Showing {filteredAgencies.length} {filteredAgencies.length === 1 ? 'agency' : 'agencies'}
          {params.specialization && ` for "${params.specialization}"`}
        </p>

        {/* Agency grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="bg-zinc-900 rounded-xl p-12 text-center">
            <p className="text-white/60 mb-4">No agencies found matching your criteria.</p>
            <Link href="/agencies" className="text-emerald-400 hover:text-emerald-300">
              View all agencies
            </Link>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold mb-6">Find the Right GTM Agency</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 mb-4">
              Choosing the right go-to-market agency is crucial for B2B companies looking to accelerate growth.
              Our directory features agencies specializing in demand generation, account-based marketing,
              content marketing, and sales enablement.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Popular Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {specializations.slice(0, 20).map((spec) => (
                <Link
                  key={spec}
                  href={`/agencies?specialization=${encodeURIComponent(spec.toLowerCase())}`}
                  className="bg-zinc-800 text-white/60 hover:text-white text-sm px-3 py-1.5 rounded transition"
                >
                  {spec}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
