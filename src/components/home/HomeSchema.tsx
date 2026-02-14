import { faqs } from './faqData';

export function HomeSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': 'https://gtm.quest/#organization',
    name: 'GTM Agency Quest',
    alternateName: ['GTM Quest', 'GTM Agency UK'],
    url: 'https://gtm.quest',
    logo: 'https://gtm.quest/gtm-agency-quest-favicon-blue.svg',
    description:
      'Leading GTM agency in the UK specializing in Clay-powered ABM systems and 4-channel methodology for B2B SaaS companies. Expert go-to-market strategy and execution.',
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'London',
    },
    areaServed: ['GB', 'US', 'EU'],
    serviceArea: {
      '@type': 'Place',
      name: 'United Kingdom',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://gtm.quest/contact',
    },
    knowsAbout: [
      'GTM agency services',
      'Go-to-market strategy',
      'B2B SaaS marketing',
      'Clay automation',
      'Account-based marketing',
      'Demand generation',
      'Revenue operations',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GTM Agency Quest',
    alternateName: 'GTM Quest',
    url: 'https://gtm.quest',
    description:
      'GTM agency for B2B SaaS startups. Go-to-market strategy and execution with 4-channel ABM, Clay-based prospecting, and full handover. Browse 200+ vetted GTM agencies.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://gtm.quest/agencies?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GTM Agency Quest',
    },
  };

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
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://gtm.quest/#service',
    serviceType: 'GTM Agency',
    name: 'GTM Agency Services',
    provider: {
      '@type': 'Organization',
      '@id': 'https://gtm.quest/#organization',
      name: 'GTM Agency Quest',
    },
    description:
      'Professional GTM agency services for B2B SaaS companies. Clay-powered ABM systems, 4-channel methodology, go-to-market strategy and execution with full handover.',
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'New Zealand' },
      { '@type': 'Country', name: 'Ireland' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'GTM Agency Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Demand Generation Agencies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Account-Based Marketing Agencies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'B2B Growth Agencies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'GTM Strategy Agencies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Revenue Operations Agencies',
          },
        },
      ],
    },
  };

  // ProfessionalService schema - positions GTM Quest as a GTM agency
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GTM Agency Quest',
    alternateName: 'GTM Quest',
    description:
      'GTM agency specializing in Clay-powered Account-Based Marketing (ABM) for B2B SaaS companies. Go-to-market strategy and execution with 4-channel ABM and GDPR-compliant systems.',
    url: 'https://gtm.quest',
    logo: 'https://gtm.quest/gtm-agency-quest-logo.png',
    image: 'https://gtm.quest/gtm-agency-quest-logo.png',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'London',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Ireland' },
      { '@type': 'Country', name: 'New Zealand' },
      { '@type': 'Place', name: 'Europe' },
    ],
    serviceType: [
      'Go-To-Market Strategy',
      'GTM Agency Services',
      'Account-Based Marketing',
      'Demand Generation',
      'Revenue Operations',
      'B2B Lead Generation',
      'Sales Enablement',
      'Clay Consulting',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'GTM Quest Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Quest System (4-Channel ABM)',
            description: 'LinkedIn Ads, Content Syndication, Intent Data, and AI Outbound combined into one systematic GTM motion.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'GTM Strategy Consulting',
            description: 'ICP development, market positioning, pricing strategy, and GTM planning.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Clay-Powered Prospecting',
            description: 'AI-enhanced data enrichment and hyper-personalized outbound using Clay workflows.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Revenue Operations',
            description: 'CRM implementation, marketing automation, and sales enablement.',
          },
        },
      ],
    },
    knowsAbout: [
      'Go-to-market strategy',
      'GTM agencies',
      'Account-based marketing',
      'B2B SaaS marketing',
      'Demand generation',
      'Clay data enrichment',
      'Revenue operations',
      'Sales enablement',
      'LinkedIn advertising',
      'Cold email outreach',
    ],
    slogan: 'GTM agency that builds revenue engines you own.',
  };

  // ItemList schema for Top 10 GTM Agencies ranking
  const topAgenciesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top 10 GTM Agencies 2026',
    description: 'Ranked list of the best Go-To-Market agencies for B2B SaaS companies in 2026, based on specialization, client results, and industry expertise.',
    numberOfItems: 10,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'GTM Quest',
        description: 'UK-based GTM agency specializing in Clay-powered ABM and systematic revenue engines for B2B SaaS.',
        url: 'https://gtm.quest/agencies/gtm-quest',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'SalesCaptain',
        description: 'Outbound sales specialists focusing on pipeline generation for B2B and SaaS companies.',
        url: 'https://gtm.quest/agencies/salescaptain',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'inBeat',
        description: 'Performance-driven agency combining influencer marketing with demand generation.',
        url: 'https://gtm.quest/agencies/inbeat',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Ironpaper',
        description: 'Enterprise B2B agency specializing in account-based marketing and complex sales cycles.',
        url: 'https://gtm.quest/agencies/ironpaper',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Ziggy',
        description: 'Demand generation agency focused on positioning and messaging for B2B startups.',
        url: 'https://gtm.quest/agencies/ziggy',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Deviate Labs',
        description: 'Growth marketing agency specializing in unconventional GTM strategies.',
        url: 'https://gtm.quest/agencies/deviate-labs',
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Refine Labs',
        description: 'Demand generation pioneers known for dark social and category creation strategies.',
        url: 'https://gtm.quest/agencies/refine-labs',
      },
      {
        '@type': 'ListItem',
        position: 8,
        name: 'Six & Flow',
        description: 'UK-based HubSpot Elite Partner specializing in RevOps and inbound marketing.',
        url: 'https://gtm.quest/agencies/six-and-flow',
      },
      {
        '@type': 'ListItem',
        position: 9,
        name: 'Single Grain',
        description: 'Full-service digital marketing agency with strong B2B SaaS expertise.',
        url: 'https://gtm.quest/agencies/single-grain',
      },
      {
        '@type': 'ListItem',
        position: 10,
        name: 'Kalungi',
        description: 'Fractional CMO and full-stack B2B SaaS marketing for early-stage companies.',
        url: 'https://gtm.quest/agencies/kalungi',
      },
    ],
  };

  // ItemList schema for geo-targeted agency sections
  const agencyListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GTM Agencies by Region',
    description: 'Top-rated go-to-market agencies organized by country and region for B2B demand generation, ABM, and revenue growth.',
    numberOfItems: 200,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'GTM Agencies in the United States',
        url: 'https://gtm.quest/#gtm-agencies-us',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'GTM Agencies in the United Kingdom',
        url: 'https://gtm.quest/#gtm-agencies-uk',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'GTM Agencies in Australia',
        url: 'https://gtm.quest/#gtm-agencies-au',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'GTM Agencies in Canada',
        url: 'https://gtm.quest/#gtm-agencies-ca',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'GTM Agencies in New Zealand',
        url: 'https://gtm.quest/#gtm-agencies-nz',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'GTM Agencies in Ireland',
        url: 'https://gtm.quest/#gtm-agencies-ie',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(topAgenciesSchema) }}
      />
    </>
  );
}
