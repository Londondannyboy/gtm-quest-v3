import Link from 'next/link';
import { Agency, COUNTRY_CONFIG, CountryCode } from '@/lib/agencies';

interface CountrySectionsProps {
  agenciesByCountry: Record<CountryCode, Agency[]>;
}

function AgencyMiniCard({ agency }: { agency: Agency }) {
  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="block bg-zinc-900/50 rounded-lg p-4 border border-white/5 hover:border-emerald-500/30 transition group"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold text-white group-hover:text-emerald-400 transition text-sm block">
          {agency.name}
        </span>
        {agency.global_rank && agency.global_rank <= 50 && (
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-1.5 py-0.5 rounded">
            #{agency.global_rank}
          </span>
        )}
      </div>
      <p className="text-white/60 text-xs line-clamp-2 mb-2">
        {agency.description?.slice(0, 100) || 'B2B GTM agency'}...
      </p>
      {agency.key_services && agency.key_services.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {agency.key_services.slice(0, 2).map((service) => (
            <span key={service} className="bg-white/5 text-white/60 text-xs px-1.5 py-0.5 rounded">
              {service}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function CountrySection({
  countryCode,
  agencies
}: {
  countryCode: CountryCode;
  agencies: Agency[];
}) {
  const config = COUNTRY_CONFIG[countryCode];

  if (agencies.length === 0) return null;

  // Create anchor ID for deep linking
  const anchorId = `gtm-agencies-${countryCode.toLowerCase()}`;

  return (
    <section id={anchorId} className="scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">{config.flag}</span>
          <span>GTM Agencies in {config.name}</span>
        </h3>
        <Link
          href={`/agencies/country/${countryCode.toLowerCase()}`}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
        >
          Browse all {config.name} GTM agencies →
        </Link>
      </div>

      <p className="text-white/60 text-sm mb-4">
        Top-rated go-to-market agencies based in {config.name} specializing in B2B demand generation,
        ABM, and revenue growth strategies.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agencies.map((agency) => (
          <AgencyMiniCard key={agency.id} agency={agency} />
        ))}
      </div>
    </section>
  );
}

export function CountrySections({ agenciesByCountry }: CountrySectionsProps) {
  // Order: US first (most impressions), then UK (has clicks), then AU, CA, NZ, IE
  const countryOrder: CountryCode[] = ['US', 'UK', 'AU', 'CA', 'NZ', 'IE'];

  return (
    <div className="bg-black py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header with internal link target */}
        <div id="gtm-agencies-by-country" className="text-center mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Find a GTM Agency Near You
          </h2>
          <h4 className="text-lg text-emerald-400 font-medium mb-2">GTM Agency Directory by Region</h4>
          <p className="text-white/60 max-w-2xl mx-auto">
            Browse go-to-market agencies by region. Whether you need a local partner
            or a global team, find the right GTM agency for your B2B growth strategy.
          </p>

          {/* Quick jump links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {countryOrder.map((code) => {
              const config = COUNTRY_CONFIG[code];
              const count = agenciesByCountry[code]?.length || 0;
              if (count === 0) return null;
              return (
                <a
                  key={code}
                  href={`#gtm-agencies-${code.toLowerCase()}`}
                  className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white text-sm px-3 py-1.5 rounded-full transition"
                >
                  <span>{config.flag}</span>
                  <span>{config.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Country sections */}
        <div className="space-y-12">
          {countryOrder.map((code) => (
            <CountrySection
              key={code}
              countryCode={code}
              agencies={agenciesByCountry[code] || []}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60 mb-4">
            Can&apos;t find what you&apos;re looking for? Browse our full directory of 200+ GTM agencies.
          </p>
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-lg transition"
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
