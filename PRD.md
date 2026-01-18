# GTM Quest v3 - Product Requirements Document

## Overview

GTM Quest is an AI-powered Go-To-Market strategy platform that helps B2B companies find the right GTM agencies and build comprehensive GTM plans through conversational onboarding.

## Product Vision

**Mission**: Democratize access to enterprise-grade GTM strategy by connecting companies with the right agencies and providing data-driven market insights.

**Target Users**: B2B companies looking for GTM agencies, from startups to enterprise.

## Core Features

### 1. Conversational Onboarding

AI-powered chat interface (CopilotKit + Gemini) that extracts GTM requirements through natural conversation:

| Field | Example |
|-------|---------|
| Company Name | "Acme Corp" |
| Industry | "B2B SaaS", "Fintech", "Healthcare" |
| Company Size | "50-200 employees" |
| Target Market | "Enterprise", "SMB", "Mid-market" |
| Target Regions | "North America", "EMEA", "APAC" |
| Budget | "$50k-100k/quarter" |
| Primary Goal | "Demand Generation", "Brand Awareness" |
| Timeline | "Q2 2025" |
| Strategy Type | "PLG", "Sales-led", "Hybrid" |

### 2. Agency Matching

- **201 verified GTM agencies** in Neon PostgreSQL
- Matching based on specializations, regions, budget fit
- Individual agency pages with rich profiles
- Filterable agency directory

### 3. Premium Dashboard Visualizations

Real-time market intelligence displayed through:

| Visualization | Library | Purpose |
|---------------|---------|---------|
| Animated Stats | react-countup | Key metrics with smooth counters |
| Progress Ring | framer-motion | Onboarding completion |
| 3D Globe | react-globe.gl | Target market regions |
| TAM/SAM/SOM | recharts | Market sizing |
| Growth Projection | recharts | 5-year forecast |
| Budget Allocation | recharts | Recommended spend breakdown |
| Benchmarks | recharts | Industry comparison |
| Particles | tsparticles | Ambient visual effects |
| Confetti | canvas-confetti | Milestone celebrations |

### 4. GTM Plan Builder

Generates comprehensive GTM plans with:
- Executive Summary
- Company Profile
- Market Analysis (with charts)
- GTM Strategy & Timeline
- Recommended Tech Stack
- Agency Recommendations
- Budget & ROI Projections
- Next Steps

**Export Options**:
- PDF download (@react-pdf/renderer)
- Email delivery (Resend)

### 5. Content Hub

- **56 MDX articles**: Guides, comparisons, agency directories
- **201 agency pages**: Dynamic from Neon
- SEO-optimized with meta tags, JSON-LD
- Internal linking between articles and agencies

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      GTM QUEST v3                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND (Vercel)              BACKEND (Railway)           │
│  ┌─────────────────────┐       ┌─────────────────────┐      │
│  │   Next.js 16.1      │◄─────►│   Pydantic AI       │      │
│  │                     │       │   FastAPI           │      │
│  │ • CopilotKit 1.51   │       │                     │      │
│  │ • Premium Dashboard │       │ • GTMAgent          │      │
│  │ • 3D Globe          │       │ • HITL confirmations│      │
│  │ • Charts (recharts) │       │ • Industry data     │      │
│  │ • Particles         │       │ • Tool recognition  │      │
│  │ • PDF Export        │       │ • Validation        │      │
│  └─────────────────────┘       └─────────────────────┘      │
│           │                             │                    │
│           │                             │                    │
│  ┌────────▼────────────────────────────▼────────────┐       │
│  │               Neon PostgreSQL                     │       │
│  │               201 agencies                        │       │
│  └───────────────────────────────────────────────────┘       │
│                                                              │
│  ┌───────────────────────────────────────────────────┐       │
│  │               MDX Content (56 articles)           │       │
│  └───────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Page Structure

| Route | Type | Count | Description |
|-------|------|-------|-------------|
| `/` | Static | 1 | Homepage with SEO content + app |
| `/articles` | Static | 1 | Article listing |
| `/articles/[slug]` | SSG | 56 | MDX articles |
| `/agencies` | Dynamic | 1 | Agency directory |
| `/agencies/[slug]` | SSG | 201 | Agency profiles |
| `/sitemap.xml` | Static | 1 | Dynamic sitemap |
| `/robots.txt` | Static | 1 | Search engine rules |

**Total**: 269 pages

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1, React 19, TypeScript |
| Styling | Tailwind CSS |
| AI Chat | CopilotKit 1.51.2, Google Gemini 2.0 Flash |
| Backend | Pydantic AI, FastAPI |
| Database | Neon PostgreSQL |
| Visualizations | framer-motion, react-globe.gl, recharts, tsparticles, canvas-confetti |
| PDF | @react-pdf/renderer |
| Email | Resend |
| Content | MDX |
| Deployment | Vercel (frontend), Railway (backend) |

## Data Models

### GTMRequirements
```typescript
interface GTMRequirements {
  company_name?: string;
  industry?: string;
  category?: string;
  maturity?: string;
  company_size?: string;
  target_market?: string;
  target_regions?: string[];
  budget?: number;
  budget_range?: string;
  primary_goal?: string;
  secondary_goals?: string[];
  timeline?: string;
  strategy_type?: string;
  current_channels?: string[];
  pain_points?: string[];
  tech_stack?: string[];
}
```

### Agency
```typescript
interface Agency {
  id: number;
  slug: string;
  name: string;
  description: string;
  website: string;
  specializations: string[];
  industries: string[];
  regions: string[];
  min_budget: number;
  company_size_focus: string[];
  notable_clients?: string[];
}
```

## SEO Strategy

- **Meta tags**: Dynamic per page
- **JSON-LD**: Organization, Article, LocalBusiness schemas
- **Sitemap**: Auto-generated with all 269 pages
- **Internal linking**: Articles link to agencies and vice versa
- **301 redirects**: Old URL structure preserved

## Success Metrics

| Metric | Target |
|--------|--------|
| Page Load Time | < 3s |
| Lighthouse Score | > 90 |
| Agency Match Rate | > 80% of completed profiles |
| Onboarding Completion | > 60% |
| PDF Downloads | Track engagement |

## Roadmap

### Completed
- [x] CopilotKit integration with Gemini
- [x] Pydantic AI backend
- [x] 201 agencies in Neon
- [x] 56 MDX articles
- [x] Premium visualization dashboard
- [x] PDF export
- [x] Global navigation
- [x] SEO optimization

### Future
- [ ] Neon Auth user accounts
- [ ] AG-UI protocol for tighter backend integration
- [ ] Agency booking/scheduling
- [ ] User dashboard with saved plans
- [ ] A/B testing for onboarding flow

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 3.0.0 | 2026-01-17 | Major upgrade: 7-phase implementation |
| 3.1.0 | 2026-01-17 | Missing pages + redirects |
| 3.2.0 | 2026-01-18 | Premium visualizations |
