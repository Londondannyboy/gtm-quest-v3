import { getAllAgencySlugs, getAgencyBySlug, getRelatedAgencies, Agency } from '@/lib/agencies';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Generate static params for all agencies
export async function generateStaticParams() {
  const slugs = await getAllAgencySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each agency page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);

  if (!agency) {
    return { title: 'Agency Not Found | GTM Quest' };
  }

  const specializations = agency.specializations?.slice(0, 3).join(', ') || 'GTM';

  return {
    title: `${agency.name} | GTM Agency | GTM Quest`,
    description: agency.description || `${agency.name} is a GTM agency specializing in ${specializations}. Based in ${agency.headquarters || 'globally'}.`,
    openGraph: {
      title: `${agency.name} - GTM Agency`,
      description: agency.description || `GTM agency specializing in ${specializations}`,
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

function RelatedAgencyCard({ agency }: { agency: Agency }) {
  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="block bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition"
    >
      <h4 className="font-semibold text-white mb-1">{agency.name}</h4>
      <p className="text-white/50 text-sm line-clamp-1">
        {agency.headquarters || 'Global'}
      </p>
    </Link>
  );
}

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [agency, relatedAgencies] = await Promise.all([
    getAgencyBySlug(slug),
    getRelatedAgencies(slug, 4),
  ]);

  if (!agency) {
    notFound();
  }

  // JSON-LD structured data - using LocalBusiness for better local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://gtm.quest/agencies/${agency.slug}`,
    name: agency.name,
    description: agency.description,
    url: agency.website,
    image: agency.logo_url || 'https://gtm.quest/favicon.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: agency.headquarters?.split(',')[0]?.trim(),
      addressCountry: agency.headquarters?.includes('US') ? 'US' :
                      agency.headquarters?.includes('UK') ? 'GB' :
                      agency.headquarters?.includes('Australia') ? 'AU' : undefined,
    },
    areaServed: agency.service_areas?.map(area => ({
      '@type': 'GeoCircle',
      name: area,
    })),
    knowsAbout: agency.specializations,
    priceRange: agency.min_budget ? `$${agency.min_budget.toLocaleString()}+/month` : '$$',
    aggregateRating: agency.avg_rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: agency.avg_rating,
          reviewCount: agency.review_count || 1,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    sameAs: agency.website ? [agency.website] : [],
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://gtm.quest',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'GTM Agencies',
        item: 'https://gtm.quest/agencies',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: agency.name,
        item: `https://gtm.quest/agencies/${agency.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/agencies" className="hover:text-white transition">
                  Agencies
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{agency.name}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold">{agency.name}</h1>
              {agency.global_rank && agency.global_rank <= 50 && (
                <span className="bg-emerald-500/20 text-emerald-400 text-sm px-3 py-1.5 rounded-full">
                  Ranked #{agency.global_rank}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-white/60">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {agency.headquarters || 'Global'}
              </span>
              {agency.min_budget && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  From ${agency.min_budget.toLocaleString()}/mo
                </span>
              )}
              {agency.avg_rating && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {agency.avg_rating.toFixed(1)} ({agency.review_count || 0} reviews)
                </span>
              )}
            </div>
          </header>

          {/* Description */}
          <section className="mb-8">
            <p className="text-white/70 text-lg leading-relaxed">
              {agency.description || `${agency.name} is a go-to-market agency helping B2B companies accelerate growth through strategic marketing and sales initiatives.`}
            </p>
          </section>

          {/* Specializations */}
          {agency.specializations && agency.specializations.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {agency.specializations.map((spec) => (
                  <Link
                    key={spec}
                    href={`/agencies?specialization=${encodeURIComponent(spec.toLowerCase())}`}
                    className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-lg text-sm hover:bg-emerald-500/20 transition"
                  >
                    {spec}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Service Areas */}
          {agency.service_areas && agency.service_areas.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Service Regions</h2>
              <div className="flex flex-wrap gap-2">
                {agency.service_areas.map((area) => (
                  <span
                    key={area}
                    className="bg-zinc-800 text-white/60 px-3 py-1.5 rounded-lg text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl p-8 mb-8 border border-emerald-500/20">
            <h2 className="text-2xl font-bold mb-2">Ready to work with {agency.name}?</h2>
            <p className="text-white/60 mb-6">
              Get matched with this agency and others based on your specific needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#chat"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Build Your GTM Plan
              </Link>
              {agency.website && (
                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
                >
                  Visit Website
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </section>

          {/* Related Agencies */}
          {relatedAgencies.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Similar Agencies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedAgencies.map((related) => (
                  <RelatedAgencyCard key={related.id} agency={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
