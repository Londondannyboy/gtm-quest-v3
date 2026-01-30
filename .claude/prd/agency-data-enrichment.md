# Agency Data Enrichment PRD

## Overview
Enrich the 201 GTM agencies in Neon PostgreSQL with comprehensive data for better SEO and user experience.

## Database: Neon Project
- **Project ID:** `morning-rain-33890830`
- **Table:** `companies` (WHERE app = 'gtm')

## Current State (as of 2026-01-30)
| Field | Count | Target |
|-------|-------|--------|
| Total agencies | 201 | - |
| description > 100 chars | 168 | 201 |
| key_services | 42 | 201 |
| b2b_description | 42 | 201 |
| founded_year | 27 | ~100 |
| employee_count | 12 | ~50 |
| min_budget | 15 | ~50 |
| logo_url | 0 | 201 |
| avg_rating | 0 | - |

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
