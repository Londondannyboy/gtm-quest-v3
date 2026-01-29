import { getArticles } from '@/lib/content';
import { getAllAgencies } from '@/lib/agencies';
import { HomeClient } from '@/components/home/HomeClient';
import { SEOContent } from '@/components/home/SEOContent';
import { ExplainerSection } from '@/components/home/ExplainerSection';
import { FAQSection } from '@/components/home/FAQSection';
import { HomeSchema } from '@/components/home/HomeSchema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GTM Agency Matching | AI-Powered Go-To-Market Strategy',
  description: 'GTM agency matching powered by AI. Build your go-to-market strategy and connect with 200+ vetted B2B growth agencies for demand generation and ABM.',
  alternates: {
    canonical: 'https://gtm.quest',
  },
  openGraph: {
    title: 'GTM Agency Matching | AI-Powered Go-To-Market Strategy',
    description: 'GTM agency matching powered by AI. Connect with 200+ vetted B2B growth agencies.',
    type: 'website',
    url: 'https://gtm.quest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM Agency Matching | AI-Powered Go-To-Market Strategy',
    description: 'GTM agency matching powered by AI. Connect with 200+ vetted B2B growth agencies.',
  },
};

// Revalidate every hour for fresh agency data
export const revalidate = 3600;

export default async function Home() {
  // Fetch data for SEO content
  const [articles, agencies] = await Promise.all([
    getArticles(),
    getAllAgencies(),
  ]);

  // Get top agencies (first 8 by global_rank)
  const topAgencies = agencies
    .filter((a) => a.global_rank !== null)
    .sort((a, b) => (a.global_rank || 999) - (b.global_rank || 999))
    .slice(0, 8);

  return (
    <>
      {/* Schema.org structured data */}
      <HomeSchema />

      {/* Client-side interactive app */}
      <HomeClient />

      {/* What is GTM Agency Matching - Explainer section */}
      <ExplainerSection />

      {/* Server-rendered SEO content */}
      <SEOContent featuredArticles={articles} topAgencies={topAgencies} />

      {/* FAQ Section with schema */}
      <FAQSection />
    </>
  );
}
