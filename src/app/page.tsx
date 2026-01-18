import { getArticles } from '@/lib/content';
import { getAllAgencies } from '@/lib/agencies';
import { HomeClient } from '@/components/home/HomeClient';
import { SEOContent } from '@/components/home/SEOContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GTM Quest | AI-Powered Go-To-Market Strategy & Agency Matching',
  description: 'Build your go-to-market strategy with AI. Get matched with 200+ agencies specializing in demand generation, ABM, and B2B growth. Free GTM planning tool.',
  openGraph: {
    title: 'GTM Quest - AI-Powered Go-To-Market Strategy',
    description: 'Build your GTM strategy and get matched with top agencies for B2B growth.',
    type: 'website',
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
      {/* Client-side interactive app */}
      <HomeClient />

      {/* Server-rendered SEO content */}
      <SEOContent featuredArticles={articles} topAgencies={topAgencies} />
    </>
  );
}
