import { faqs } from './faqData';

export function HomeSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GTM Agency Quest',
    alternateName: 'GTM Quest',
    url: 'https://gtm.quest',
    logo: 'https://gtm.quest/favicon.svg',
    description:
      'GTM agency matching powered by AI. Build your go-to-market strategy and connect with 200+ B2B growth agencies for demand generation, ABM, and revenue growth.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://gtm.quest/dashboard',
    },
    knowsAbout: [
      'Go-to-market strategy',
      'GTM agencies',
      'B2B marketing',
      'Demand generation',
      'Account-based marketing',
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
      'AI-powered GTM agency matching. Find the perfect go-to-market agency partner from 200+ vetted B2B growth specialists for demand generation, ABM, and B2B SaaS growth.',
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
    serviceType: 'GTM Agency Matching',
    provider: {
      '@type': 'Organization',
      name: 'GTM Agency Quest',
    },
    description:
      'Free AI-powered matching service connecting B2B companies with specialized GTM agencies for demand generation, ABM, and growth.',
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
    </>
  );
}
