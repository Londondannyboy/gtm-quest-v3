import { sql } from './db';

// Types
export interface Agency {
  id: number;
  name: string;
  slug: string;
  description: string;
  headquarters: string;
  specializations: string[];
  category_tags: string[];
  service_areas: string[];
  min_budget: number | null;
  avg_rating: number | null;
  review_count: number | null;
  global_rank: number | null;
  website: string | null;
  logo_url: string | null;
  // Extended fields
  key_services: string[] | null;
  b2b_description: string | null;
  overview: string | null;
  founded_year: number | null;
  employee_count: number | null;
  key_facts: Record<string, unknown> | null;
  pricing_model: string | null;
  case_study_url: string | null;
  tags: string[] | null;
  primary_color: string | null;
}

export interface AgencyMatch extends Agency {
  match_score: number;
  match_reasons: string[];
}

export interface SearchParams {
  specializations?: string[];
  category_tags?: string[];
  service_areas?: string[];
  max_budget?: number;
  limit?: number;
}

// Mapping dictionaries for user terms -> database values
export const SPECIALIZATION_MAP: Record<string, string[]> = {
  'demand gen': ['Demand Generation', 'B2B Demand Generation'],
  'demand generation': ['Demand Generation', 'B2B Demand Generation'],
  'abm': ['ABM', 'Account-Based Marketing', 'ABM strategy'],
  'account based': ['ABM', 'Account-Based Marketing'],
  'content': ['Content Marketing', 'B2B Content Marketing'],
  'content marketing': ['Content Marketing', 'B2B Content Marketing'],
  'plg': ['Product-Led Growth', 'PLG'],
  'product led': ['Product-Led Growth', 'PLG'],
  'brand': ['B2B Branding', 'Brand Strategy'],
  'branding': ['B2B Branding', 'Brand Strategy'],
  'seo': ['SEO', 'B2B SEO'],
  'paid media': ['Paid Media', 'Performance Marketing'],
  'social': ['Social Media Marketing', 'LinkedIn Marketing'],
  'linkedin': ['LinkedIn Marketing', 'Social Media Marketing'],
  'email': ['Email Marketing', 'Marketing Automation'],
  'automation': ['Marketing Automation', 'Email Marketing'],
  'analytics': ['Marketing Analytics', 'Growth Analytics'],
  'growth': ['Growth Marketing', 'B2B Growth'],
};

export const CATEGORY_MAP: Record<string, string[]> = {
  'b2b saas': ['B2B Marketing Agency', 'GTM Agency', 'SaaS Marketing Agency'],
  'saas': ['B2B Marketing Agency', 'GTM Agency', 'SaaS Marketing Agency'],
  'b2b': ['B2B Marketing Agency', 'GTM Agency'],
  'dtc': ['DTC Marketing Agency', 'Growth Marketing Agency'],
  'consumer': ['DTC Marketing Agency', 'Growth Marketing Agency'],
  'enterprise': ['B2B Marketing Agency', 'Account-Based Marketing Agency'],
  'startup': ['Growth Marketing Agency', 'GTM Agency'],
  'fintech': ['B2B Marketing Agency', 'FinTech Marketing Agency'],
  'healthtech': ['B2B Marketing Agency', 'Healthcare Marketing Agency'],
};

export const REGION_MAP: Record<string, string[]> = {
  'us': ['United States', 'USA', 'North America'],
  'usa': ['United States', 'USA', 'North America'],
  'uk': ['United Kingdom', 'UK', 'London', 'Europe'],
  'europe': ['Europe', 'EMEA', 'UK', 'Germany'],
  'apac': ['APAC', 'Asia Pacific', 'Singapore', 'Australia'],
  'global': ['Global', 'Worldwide'],
  'remote': ['Global', 'Remote'],
};

// Map user input to database values
export function mapUserInput(
  input: string,
  mapping: Record<string, string[]>
): string[] {
  const lower = input.toLowerCase().trim();

  // Direct match
  if (mapping[lower]) {
    return mapping[lower];
  }

  // Partial match
  for (const [key, values] of Object.entries(mapping)) {
    if (lower.includes(key) || key.includes(lower)) {
      return values;
    }
  }

  // Return as-is if no match
  return [input];
}

// Search agencies with scoring
export async function searchAgencies(params: SearchParams): Promise<AgencyMatch[]> {
  const {
    specializations = [],
    category_tags = [],
    service_areas = [],
    max_budget,
    limit = 5
  } = params;

  // Build the query
  const results = await sql`
    SELECT
      id, name, slug, description, headquarters,
      specializations, category_tags, service_areas,
      min_budget, avg_rating, review_count, global_rank,
      website, logo_url
    FROM companies
    WHERE app = 'gtm' AND status = 'published'
      AND (
        cardinality(${specializations}::text[]) = 0
        OR specializations && ${specializations}::text[]
      )
      AND (
        cardinality(${category_tags}::text[]) = 0
        OR category_tags && ${category_tags}::text[]
      )
      AND (
        cardinality(${service_areas}::text[]) = 0
        OR service_areas && ${service_areas}::text[]
      )
      AND (
        ${max_budget}::int IS NULL
        OR min_budget IS NULL
        OR min_budget <= ${max_budget}
      )
    ORDER BY global_rank NULLS LAST
    LIMIT ${limit}
  ` as Agency[];

  // Calculate match scores
  return results.map(agency => {
    let score = 0;
    const reasons: string[] = [];

    // Specialization matches (40 points max)
    const specMatches = agency.specializations?.filter(s =>
      specializations.some(sp =>
        s.toLowerCase().includes(sp.toLowerCase()) ||
        sp.toLowerCase().includes(s.toLowerCase())
      )
    ) || [];
    if (specMatches.length > 0) {
      score += Math.min(40, specMatches.length * 15);
      reasons.push(`Specializes in: ${specMatches.slice(0, 2).join(', ')}`);
    }

    // Category matches (25 points)
    const catMatches = agency.category_tags?.filter(c =>
      category_tags.some(ct =>
        c.toLowerCase().includes(ct.toLowerCase()) ||
        ct.toLowerCase().includes(c.toLowerCase())
      )
    ) || [];
    if (catMatches.length > 0) {
      score += 25;
      reasons.push('Matches your business type');
    }

    // Region matches (20 points)
    const regionMatches = agency.service_areas?.filter(a =>
      service_areas.some(sa =>
        a.toLowerCase().includes(sa.toLowerCase()) ||
        sa.toLowerCase().includes(a.toLowerCase())
      )
    ) || [];
    if (regionMatches.length > 0) {
      score += 20;
      reasons.push('Serves your target regions');
    }

    // Budget fit (15 points)
    if (!agency.min_budget || (max_budget && agency.min_budget <= max_budget)) {
      score += 15;
      if (agency.min_budget) {
        reasons.push(`Budget from $${agency.min_budget.toLocaleString()}/mo`);
      }
    }

    return {
      ...agency,
      match_score: score,
      match_reasons: reasons,
    };
  }).sort((a, b) => b.match_score - a.match_score);
}

// Get all available specializations
export async function getSpecializations(): Promise<string[]> {
  const results = await sql`
    SELECT DISTINCT unnest(specializations) as spec
    FROM companies
    WHERE app = 'gtm' AND status = 'published'
    ORDER BY spec
  `;

  return results.map((r) => (r as { spec: string }).spec);
}

// Get all available category tags
export async function getCategoryTags(): Promise<string[]> {
  const results = await sql`
    SELECT DISTINCT unnest(category_tags) as tag
    FROM companies
    WHERE app = 'gtm' AND status = 'published'
    ORDER BY tag
  `;

  return results.map((r) => (r as { tag: string }).tag);
}

// Get all agencies for listing page
export async function getAllAgencies(): Promise<Agency[]> {
  const results = await sql`
    SELECT
      id, name, slug, description, headquarters,
      specializations, category_tags, service_areas,
      min_budget, avg_rating, review_count, global_rank,
      website, logo_url
    FROM companies
    WHERE app = 'gtm' AND status = 'published'
    ORDER BY global_rank NULLS LAST, name
  `;

  return results as Agency[];
}

// Get agency by slug
export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  const results = await sql`
    SELECT
      id, name, slug, description, headquarters,
      specializations, category_tags, service_areas,
      min_budget, avg_rating, review_count, global_rank,
      website, logo_url,
      key_services, b2b_description, overview,
      founded_year, employee_count, key_facts,
      pricing_model, case_study_url, tags, primary_color
    FROM companies
    WHERE app = 'gtm' AND status = 'published' AND slug = ${slug}
    LIMIT 1
  `;

  return results.length > 0 ? (results[0] as Agency) : null;
}

// Get all agency slugs for static generation
export async function getAllAgencySlugs(): Promise<string[]> {
  const results = await sql`
    SELECT slug
    FROM companies
    WHERE app = 'gtm' AND status = 'published'
    ORDER BY slug
  `;

  return results.map((r) => (r as { slug: string }).slug);
}

// Get related agencies (same specializations)
export async function getRelatedAgencies(slug: string, limit = 4): Promise<Agency[]> {
  const results = await sql`
    WITH current AS (
      SELECT specializations FROM companies WHERE slug = ${slug}
    )
    SELECT
      c.id, c.name, c.slug, c.description, c.headquarters,
      c.specializations, c.category_tags, c.service_areas,
      c.min_budget, c.avg_rating, c.review_count, c.global_rank,
      c.website, c.logo_url
    FROM companies c, current
    WHERE c.app = 'gtm'
      AND c.status = 'published'
      AND c.slug != ${slug}
      AND c.specializations && current.specializations
    ORDER BY c.global_rank NULLS LAST
    LIMIT ${limit}
  `;

  return results as Agency[];
}
