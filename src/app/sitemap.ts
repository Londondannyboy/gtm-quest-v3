import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content';
import { getAllAgencySlugs } from '@/lib/agencies';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gtm.quest';

  // Get all articles
  const articles = getArticles();

  // Get all agency slugs
  const agencySlugs = await getAllAgencySlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agencies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Country filter pages (dedicated pages for SEO)
  // Note: Fragment URLs (/#gtm-agencies-*) removed from sitemap as they're not
  // separate pages - they're anchors on the homepage. Search engines treat
  // fragments as the same URL as the base page.
  const countryFilterPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/agencies/country/us`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/agencies/country/uk`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/agencies/country/au`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/country/ca`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/country/nz`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/agencies/country/ie`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Specialization filter pages (top specializations for SEO)
  const specializationPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/agencies/specialization/demand-generation`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/specialization/abm`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/specialization/content-marketing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/specialization/seo`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/specialization/paid-media`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/specialization/sales-enablement`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/agencies/specialization/marketing-automation`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/agencies/specialization/growth-marketing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/agencies/specialization/b2b-marketing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/agencies/specialization/linkedin-marketing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Agency pages
  const agencyPages: MetadataRoute.Sitemap = agencySlugs.map((slug) => ({
    url: `${baseUrl}/agencies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...countryFilterPages,
    ...specializationPages,
    ...articlePages,
    ...agencyPages,
  ];
}
