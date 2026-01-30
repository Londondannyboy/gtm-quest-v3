'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import CountUp from 'react-countup';
import { generateClimatisePDF } from './ClimatisePDF';

// Bid Manager & Tender Intelligence
const tenderIntelligence = {
  title: 'Bid Manager Signal Intelligence',
  description: 'Proactive scraping of government tender databases to identify companies winning carbon-relevant contracts',
  sources: [
    { name: 'Find a Tender', url: 'https://www.find-tender.service.gov.uk', description: 'UK government procurement portal', icon: '🏛️' },
    { name: 'bidstats.uk', url: 'https://bidstats.uk', description: 'Contract award intelligence', icon: '📊' },
    { name: 'Contracts Finder', url: 'https://www.gov.uk/contracts-finder', description: 'Public sector opportunities', icon: '🔍' },
    { name: 'TED Europa', url: 'https://ted.europa.eu', description: 'EU-wide tender notices', icon: '🇪🇺' },
  ],
  workflow: [
    'Daily automated scraping of tender databases',
    'AI filtering for carbon/sustainability-relevant contracts',
    'Winner identification + instant enrichment via Clay',
    'Slack alert with context card for immediate outreach',
  ],
  customScraper: {
    note: 'Building custom scrapers for niche databases not covered by standard APIs',
    examples: ['NHS Shared Business Services', 'Crown Commercial Service', 'Local authority portals'],
  },
};

// Competitor & Influencer LinkedIn Intelligence
const linkedInIntelligence = {
  competitors: {
    title: 'Competitor Social Signals',
    description: 'Track competitor LinkedIn activity and engagement patterns using Trigify',
    signals: [
      { name: 'New follower alerts', description: 'When key accounts start following competitors' },
      { name: 'Engagement tracking', description: 'Who likes/comments on competitor posts' },
      { name: 'Content analysis', description: 'What messaging resonates in the market' },
      { name: 'Employee movement', description: 'Hiring signals and team changes' },
    ],
    tool: 'Trigify',
    toolDescription: 'Real-time LinkedIn signal monitoring at scale',
  },
  influencers: {
    title: 'Industry Influencer Tracking',
    description: 'Monitor engagement from qualified ICPs on sustainability influencer content',
    signals: [
      { name: 'Influencer post engagement', description: 'ICPs engaging with thought leaders' },
      { name: 'Comment analysis', description: 'Extract intent signals from comment content' },
      { name: 'Follower overlap', description: 'Build prospect lists from influencer audiences' },
      { name: 'Content topics', description: 'Track trending sustainability discussions' },
    ],
  },
  icpSignals: {
    title: 'ICP LinkedIn Activity',
    description: 'Track when qualified prospects post about carbon, compliance, or sustainability',
    triggers: [
      'Post about sustainability challenges',
      'Share regulatory updates (SECR, net zero)',
      'Engage with carbon accounting content',
      'Job changes/promotions in target companies',
      'Company announcements (funding, expansion)',
    ],
  },
};

// Campaign phases
const phases = [
  {
    phase: 1,
    title: 'Foundation',
    weeks: 'Weeks 1-2',
    icon: '🏗️',
    items: [
      'Clay workspace with ICP-specific tables',
      'Tender scrapers: Find a Tender, bidstats.uk, Contracts Finder',
      'Trigify setup for competitor & influencer monitoring',
      'Initial enrichment waterfalls',
      'Optional: Supabase/Neon for high-volume storage',
    ],
  },
  {
    phase: 2,
    title: 'Campaign Infrastructure',
    weeks: 'Weeks 2-3',
    icon: '⚙️',
    items: [
      'LaGrowthMachine setup with proxy config',
      'Instantly domains and warmup',
      'LinkedIn safety protocols',
      'HubSpot integration',
    ],
  },
  {
    phase: 3,
    title: 'Launch Tier 1 ICPs',
    weeks: 'Week 4+',
    icon: '🚀',
    items: [
      'Government Contract Bidders campaign live',
      'SECR December YE sequence active',
      'NHS Tier 1 outreach running',
      'Signal monitoring in Slack',
    ],
  },
  {
    phase: 4,
    title: 'Training & Handover',
    weeks: 'Ongoing',
    icon: '🎓',
    items: [
      'Clay training sessions (build your own)',
      'Documentation and runbooks',
      'Ongoing optimisation support',
      'Full system handover',
    ],
  },
];

// Optional Phase 2 - Fast Track (LinkedIn Ads + Content Authority)
const optionalFastTrack = {
  title: 'Fast Track: LinkedIn Ads + Content Authority',
  description: 'The ultimate playbook for rapid awareness building. LinkedIn ads warm up prospects before outreach, dramatically improving response rates.',
  when: 'Consider if: urgent need for quick awareness, new product launch, or time-sensitive market opportunity',
  items: [
    { name: 'LinkedIn Ads Campaign', description: 'Targeted awareness ads to decision-makers before outreach', icon: '📢' },
    { name: 'Content Authority Building', description: 'SuperGrowth + LinkedIn Articles for thought leadership', icon: '📝' },
    { name: 'Smart Link Tracking', description: 'Know who clicked what before you message them', icon: '🔗' },
    { name: 'Retargeting Sequences', description: 'Ad viewers get prioritised in outreach campaigns', icon: '🎯' },
  ],
  note: 'Not included in standard timeline - we recommend getting baseline metrics first. Available as add-on.',
};

// ICP Categories - 5 Core Clusters (sub-segments provisional, to be validated in discovery)
const icpCategories = [
  { name: 'Regulatory-Driven', count: '~12', examples: 'SECR, NHS, PPN 006, PAS 2080', color: 'blue' },
  { name: 'Supply Chain Pressure', count: '~6', examples: 'Tesco, Sainsburys, FMCG', color: 'green' },
  { name: 'Voluntary/Values-Driven', count: '~3', examples: 'B Corp, SBTi, CDP', color: 'purple' },
  { name: 'Sector-Specific', count: '~12', examples: 'MATs, Universities, Manufacturing', color: 'cyan' },
  { name: 'Emerging', count: '~4', examples: 'Insurance, Franchises, Recruitment', color: 'amber' },
];

// Total ICP clusters for display
const totalIcpClusters = 5;
const provisionalSubSegments = '~37';

// Tier 1 ICPs (Provisional estimates - to be validated)
const tier1Icps = [
  { name: 'Government Contract Bidders', count: '5,000+', urgency: 'Critical', trigger: 'PPN 006 Carbon Reduction Plan', deadline: 'Immediate', provisional: true, sourceUrl: 'https://www.gov.uk/government/publications/procurement-policy-note-0621-taking-account-of-carbon-reduction-plans-in-the-procurement-of-major-government-contracts' },
  { name: 'NHS Suppliers Tier 1', count: '2,000', urgency: 'High', trigger: 'Scope 3 reporting requirement', deadline: 'April 2027', provisional: true, sourceUrl: 'https://www.england.nhs.uk/greenernhs/a-net-zero-nhs/' },
  { name: 'SECR December Year-End', count: '3,300', urgency: 'High', trigger: 'Annual compliance deadline', deadline: '30 September', provisional: true, sourceUrl: 'https://www.gov.uk/government/publications/streamlined-energy-and-carbon-reporting-secr-for-academy-trusts/streamlined-energy-and-carbon-reporting-secr-for-academy-trusts' },
  { name: 'SECR March Year-End', count: '4,400', urgency: 'High', trigger: 'Annual compliance deadline', deadline: '31 December', provisional: true, sourceUrl: 'https://www.gov.uk/government/publications/streamlined-energy-and-carbon-reporting-secr-for-academy-trusts/streamlined-energy-and-carbon-reporting-secr-for-academy-trusts' },
  { name: 'National Highways Suppliers', count: '500', urgency: 'Critical', trigger: 'PAS 2080 compliance', deadline: 'End of 2025', provisional: true, sourceUrl: 'https://nationalhighways.co.uk/suppliers/carbon-management/' },
];

// SECR Threshold Info
const secrThreshold = {
  criteria: 'Companies must meet 2 of 3 criteria',
  requirements: [
    { label: 'Turnover', value: '> £36 million' },
    { label: 'Balance Sheet', value: '> £18 million' },
    { label: 'Employees', value: '250+' },
  ],
  source: 'GOV.UK SECR Guidance',
  sourceUrl: 'https://www.gov.uk/government/publications/streamlined-energy-and-carbon-reporting-secr-for-academy-trusts/streamlined-energy-and-carbon-reporting-secr-for-academy-trusts',
  note: 'Quoted companies report regardless of size. Low energy users (<40 MWh) exempt.',
};

// GTM Stack - Clay-Centric (Provisional - tools selected based on requirements)
const gtmStack = {
  clay: {
    name: 'Clay',
    tagline: 'The Heart of Your GTM Stack',
    description: 'All-in-one platform for data enrichment, waterfall sequences, and outbound orchestration',
    capabilities: [
      'Waterfall enrichment (Findy, Prospero, LeadMagic)',
      'LinkedIn deep enrichment via Apify',
      'AI-powered lead scoring & qualification',
      'Signal monitoring & Slack alerts',
      'Campaign orchestration & sequencing',
    ],
  },
  enrichment: [
    { name: 'Findy', description: 'Email discovery & verification' },
    { name: 'Prospero', description: 'B2B contact enrichment' },
    { name: 'LeadMagic', description: 'Company data enrichment' },
    { name: 'Icypeas', description: 'Email finder backup' },
    { name: 'Apify', description: 'LinkedIn deep scraping' },
  ],
  execution: [
    { name: 'LaGrowthMachine', description: 'LinkedIn automation with 4G proxy protection', primary: true },
    { name: 'Instantly', description: 'Email outreach at scale' },
    { name: 'HubSpot', description: 'System of record' },
    { name: 'Breakcold', description: 'Frontline CRM' },
    { name: 'Surfe', description: 'LinkedIn CRM sync' },
  ],
  content: [
    { name: 'SuperGrowth', description: 'AI content authority & thought leadership' },
    { name: 'LinkedIn Articles', description: 'Organic reach & credibility building' },
    { name: 'AEO Content', description: 'Answer Engine Optimization for AI search' },
  ],
  optional: [
    { name: 'Supabase/Neon', description: 'Extended data storage', note: 'For high-volume campaigns' },
    { name: 'Custom Scrapers', description: 'Find a Tender, bidstats.uk, Contract Finder' },
    { name: 'RevOps Dashboards', description: 'Advanced reporting & analytics', note: 'Add-on service' },
  ],
};

// Signal types
const signalTypes = [
  {
    name: 'Government Contract Signals',
    icon: '🏛️',
    triggers: [
      'Daily scraper on Find a Tender and bidstats.uk',
      'AI qualification for carbon-relevant tenders',
      'Instant enrichment of winning companies',
    ],
    message: '"We saw you just won [contract] - PPN 006 requires a Carbon Reduction Plan"',
  },
  {
    name: 'SECR Deadline Signals',
    icon: '📅',
    triggers: [
      'Companies House year-end date extraction',
      '6-9 month prep window targeting',
      'Countdown sequence automation',
    ],
    message: '"Your SECR deadline is in 6 months - here\'s how we help"',
  },
  {
    name: 'NHS Supplier Signals',
    icon: '🏥',
    triggers: [
      'NHS SBS framework list monitoring',
      'Contract award tracking',
      'Scope 3 deadline awareness',
    ],
    message: '"April 2027 is closer than you think - Scope 3 readiness check"',
  },
];

// Investment options - Retainer vs One-Off
const retainerOptions = {
  title: '3-Month Engagement',
  rate: '£500/day',
  daysPerWeek: '1-3 days per week',
  recommended: '2 days recommended',
  description: 'Flexible capacity based on project phase. Weekly rolling break clause - scale up or down as needed.',
  highlight: true,
};

const oneOffOptions = [
  { type: 'Clay Training Workshop', rate: '£1,000/day', description: 'Intensive hands-on training for your team' },
  { type: 'Strategy Session', rate: '£1,000/day', description: 'ICP refinement, campaign planning, stack recommendations' },
  { type: 'System Build Sprint', rate: '£1,000/day', description: 'Focused build days for specific deliverables' },
];

// Why GTM Quest - including personal ICP experience
const whyGtmQuest = [
  { title: 'Operational Execution', description: 'Not strategy decks - working systems that run' },
  { title: 'RevOps-First Architecture', description: 'Built for handover, not dependency' },
  { title: 'LinkedIn Safety Expertise', description: '4G mobile proxies, proper protocols, zero flags' },
  { title: 'Signal-Triggered Outbound', description: 'Scraper-first approach beats list-buying' },
  { title: 'AI-Native Content', description: 'AEO, Gen-SEO, and llms.txt implementation' },
  { title: 'Local', description: 'Based in Borough - happy to meet in person' },
];

// Personal ICP Experience - Competitive Advantage
const personalExperience = {
  title: 'We\'ve Been Your Prospect',
  tagline: 'First-hand experience of the compliance nightmare',
  story: {
    company: 'Transmission',
    role: 'Leadership role',
    size: '200 staff, approaching £20M turnover',
    challenge: 'ISO 27001, sustainability accreditations for tenders & existing clients',
    painPoints: [
      'Administratively heavy - took months of resource',
      'Required for winning tenders - no choice',
      'Existing clients started requiring it',
      'Real personal hell navigating the process',
    ],
    outcome: 'Would have taken a platform like Climatise if one existed that I trusted. Did exactly that for ISO 27001.',
  },
  advantage: 'This isn\'t theory - we understand the buyer psychology because we\'ve been the buyer.',
  availability: 'Available for calls to share real-world experience with prospects. Part of the sales team.',
};

// Web-Savvy Competitive Edge
const webAdvantage = {
  title: 'Web-Savvy Execution',
  description: 'We don\'t just build campaigns - we can enhance your entire digital presence',
  proof: 'This pitch deck is proof. Built in hours, not weeks. Interactive, responsive, professional.',
  capabilities: [
    'Landing page optimisation',
    'Conversion rate improvements',
    'Technical SEO implementation',
    'Content authority building',
    'Website performance audits',
  ],
  note: 'Most Clay consultants are spreadsheet-first. We\'re full-stack GTM.',
};

// TAM/SAM/SOM - Market Sizing (PROVISIONAL - first pass estimates)
const marketSizing = {
  tam: {
    value: '£2.1B+',
    label: 'Total Addressable Market',
    description: 'UK carbon accounting & sustainability software (provisional)',
    note: 'Part of €1.3T European sustainable finance market',
  },
  sam: {
    value: '£340M',
    label: 'Serviceable Addressable',
    description: 'Companies with regulatory/compliance requirements',
    note: '~21,000 companies with hard deadlines',
  },
  som: {
    value: '£12M',
    label: 'Year 1 Target',
    description: 'Realistic pipeline with systematic GTM',
    assumptions: [
      '15,200 Tier 1 targets',
      '5% → qualified lead',
      '20% close rate',
      '£8K avg deal',
    ],
    calculation: '= £12.2M pipeline',
  },
  provisional: true,
  sources: [
    { name: 'Grant Thornton UK Business Survey', url: 'https://www.grantthornton.co.uk/news-centre/less-than-half-of-uk-businesses-have-sustainability-targets-in-place/' },
    { name: 'FCA UK ESG Ratings Market', url: 'https://www.fca.org.uk/publication/research-notes/understanding-uk-esg-ratings-market-findings-our-surveys.pdf' },
    { name: 'Europe Sustainable Finance Market', url: 'https://www.marketdataforecast.com/market-reports/europe-sustainable-finance-market' },
    { name: 'Octopus Investments UK Carbon Credits Survey', url: 'https://www.netzeroinvestor.net/news-and-views/briefs/uk-firms-prioritise-domestic-carbon-credits-amid-net-zero-push' },
  ],
};

// UK Domestic Preference - Competitive Advantage for Climatise
const ukAdvantage = {
  headline: 'UK Firms Prefer Domestic Solutions',
  stat: '76%',
  description: 'of UK businesses would be more inclined to purchase carbon credits if sourced domestically',
  source: 'Octopus Investments Survey, 300 UK Business Leaders',
  sourceUrl: 'https://www.netzeroinvestor.net/news-and-views/briefs/uk-firms-prioritise-domestic-carbon-credits-amid-net-zero-push',
  supportingStats: [
    { value: '92%', label: 'express confidence in meeting net-zero targets' },
    { value: '73%', label: 'plan to offset emissions via carbon credits' },
    { value: '64%', label: 'have already purchased carbon credits' },
    { value: '86%', label: 'have net-zero targets established' },
  ],
  knowledgeGap: {
    stat: '42%',
    description: 'Only 42% can accurately define what carbon credits are',
    opportunity: '30% cite lack of understanding as the primary barrier to purchasing - education opportunity',
  },
  implication: 'UK-based Climatise has a natural trust advantage over international competitors.',
};

// Lennon Harding-Wade - Personal Profile (from LinkedIn enrichment)
const lennonProfile = {
  name: 'Lennon Harding-Wade',
  title: 'CEO',
  company: 'Climatise',
  location: 'London, England',
  image: '/Lennon.jpg',
  linkedinFollowers: '3,277',
  connections: '500+',
  tenure: 'Jan 2024 - Present',
  previousRole: 'Finance Transformation Consultant',
  previousCompany: 'The Consultancy Group',
  previousTenure: 'Sep 2022 - Jan 2024',
  previousDescription: 'Senior mandates in global programmes across UK, Europe & Asia. FTSE 100 to PE-backed startups.',
  education: 'Bryanston School',
  topSkills: ['Sustainability', 'Net-Zero Carbon Emissions', 'Climate Change', 'Decarbonization', 'Carbon Footprinting'],
  interests: {
    topVoices: ['Steven Bartlett'],
    following: 'Entrepreneurial & leadership content',
  },
  aboutClimatise: 'Simplify and enhance sustainability reporting obligations. Platform that streamlines processes, enabling organisations to harness the true value of their data and make informed decisions in real-time.',
  mission: 'Visibility and transparency is everything.',
};

// Risk Mitigation / Flexibility
const flexibility = {
  title: 'Total Flexibility',
  headline: 'Zero Lock-In, Scale As Needed',
  points: [
    { title: 'Weekly Break Clause', description: 'Scale up or down based on project phase - no penalties' },
    { title: '1-3 Days/Week', description: 'Choose your capacity: 1 day for maintenance, 3 days for intensive builds' },
    { title: 'Transparent Pricing', description: 'Day rate model - you know exactly what you\'re paying for' },
    { title: 'Full Handover', description: 'Everything is documented and transferable - no dependency' },
  ],
  record: 'We\'ve never had a client leave mid-pilot. The flexibility means they don\'t need to.',
};

// Expected Outcomes - Targets Framework
const expectedOutcomes = {
  title: 'Expected Outcomes',
  subtitle: 'Targets to be agreed based on your current metrics',
  note: 'Final targets calibrated during discovery based on your conversion rates, deal size, and sales cycle',
  metrics: [
    {
      name: 'Qualified Leads/Month',
      description: 'Net new companies entering pipeline',
      formula: 'Based on: Tier 1 targets × outreach rate × response rate',
      placeholder: 'TBD',
      icon: '🎯',
    },
    {
      name: 'Pipeline Value',
      description: 'Monthly pipeline generated',
      formula: 'Qualified leads × average deal size × stage probability',
      placeholder: 'TBD',
      icon: '💰',
    },
    {
      name: 'Cost Per Lead',
      description: 'Fully loaded acquisition cost',
      formula: 'Monthly investment ÷ qualified leads',
      placeholder: 'TBD',
      icon: '📊',
    },
    {
      name: 'Payback Period',
      description: 'Time to ROI',
      formula: 'Investment ÷ (pipeline × close rate × LTV)',
      placeholder: 'TBD',
      icon: '⏱️',
    },
  ],
  inputs: {
    title: 'What We Need From You',
    items: [
      'Current website conversion rate',
      'Average deal size by tier',
      'Sales cycle length',
      'Current close rate',
      'Customer lifetime value',
    ],
  },
  commitment: 'We don\'t promise vanity metrics. We agree targets together and track what matters.',
};

// Narrative transitions / scroll prompts
const narrativeFlow = [
  { from: 'hero', prompt: 'But first, let us tell you why we understand this challenge...' },
  { from: 'personal', prompt: 'Now let\'s look at the scale of opportunity...' },
  { from: 'challenge', prompt: 'And the timing couldn\'t be better...' },
  { from: 'whynow', prompt: 'So what does success look like?' },
  { from: 'outcomes', prompt: 'Here\'s how we make it happen...' },
  { from: 'solution', prompt: 'Powered by a battle-tested stack...' },
  { from: 'stack', prompt: 'Delivered in a structured build...' },
  { from: 'timeline', prompt: 'With investment that makes sense...' },
  { from: 'investment', prompt: 'And zero lock-in...' },
  { from: 'flexibility', prompt: 'Here\'s why we\'re different...' },
];

// Scroll Prompt Component - narrative guide between sections
function ScrollPrompt({ text, color = 'blue' }: { text: string; color?: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-400 border-blue-500/20',
    green: 'text-green-400 border-green-500/20',
    amber: 'text-amber-400 border-amber-500/20',
    purple: 'text-purple-400 border-purple-500/20',
    cyan: 'text-cyan-400 border-cyan-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 md:py-12 flex flex-col items-center justify-center"
    >
      <p className={`text-sm md:text-base italic ${colorClasses[color]} mb-4 text-center px-4`}>
        {text}
      </p>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className={`w-6 h-6 border-b-2 border-r-2 ${colorClasses[color]} transform rotate-45`}
      />
    </motion.div>
  );
}

const CORRECT_PASSWORD = 'climatisegtmquest';

// View types for the three-tier navigation
type ViewType = 'executive' | 'gettoyes' | 'full';

// View Navigation Component - Sticky tabs
function ViewNavigation({
  currentView,
  setCurrentView
}: {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}) {
  const views = [
    { id: 'executive' as ViewType, label: 'Executive Summary', time: '30 sec', icon: '📋' },
    { id: 'gettoyes' as ViewType, label: 'Sales Deck', time: '5 min', icon: '🎯' },
    { id: 'full' as ViewType, label: 'Full Comprehensive', time: '20 min', icon: '📚' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center gap-1 md:gap-2 py-3">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => {
                setCurrentView(view.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                currentView === view.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="hidden md:inline">{view.icon}</span>
              <span className="hidden sm:inline">{view.label}</span>
              <span className="sm:hidden">{view.label.split(' ')[0]}</span>
              <span className={`text-xs ${currentView === view.id ? 'text-blue-400/70' : 'text-white/40'}`}>
                ({view.time})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Executive Summary Component - 30 second boardroom view
function ExecutiveSummary({ setCurrentView }: { setCurrentView: (view: ViewType) => void }) {
  return (
    <section className="min-h-[80vh] py-12 md:py-16 bg-gradient-to-b from-zinc-950 to-black flex items-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        {/* Executive Summary Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
            <span>Executive Summary</span>
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src="/GTM Logo New.png" alt="GTM Quest" width={80} height={28} className="h-6 w-auto" />
            <span className="text-white/30">×</span>
            <Image src="/climatise-logo.png" alt="Climatise" width={90} height={28} className="h-6 w-auto bg-white/10 rounded px-2 py-1" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">GTM Proposal</h1>
          <p className="text-white/50 text-sm">Prepared for {lennonProfile.name}, {lennonProfile.title}</p>
        </motion.div>

        {/* Two Column: Opportunity + Ask */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* The Opportunity */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h2 className="text-blue-400 text-xs uppercase tracking-wider mb-4">The Opportunity</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">•</span>
                <span className="text-white/80"><span className="text-blue-400 font-bold">£2.1B+</span> UK carbon accounting market</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg">•</span>
                <span className="text-white/80"><span className="text-green-400 font-bold">76%</span> prefer UK-based solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 text-lg">•</span>
                <span className="text-white/80"><span className="text-amber-400 font-bold">15,200+</span> Tier 1 targets with hard deadlines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-lg">•</span>
                <span className="text-white/80"><span className="text-red-400 font-bold">&lt;50%</span> UK businesses have sustainability targets</span>
              </li>
            </ul>
          </div>

          {/* The Ask */}
          <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-green-400 text-xs uppercase tracking-wider mb-4">The Ask</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span className="text-white/80"><span className="font-semibold text-white">2-3 days/week</span> for 8-12 weeks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span className="text-white/80"><span className="font-semibold text-white">Weekly break clause</span> — zero lock-in</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span className="text-white/80"><span className="font-semibold text-white">£500/day</span> — transparent pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span className="text-white/80"><span className="font-semibold text-white">Full handover</span> — no dependency</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Expected Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8"
        >
          <h2 className="text-amber-400 text-xs uppercase tracking-wider mb-4">Expected Outcomes (Ballpark)</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-white">£200K+</div>
              <div className="text-white/50 text-xs">Pipeline/Quarter</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">50-100</div>
              <div className="text-white/50 text-xs">Qualified Leads/mo</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">2-5%</div>
              <div className="text-white/50 text-xs">Response Rate</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">£50-150</div>
              <div className="text-white/50 text-xs">Cost Per Lead</div>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">Industry standard cold outbound. Final targets calibrated to your metrics.</p>
        </motion.div>

        {/* Risks & Mitigations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-10"
        >
          <h2 className="text-white/50 text-xs uppercase tracking-wider mb-4">Risks & Mitigations</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-white/70"><span className="text-white">Zero lock-in:</span> Weekly break clause</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-white/70"><span className="text-white">No dependency:</span> Full system handover</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-white/70"><span className="text-white">Transparent:</span> Day rate pricing</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://calendly.com/my-first-quest"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition mb-6"
          >
            Discuss Proposal
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Links to other views */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => setCurrentView('gettoyes')}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Want the 5-min pitch? <span className="font-semibold">Sales Deck →</span>
            </button>
            <button
              onClick={() => setCurrentView('full')}
              className="text-white/50 hover:text-white/70 flex items-center gap-1"
            >
              Want everything? <span className="font-semibold">Full Comprehensive →</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Get to Yes Component - 5 minute sales deck (7 slides)
function GetToYes({ setCurrentView }: { setCurrentView: (view: ViewType) => void }) {
  const slides = [
    {
      title: 'The Market',
      color: 'blue',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl font-black text-green-400">76%</div>
              <div className="text-white/60 text-xs">prefer UK solutions</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-3xl font-black text-blue-400">&lt;50%</div>
              <div className="text-white/60 text-xs">have sustainability targets</div>
            </div>
          </div>
          <p className="text-white/70 text-sm">Only 42% can define carbon credits. Knowledge gap = opportunity.</p>
        </div>
      ),
    },
    {
      title: 'Your ICPs',
      color: 'green',
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">5 ICP Clusters</span>
            <span className="text-green-400 font-bold">15,200+ Tier 1</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {icpCategories.slice(0, 4).map((cat) => (
              <div key={cat.name} className="bg-white/5 rounded px-2 py-1.5">
                <span className="text-white/80">{cat.name}</span>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-xs">Hard compliance deadlines: PPN 006, SECR, NHS Scope 3</p>
        </div>
      ),
    },
    {
      title: 'The System',
      color: 'purple',
      content: (
        <div className="flex items-center justify-center gap-2 text-sm py-4">
          <span className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg font-semibold">Clay</span>
          <span className="text-white/30">→</span>
          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-2 rounded-lg font-semibold">Signals</span>
          <span className="text-white/30">→</span>
          <span className="bg-purple-500/20 text-purple-400 px-3 py-2 rounded-lg font-semibold">Outreach</span>
          <span className="text-white/30">→</span>
          <span className="bg-green-500/20 text-green-400 px-3 py-2 rounded-lg font-semibold">Pipeline</span>
        </div>
      ),
    },
    {
      title: 'The Intelligence',
      color: 'cyan',
      content: (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">🏛️</div>
            <div className="text-white/80">Tender Scraping</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">📡</div>
            <div className="text-white/80">LinkedIn Signals</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">🔍</div>
            <div className="text-white/80">Competitor Intel</div>
          </div>
        </div>
      ),
    },
    {
      title: 'The Timeline',
      color: 'amber',
      content: (
        <div className="flex justify-between items-center text-xs">
          {phases.map((phase, i) => (
            <div key={phase.phase} className="flex items-center">
              <div className="text-center">
                <div className="text-lg mb-1">{phase.icon}</div>
                <div className="text-white/80 font-semibold">{phase.title}</div>
                <div className="text-white/50">{phase.weeks}</div>
              </div>
              {i < phases.length - 1 && <span className="text-white/20 mx-2">→</span>}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'The Investment',
      color: 'green',
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Day rate</span>
            <span className="text-white font-bold">£500/day</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Commitment</span>
            <span className="text-white font-bold">2-3 days/week</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Duration</span>
            <span className="text-white font-bold">8-12 weeks</span>
          </div>
          <div className="bg-green-500/10 text-green-400 text-xs px-3 py-2 rounded text-center">
            Weekly break clause — scale up/down anytime
          </div>
        </div>
      ),
    },
    {
      title: 'Next Step',
      color: 'blue',
      content: (
        <div className="text-center py-2">
          <p className="text-white/70 mb-4">30-minute discovery call to discuss your metrics and targets.</p>
          <a
            href="https://calendly.com/my-first-quest"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-bold"
          >
            Book Call
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      ),
    },
  ];

  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
  };

  const textColorMap: Record<string, string> = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
  };

  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="bg-blue-500/10 text-blue-400 text-xs uppercase tracking-wider px-3 py-1 rounded-full">
            Sales Deck
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-4">The 5-Minute Pitch</h2>
          <p className="text-white/50 text-sm mt-2">Everything you need to know, nothing you don&apos;t.</p>
        </motion.div>

        {/* Slides */}
        <div className="space-y-6">
          {slides.map((slide, i) => (
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-xl p-6 ${colorMap[slide.color]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold ${textColorMap[slide.color]}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-bold text-white">{slide.title}</h3>
              </div>
              {slide.content}
            </motion.div>
          ))}
        </div>

        {/* Links to other views */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 pt-10 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => setCurrentView('executive')}
              className="text-white/50 hover:text-white/70 flex items-center gap-1"
            >
              ← Back to <span className="font-semibold">Executive Summary</span>
            </button>
            <button
              onClick={() => setCurrentView('full')}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Want the full picture? <span className="font-semibold">Full Comprehensive →</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ClimatisePage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image
                src="/GTM Logo New.png"
                alt="GTM Quest"
                width={100}
                height={35}
                className="h-8 w-auto"
              />
              <span className="text-white/40 text-xl">×</span>
              <Image
                src="/climatise-logo.png"
                alt="Climatise"
                width={110}
                height={35}
                className="h-8 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Protected Content</h1>
            <p className="text-white/60">
              This pitch deck contains confidential information prepared exclusively for Climatise.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                placeholder="Enter password to continue"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Access Pitch Deck
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Your data is protected. Contact{' '}
            <a href="mailto:dan@gtm.quest" className="text-blue-400 hover:text-blue-300">
              dan@gtm.quest
            </a>{' '}
            for access.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Executive Summary Section - Executive Summary */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-zinc-950 to-black border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Executive Summary Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              Executive Summary
            </span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Image src="/GTM Logo New.png" alt="GTM Quest" width={80} height={28} className="h-6 w-auto" />
              <span className="text-white/30">×</span>
              <Image src="/climatise-logo.png" alt="Climatise" width={90} height={28} className="h-6 w-auto bg-white/10 rounded px-2 py-1" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-1">GTM Proposal</h1>
            <p className="text-white/50 text-sm">Prepared for {lennonProfile.name}, {lennonProfile.title}</p>
          </motion.div>

          {/* Two Column: Opportunity + Ask */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* The Opportunity */}
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
              <h2 className="text-blue-400 text-xs uppercase tracking-wider mb-4">The Opportunity</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">•</span>
                  <span className="text-white/80"><span className="text-blue-400 font-bold">£2.1B+</span> UK carbon accounting market</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">•</span>
                  <span className="text-white/80"><span className="text-green-400 font-bold">76%</span> prefer UK-based solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 text-lg">•</span>
                  <span className="text-white/80"><span className="text-amber-400 font-bold">15,200+</span> Tier 1 targets with hard deadlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">•</span>
                  <span className="text-white/80"><span className="text-red-400 font-bold">&lt;50%</span> UK businesses have sustainability targets</span>
                </li>
              </ul>
            </div>

            {/* The Ask */}
            <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-6">
              <h2 className="text-green-400 text-xs uppercase tracking-wider mb-4">The Ask</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><span className="font-semibold text-white">2-3 days/week</span> for 8-12 weeks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><span className="font-semibold text-white">Weekly break clause</span> — zero lock-in</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><span className="font-semibold text-white">£500/day</span> — transparent pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><span className="font-semibold text-white">Full handover</span> — no dependency</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Risks & Mitigations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8"
          >
            <h2 className="text-white/50 text-xs uppercase tracking-wider mb-4">Risks & Mitigations</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70"><span className="text-white">Zero lock-in:</span> Weekly break clause</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70"><span className="text-white">No dependency:</span> Full system handover</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/70"><span className="text-white">Transparent:</span> Day rate pricing</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <a
              href="https://calendly.com/my-first-quest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Discuss Proposal
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-white/40 text-sm">
                Scroll down for the full proposal ↓
              </p>
              <span className="text-white/20">|</span>
              <button
                onClick={async () => {
                  const blob = await generateClimatisePDF();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Climatise-GTM-Proposal.pdf';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalized Intro - "This is for you, Lennon" */}
          <section className="py-8 md:py-12 bg-gradient-to-b from-zinc-950 to-black border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            {/* Lennon's Photo */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/20">
                <Image
                  src={lennonProfile.image}
                  alt={lennonProfile.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-xs">✓</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">
                Prepared exclusively for
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                {lennonProfile.name}
              </h2>
              <p className="text-blue-400 font-semibold mb-3">
                {lennonProfile.title} at {lennonProfile.company}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs">
                <span className="bg-white/5 text-white/60 px-3 py-1 rounded-full">
                  {lennonProfile.linkedinFollowers} followers
                </span>
                <span className="bg-white/5 text-white/60 px-3 py-1 rounded-full">
                  {lennonProfile.location}
                </span>
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                  {lennonProfile.tenure}
                </span>
              </div>
            </div>

            {/* Company Logo with dark background fix */}
            <div className="flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10">
                <Image
                  src="/climatise-logo.png"
                  alt="Climatise"
                  width={100}
                  height={35}
                  className="h-8 md:h-10 w-auto"
                />
              </div>
            </div>
          </motion.div>

          {/* Enrichment Preview - shows we've done our homework */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-zinc-900/50 border border-white/5 rounded-xl p-4 md:p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔍</span>
              <span className="text-white/50 text-xs uppercase tracking-wider">What we found</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="text-white/40">Previous</div>
                <div className="text-white/80">{lennonProfile.previousRole}</div>
                <div className="text-white/50">{lennonProfile.previousCompany}</div>
              </div>
              <div>
                <div className="text-white/40">Education</div>
                <div className="text-white/80">{lennonProfile.education}</div>
              </div>
              <div>
                <div className="text-white/40">Follows</div>
                <div className="text-white/80">{lennonProfile.interests.topVoices.join(', ')}</div>
              </div>
              <div>
                <div className="text-white/40">Skills</div>
                <div className="text-white/80">{lennonProfile.topSkills.slice(0, 2).join(', ')}</div>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-3 italic">
              This is what our enrichment does — for every prospect in your pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Combined Hero + Challenge - One Seamless Intro */}
      <section className="relative py-16 md:py-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          {/* Climatise Logo - THE HERO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mb-10"
          >
            {/* Big animated Climatise logo */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(74, 222, 128, 0.1)",
                  "0 0 40px rgba(74, 222, 128, 0.2)",
                  "0 0 20px rgba(74, 222, 128, 0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
            >
              <Image
                src="/climatise-logo.png"
                alt="Climatise"
                width={280}
                height={80}
                className="h-16 md:h-20 lg:h-24 w-auto"
                priority
              />
            </motion.div>

            {/* Subtle GTM Quest credit */}
            <div className="flex items-center gap-2 mt-4 text-white/40 text-xs">
              <span>GTM proposal by</span>
              <Image
                src="/GTM Logo New.png"
                alt="GTM Quest"
                width={60}
                height={20}
                className="h-4 w-auto opacity-60"
              />
            </div>
          </motion.div>

          {/* The Challenge Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="text-white/40 text-xs uppercase tracking-wider mb-4">
              The Opportunity
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                15,200 companies
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-amber-400"
              >
                need carbon accounting.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-white/50 text-2xl md:text-4xl"
              >
                Most don&apos;t know yet.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-4"
            >
              UK sustainability standards publish <span className="text-amber-400 font-semibold">February 2026</span>.
              <span className="text-green-400 font-semibold"> 5 ICP clusters</span> with hard compliance deadlines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mb-6 flex flex-wrap justify-center items-center gap-x-1 gap-y-2"
            >
              <a
                href="https://www.grantthornton.co.uk/news-centre/less-than-half-of-uk-businesses-have-sustainability-targets-in-place/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-blue-400 transition"
              >
                <span className="text-blue-400 font-semibold">&lt;50%</span> of UK businesses have sustainability targets
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-white/30">— Grant Thornton</span>
              </a>
              <span className="text-white/20 hidden md:inline">|</span>
              <a
                href="https://www.netzeroinvestor.net/news-and-views/briefs/uk-firms-prioritise-domestic-carbon-credits-amid-net-zero-push"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition"
              >
                <span className="text-green-400 font-semibold">76%</span> prefer UK-based carbon solutions
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-white/30">— Octopus</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Pain Point Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <span className="bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20 text-sm">
              Compliance deadlines looming
            </span>
            <span className="bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full border border-amber-500/20 text-sm">
              Manual outreach doesn&apos;t scale
            </span>
            <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 text-sm">
              Competitors are moving fast
            </span>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://calendly.com/my-first-quest"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Discuss Proposal
            </a>
          </motion.div>
        </div>
      </section>

      {/* Current Approach - What's Working */}
      <section className="py-10 md:py-12 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-white/40 text-xs uppercase tracking-wider">Your Current Approach</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Webinars - Working */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-500/5 border border-green-500/20 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="font-bold text-white">Webinar Outreach</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Working</span>
              </div>
              <p className="text-white/60 text-sm">
                Great for education and lead generation. Keep this — it builds authority and trust.
              </p>
            </motion.div>

            {/* Manual LinkedIn - Bottleneck */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-amber-400 text-xl">⚠</span>
                <span className="font-bold text-white">Manual LinkedIn</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Bottleneck</span>
              </div>
              <p className="text-white/60 text-sm">
                One person messaging manually. Can&apos;t scale. Limited to ~50 connections/week safely.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/70 text-sm md:text-base">
              <span className="text-white font-semibold">The goal:</span> Industrialize, scale, and optimize your GTM machine.
              <br />
              <span className="text-green-400">Keep what works.</span> <span className="text-blue-400">Automate what doesn&apos;t.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ICP Challenges - Barriers to Sign-up */}
      <section className="py-10 md:py-12 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-white/40 text-xs uppercase tracking-wider mb-2 block">By ICP Cluster</span>
            <h3 className="text-xl md:text-2xl font-bold text-white">Challenges We Need to Overcome</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Regulatory-Driven */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-blue-500/20 rounded-xl p-5"
            >
              <div className="text-blue-400 font-bold text-sm mb-2">Regulatory-Driven</div>
              <div className="text-white/50 text-xs mb-3">SECR, NHS, PPN 006</div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  &quot;We already have a spreadsheet&quot;
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  &quot;Our accountant handles it&quot;
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  Don&apos;t know deadline is approaching
                </li>
              </ul>
            </motion.div>

            {/* Supply Chain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-green-500/20 rounded-xl p-5"
            >
              <div className="text-green-400 font-bold text-sm mb-2">Supply Chain Pressure</div>
              <div className="text-white/50 text-xs mb-3">Tesco, Sainsbury&apos;s suppliers</div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  &quot;We&apos;ll deal with it when required&quot;
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  Don&apos;t see competitive advantage
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  Budget constraints
                </li>
              </ul>
            </motion.div>

            {/* Voluntary/Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 border border-purple-500/20 rounded-xl p-5"
            >
              <div className="text-purple-400 font-bold text-sm mb-2">Values-Driven</div>
              <div className="text-white/50 text-xs mb-3">B Corp, SBTi targets</div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  &quot;We&apos;re already doing enough&quot;
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  Internal team handling it
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <span className="text-red-400">•</span>
                  Consultant relationship
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/50 text-xs mt-6"
          >
            Signal-triggered outreach overcomes these objections by reaching them <span className="text-green-400">at the moment of need</span>.
          </motion.p>
        </div>
      </section>

      {/* UK Domestic Preference - Climatise's Natural Advantage */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-green-400 text-xs uppercase tracking-wider">Climatise Advantage</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-2">{ukAdvantage.headline}</h3>
          </motion.div>

          {/* Hero Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 md:p-10 text-center mb-8"
          >
            <div className="text-5xl md:text-7xl font-black text-green-400 mb-3">{ukAdvantage.stat}</div>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-4">{ukAdvantage.description}</p>
            <a
              href={ukAdvantage.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 text-sm hover:text-green-400 inline-flex items-center gap-1"
            >
              {ukAdvantage.source}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>

          {/* Supporting Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {ukAdvantage.supportingStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Knowledge Gap = Opportunity */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 text-center"
          >
            <div className="text-amber-400 font-bold mb-2">Knowledge Gap = Opportunity</div>
            <p className="text-white/70 text-sm mb-1">
              <span className="text-amber-400 font-semibold">{ukAdvantage.knowledgeGap.stat}</span> {ukAdvantage.knowledgeGap.description}
            </p>
            <p className="text-white/50 text-xs">{ukAdvantage.knowledgeGap.opportunity}</p>
          </motion.div>

          {/* Implication */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-green-400/80 text-sm mt-6 font-medium"
          >
            {ukAdvantage.implication}
          </motion.p>
        </div>
      </section>

      {/* TAM/SAM/SOM - Market Sizing */}
      <section className="py-12 md:py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-blue-400 text-xs uppercase tracking-wider">Market Opportunity</span>
              <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">
                Provisional
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-2">The Size of the Prize</h3>
            <p className="text-white/50 text-xs mt-1">First-pass estimates — to be validated in discovery</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* TAM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-white/10 rounded-xl p-5 md:p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">{marketSizing.tam.value}</div>
              <div className="font-semibold text-white text-sm mb-1">{marketSizing.tam.label}</div>
              <div className="text-white/50 text-xs">{marketSizing.tam.description}</div>
            </motion.div>

            {/* SAM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-green-500/20 rounded-xl p-5 md:p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">{marketSizing.sam.value}</div>
              <div className="font-semibold text-white text-sm mb-1">{marketSizing.sam.label}</div>
              <div className="text-white/50 text-xs">{marketSizing.sam.description}</div>
            </motion.div>

            {/* SOM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-500/10 to-green-500/10 border-2 border-amber-500/30 rounded-xl p-5 md:p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-amber-400 mb-2">{marketSizing.som.value}</div>
              <div className="font-semibold text-white text-sm mb-1">{marketSizing.som.label}</div>
              <div className="text-white/50 text-xs">{marketSizing.som.description}</div>
            </motion.div>
          </div>

          {/* SOM Calculation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 md:p-5"
          >
            <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Year 1 Pipeline Calculation</div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm">
              {marketSizing.som.assumptions.map((assumption, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="bg-white/5 text-white/80 px-3 py-1 rounded">{assumption}</span>
                  {i < marketSizing.som.assumptions.length - 1 && <span className="text-white/30">×</span>}
                </span>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-amber-400 font-bold">{marketSizing.som.calculation}</span>
            </div>
            <div className="text-center mt-4 pt-4 border-t border-white/5">
              <div className="text-white/30 text-xs mb-2">Sources</div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                {marketSizing.sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-xs hover:text-blue-400 inline-flex items-center gap-1"
                  >
                    {source.name}
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Prompt - Trust Building */}
      <ScrollPrompt text={narrativeFlow[0].prompt} color="amber" />

      {/* Personal ICP Experience - MOVED UP for trust building */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-500/30">
                Why We Get It
              </span>
            </div>

            <div className="flex items-start gap-3 md:gap-4 mb-6">
              <div className="text-3xl md:text-4xl">🎯</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-amber-400 mb-2">{personalExperience.title}</h3>
                <p className="text-white/80 text-sm md:text-lg">{personalExperience.tagline}</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 md:p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-2">The Experience</div>
                  <div className="space-y-2 text-sm">
                    <div className="text-white"><strong>{personalExperience.story.company}</strong> - {personalExperience.story.size}</div>
                    <div className="text-white/70">{personalExperience.story.challenge}</div>
                  </div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-2">The Pain Points</div>
                  <ul className="space-y-1">
                    {personalExperience.story.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <span className="text-amber-400">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <p className="text-white/80 text-sm md:text-base italic border-l-2 border-amber-500/50 pl-4">
                &quot;{personalExperience.story.outcome}&quot;
              </p>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 text-xs md:text-sm">
                <div className="bg-amber-500/10 rounded-lg px-4 py-2">
                  <span className="text-amber-400 font-semibold">{personalExperience.advantage}</span>
                </div>
                <div className="bg-green-500/10 rounded-lg px-4 py-2 flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-green-400 font-semibold">{personalExperience.availability}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Prompt 2 */}
      <ScrollPrompt text={narrativeFlow[1].prompt} color="green" />

      {/* Executive Summary */}
      <section className="py-16 bg-zinc-950 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-white/40 text-sm font-bold uppercase tracking-wider">Executive Summary</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-blue-400 mb-2">
                <CountUp end={totalIcpClusters} duration={1.5} enableScrollSpy scrollSpyOnce /> Clusters
              </div>
              <p className="text-white/60 text-sm">{provisionalSubSegments} sub-segments across regulatory, supply chain & sector-specific</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-green-400 mb-2">
                <CountUp end={15200} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-white/60 text-sm">Tier 1 targets with hard compliance deadlines</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-amber-400 mb-2">Feb 2026</div>
              <p className="text-white/60 text-sm">UK sustainability standards finalise - next month</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="font-bold text-white text-lg mb-4">The Proposition</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><strong className="text-white">Signal-triggered outbound</strong> - reach prospects at the moment of buying intent</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><strong className="text-white">Clay-powered enrichment</strong> - 250+ data points per prospect</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><strong className="text-white">Human-in-the-loop</strong> - 100% review for Tier 1 before first message</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><strong className="text-white">RevOps-first architecture</strong> - built for handover, not dependency</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><strong className="text-white">LinkedIn safety</strong> - 4G proxies, proper protocols, zero account flags</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-white/80"><strong className="text-white">Training available</strong> - bring Clay expertise in-house</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge - ICP Categories */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              5 Core Clusters, Complex Signals, Manual Chaos
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              ~{provisionalSubSegments.replace('~', '')} sub-segments to validate. Without automation, you&apos;re leaving pipeline on the table.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {icpCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5 text-center hover:border-green-500/30 transition group"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-black text-green-400 mb-2"
                >
                  {cat.count}
                </motion.div>
                <div className="text-white font-semibold text-sm mb-2">{cat.name}</div>
                <div className="text-white/50 text-xs">{cat.examples}</div>
              </motion.div>
            ))}
          </div>

          {/* Combined TAM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl font-black text-white mb-2">15,200</div>
            <div className="text-white/70">Tier 1 Targets: High-Intent Companies with Hard Deadlines</div>
            <div className="text-white/50 text-sm mt-2">
              Sources: Companies House, Find a Tender, NHS SBS Framework
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regulatory Momentum - Why Now */}
      <section className="py-16 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 border border-amber-500/20 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚡</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-400 mb-3">Why Now: The Window is Closing</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-amber-400 font-bold text-lg">February 2026</div>
                    <p className="text-white/60 text-sm">UK publishes final sustainability standards - next month</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-amber-400 font-bold text-lg">50% Threshold Increase</div>
                    <p className="text-white/60 text-sm">Company size thresholds changing - more companies in scope</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  Companies are making compliance decisions now. First-mover advantage in reaching decision-makers before the standards are finalised.
                  Plus: smaller companies coming into scope = perfect timing for Climatise&apos;s new SME product launch.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a href="https://www.responsible-investor.com/esg-round-up-uk-to-publish-final-sustainability-standards-next-month/" target="_blank" rel="noopener noreferrer" className="text-amber-400/70 hover:text-amber-400">
                    UK Standards Feb 2026 →
                  </a>
                  <a href="https://pkf-francisclark.co.uk/insights/uk-company-size-thresholds-to-increase-by-50/" target="_blank" rel="noopener noreferrer" className="text-amber-400/70 hover:text-amber-400">
                    Threshold Changes →
                  </a>
                  <a href="https://www.edie.net/navigating-esg-reporting-standards-in-2026-what-eu-and-uk-firms-need-to-know/" target="_blank" rel="noopener noreferrer" className="text-amber-400/70 hover:text-amber-400">
                    2026 Standards Guide →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Prompt - What does success look like? */}
      <ScrollPrompt text={narrativeFlow[3].prompt} color="green" />

      {/* Expected Outcomes - THE MISSING PIECE */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              {expectedOutcomes.title}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-4">
              {expectedOutcomes.subtitle}
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              {expectedOutcomes.note}
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {expectedOutcomes.metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-green-500/20 rounded-xl p-4 md:p-5 text-center hover:border-green-500/40 transition"
              >
                <div className="text-2xl md:text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-green-400 mb-1">{metric.placeholder}</div>
                <div className="font-semibold text-white text-xs md:text-sm mb-1">{metric.name}</div>
                <div className="text-white/40 text-xs hidden md:block">{metric.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Formula explanations - collapsed on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 md:p-6 mb-8 hidden md:block"
          >
            <h4 className="text-white/50 text-xs uppercase tracking-wider mb-4">How We Calculate</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {expectedOutcomes.metrics.map((metric) => (
                <div key={metric.name} className="text-sm">
                  <span className="text-white font-semibold">{metric.name}:</span>
                  <span className="text-white/50 ml-2">{metric.formula}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What We Need From You */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/30 rounded-xl p-5 md:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">📋</div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-3">{expectedOutcomes.inputs.title}</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {expectedOutcomes.inputs.items.map((item, i) => (
                    <span key={i} className="text-xs bg-white/5 text-white/70 px-3 py-1.5 rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-green-400 text-sm font-semibold">
                  {expectedOutcomes.commitment}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Prompt - How we make it happen */}
      <ScrollPrompt text={narrativeFlow[4].prompt} color="blue" />

      {/* Tier 1 Priority ICPs */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              Priority Targets
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Tier 1 ICPs: Where We Start
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              15,200 high-intent companies with hard deadlines driving purchase urgency.
            </p>
          </motion.div>

          <div className="space-y-4">
            {tier1Icps.map((icp, index) => (
              <motion.div
                key={icp.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl mb-1">{icp.name}</h3>
                    <p className="text-white/60">{icp.trigger}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{icp.count}</div>
                      <div className="text-white/50 text-xs">Companies</div>
                    </div>
                    <div className="text-center">
                      <a
                        href={icp.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {icp.deadline} ↗
                      </a>
                      <div className="text-white/50 text-xs">Deadline</div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        icp.urgency === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {icp.urgency}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SECR Threshold Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">📊</div>
              <div>
                <h4 className="font-bold text-white mb-2">SECR Reporting Thresholds</h4>
                <p className="text-white/70 text-sm mb-3">
                  {secrThreshold.criteria}:
                </p>
                <div className="flex flex-wrap gap-4 mb-3">
                  {secrThreshold.requirements.map((req) => (
                    <div key={req.label} className="bg-white/5 rounded-lg px-4 py-2">
                      <div className="text-blue-400 font-bold">{req.value}</div>
                      <div className="text-white/50 text-xs">{req.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs">
                  {secrThreshold.note} Source:{' '}
                  <a href={secrThreshold.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                    {secrThreshold.source}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Citations & Provisional Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 bg-zinc-900/30 border border-white/5 rounded-lg p-4"
          >
            <p className="text-amber-400/80 text-xs mb-2">
              <span className="font-bold">⚠️ Provisional Estimates:</span> All figures are initial estimates to be validated during discovery phase.
            </p>
            <p className="text-white/40 text-xs">
              <span className="font-semibold">Data Sources:</span> Government Contract Bidders estimated from{' '}
              <a href="https://www.gov.uk/contracts-finder" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                Contracts Finder
              </a>{' '}
              & PPN 006 requirements. NHS Suppliers from{' '}
              <a href="https://www.sbs.nhs.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                NHS SBS Framework
              </a>
              . SECR figures from{' '}
              <a href="https://www.gov.uk/government/publications/companies-house-official-statistics" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                Companies House
              </a>{' '}
              year-end data. National Highways from{' '}
              <a href="https://nationalhighways.co.uk/suppliers/" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                PAS 2080 supplier requirements
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* GTM Stack - Clay-Centric */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              The Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Clay-Powered GTM Infrastructure
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Everything runs through Clay - your single source of truth for enrichment, qualification, and orchestration.
            </p>
          </motion.div>

          {/* Clay Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-green-500/20 border-2 border-blue-500/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Image
                  src="/Clay image 2.jpg"
                  alt="Clay"
                  width={60}
                  height={60}
                  className="rounded-xl opacity-80"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">🏺</div>
                <div>
                  <h3 className="text-3xl font-black text-white">{gtmStack.clay.name}</h3>
                  <p className="text-blue-400 font-semibold">{gtmStack.clay.tagline}</p>
                </div>
              </div>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">{gtmStack.clay.description}</p>
              <div className="grid md:grid-cols-5 gap-3">
                {gtmStack.clay.capabilities.map((cap, i) => (
                  <div key={i} className="bg-white/5 rounded-lg px-4 py-3 text-center">
                    <span className="text-white/80 text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Enrichment Layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-blue-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                🔍
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Enrichment</h3>
              <div className="space-y-2">
                {gtmStack.enrichment.map((tool) => (
                  <div key={tool.name} className="text-sm">
                    <div className="font-semibold text-white">{tool.name}</div>
                    <div className="text-white/40 text-xs">{tool.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Execution Layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-zinc-900 border border-green-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Execution</h3>
              <div className="space-y-2">
                {gtmStack.execution.map((tool) => (
                  <div key={tool.name} className="text-sm">
                    <div className={`font-semibold ${tool.primary ? 'text-green-400' : 'text-white'}`}>
                      {tool.name}
                    </div>
                    <div className="text-white/40 text-xs">{tool.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Content Authority */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                📝
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Content Authority</h3>
              <div className="space-y-2">
                {gtmStack.content.map((tool) => (
                  <div key={tool.name} className="text-sm">
                    <div className="font-semibold text-white">{tool.name}</div>
                    <div className="text-white/40 text-xs">{tool.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Optional Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Optional</h3>
              <p className="text-white/40 text-xs mb-4">High-volume campaigns</p>
              <div className="space-y-2">
                {gtmStack.optional.map((tool) => (
                  <div key={tool.name} className="text-sm">
                    <div className="font-semibold text-white/70">{tool.name}</div>
                    <div className="text-white/30 text-xs">{tool.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Provisional Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/40 text-xs mt-6"
          >
            * Stack is provisional and will be refined based on your specific requirements and existing tools.
          </motion.p>

          {/* Narrative Prompt - Delivered in a structured build */}
          <div className="mt-12">
            <ScrollPrompt text={narrativeFlow[6].prompt} color="green" />
          </div>

          {/* Simplified Architecture Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-zinc-900/50 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <div className="bg-blue-500/20 rounded-xl p-4 flex-1">
                <div className="text-blue-400 font-bold">Signal Sources</div>
                <div className="text-white/50 text-sm mt-1">bidstats.uk, Find a Tender, Companies House</div>
              </div>
              <div className="text-white/30 text-2xl">→</div>
              <div className="bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-xl p-4 flex-1 border border-blue-500/30">
                <div className="text-white font-bold flex items-center justify-center gap-2">
                  <span className="text-xl">🏺</span> Clay
                </div>
                <div className="text-white/50 text-sm mt-1">Enrich → Qualify → Orchestrate</div>
              </div>
              <div className="text-white/30 text-2xl">→</div>
              <div className="bg-green-500/20 rounded-xl p-4 flex-1">
                <div className="text-green-400 font-bold">Campaign Execution</div>
                <div className="text-white/50 text-sm mt-1">LGM, Instantly, HubSpot</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signal-Triggered Outbound */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Signal-Triggered Outbound
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Right Message, Right Time
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {signalTypes.map((signal, index) => (
              <motion.div
                key={signal.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-5 md:p-6 hover:border-green-500/30 transition"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{signal.icon}</div>
                <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">{signal.name}</h3>
                <ul className="space-y-2 mb-4">
                  {signal.triggers.map((trigger, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {trigger}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="text-green-400 text-xs md:text-sm italic">{signal.message}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bid Manager / Tender Intelligence - Visual Flow */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="text-cyan-400 text-sm font-bold uppercase tracking-wider">
              Tender Intelligence
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-4">
              {tenderIntelligence.title}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
              {tenderIntelligence.description}
            </p>
          </motion.div>

          {/* Visual Data Sources Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              {tenderIntelligence.sources.map((source, index) => (
                <motion.a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 border border-cyan-500/20 rounded-xl p-4 text-center hover:border-cyan-500/50 transition group"
                >
                  <div className="text-2xl md:text-3xl mb-2">{source.icon}</div>
                  <div className="font-bold text-white text-sm md:text-base group-hover:text-cyan-400 transition">{source.name}</div>
                  <div className="text-white/50 text-xs mt-1 hidden md:block">{source.description}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Workflow Visualization - Horizontal Flow on Desktop, Vertical on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-green-500/10 border border-cyan-500/30 rounded-2xl p-6 md:p-8"
          >
            <h4 className="text-white font-bold text-center mb-6">Daily Scraping Workflow</h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {tenderIntelligence.workflow.map((step, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                  <div className="flex-1 md:flex-none bg-zinc-900/80 rounded-xl p-3 md:p-4 text-center border border-white/10">
                    <div className="text-cyan-400 font-bold text-lg md:text-xl mb-1">{index + 1}</div>
                    <div className="text-white/80 text-xs md:text-sm">{step}</div>
                  </div>
                  {index < tenderIntelligence.workflow.length - 1 && (
                    <div className="text-white/30 text-xl hidden md:block">→</div>
                  )}
                </div>
              ))}
            </div>

            {/* Custom Scraper Note */}
            <div className="mt-6 bg-black/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-lg">🔧</div>
                <div>
                  <div className="text-white/80 text-sm">{tenderIntelligence.customScraper.note}</div>
                  <div className="text-white/50 text-xs mt-1">
                    Examples: {tenderIntelligence.customScraper.examples.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LinkedIn Signal Intelligence */}
      <section className="py-16 md:py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">
              LinkedIn Intelligence
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-4">
              Competitor & Influencer Signal Tracking
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
              Know who your competitors are engaging with, and what your ICPs are talking about.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Competitor Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-purple-500/30 rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-xl md:text-2xl">
                  👀
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm md:text-base">{linkedInIntelligence.competitors.title}</h3>
                  <div className="text-purple-400 text-xs">via {linkedInIntelligence.competitors.tool}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {linkedInIntelligence.competitors.signals.map((signal, i) => (
                  <li key={i} className="bg-white/5 rounded-lg p-2 md:p-3">
                    <div className="font-semibold text-white text-xs md:text-sm">{signal.name}</div>
                    <div className="text-white/50 text-xs">{signal.description}</div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Influencer Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-blue-500/30 rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-xl md:text-2xl">
                  🌟
                </div>
                <h3 className="font-bold text-white text-sm md:text-base">{linkedInIntelligence.influencers.title}</h3>
              </div>
              <p className="text-white/60 text-xs md:text-sm mb-4">{linkedInIntelligence.influencers.description}</p>
              <ul className="space-y-2">
                {linkedInIntelligence.influencers.signals.map((signal, i) => (
                  <li key={i} className="bg-white/5 rounded-lg p-2 md:p-3">
                    <div className="font-semibold text-white text-xs md:text-sm">{signal.name}</div>
                    <div className="text-white/50 text-xs">{signal.description}</div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ICP Activity Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 border border-green-500/30 rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-xl md:text-2xl">
                  📡
                </div>
                <h3 className="font-bold text-white text-sm md:text-base">{linkedInIntelligence.icpSignals.title}</h3>
              </div>
              <p className="text-white/60 text-xs md:text-sm mb-4">{linkedInIntelligence.icpSignals.description}</p>
              <ul className="space-y-2">
                {linkedInIntelligence.icpSignals.triggers.map((trigger, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                    <span className="text-green-400">✓</span>
                    {trigger}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personalisation at Scale */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              The Human Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Personalisation at Scale
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              No automation at the point of execution for high-value prospects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-blue-500/30 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-6">Tier 1 Prospects</h3>
              <ul className="space-y-4">
                {[
                  'LinkedIn acceptance triggers human review, not auto-message',
                  'Full profile enriched: academic background, career path, personality signals',
                  'SDR receives context card: pain points, company signals, personal hooks',
                  'Voice notes from real humans, not AI clones',
                  'Colleague tracking for multi-threading into accounts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="text-blue-400 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-500/10 rounded-lg p-4 text-center">
                <span className="text-blue-400 font-bold">100% Human-Checked</span>
                <span className="text-white/60"> before first real message</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white/60 mb-6">Tertiary Markets</h3>
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <div className="text-white/60">Fully automated sequences acceptable</div>
                  <div className="text-white/40 text-sm mt-2">Lower-value, higher-volume approach</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Timeline */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              The Build
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Gets Built: 4-Phase Timeline
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              RevOps-first architecture - built for handover, not dependency
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full" />

            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-start gap-6 mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Phase indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/25"
                  >
                    {phase.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition ${
                    index % 2 === 0 ? 'md:mr-auto md:max-w-lg' : 'md:ml-auto md:max-w-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Phase {phase.phase}
                      </span>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
                      {phase.weeks}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-2 text-white/70"
                      >
                        <span className="text-green-400 mt-1">✓</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Prompt - Investment */}
      <ScrollPrompt text={narrativeFlow[7].prompt} color="green" />

      {/* Investment Options */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Investment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Flexible Engagement Options
            </h2>
            <p className="text-white/70">
              Choose the model that works best for your needs.
            </p>
          </motion.div>

          {/* Retainer Option - Highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500/20 via-green-500/10 to-blue-500/20 border-2 border-green-500/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold border border-green-500/30">
                  Recommended
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{retainerOptions.title}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-white font-semibold">{retainerOptions.daysPerWeek}</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{retainerOptions.recommended}</span>
                  </div>
                  <p className="text-white/70 mb-4">
                    {retainerOptions.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs bg-white/5 text-white/60 px-3 py-1 rounded-full">Foundation build</span>
                    <span className="text-xs bg-white/5 text-white/60 px-3 py-1 rounded-full">Campaign launch</span>
                    <span className="text-xs bg-white/5 text-white/60 px-3 py-1 rounded-full">Training & handover</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-green-400">{retainerOptions.rate.replace('/day', '')}</div>
                  <div className="text-white/50 text-sm">per day</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* One-Off Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
              One-Off Engagements
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {oneOffOptions.map((option, index) => (
                <motion.div
                  key={option.type}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition"
                >
                  <h5 className="font-bold text-white mb-2">{option.type}</h5>
                  <p className="text-white/50 text-sm mb-4">{option.description}</p>
                  <div className="text-xl font-black text-blue-400">{option.rate}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Training Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎓</span>
              <h4 className="font-bold text-white">Training Available</h4>
            </div>
            <p className="text-white/60 text-sm">
              Want to bring Clay in-house? We offer comprehensive training so your team can build and manage
              campaigns independently. Learn waterfall enrichment, signal monitoring, and campaign orchestration.
            </p>
          </motion.div>

          {/* Optional Fast Track */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">🚀</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-purple-400">{optionalFastTrack.title}</h4>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Optional Add-on</span>
                </div>
                <p className="text-white/70 text-sm mb-3">{optionalFastTrack.description}</p>
                <p className="text-amber-400/80 text-xs mb-4">{optionalFastTrack.when}</p>
                <div className="grid md:grid-cols-4 gap-3 mb-4">
                  {optionalFastTrack.items.map((item) => (
                    <div key={item.name} className="bg-black/30 rounded-lg p-3 text-center">
                      <div className="text-lg mb-1">{item.icon}</div>
                      <div className="text-white text-xs font-semibold">{item.name}</div>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs italic">{optionalFastTrack.note}</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/50 mt-6 text-sm"
          >
            Optional: Business development involvement - can support with direct outreach and relationship building.
          </motion.p>
        </div>
      </section>

      {/* Narrative Prompt - Zero lock-in */}
      <ScrollPrompt text={narrativeFlow[8].prompt} color="green" />

      {/* Risk Mitigation / Total Flexibility */}
      <section className="py-16 md:py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              {flexibility.title}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-4">
              {flexibility.headline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {flexibility.points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-green-500/20 rounded-xl p-4 md:p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 text-lg">✓</span>
                  <h3 className="font-bold text-white text-sm md:text-base">{point.title}</h3>
                </div>
                <p className="text-white/60 text-xs md:text-sm">{point.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6 text-center"
          >
            <p className="text-white/80 text-sm md:text-base italic">&quot;{flexibility.record}&quot;</p>
          </motion.div>
        </div>
      </section>

      {/* Web-Savvy Competitive Edge */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 border border-blue-500/30 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="text-3xl md:text-4xl">💻</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-blue-400 mb-2">{webAdvantage.title}</h3>
                <p className="text-white/80 text-sm md:text-base">{webAdvantage.description}</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 md:p-6 mb-6">
              <p className="text-white/70 text-sm md:text-base italic border-l-2 border-blue-500/50 pl-4">
                {webAdvantage.proof}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {webAdvantage.capabilities.map((cap, i) => (
                <div key={i} className="bg-white/5 rounded-lg px-3 py-2 text-center">
                  <span className="text-white/80 text-xs md:text-sm">{cap}</span>
                </div>
              ))}
            </div>

            <p className="text-blue-400/80 text-xs md:text-sm mt-6 text-center">
              {webAdvantage.note}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof - Powered by GTM Quest */}
      <section className="py-12 md:py-16 bg-zinc-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/GTM Logo New.png"
                alt="GTM Quest"
                width={100}
                height={35}
                className="h-6 md:h-8 w-auto"
              />
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-bold border border-blue-500/30">
                Beta
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Powered by GTM Quest</h3>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-6">
              Climatise is listed on our platform. We&apos;re building the #1 GTM agency matching platform with AI-powered strategy generation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
              <a href="https://gtm.quest" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <span>gtm.quest</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-white/30">|</span>
              <span className="text-white/50">200+ GTM Agencies</span>
              <span className="text-white/30">|</span>
              <span className="text-white/50">AI GTM Plan Builder (Beta)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why GTM Quest */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Why GTM Quest
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyGtmQuest.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition text-center"
              >
                <h3 className="font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-white/60 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Next Steps
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8">
              Let&apos;s Build Your GTM System
            </h2>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-4 gap-4 text-left">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-blue-400 font-bold mb-1">This Week</div>
                  <div className="text-white/70 text-sm">Confirm engagement scope and start date</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-blue-400 font-bold mb-1">Week 1</div>
                  <div className="text-white/70 text-sm">Workshop - finalise Tier 1 ICP prioritisation</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-blue-400 font-bold mb-1">Week 2-3</div>
                  <div className="text-white/70 text-sm">Build foundation infrastructure</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-green-400 font-bold mb-1">Week 4+</div>
                  <div className="text-white/70 text-sm">Launch campaigns, iterate on data</div>
                </div>
              </div>
            </div>

            <p className="text-xl text-white/70 mb-8">
              Let&apos;s build a GTM system as sophisticated as your emissions platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/my-first-quest"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Discuss Proposal
              </a>
              <a
                href="mailto:dan@gtm.quest"
                className="text-white hover:text-blue-400 px-8 py-4 rounded-xl font-medium transition border border-white/20 hover:border-blue-500/50"
              >
                dan@gtm.quest
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Download PDF */}
      <section className="py-12 pb-28 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/50 text-sm mb-4">Save this proposal for your records, Lennon</p>
          <button
            onClick={async () => {
              const blob = await generateClimatisePDF();
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Lennon-Climatise-GTM-Proposal.pdf';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Lennon&apos;s Proposal (PDF)
          </button>
        </div>
      </section>

      {/* Sticky CTA Bar - Personal, urgency-focused, with Climatise branding */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-zinc-900/98 via-zinc-900 to-zinc-900/98 backdrop-blur-md border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
          {/* Mobile: Logo + Urgency + CTA */}
          <div className="flex sm:hidden items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-lg p-1.5">
                <Image
                  src="/climatise-logo.png"
                  alt="Climatise"
                  width={80}
                  height={24}
                  className="h-5 w-auto"
                />
              </div>
              <div className="text-amber-400 text-xs font-medium">Feb 2026 deadline</div>
            </div>
            <a
              href="https://calendly.com/my-first-quest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25"
            >
              Let&apos;s Win Clients
            </a>
          </div>

          {/* Desktop: Logo + Personal greeting + urgency + CTA */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            {/* Climatise logo + greeting */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 rounded-lg p-2">
                <Image
                  src="/climatise-logo.png"
                  alt="Climatise"
                  width={100}
                  height={30}
                  className="h-6 w-auto"
                />
              </div>
              <div className="text-white/50 text-sm">|</div>
              <div className="text-white text-sm">
                <span className="font-semibold">Hey Lennon</span>
                <span className="text-white/50 mx-2">—</span>
                <span className="text-white/70">ready to win new clients?</span>
              </div>
            </div>

            {/* Urgency + CTA */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Feb 2026 standards deadline</span>
              </div>

              <a
                href="https://calendly.com/my-first-quest"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-500/25"
              >
                <span>Let&apos;s Win Clients</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
