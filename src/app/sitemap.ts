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

  // Country-specific GTM agency sections (fragment URLs for geo-targeting)
  const countryPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/#gtm-agencies-us`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.95 },
    { url: `${baseUrl}/#gtm-agencies-uk`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.95 },
    { url: `${baseUrl}/#gtm-agencies-au`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/#gtm-agencies-ca`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/#gtm-agencies-nz`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/#gtm-agencies-ie`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
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

  return [...staticPages, ...countryPages, ...articlePages, ...agencyPages];
}
