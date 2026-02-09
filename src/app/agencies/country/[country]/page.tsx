import { getAllAgenciesByCountry, COUNTRY_CONFIG, CountryCode, Agency } from '@/lib/agencies';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Valid country codes for static generation
const VALID_COUNTRIES = Object.keys(COUNTRY_CONFIG) as CountryCode[];

export async function generateStaticParams() {
  return VALID_COUNTRIES.map((country) => ({
    country: country.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const countryCode = country.toUpperCase() as CountryCode;

  if (!COUNTRY_CONFIG[countryCode]) {
    return { title: 'Not Found' };
  }

  const config = COUNTRY_CONFIG[countryCode];

  return {
    title: `GTM Agencies in ${config.name} | Go-To-Market Agencies | GTM Quest`,
    description: `Browse GTM agencies based in ${config.name}. Find go-to-market agencies specializing in demand generation, ABM, and B2B growth strategies for the ${config.name} market.`,
    alternates: {
      canonical: `https://gtm.quest/agencies/country/${country.toLowerCase()}`,
    },
    openGraph: {
      title: `GTM Agencies in ${config.name} | GTM Quest`,
      description: `Browse go-to-market agencies based in ${config.name}. Find your GTM partner.`,
      url: `https://gtm.quest/agencies/country/${country.toLowerCase()}`,
      images: [
        {
          url: 'https://gtm.quest/gtm-agency-quest-logo.png',
          width: 512,
          height: 512,
          alt: `GTM Agencies in ${config.name}`,
        },
      ],
    },
  };
}

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
        {agency.b2b_description || agency.description || 'GTM agency specializing in B2B growth and demand generation.'}
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

export default async function CountryAgenciesPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const countryCode = country.toUpperCase() as CountryCode;

  // Validate country code
  if (!COUNTRY_CONFIG[countryCode]) {
    notFound();
  }

  const config = COUNTRY_CONFIG[countryCode];
  const agencies = await getAllAgenciesByCountry(countryCode);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-white/40">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li><Link href="/agencies" className="hover:text-white">Agencies</Link></li>
            <li>/</li>
            <li className="text-white">{config.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{config.flag}</span>
            <h1 className="text-4xl font-bold">GTM Agencies in {config.name}</h1>
          </div>
          <p className="text-white/60 text-lg max-w-2xl">
            Browse {agencies.length} go-to-market agencies based in {config.name}, specializing in
            demand generation, ABM, sales enablement, and B2B growth strategies.
          </p>
        </header>

        {/* Results count */}
        <p className="text-white/40 text-sm mb-6">
          Showing {agencies.length} {agencies.length === 1 ? 'agency' : 'agencies'} in {config.name}
        </p>

        {/* Agency grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>

        {agencies.length === 0 && (
          <div className="bg-zinc-900 rounded-xl p-12 text-center">
            <p className="text-white/60 mb-4">No agencies found in {config.name}.</p>
            <Link href="/agencies" className="text-emerald-400 hover:text-emerald-300">
              View all agencies
            </Link>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold mb-6">GTM Agencies Based in {config.name}</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 mb-4">
              Looking for a go-to-market agency in {config.name}? Our directory features {agencies.length}+ agencies
              specializing in demand generation, account-based marketing, content marketing, and sales enablement
              for the {config.name} market.
            </p>
            <p className="text-white/60">
              Whether you need a local partner who understands the {config.name} business landscape or a team
              with regional expertise, find the right GTM agency to accelerate your B2B growth.
            </p>
          </div>
        </section>

        {/* Other Countries */}
        <section className="mt-12 border-t border-white/10 pt-12">
          <h3 className="text-lg font-semibold text-white mb-4">Browse by Other Regions</h3>
          <div className="flex flex-wrap gap-2">
            {VALID_COUNTRIES.filter((c) => c !== countryCode).map((code) => {
              const otherConfig = COUNTRY_CONFIG[code];
              return (
                <Link
                  key={code}
                  href={`/agencies/country/${code.toLowerCase()}`}
                  className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white text-sm px-3 py-1.5 rounded-full transition"
                >
                  <span>{otherConfig.flag}</span>
                  <span>{otherConfig.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            View All GTM Agencies
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
