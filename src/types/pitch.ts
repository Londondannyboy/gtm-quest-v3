// Pitch Template System Types

// Currency
export type CurrencyCode = 'GBP' | 'EUR' | 'USD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  rateDate: string;
}

export const CURRENCIES: Record<CurrencyCode, Omit<CurrencyConfig, 'rate' | 'rateDate'>> = {
  GBP: { code: 'GBP', symbol: '£' },
  EUR: { code: 'EUR', symbol: '€' },
  USD: { code: 'USD', symbol: '$' },
  AUD: { code: 'AUD', symbol: 'A$' },
};

// Budget
export interface BudgetTier {
  id: string;
  name: string;
  baseRate: number;
  defaultDays: number;
  minDays: number;
  maxDays: number;
  description: string;
  recommended?: boolean;
}

// Signal Warmth
export type SignalWarmthId = 'cold' | 'targeted' | 'intentBased' | 'inbound';

export interface SignalWarmthTier {
  id: SignalWarmthId;
  label: string;
  description: string;
  emailReplyRate: number;
  linkedinReplyRate: number;
  example: string;
  tools?: string[];
}

export const SIGNAL_WARMTH_TIERS: SignalWarmthTier[] = [
  {
    id: 'cold',
    label: 'Cold Outreach',
    description: 'No prior signal - pure cold list',
    emailReplyRate: 0.01,
    linkedinReplyRate: 0.05,
    example: 'Purchased list, scraped contacts',
  },
  {
    id: 'targeted',
    label: 'Targeted Outreach',
    description: 'ICP-matched, recent trigger events',
    emailReplyRate: 0.05,
    linkedinReplyRate: 0.12,
    example: 'Job change, funding, tech install signals',
  },
  {
    id: 'intentBased',
    label: 'Intent-Based Outreach',
    description: 'Engaged with influencer/competitor content',
    emailReplyRate: 0.14,
    linkedinReplyRate: 0.25,
    example: 'Liked/commented on industry thought leader posts',
    tools: ['Triggify', 'Clay'],
  },
  {
    id: 'inbound',
    label: 'Warm Inbound',
    description: 'Website visitor, content downloader',
    emailReplyRate: 0.25,
    linkedinReplyRate: 0.40,
    example: 'Downloaded whitepaper, attended webinar',
  },
];

// ICP Benchmarks
export interface ICPBenchmarks {
  byTitle: Record<string, { linkedin: number; email: number }>;
  byIndustry: Record<string, { multiplier: number }>;
  byCompanySize: Record<string, { multiplier: number }>;
}

export const ICP_BENCHMARKS: ICPBenchmarks = {
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

// Channel Multipliers
export const CHANNEL_MULTIPLIERS = {
  linkedinOutreach: 1.0,
  emailOutreach: 1.0,
  contentMarketing: 1.4,
  linkedinAds: 1.25,
  contentPlusOutreach: 1.6,
  fullStack: 2.2,
};

// Current State
export interface CurrentState {
  currentAnnualRevenue: number;
  revenueFromOutbound: number;
  revenueFromInbound: number;
  revenueFromReferrals: number;
  currentChannels: {
    linkedinOutreach: boolean;
    coldEmail: boolean;
    coldCalling: boolean;
    events: boolean;
    partnerships: boolean;
    paidAds: boolean;
  };
  currentMetrics: {
    outreachVolumePerMonth: number;
    responseRate: number;
    meetingsPerMonth: number;
    dealsPerMonth: number;
  };
  team: {
    salesHeadcount: number;
    marketingHeadcount: number;
    usingAgency: boolean;
    currentToolStack: string[];
  };
}

// ROI Inputs
export interface ROIInputs {
  channels: {
    linkedinOutreach: boolean;
    emailOutreach: boolean;
    contentMarketing: boolean;
    linkedinAds: boolean;
  };
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
  conversions: {
    responseRate: number;
    meetingRate: number;
    closeRate: number;
  };
  economics: {
    avgDealSize: number;
    ltv: number;
    salesCycleMonths: number;
  };
  conservativeReduction: number;
}

// Funnel Projection
export interface FunnelProjection {
  touches: number;
  responses: number;
  meetings: number;
  opportunities: number;
  clients: number;
  revenue: number;
  ltv: number;
}

// Infrastructure Costs
export interface InfrastructureCosts {
  email: {
    mailboxesNeeded: number;
    costPerMailbox: number;
    warmupPeriod: number;
    deliverabilityTools: number;
    monthlyTotal: number;
  };
  linkedin: {
    identitiesNeeded: number;
    premiumCost: number;
    automationTool: number;
    proxyCost: number;
    monthlyTotal: number;
  };
  tools: {
    clay: number;
    enrichment: number;
    sequencing: number;
    crm: number;
    monthlyTotal: number;
  };
  monthlyTotal: number;
  annualTotal: number;
}

// Pitch Configuration
export interface PitchConfig {
  client: {
    slug: string;
    name: string;
    logo: string;
    contact: {
      name: string;
      title: string;
      image?: string;
    };
    password: string;
  };
  content: {
    tagline: string;
    badgeText: string;
    opportunities: string[];
    asks: { label: string; value: string }[];
    urgencyMessage?: string;
  };
  budget: {
    currency: CurrencyCode;
    tiers: BudgetTier[];
    defaultSelections: Record<string, number>;
  };
  roiDefaults?: Partial<ROIInputs>;
  cta: {
    bookingLink: string;
    buttonText: string;
  };
}

// Timeline Phase
export interface TimelinePhase {
  phase: number;
  title: string;
  weeks: string;
  icon: string;
  items: string[];
}
