import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
}

export interface AgencyMeta {
  slug: string;
  name: string;
  description: string;
  headquarters: string;
  specializations: string[];
  minBudget: number | null;
  website: string | null;
}

export function getArticles(): ArticleMeta[] {
  const articlesDir = path.join(contentDirectory, 'articles');

  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));

  return files.map(filename => {
    const filePath = path.join(articlesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title || 'Untitled',
      description: data.description || '',
      category: data.category || 'uncategorized',
      tags: data.tags || [],
      publishedAt: data.publishedAt || new Date().toISOString(),
      readingTime: data.readingTime || '5 min',
    };
  });
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(contentDirectory, 'articles', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      category: data.category || 'uncategorized',
      tags: data.tags || [],
      publishedAt: data.publishedAt || new Date().toISOString(),
      readingTime: data.readingTime || '5 min',
    },
    content,
  };
}

export function getAgencies(): AgencyMeta[] {
  const agenciesDir = path.join(contentDirectory, 'agencies');

  if (!fs.existsSync(agenciesDir)) {
    return [];
  }

  const files = fs.readdirSync(agenciesDir).filter(f => f.endsWith('.mdx'));

  return files.map(filename => {
    const filePath = path.join(agenciesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace('.mdx', ''),
      name: data.name || 'Unknown Agency',
      description: data.description || '',
      headquarters: data.headquarters || 'Unknown',
      specializations: data.specializations || [],
      minBudget: data.minBudget || null,
      website: data.website || null,
    };
  });
}

export function getAgencyBySlug(slug: string): { meta: AgencyMeta; content: string } | null {
  const filePath = path.join(contentDirectory, 'agencies', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      name: data.name || 'Unknown Agency',
      description: data.description || '',
      headquarters: data.headquarters || 'Unknown',
      specializations: data.specializations || [],
      minBudget: data.minBudget || null,
      website: data.website || null,
    },
    content,
  };
}
