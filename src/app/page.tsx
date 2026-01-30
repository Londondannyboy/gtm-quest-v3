import { getArticles } from '@/lib/content';
import { getAllAgencies } from '@/lib/agencies';
import { HomeClient } from '@/components/home/HomeClient';
import { SEOContent } from '@/components/home/SEOContent';
import { ExplainerSection } from '@/components/home/ExplainerSection';
import { FAQSection } from '@/components/home/FAQSection';
import { HomeSchema } from '@/components/home/HomeSchema';
import { TLDRSection } from '@/components/home/TLDRSection';
import { TableOfContents } from '@/components/home/TableOfContents';
import { TopAgencies2026 } from '@/components/home/TopAgencies2026';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your GTM Agency | AI-Powered Go-To-Market Matching',
  description: 'GTM agency matching powered by AI. Build your go-to-market strategy and connect with 200+ vetted B2B growth agencies for demand generation, ABM, and revenue growth. Free matching service.',
  alternates: {
    canonical: 'https://gtm.quest',
  },
  openGraph: {
    title: 'Find Your GTM Agency | AI-Powered Go-To-Market Matching',
    description: 'GTM agency matching powered by AI. Connect with 200+ vetted B2B growth agencies for demand generation, ABM, and revenue growth.',
    type: 'website',
    url: 'https://gtm.quest',
    siteName: 'GTM Agency Quest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your GTM Agency | AI-Powered Go-To-Market Matching',
    description: 'GTM agency matching powered by AI. Connect with 200+ vetted B2B growth agencies.',
  },
  keywords: [
    'GTM agency',
    'go-to-market agency',
    'B2B marketing agency',
    'demand generation agency',
    'ABM agency',
    'GTM strategy',
    'best GTM agency',
    'GTM agency USA',
    'GTM agency UK',
    'GTM agency Europe',
    'B2B growth agency',
    'SaaS marketing agency',
  ],
};

// Revalidate every hour for fresh agency data
export const revalidate = 3600;

export default async function Home() {
  // Fetch data for SEO content
  const [articles, agencies] = await Promise.all([
    getArticles(),
    getAllAgencies(),
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

      {/* Client-side interactive app (Hero) */}
      <HomeClient />

      {/* TL;DR Quick Summary */}
      <div id="tldr">
        <TLDRSection />
      </div>

      {/* Table of Contents for navigation */}
      <div className="max-w-4xl mx-auto px-4">
        <TableOfContents />
      </div>

      {/* What is GTM Agency Matching - Explainer section */}
      <div id="what-is-gtm">
        <ExplainerSection />
      </div>

      {/* Top 10 GTM Agencies 2026 */}
      <TopAgencies2026 agencies={topAgencies} />

      {/* Server-rendered SEO content (Resources, Industry Insights) */}
      <div id="resources">
        <SEOContent featuredArticles={articles} topAgencies={topAgencies} />
      </div>

      {/* FAQ Section with schema */}
      <div id="faq">
        <FAQSection />
      </div>
    </>
  );
}
