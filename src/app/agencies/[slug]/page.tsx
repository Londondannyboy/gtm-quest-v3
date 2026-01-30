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
    return { title: 'Agency Not Found | GTM Agency Quest' };
  }

  const specializations = agency.specializations?.slice(0, 3).join(', ') || 'GTM';
  const metaDescription = agency.b2b_description || agency.description ||
    `${agency.name} is a GTM agency specializing in ${specializations}. Based in ${agency.headquarters || 'globally'}.`;

  return {
    title: `${agency.name} | GTM Agency Review & Services | GTM Agency Quest`,
    description: metaDescription.slice(0, 160),
    keywords: [
      agency.name,
      'GTM agency',
      'go-to-market agency',
      ...(agency.specializations || []),
      agency.headquarters || '',
    ].filter(Boolean),
    openGraph: {
      title: `${agency.name} - GTM Agency`,
      description: metaDescription.slice(0, 160),
      type: 'website',
      siteName: 'GTM Agency Quest',
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

// Service icon mapping
const serviceIcons: Record<string, string> = {
  'AI': '🤖',
  'Outbound': '📤',
  'GTM': '🚀',
  'RevOps': '⚙️',
  'Multi-Channel': '📡',
  'Pipeline': '📈',
  'Account': '🎯',
  'Intelligence': '🧠',
  'Marketing': '📣',
  'Sales': '💼',
  'Content': '📝',
  'SEO': '🔍',
  'Demand': '📊',
  'ABM': '🏢',
  'Growth': '📈',
  'Strategy': '🎯',
  'Email': '✉️',
  'Social': '📱',
  'Paid': '💰',
  'Brand': '✨',
  'Analytics': '📉',
  'Automation': '🔄',
  'Default': '💡',
};

function getServiceIcon(service: string): string {
  for (const [key, icon] of Object.entries(serviceIcons)) {
    if (service.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return serviceIcons.Default;
}

// Best For descriptions based on specializations
function getBestForItems(specializations: string[]): { title: string; description: string }[] {
  const bestForMap: Record<string, { title: string; description: string }> = {
    'Outbound Sales': { title: 'Sales-Led Companies', description: 'Teams building predictable outbound pipeline' },
    'Pipeline Generation': { title: 'Growth-Stage Startups', description: 'Companies scaling their sales operations' },
    'B2B SaaS': { title: 'B2B SaaS Companies', description: 'Software companies seeking product-market fit' },
    'Lead Generation': { title: 'Revenue Teams', description: 'Organizations focused on lead quality' },
    'Demand Generation': { title: 'Marketing Teams', description: 'Teams building inbound + outbound engines' },
    'Content Marketing': { title: 'Thought Leaders', description: 'Companies building authority through content' },
    'ABM': { title: 'Enterprise Sales', description: 'Teams targeting high-value accounts' },
    'Account-Based Marketing': { title: 'Enterprise B2B', description: 'Companies with defined target account lists' },
    'SEO': { title: 'Organic Growth', description: 'Teams investing in sustainable traffic' },
    'Product-Led Growth': { title: 'PLG Companies', description: 'Product-first growth strategies' },
    'Growth Marketing': { title: 'Hypergrowth Startups', description: 'Companies scaling rapidly' },
    'Marketing Automation': { title: 'Scaling Operations', description: 'Teams automating their go-to-market' },
    'B2B Strategy': { title: 'Strategic Planning', description: 'Companies defining their market approach' },
    'Paid Media': { title: 'Performance Marketing', description: 'Teams focused on paid acquisition' },
    'Email Marketing': { title: 'Nurture Campaigns', description: 'Building long-term customer relationships' },
    'LinkedIn Marketing': { title: 'B2B Social', description: 'LinkedIn-focused demand generation' },
  };

  const items: { title: string; description: string }[] = [];
  const seen = new Set<string>();

  for (const spec of specializations) {
    if (bestForMap[spec] && !seen.has(bestForMap[spec].title)) {
      items.push(bestForMap[spec]);
      seen.add(bestForMap[spec].title);
    }
    if (items.length >= 4) break;
  }

  // Add generic items if we don't have enough
  if (items.length < 2) {
    if (!seen.has('B2B Companies')) {
      items.push({ title: 'B2B Companies', description: 'Organizations selling to other businesses' });
    }
    if (!seen.has('Growth Teams')) {
      items.push({ title: 'Growth Teams', description: 'Marketing and sales alignment' });
    }
  }

  return items.slice(0, 4);
}

function RelatedAgencyCard({ agency }: { agency: Agency }) {
  return (
    <Link
      href={`/agencies/${agency.slug}`}
      className="group block bg-zinc-900 rounded-xl p-5 hover:bg-zinc-800 transition border border-zinc-800 hover:border-emerald-500/30"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-white group-hover:text-emerald-400 transition">{agency.name}</h4>
        {agency.global_rank && agency.global_rank <= 50 && (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            #{agency.global_rank}
          </span>
        )}
      </div>
      <p className="text-white/50 text-sm mb-3 line-clamp-2">
        {agency.description?.slice(0, 100) || 'GTM agency'}...
      </p>
      <div className="flex items-center gap-2 text-white/40 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {agency.headquarters || 'Global'}
      </div>
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

  // Use b2b_description if available, otherwise fall back to description
  const fullDescription = agency.b2b_description || agency.description;
  const bestForItems = getBestForItems(agency.specializations || []);

  // JSON-LD structured data - using LocalBusiness for better local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://gtm.quest/agencies/${agency.slug}`,
    name: agency.name,
    description: fullDescription,
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
    foundingDate: agency.founded_year ? `${agency.founded_year}` : undefined,
    numberOfEmployees: agency.employee_count ? {
      '@type': 'QuantitativeValue',
      value: agency.employee_count,
    } : undefined,
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
        {/* Breadcrumb */}
        <div className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav>
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
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left: Agency Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  {agency.logo_url ? (
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={agency.logo_url} alt={agency.name} className="w-12 h-12 object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl font-bold text-emerald-400">
                      {agency.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">{agency.name}</h1>
                    <div className="flex flex-wrap items-center gap-3">
                      {agency.global_rank && agency.global_rank <= 50 && (
                        <span className="bg-emerald-500/20 text-emerald-400 text-sm px-3 py-1 rounded-full font-medium">
                          Top {agency.global_rank} GTM Agency
                        </span>
                      )}
                      {agency.avg_rating && (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {agency.avg_rating.toFixed(1)} ({agency.review_count || 0} reviews)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Summary */}
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  {agency.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#chat"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Get Matched
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
              </div>

              {/* Right: Quick Stats Card */}
              <div className="lg:w-80 bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">At a Glance</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Headquarters</p>
                      <p className="font-medium">{agency.headquarters || 'Global'}</p>
                    </div>
                  </div>

                  {agency.min_budget && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Starting From</p>
                        <p className="font-medium">${agency.min_budget.toLocaleString()}/month</p>
                      </div>
                    </div>
                  )}

                  {agency.founded_year && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Founded</p>
                        <p className="font-medium">{agency.founded_year}</p>
                      </div>
                    </div>
                  )}

                  {agency.employee_count && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Team Size</p>
                        <p className="font-medium">{agency.employee_count}+ employees</p>
                      </div>
                    </div>
                  )}

                  {agency.service_areas && agency.service_areas.length > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Service Regions</p>
                        <p className="font-medium">{agency.service_areas.slice(0, 3).join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Section */}
              {fullDescription && fullDescription.length > 100 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    About {agency.name}
                  </h2>
                  <div className="prose prose-invert prose-emerald max-w-none">
                    <p className="text-white/70 leading-relaxed text-lg">
                      {fullDescription}
                    </p>
                  </div>
                </section>
              )}

              {/* Key Services */}
              {agency.key_services && agency.key_services.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </span>
                    Key Services
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {agency.key_services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 hover:border-emerald-500/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getServiceIcon(service)}</span>
                          <span className="font-medium">{service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Best For Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Best For
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {bestForItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 rounded-xl p-5 border border-zinc-800"
                    >
                      <h3 className="font-semibold text-emerald-400 mb-1">{item.title}</h3>
                      <p className="text-sm text-white/60">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specializations */}
              {agency.specializations && agency.specializations.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </span>
                    Specializations
                  </h2>
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
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-2">Ready to work with {agency.name}?</h3>
                <p className="text-white/60 mb-4 text-sm">
                  Get matched with this agency and others based on your specific needs.
                </p>
                <Link
                  href="/#chat"
                  className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center px-6 py-3 rounded-lg font-medium transition"
                >
                  Start Matching
                </Link>
              </div>

              {/* Service Regions */}
              {agency.service_areas && agency.service_areas.length > 0 && (
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Service Regions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {agency.service_areas.map((area) => (
                      <span
                        key={area}
                        className="bg-zinc-800 text-white/70 px-3 py-1.5 rounded-lg text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Study Link */}
              {agency.case_study_url && (
                <a
                  href={agency.case_study_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-emerald-500/30 transition group"
                >
                  <h3 className="font-bold mb-2 flex items-center gap-2 group-hover:text-emerald-400 transition">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Case Studies
                  </h3>
                  <p className="text-sm text-white/60">
                    See real results from {agency.name}&apos;s clients
                  </p>
                </a>
              )}
            </div>
          </div>

          {/* Related Agencies */}
          {relatedAgencies.length > 0 && (
            <section className="mt-16 pt-12 border-t border-zinc-800">
              <h2 className="text-2xl font-bold mb-6">Similar GTM Agencies</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedAgencies.map((related) => (
                  <RelatedAgencyCard key={related.id} agency={related} />
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="mt-16 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-8 lg:p-12 border border-emerald-500/20 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Find the Perfect GTM Agency for Your Business
            </h2>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto">
              Our AI-powered matching tool analyzes your needs and connects you with the best-fit agencies from our directory of 200+ vetted GTM partners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#chat"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Get Free Recommendations
              </Link>
              <Link
                href="/agencies"
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Browse All Agencies
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
