import { getArticles } from '@/lib/content';
import { getAllAgencies, getFeaturedAgenciesByRegion } from '@/lib/agencies';
import { HomeClient } from '@/components/home/HomeClient';
import { SEOContent } from '@/components/home/SEOContent';
import { FAQSection } from '@/components/home/FAQSection';
import { HomeSchema } from '@/components/home/HomeSchema';
import { TopAgencies2026 } from '@/components/home/TopAgencies2026';
import { CountrySections } from '@/components/home/CountrySections';
import { CTAPathwayCards } from '@/components/home/CTAPathwayCards';
import { SocialProof } from '@/components/home/SocialProof';
import { ProcessJourney } from '@/components/home/ProcessJourney';
import { QuestSystemSection } from '@/components/home/QuestSystemSection';
import { BuildYourOwnSection } from '@/components/home/BuildYourOwnSection';
import { DirectoryTeaser } from '@/components/home/DirectoryTeaser';
import { ABMApproachSection } from '@/components/home/ABMApproachSection';
import { EngagementModelsSection } from '@/components/home/EngagementModelsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GTM Agency Quest 2026 🚀 Go-To-Market Strategy & Execution',
  description: 'Go to market agency for B2B SaaS. GTM strategy & execution with 4-channel ABM and Clay-based outbound. GDPR-compliant revenue engines.',
  alternates: {
    canonical: 'https://gtm.quest',
    languages: {
      'en-US': 'https://gtm.quest#gtm-agencies-us',
      'en-GB': 'https://gtm.quest#gtm-agencies-uk',
      'en-AU': 'https://gtm.quest#gtm-agencies-au',
      'en-CA': 'https://gtm.quest#gtm-agencies-ca',
      'en-NZ': 'https://gtm.quest#gtm-agencies-nz',
      'en-IE': 'https://gtm.quest#gtm-agencies-ie',
      'x-default': 'https://gtm.quest',
    },
  },
  openGraph: {
    title: 'GTM Agency Quest 2026 🚀 Go-To-Market Strategy & Execution',
    description: 'Go to market agency for B2B SaaS. GTM strategy & execution with 4-channel ABM.',
    type: 'website',
    url: 'https://gtm.quest',
    siteName: 'GTM Agency Quest',
    images: [
      {
        url: 'https://gtm.quest/gtm-agency-quest-logo.png',
        width: 512,
        height: 512,
        alt: 'Go-To-Market Agency - GTM Strategy & Execution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM Agency Quest 2026 🚀 Go-To-Market Strategy & Execution',
    description: 'Go to market agency for B2B SaaS. GTM strategy & execution with 4-channel ABM.',
    images: ['https://gtm.quest/gtm-agency-quest-logo.png'],
  },
  keywords: [
    'GTM agency',
    'go-to-market agency',
    'go to market agency',
    'B2B marketing agency',
    'demand generation agency',
    'ABM agency',
    'GTM strategy',
    'best GTM agency',
    'GTM agency USA',
    'GTM agency United States',
    'GTM agency United Kingdom',
    'GTM agency Australia',
    'GTM agency Canada',
    'GTM agency New Zealand',
    'GTM agency Ireland',
    'B2B growth agency',
    'SaaS marketing agency',
    'Clay specialist',
    'revenue engine',
    '4-channel ABM',
  ],
};

// Revalidate every hour for fresh agency data
export const revalidate = 3600;

export default async function Home() {
  // Fetch data for SEO content
  const [articles, agencies, agenciesByCountry] = await Promise.all([
    getArticles(),
    getAllAgencies(),
    getFeaturedAgenciesByRegion(),
  ]);

  // Get top agencies (first 10 by global_rank for Top Agencies 2026 section)
  const topAgencies = agencies
    .filter((a) => a.global_rank !== null)
    .sort((a, b) => (a.global_rank || 999) - (b.global_rank || 999))
    .slice(0, 10);

  return (
    <>
      {/* Schema.org structured data */}
      <HomeSchema />

      {/* 1. Hero - Agency-First Positioning */}
      <HomeClient />

      {/* 2. CTA Pathway Cards - 2 options: Work With Us / Build Your Own */}
      <CTAPathwayCards />

      {/* 3. Quest System - How We Work (4-Channel ABM) */}
      <QuestSystemSection />

      {/* 4. ABM Approach - Value for Money (Starter vs Growth) */}
      <ABMApproachSection />

      {/* 5. Engagement Models - 4 ways to work with us */}
      <EngagementModelsSection />

      {/* 6. Social Proof - Stats & Trust Badges */}
      <SocialProof />

      {/* 5. Process Journey - Working With Us (4 Steps) */}
      <ProcessJourney />

      {/* 6. Build Your Own - DIY Tool Showcase */}
      <BuildYourOwnSection />

      {/* 7. Directory Teaser - Agency Directory Bridge */}
      <DirectoryTeaser />

      {/* 8. Top 10 GTM Agencies 2026 */}
      <TopAgencies2026 agencies={topAgencies} />

      {/* 9. GTM Agencies by Country - geo-targeted sections (SEO) */}
      <CountrySections agenciesByCountry={agenciesByCountry} />

      {/* 10. Server-rendered SEO content (Resources, Industry Insights) */}
      <div id="resources">
        <SEOContent featuredArticles={articles} topAgencies={topAgencies} />
      </div>

      {/* 11. FAQ Section with schema */}
      <div id="faq">
        <FAQSection />
      </div>

    </>
  );
}
