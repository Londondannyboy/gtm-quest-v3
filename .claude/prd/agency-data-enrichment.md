# Agency Data Enrichment PRD

## Overview
Enrich the 201 GTM agencies in Neon PostgreSQL with comprehensive data for better SEO and user experience.

## Database: Neon Project
- **Project ID:** `morning-rain-33890830`
- **Table:** `companies` (WHERE app = 'gtm')

## Current State (as of 2026-01-30 - COMPLETED)
| Field | Count | Target | Status |
|-------|-------|--------|--------|
| Total agencies | 201 | - | Complete |
| description > 100 chars | **201** | 201 | **DONE** |
| key_services | **75** | 201 | In Progress |
| b2b_description | **75** | 201 | In Progress |
| founded_year | 40+ | ~100 | In Progress |
| employee_count | 20+ | ~50 | In Progress |
| min_budget | 15 | ~50 | Pending |
| logo_url | 0 | 201 | Pending |
| avg_rating | 0 | - | N/A |

## Session Progress
- **2026-01-30 Session 1:** Enriched 36 agencies (69 thin → 33 thin)
- **2026-01-30 Session 2:** Enriched remaining 33 agencies (33 thin → **0 thin**)
- All 201 agencies now have descriptions > 100 characters

## Agency Data Schema
```sql
-- Key fields to populate:
description TEXT           -- 200-400 chars, concise summary
b2b_description TEXT       -- 400-800 chars, detailed for SEO
key_services TEXT[]        -- Array of 6-8 services
specializations TEXT[]     -- Already populated (201/201)
service_areas TEXT[]       -- Already populated (189/201)
founded_year INTEGER       -- When findable via web search
employee_count INTEGER     -- When findable
min_budget INTEGER         -- Monthly minimum in USD
website TEXT               -- Already populated (188/201)
headquarters TEXT          -- Already populated (201/201)
```

## Enrichment Process
1. **Web Search** for each agency to gather:
   - Services offered
   - Client names/industries
   - Founded year
   - Team size
   - Pricing (if public)
   - Awards/recognition

2. **Update SQL Pattern:**
```sql
UPDATE companies SET
  description = '[concise 200-400 char summary]',
  b2b_description = '[detailed 400-800 char description]',
  key_services = ARRAY['Service 1', 'Service 2', ...],
  founded_year = YYYY,
  employee_count = N
WHERE slug = 'agency-slug'
```

## Remaining Thin Agencies (33)
Query to find them:
```sql
SELECT name, slug, LENGTH(description)
FROM companies
WHERE app = 'gtm' AND LENGTH(description) < 100
ORDER BY LENGTH(description)
```

## Agency Page Template
Located at: `src/app/agencies/[slug]/page.tsx`

Features:
- Hero section with logo, rank badge, ratings
- "At a Glance" stats card
- "About" section (uses b2b_description or description)
- "Key Services" grid with icons
- "Best For" section (generated from specializations)
- Specialization tags (linkable)
- Service regions sidebar
- Related agencies section

## Positive Tone Guidelines
- Always be positive about agencies (potential partners)
- Highlight strengths, services, client wins
- Include awards/recognition where available
- Focus on what they do well, not limitations

---

## Geo-Targeting SEO (Added 2026-01-30)

### Problem
GSC data showed impressions but poor CTR and position for "GTM agency":
| Country | Impressions | Clicks | Position |
|---------|-------------|--------|----------|
| US | 303 | 0 | 42.9 |
| AU | 177 | 0 | 33.4 |
| UK | 109 | 8 | 37.7 |
| CA | 33 | 0 | 33.5 |

### Solution: Country Sections on Homepage
Added country-specific sections showing featured agencies for:
- **US:** 25 agencies → anchor `#gtm-agencies-us`
- **UK:** 10 agencies → anchor `#gtm-agencies-uk`
- **AU:** 10 agencies → anchor `#gtm-agencies-au`
- **CA:** 9 agencies → anchor `#gtm-agencies-ca`
- **NZ:** 5 agencies → anchor `#gtm-agencies-nz`
- **IE:** 5 agencies → anchor `#gtm-agencies-ie`

### Implementation
1. **CountrySections.tsx** - New component with country-specific agency grids
2. **hreflang tags** - Added to homepage metadata for geo-targeting
3. **Internal links** - Agency pages link back to country sections
4. **Sitemap** - Updated with country section URLs
5. **Schema.org** - Added ItemList schema for regional agency lists
6. **SEOContent** - Updated regional links to use anchor fragments

### Files Changed
- `src/components/home/CountrySections.tsx` (new)
- `src/app/page.tsx` (hreflang, imports)
- `src/app/agencies/[slug]/page.tsx` (internal links)
- `src/lib/agencies.ts` (COUNTRY_CONFIG, getAgenciesByCountry)
- `src/components/home/TableOfContents.tsx` (new item)
- `src/components/home/HomeSchema.tsx` (geo schema)
- `src/components/home/SEOContent.tsx` (regional links)
- `src/app/sitemap.ts` (country URLs)
