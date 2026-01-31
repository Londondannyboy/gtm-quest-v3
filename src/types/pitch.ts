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
    tools: ['Trigify', 'Clay'],
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

// Channel Multipliers (Updated with ColdIQ data)
export const CHANNEL_MULTIPLIERS = {
  linkedinOutreach: 1.0,
  emailOutreach: 1.0,
  contentMarketing: 1.4,
  linkedinAds: 1.25,
  intentTracking: 1.8,           // Intent tracking adds 80% lift
  smartLinks: 1.3,               // Smart Links add 30%
  contentPlusOutreach: 1.6,
  fullStack: 2.2,
  fullStackWithIntent: 2.8,      // All 4 channels + intent tracking
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

// ============================================
// 4-CHANNEL ABM SYSTEM TYPES (ColdIQ-inspired)
// ============================================

// Region Configuration (GDPR Handling)
export type RegionId = 'uk_eu' | 'us';

export interface RegionConfig {
  region: RegionId;
  label: string;
  trackingCapabilities: {
    individualVisitors: boolean;    // US: true, UK/EU: false (GDPR)
    companyIdentification: boolean; // Both: true
    cookieConsent: 'strict' | 'flexible';
    linkedinEngagement: boolean;    // Both: true
    emailEngagement: boolean;       // Both: true
  };
}

export const REGION_CONFIGS: Record<RegionId, RegionConfig> = {
  uk_eu: {
    region: 'uk_eu',
    label: 'UK / EU',
    trackingCapabilities: {
      individualVisitors: false,  // GDPR - company only
      companyIdentification: true,
      cookieConsent: 'strict',
      linkedinEngagement: true,
      emailEngagement: true,
    },
  },
  us: {
    region: 'us',
    label: 'United States',
    trackingCapabilities: {
      individualVisitors: true,   // Can track individuals
      companyIdentification: true,
      cookieConsent: 'flexible',
      linkedinEngagement: true,
      emailEngagement: true,
    },
  },
};

// 4-Channel ABM Active Channels
export interface ABMChannels {
  linkedinAds: boolean;
  content: boolean;
  intentTracking: boolean;
  outbound: boolean;
}

// Intent Tracking Tools
export type VisitorIdTool = 'leadfeeder' | 'clearbit_reveal' | 'albacross' | 'none';
export type SocialTrackingTool = 'teamfluence' | 'trigify' | 'phantom_buster' | 'none';

export interface IntentTrackingTool {
  id: string;
  name: string;
  monthlyCost: number;
  description: string;
}

export const VISITOR_ID_TOOLS: Record<VisitorIdTool, IntentTrackingTool | null> = {
  leadfeeder: { id: 'leadfeeder', name: 'Leadfeeder', monthlyCost: 150, description: 'Website visitor identification' },
  clearbit_reveal: { id: 'clearbit_reveal', name: 'Clearbit Reveal', monthlyCost: 350, description: 'Company identification + enrichment' },
  albacross: { id: 'albacross', name: 'Albacross', monthlyCost: 200, description: 'B2B intent data platform' },
  none: null,
};

export const SOCIAL_TRACKING_TOOLS: Record<SocialTrackingTool, IntentTrackingTool | null> = {
  teamfluence: { id: 'teamfluence', name: 'Teamfluence', monthlyCost: 99, description: 'Team post engagement tracking' },
  trigify: { id: 'trigify', name: 'Trigify', monthlyCost: 99, description: 'LinkedIn engagement signals & triggers' },
  phantom_buster: { id: 'phantom_buster', name: 'PhantomBuster', monthlyCost: 69, description: 'LinkedIn automation & scraping' },
  none: null,
};

export interface IntentTrackingInputs {
  tools: {
    visitorIdentification: {
      enabled: boolean;
      tool: VisitorIdTool;
      monthlyCost: number;
    };
    socialEngagement: {
      enabled: boolean;
      tool: SocialTrackingTool;
      monthlyCost: number;
    };
    contentEngagement: {
      enabled: boolean;
      smartLinks: boolean;  // Sales Nav Smart Links feature
    };
  };
  signalTypes: {
    websiteVisits: boolean;
    contentDownloads: boolean;
    linkedinPostEngagement: boolean;
    linkedinAdEngagement: boolean;
    emailOpens: boolean;
    emailClicks: boolean;
  };
}

// LinkedIn Ads Calculator
export interface LinkedInAdsInputs {
  monthlyBudget: number;         // £5,000 - £50,000
  cpm: number;                   // Default: £25 (LinkedIn avg)
  targetAccounts: number;        // 500-1,000 recommended
  adTypes: {
    thoughtLeader: boolean;      // Personal-style ads from founder
    documentAds: boolean;        // Carousel value delivery
    smartLinks: boolean;         // GTM Quest unique feature
  };
  frequency: number;             // Target impressions per account per month
}

export interface LinkedInAdsOutputs {
  impressionsPerMonth: number;
  reachPercentage: number;       // % of target accounts reached
  costPerAccountReached: number;
  attributedPipelineLift: number; // Based on ColdIQ: 1.25x baseline
}

// Timeline Projection (Month-by-Month)
export interface MonthlyProjection {
  month: number;
  touches: number;
  responses: number;
  meetings: number;
  pipelineValue: number;
  closedDeals: number;
  revenue: number;
  cumulativeROI: number;
  phase: 'awareness' | 'building' | 'pipeline' | 'velocity';
}

export interface ABMProjection {
  timeline: MonthlyProjection[];  // 12-month projection
  breakEvenMonth: number;         // When ROI > 0
  paybackPeriod: number;          // Months to recover investment
  firstMeetingMonth: number;      // Expected: Month 2
  firstDealMonth: number;         // Expected: Month 3-4
  totalPipeline: number;
  totalRevenue: number;
  totalROI: number;
}

// ColdIQ Benchmarks (from their $7.83M case study)
export const COLDIQ_BENCHMARKS = {
  // Conversion rates
  targetAccountToOpportunity: 0.164,  // 164/1000 accounts = deal created
  opportunityToClose: 0.183,          // 30/164 deals = closed won

  // Deal values
  avgPipelineDeal: 47744,             // $7.83M / 164 deals
  avgClosedDeal: 50667,               // $1.52M / 30 deals

  // Timeline expectations
  timeToFirstMeeting: 2,              // Months
  timeToFirstDeal: 3.5,               // Months (between 3-4)
  fullVelocityMonth: 4,               // When system hits full speed

  // Budget ranges (USD)
  linkedInAdsMonthlyMin: 10000,
  linkedInAdsMonthlyMax: 50000,
  toolsMonthlyMin: 2000,
  toolsMonthlyMax: 5000,
};

// Smart Links Campaign Type
export type SmartLinkCampaignType = 'one_to_one' | 'one_to_many';

export interface SmartLinksConfig {
  enabled: boolean;
  campaignType: SmartLinkCampaignType;
}
