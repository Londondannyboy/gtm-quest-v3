# PRD: GTM Pitch Template System

> **Owner:** Dan Keegan
> **Created:** 2026-01-31
> **Status:** Phase 1 Complete - Deployed to Production

## Implementation Status

### Completed
- [x] Types file (`src/types/pitch.ts`)
- [x] PasswordGate component with session-based auth
- [x] Section components (HeroSection, Timeline, InvestmentOptions, SocialProof, WhyUs, StickyCTA)
- [x] BudgetCalculator with multi-currency support (GBP/EUR/USD/AUD)
- [x] ROICalculator with signal warmth tiers + ICP benchmarks
- [x] Dashboard components (PipelineChart, ChannelBreakdown, ROITimeline)
- [x] PitchTemplate wrapper
- [x] Infrastructure Calculator with category breakdown (Platform/Email/LinkedIn/Tools)
- [x] /template route with password protection (`gtmquest`)
- [x] Adjustable quantities for mailboxes, LinkedIn seats, proxies
- [x] Combined investment (Consulting + Software) passed to ROI

### Remaining
- [ ] CopilotKit integration for AI-powered dashboard insights
- [ ] Current State baseline capture
- [ ] Service variants (Web Design, Gen SEO, Content Marketing)
- [ ] Analytics tracking (time-on-section)
- [ ] PDF export with calculator state
- [ ] ROI Calculator reactivity when deal size/LTV changes

## Overview

A reusable pitch template system with interactive calculators and a "shock and awe" dashboard that differentiates GTM Quest from competitors.

**Philosophy:** Show them the future. Make them feel like they're already working with us.

---

## Goals

1. **Reduce pitch creation time** from days to hours
2. **Increase close rate** with interactive ROI projections
3. **Build trust** through transparency (infrastructure costs, conservative estimates)
4. **Create reusable components** for multiple service offerings

---

## Architecture

### Two Separate Tools

| Tool | Purpose | Audience |
|------|---------|----------|
| **Pitch Template** | Quick, pre-filled proposals for closing deals | Decision-makers, budget sign-off |
| **GTM Strategy Builder** | Full discovery with OKRs, ICP definition | Strategic thinkers, full planning |

### File Structure

```
src/components/pitch/
├── PitchTemplate.tsx           # Wrapper with password, analytics
├── PasswordGate.tsx            # Reusable password protection
├── sections/
│   ├── HeroSection.tsx         # Client logo, tagline, badge
│   ├── OpportunityAsk.tsx      # Two-column layout
│   ├── Timeline.tsx            # Phase visualization
│   ├── InvestmentOptions.tsx   # Pricing tiers
│   ├── WhyUs.tsx               # Differentiators
│   ├── SocialProof.tsx         # GTM Quest branding
│   └── StickyCTA.tsx           # Fixed footer CTA
├── calculators/
│   ├── ColdEmailCalculator.tsx
│   ├── LinkedInCalculator.tsx
│   ├── ContentCalculator.tsx
│   ├── InfrastructureCalculator.tsx
│   ├── BudgetCalculator.tsx
│   ├── ROICalculator.tsx
│   └── CurrencySelector.tsx
└── dashboard/
    ├── DashboardLayout.tsx
    ├── PipelineChart.tsx
    ├── ChannelBreakdown.tsx
    └── ROITimeline.tsx
```

---

## Data Structures

### Pitch Configuration

```typescript
interface PitchConfig {
  // Client info
  client: {
    slug: string;           // URL path
    name: string;           // "Climatise"
    logo: string;           // Path to logo
    contact: {
      name: string;         // "Lennon Harding-Wade"
      title: string;        // "CEO"
      image?: string;
    };
    password: string;       // Access password
  };

  // Content sections
  content: {
    tagline: string;
    badgeText: string;
    opportunities: string[];
    asks: { label: string; value: string }[];
    urgencyMessage?: string;
  };

  // Budget presets
  budget: {
    currency: 'GBP' | 'EUR' | 'USD' | 'AUD';
    tiers: BudgetTier[];
    defaultSelections: Record<string, number>;
  };

  // ROI inputs (can be preset or let user adjust)
  roiDefaults?: Partial<ROIInputs>;

  // CTA
  cta: {
    bookingLink: string;    // Calendly URL
    buttonText: string;
  };
}
```

### Currency Configuration

```typescript
interface CurrencyConfig {
  code: 'GBP' | 'EUR' | 'USD' | 'AUD';
  symbol: string;
  rate: number;             // Relative to GBP
  rateDate: string;         // "Rates as of 31 Jan 2026"
}

// Exchange rate API: https://open.er-api.com/v6/latest/GBP (free, no key)
```

### Budget Tier

```typescript
interface BudgetTier {
  id: string;
  name: string;             // "Retainer", "Workshop", "Strategy"
  baseRate: number;         // In GBP
  defaultDays: number;
  minDays: number;
  maxDays: number;
  description: string;
  recommended?: boolean;
}
```

### Signal Warmth

```typescript
interface SignalWarmthTier {
  id: 'cold' | 'targeted' | 'intentBased' | 'inbound';
  label: string;
  description: string;
  emailReplyRate: number;
  linkedinReplyRate: number;
  example: string;
  tools?: string[];
}

const signalWarmthTiers: SignalWarmthTier[] = [
  {
    id: 'cold',
    label: 'Cold Outreach',
    description: 'No prior signal - pure cold list',
    emailReplyRate: 0.01,     // 1%
    linkedinReplyRate: 0.05,  // 5%
    example: 'Purchased list, scraped contacts',
  },
  {
    id: 'targeted',
    label: 'Targeted Outreach',
    description: 'ICP-matched, recent trigger events',
    emailReplyRate: 0.05,     // 5%
    linkedinReplyRate: 0.12,  // 12%
    example: 'Job change, funding, tech install signals',
  },
  {
    id: 'intentBased',
    label: 'Intent-Based Outreach',
    description: 'Engaged with influencer/competitor content',
    emailReplyRate: 0.14,     // 14% (proven case study)
    linkedinReplyRate: 0.25,  // 25%
    example: 'Liked/commented on industry thought leader posts',
    tools: ['Triggify', 'Clay'],
  },
  {
    id: 'inbound',
    label: 'Warm Inbound',
    description: 'Website visitor, content downloader',
    emailReplyRate: 0.25,     // 25%
    linkedinReplyRate: 0.40,  // 40%
    example: 'Downloaded whitepaper, attended webinar',
  },
];
```

### ICP Benchmarks

```typescript
interface ICPBenchmarks {
  byTitle: Record<string, { linkedin: number; email: number }>;
  byIndustry: Record<string, { multiplier: number }>;
  byCompanySize: Record<string, { multiplier: number }>;
}

const icpBenchmarks: ICPBenchmarks = {
  byTitle: {
    'C-Suite': { linkedin: 0.08, email: 0.02 },
    'VP / Director': { linkedin: 0.15, email: 0.04 },
    'Senior Manager': { linkedin: 0.18, email: 0.05 },
    'Manager': { linkedin: 0.12, email: 0.03 },
    'Individual Contributor': { linkedin: 0.10, email: 0.02 },
  },
  byIndustry: {
    'SaaS / Technology': { multiplier: 1.2 },
    'Financial Services': { multiplier: 0.8 },
    'Healthcare': { multiplier: 0.7 },
    'Manufacturing': { multiplier: 0.9 },
    'Professional Services': { multiplier: 1.1 },
  },
  byCompanySize: {
    'Startup (1-50)': { multiplier: 1.3 },
    'SMB (50-200)': { multiplier: 1.1 },
    'Mid-Market (200-1000)': { multiplier: 1.0 },
    'Enterprise (1000+)': { multiplier: 0.7 },
  },
};
```

### Channel Multipliers

```typescript
const channelMultipliers = {
  linkedinOutreach: 1.0,           // Base
  emailOutreach: 1.0,              // Base
  contentMarketing: 1.4,           // +40% (HubSpot)
  linkedinAds: 1.25,               // +25% (LinkedIn Marketing Solutions)
  contentPlusOutreach: 1.6,        // Synergy: 60% boost
  fullStack: 2.2,                  // All channels: 2.2x
};
```

### Current State (Baseline)

```typescript
interface CurrentState {
  // Revenue
  currentAnnualRevenue: number;
  revenueFromOutbound: number;      // Percentage
  revenueFromInbound: number;
  revenueFromReferrals: number;

  // Current channels
  currentChannels: {
    linkedinOutreach: boolean;
    coldEmail: boolean;
    coldCalling: boolean;
    events: boolean;
    partnerships: boolean;
    paidAds: boolean;
  };

  // Current metrics
  currentMetrics: {
    outreachVolumePerMonth: number;
    responseRate: number;
    meetingsPerMonth: number;
    dealsPerMonth: number;
  };

  // Team
  team: {
    salesHeadcount: number;
    marketingHeadcount: number;
    usingAgency: boolean;
    currentToolStack: string[];
  };
}
```

### ROI Inputs

```typescript
interface ROIInputs {
  // Channels
  channels: {
    linkedinOutreach: boolean;
    emailOutreach: boolean;
    contentMarketing: boolean;
    linkedinAds: boolean;
  };

  // Volume
  linkedin: {
    identities: number;
    messagesPerDay: number;
    weeksActive: number;
  };
  email: {
    listSize: number;
    cadencePerWeek: number;
  };
  content: {
    postsPerWeek: number;
    domainAuthority: number;
  };
  ads: {
    monthlyBudget: number;
    cpm: number;
  };

  // Conversions
  conversions: {
    responseRate: number;
    meetingRate: number;
    closeRate: number;
  };

  // Economics
  economics: {
    avgDealSize: number;
    ltv: number;
    salesCycleMonths: number;
  };

  // Confidence
  conservativeReduction: number;    // 0-0.5 (default 0.20)
}
```

### Infrastructure Costs

```typescript
interface InfrastructureCosts {
  email: {
    mailboxesNeeded: number;        // volume ÷ (15/day × 30)
    costPerMailbox: number;         // £3-5/month
    warmupPeriod: number;           // Weeks
    deliverabilityTools: number;    // £50-200/month
  };
  linkedin: {
    identitiesNeeded: number;
    premiumCost: number;            // Sales Nav: £80/user/month
    automationTool: number;         // Dripify: £50-100/user
    proxyCost: number;              // 4G: £30/proxy/month
  };
  tools: {
    clay: number;                   // £149-499/month
    enrichment: number;             // Apollo: £99/month
    sequencing: number;             // LGM: £99/month
    crm: number;                    // HubSpot: £45/month
  };
}
```

---

## Calculator Formulas

### Cold Email Volume

```typescript
function calculateEmailVolume(listSize: number, cadencePerWeek: number, weeks: number): number {
  return listSize * cadencePerWeek * (weeks / 4);
}

function calculateMailboxesNeeded(monthlyVolume: number, emailsPerDayPerBox = 15): number {
  return Math.ceil(monthlyVolume / (emailsPerDayPerBox * 30));
}
```

### LinkedIn Volume

```typescript
function calculateLinkedInVolume(identities: number, messagesPerDay: number, weeks: number): number {
  return identities * messagesPerDay * 5 * weeks;  // 5 working days
}
```

### Funnel Projection

```typescript
interface FunnelProjection {
  touches: number;
  responses: number;
  meetings: number;
  opportunities: number;
  clients: number;
  revenue: number;
  ltv: number;
}

function calculateFunnel(
  touches: number,
  responseRate: number,
  meetingRate: number,
  closeRate: number,
  avgDealSize: number,
  ltv: number
): FunnelProjection {
  const responses = touches * responseRate;
  const meetings = responses * meetingRate;
  const opportunities = meetings;  // Simplified
  const clients = meetings * closeRate;
  const revenue = clients * avgDealSize;
  const totalLtv = clients * ltv;

  return { touches, responses, meetings, opportunities, clients, revenue, ltv: totalLtv };
}
```

### ROI Calculation

```typescript
function calculateROI(revenue: number, investment: number): number {
  return (revenue - investment) / investment;
}

function calculateBreakEven(investment: number, avgDealSize: number): number {
  return investment / avgDealSize;
}
```

### Response Rate with Modifiers

```typescript
function calculateEffectiveResponseRate(
  baseRate: number,
  industryMultiplier: number,
  sizeMultiplier: number,
  conservativeReduction: number
): number {
  return baseRate * industryMultiplier * sizeMultiplier * (1 - conservativeReduction);
}
```

---

## Benchmark Sources

| Metric | Value | Source |
|--------|-------|--------|
| LinkedIn InMail response | 10-25% | [LinkedIn Sales Solutions](https://business.linkedin.com/sales-solutions) |
| Cold email response | 1-5% | [Woodpecker 2024 Report](https://woodpecker.co/blog/cold-email-statistics/) |
| Intent-based email response | 14% | Practitioner case study (Triggify method) |
| Meeting → Opportunity | 20-40% | [Gartner B2B Buying Report](https://www.gartner.com) |
| Opportunity → Close | 15-30% | [HubSpot Sales Benchmarks](https://www.hubspot.com/sales-statistics) |
| Email decline rate | -5%/year | Industry trend |

---

## Component Specifications

### PasswordGate

```typescript
interface PasswordGateProps {
  clientSlug: string;
  clientLogo: string;
  tagline: string;
  password: string;
  children: React.ReactNode;
}
```

- Uses `sessionStorage` for persistence
- Tracks unlock events (future: analytics)
- Shows client logo on gate screen

### BudgetCalculator

```typescript
interface BudgetCalculatorProps {
  tiers: BudgetTier[];
  defaultSelections?: Record<string, number>;
  onTotalChange?: (total: number, currency: CurrencyConfig) => void;
}
```

- Currency selector (GBP/EUR/USD/AUD)
- Sliders for day selection per tier
- Live total calculation
- "Rates valid as of" disclaimer

### ROICalculator

```typescript
interface ROICalculatorProps {
  currentState?: CurrentState;
  budgetTotal?: number;
  currency?: CurrencyConfig;
  onProjectionChange?: (projection: FunnelProjection) => void;
}
```

- Signal warmth selector
- Channel toggles with multiplier hints
- ICP selectors (title, industry, size)
- Conservative reduction slider
- Funnel visualization
- "Open Dashboard" link

---

## Service Variants

| Service | Budget Tiers | ROI Focus |
|---------|--------------|-----------|
| GTM/Outbound | Retainer, Workshop, Sprint | Pipeline, Deals |
| Web Design | Discovery, Design, Build | Conversion lift |
| Gen SEO | Audit, Content, Ongoing | Traffic, Rankings |
| Content Marketing | Strategy, Production, Distribution | Engagement, Leads |
| Performance Ads | Setup, Management, Optimization | ROAS, CAC |

---

## Future Enhancements

- [ ] Analytics: Track time-on-section
- [ ] Versioning: "v1.2 - Updated pricing"
- [ ] Expiration: "Proposal valid until [date]"
- [ ] PDF Export: Include calculator state
- [ ] A/B Testing: Different narrative structures
- [ ] CRM Integration: Log views to HubSpot
