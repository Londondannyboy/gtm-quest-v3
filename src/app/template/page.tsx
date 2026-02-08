'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PasswordGate,
  BudgetCalculator,
  ROICalculator,
  ChannelFlowDiagram,
  IntentTrackingSection,
  LinkedInAdsCalculator,
  TimelineProjection,
} from '@/components/pitch';
import type { BudgetTier, CurrencyConfig, ABMChannels, RegionId } from '@/types/pitch';

// Infrastructure cost categories
interface InfraCost {
  id: string;
  name: string;
  description: string;
  monthlyCost: number;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  category: 'platform' | 'email' | 'linkedin' | 'tools';
}

const defaultInfraCosts: InfraCost[] = [
  // Core Platform
  {
    id: 'clay',
    name: 'Clay',
    description: 'Orchestrator - enrichment, workflows, automation',
    monthlyCost: 349,
    quantity: 1,
    minQuantity: 1,
    maxQuantity: 1,
    unit: 'license',
    category: 'platform',
  },
  // Email Infrastructure
  {
    id: 'mailboxes',
    name: 'Email Mailboxes',
    description: 'Warmed sending domains (15 emails/day each)',
    monthlyCost: 3,
    quantity: 10,
    minQuantity: 5,
    maxQuantity: 50,
    unit: 'mailboxes',
    category: 'email',
  },
  {
    id: 'instantly',
    name: 'Instantly',
    description: 'Email warmup & deliverability',
    monthlyCost: 97,
    quantity: 1,
    minQuantity: 1,
    maxQuantity: 1,
    unit: 'license',
    category: 'email',
  },
  // LinkedIn Infrastructure
  {
    id: 'salesnav',
    name: 'Sales Navigator',
    description: 'LinkedIn premium for prospecting',
    monthlyCost: 80,
    quantity: 2,
    minQuantity: 1,
    maxQuantity: 5,
    unit: 'seats',
    category: 'linkedin',
  },
  {
    id: 'lgm',
    name: 'La Growth Machine',
    description: 'LinkedIn automation & sequencing',
    monthlyCost: 99,
    quantity: 2,
    minQuantity: 1,
    maxQuantity: 5,
    unit: 'seats',
    category: 'linkedin',
  },
  {
    id: 'proxies',
    name: '4G Mobile Proxies',
    description: 'Account protection (1 per identity)',
    monthlyCost: 30,
    quantity: 2,
    minQuantity: 1,
    maxQuantity: 5,
    unit: 'proxies',
    category: 'linkedin',
  },
  // Supporting Tools
  {
    id: 'enrichment',
    name: 'Enrichment Credits',
    description: 'Apollo, Prospero, LeadMagic via Clay',
    monthlyCost: 99,
    quantity: 1,
    minQuantity: 1,
    maxQuantity: 1,
    unit: 'bundle',
    category: 'tools',
  },
  {
    id: 'crm',
    name: 'HubSpot Starter',
    description: 'CRM & reporting',
    monthlyCost: 45,
    quantity: 1,
    minQuantity: 0,
    maxQuantity: 1,
    unit: 'license',
    category: 'tools',
  },
];

const categoryLabels = {
  platform: { label: 'Core Platform', icon: '🏺', color: 'blue' },
  email: { label: 'Email Infrastructure', icon: '📧', color: 'green' },
  linkedin: { label: 'LinkedIn Infrastructure', icon: '💼', color: 'purple' },
  tools: { label: 'Supporting Tools', icon: '🔧', color: 'amber' },
};

// Budget tiers for the interactive calculator
const budgetTiers: BudgetTier[] = [
  {
    id: 'retainer',
    name: '3-Month Retainer',
    baseRate: 500,
    defaultDays: 16, // 2 days/week × 8 weeks
    minDays: 8,
    maxDays: 36,
    description: '1-3 days/week for 8-12 weeks. Foundation build, campaign launch, and training.',
    recommended: true,
  },
  {
    id: 'workshop',
    name: 'Clay Training Workshop',
    baseRate: 1000,
    defaultDays: 0, // Default to 0 per user feedback
    minDays: 0,
    maxDays: 3,
    description: 'Intensive hands-on training for your team.',
  },
  {
    id: 'strategy',
    name: 'Strategy Session',
    baseRate: 750,
    defaultDays: 0, // Default to 0 per user feedback
    minDays: 0,
    maxDays: 5,
    description: 'ICP refinement, campaign planning, stack recommendations.',
  },
  {
    id: 'sprint',
    name: 'System Build Sprint',
    baseRate: 750,
    defaultDays: 3,
    minDays: 0,
    maxDays: 10,
    description: 'Focused build days for specific deliverables.',
  },
];

export default function TemplatePage() {
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [currency, setCurrency] = useState<CurrencyConfig>({
    code: 'GBP',
    symbol: '£',
    rate: 1,
    rateDate: new Date().toLocaleDateString(),
  });
  const [infraCosts, setInfraCosts] = useState<InfraCost[]>(defaultInfraCosts);
  const [engagementMonths] = useState(3);
  const [region, setRegion] = useState<RegionId>('uk_eu');
  const [intentTrackingCost, setIntentTrackingCost] = useState(249); // Default
  const [abmChannels, setAbmChannels] = useState<ABMChannels>({
    linkedinAds: true,
    content: true,
    intentTracking: true,
    outbound: true,
  });

  // Calculate monthly infrastructure cost
  const monthlyInfraCost = infraCosts.reduce(
    (sum, item) => sum + item.monthlyCost * item.quantity,
    0
  );

  // Calculate total infrastructure cost for engagement period
  const totalInfraCost = monthlyInfraCost * engagementMonths * currency.rate;

  // Calculate total investment (consulting + infrastructure)
  const totalInvestment = budgetTotal + totalInfraCost;

  // Update infrastructure quantity
  const updateInfraQuantity = (id: string, quantity: number) => {
    setInfraCosts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.minQuantity, Math.min(item.maxQuantity, quantity)) }
          : item
      )
    );
  };

  // Get costs by category
  const getCategoryTotal = (category: InfraCost['category']) => {
    return infraCosts
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.monthlyCost * item.quantity, 0);
  };

  const handleBudgetChange = (total: number, curr: CurrencyConfig) => {
    setBudgetTotal(total);
    setCurrency(curr);
  };

  return (
    <PasswordGate
      clientSlug="template"
      clientLogo="/gtm-agency-quest-logo.png"
      clientName="GTM Quest"
      tagline="Pitch Template System"
      password="gtmquest"
    >
      <main className="min-h-screen bg-black">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-zinc-950 to-black border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-sm text-amber-400 font-medium">Template Testing</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Pitch Template System
            </h1>
            <p className="text-white/60">
              Testing ground for Budget Calculator and ROI Calculator components
            </p>
          </div>
        </section>

        {/* 4-Channel ABM System */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
                The System
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                4-Channel ABM System
              </h2>
              <p className="text-white/70 max-w-xl mx-auto">
                Based on ColdIQ&apos;s $7.83M pipeline methodology. Click channels to see impact.
              </p>
            </motion.div>

            <ChannelFlowDiagram
              activeChannels={abmChannels}
              region={region}
              onChannelToggle={(channel) =>
                setAbmChannels((prev) => ({
                  ...prev,
                  [channel]: !prev[channel],
                }))
              }
              onRegionChange={setRegion}
            />
          </div>
        </section>

        {/* Intent Tracking */}
        <section className="py-16 bg-zinc-950">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">
                Channel 3
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                Intent Tracking Setup
              </h2>
              <p className="text-white/70 max-w-xl mx-auto">
                Configure your tracking tools to identify buying signals.
              </p>
            </motion.div>

            <IntentTrackingSection
              region={region}
              currency={currency}
              onCostChange={setIntentTrackingCost}
            />
          </div>
        </section>

        {/* LinkedIn Ads Calculator */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
                Channel 1
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                LinkedIn Ads Budget
              </h2>
              <p className="text-white/70 max-w-xl mx-auto">
                Build awareness with Thought Leader ads, Document ads, and Smart Links.
              </p>
            </motion.div>

            <LinkedInAdsCalculator currency={currency} />
          </div>
        </section>

      {/* Budget Calculator */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              Step 1
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
              Build Your Package
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Adjust the sliders to customize your engagement. Multi-currency support included.
            </p>
          </motion.div>

          <BudgetCalculator
            tiers={budgetTiers}
            defaultSelections={{
              retainer: 16,
              workshop: 0,
              strategy: 0,
              sprint: 3,
            }}
            defaultCurrency="GBP"
            onTotalChange={handleBudgetChange}
          />

        </div>
      </section>

      {/* Infrastructure Costs Breakdown */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">
              Step 2
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
              Software & Infrastructure
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              The tools and infrastructure needed to run your campaigns at scale.
            </p>
          </motion.div>

          {/* Category Breakdown */}
          <div className="space-y-6">
            {(['platform', 'email', 'linkedin', 'tools'] as const).map((category) => {
              const categoryInfo = categoryLabels[category];
              const categoryItems = infraCosts.filter((item) => item.category === category);
              const categoryTotal = getCategoryTotal(category);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden"
                >
                  {/* Category Header */}
                  <div className={`px-6 py-4 bg-${categoryInfo.color}-500/10 border-b border-white/5 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryInfo.icon}</span>
                      <h3 className="font-bold text-white">{categoryInfo.label}</h3>
                    </div>
                    <div className={`text-${categoryInfo.color}-400 font-bold`}>
                      {currency.symbol}{(categoryTotal * currency.rate).toLocaleString()}/mo
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="divide-y divide-white/5">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-xs text-white/50">{item.description}</div>
                        </div>

                        {/* Quantity Control */}
                        {item.maxQuantity > 1 && (
                          <div className="flex items-center gap-2 mx-4">
                            <button
                              onClick={() => updateInfraQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= item.minQuantity}
                              className="w-7 h-7 rounded bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateInfraQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                              className="w-7 h-7 rounded bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                            >
                              +
                            </button>
                          </div>
                        )}

                        <div className="text-right min-w-[80px]">
                          <div className="text-white font-medium">
                            {currency.symbol}{(item.monthlyCost * item.quantity * currency.rate).toLocaleString()}
                          </div>
                          <div className="text-xs text-white/40">
                            {item.quantity > 1 && `${item.quantity} × ${currency.symbol}${item.monthlyCost}`}
                            {item.quantity === 1 && '/mo'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Monthly Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-zinc-900/50 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/70">Monthly Software Cost</div>
                <div className="text-xs text-white/40 mt-1">
                  All tools and infrastructure
                </div>
              </div>
              <div className="text-2xl font-black text-purple-400">
                {currency.symbol}{(monthlyInfraCost * currency.rate).toLocaleString()}/mo
              </div>
            </div>
          </motion.div>

          {/* Total Investment Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6"
          >
            <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
              Total Investment ({engagementMonths} months)
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-white/50 text-xs mb-1">Consulting</div>
                <div className="text-xl font-bold text-blue-400">
                  {currency.symbol}{budgetTotal.toLocaleString()}
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-white/50 text-xs mb-1">Software ({engagementMonths} mo)</div>
                <div className="text-xl font-bold text-purple-400">
                  {currency.symbol}{totalInfraCost.toLocaleString()}
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-white/50 text-xs mb-1">Total</div>
                <div className="text-xl font-bold text-green-400">
                  {currency.symbol}{totalInvestment.toLocaleString()}
                </div>
              </div>
            </div>
            <p className="text-xs text-white/40 text-center">
              This total is used in the ROI calculator below
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Step 3
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
              ROI Projections
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Model your expected outcomes based on industry benchmarks and your deal economics.
            </p>
          </motion.div>

          <ROICalculator
            defaultInputs={{
              channels: {
                linkedinOutreach: true,
                emailOutreach: true,
                contentMarketing: abmChannels.content,
                linkedinAds: abmChannels.linkedinAds,
              },
              linkedin: {
                identities: 2,
                messagesPerDay: 30,
                weeksActive: 12,
              },
              email: {
                listSize: 5000,
                cadencePerWeek: 3,
              },
              economics: {
                avgDealSize: 25000,
                ltv: 75000,
                salesCycleMonths: 3,
              },
              conservativeReduction: 0.2,
            }}
            currency={currency.code}
            investment={totalInvestment + (intentTrackingCost * engagementMonths * currency.rate)}
          />
        </div>
      </section>

      {/* Timeline Projection */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">
              12-Month Forecast
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
              Pipeline Timeline
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Based on ColdIQ benchmarks: Month 2 meetings, Month 3-4 first deals.
            </p>
          </motion.div>

          <TimelineProjection
            currency={currency}
            monthlyTouches={2000}
            responseRate={abmChannels.intentTracking ? 0.14 : 0.05}
            meetingRate={0.25}
            closeRate={0.183}
            avgDealSize={25000}
            totalInvestment={totalInvestment + (intentTrackingCost * engagementMonths * currency.rate)}
          />
        </div>
      </section>

      {/* Feedback Notes */}
      <section className="py-12 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-lg font-bold text-white mb-4">4-Channel ABM System - Features</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              4-Channel flow diagram (LinkedIn Ads → Content → Intent Tracking → Outbound)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              UK/EU vs US region selector with GDPR tracking differences
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Intent tracking tools: Leadfeeder, Trigify, Smart Links
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              LinkedIn Ads calculator with Smart Links (GTM Quest unique)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              12-month timeline projection with ColdIQ benchmarks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Timeline: Month 2 meetings, Month 3-4 first deals
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              Response rate: 14% (intent-based) vs 1% (cold) - based on Trigify method
            </li>
          </ul>

          <h4 className="text-md font-bold text-white mt-6 mb-3">Reference</h4>
          <p className="text-sm text-white/50">
            Based on ColdIQ&apos;s 4-Channel ABM System: $7.83M pipeline, $1.52M closed, 19.4% conversion.
          </p>
          <a
            href="https://coldiq.com/blog/the-4-channel-abm-system-behind-7-8m-in-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-400 hover:underline"
          >
            Read the ColdIQ article →
          </a>
        </div>
      </section>
    </main>
    </PasswordGate>
  );
}
