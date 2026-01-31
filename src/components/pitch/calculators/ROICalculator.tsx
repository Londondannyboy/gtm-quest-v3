'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  SignalWarmthId,
  SIGNAL_WARMTH_TIERS,
  ICP_BENCHMARKS,
  CHANNEL_MULTIPLIERS,
  ROIInputs,
  FunnelProjection,
  CurrencyCode,
  CURRENCIES,
} from '@/types/pitch';

interface ROICalculatorProps {
  defaultInputs?: Partial<ROIInputs>;
  currency?: CurrencyCode;
  investment?: number;
  onProjectionChange?: (projection: FunnelProjection) => void;
  showDashboardLink?: boolean;
  dashboardUrl?: string;
}

/**
 * ROI Calculator with signal warmth tiers, ICP benchmarks, and channel multipliers.
 * Projects funnel outcomes based on volume, conversion rates, and deal economics.
 */
export function ROICalculator({
  defaultInputs,
  currency = 'GBP',
  investment = 0,
  onProjectionChange,
  showDashboardLink = false,
  dashboardUrl,
}: ROICalculatorProps) {
  const currencySymbol = CURRENCIES[currency].symbol;

  // State
  const [signalWarmth, setSignalWarmth] = useState<SignalWarmthId>(
    defaultInputs?.channels?.linkedinOutreach ? 'targeted' : 'cold'
  );

  const [channels, setChannels] = useState({
    linkedinOutreach: defaultInputs?.channels?.linkedinOutreach ?? true,
    emailOutreach: defaultInputs?.channels?.emailOutreach ?? true,
    contentMarketing: defaultInputs?.channels?.contentMarketing ?? false,
    linkedinAds: defaultInputs?.channels?.linkedinAds ?? false,
  });

  const [linkedin, setLinkedin] = useState({
    identities: defaultInputs?.linkedin?.identities ?? 2,
    messagesPerDay: defaultInputs?.linkedin?.messagesPerDay ?? 30,
    weeksActive: defaultInputs?.linkedin?.weeksActive ?? 8,
  });

  const [email, setEmail] = useState({
    listSize: defaultInputs?.email?.listSize ?? 5000,
    cadencePerWeek: defaultInputs?.email?.cadencePerWeek ?? 3,
  });

  const [icpSelections, setIcpSelections] = useState({
    title: 'VP / Director',
    industry: 'SaaS / Technology',
    companySize: 'SMB (50-200)',
  });

  const [economics, setEconomics] = useState({
    avgDealSize: defaultInputs?.economics?.avgDealSize ?? 25000,
    ltv: defaultInputs?.economics?.ltv ?? 75000,
    salesCycleMonths: defaultInputs?.economics?.salesCycleMonths ?? 3,
  });

  const [conservativeReduction, setConservativeReduction] = useState(
    defaultInputs?.conservativeReduction ?? 0.2
  );

  // Calculate channel multiplier
  const getChannelMultiplier = useCallback(() => {
    const activeCount = Object.values(channels).filter(Boolean).length;
    if (activeCount === 4) return CHANNEL_MULTIPLIERS.fullStack;
    if (channels.contentMarketing && (channels.linkedinOutreach || channels.emailOutreach)) {
      return CHANNEL_MULTIPLIERS.contentPlusOutreach;
    }
    if (channels.contentMarketing) return CHANNEL_MULTIPLIERS.contentMarketing;
    if (channels.linkedinAds) return CHANNEL_MULTIPLIERS.linkedinAds;
    return 1.0;
  }, [channels]);

  // Calculate effective response rate
  const getEffectiveResponseRate = useCallback(
    (baseRate: number) => {
      const industryMultiplier =
        ICP_BENCHMARKS.byIndustry[icpSelections.industry]?.multiplier || 1.0;
      const sizeMultiplier =
        ICP_BENCHMARKS.byCompanySize[icpSelections.companySize]?.multiplier || 1.0;
      const channelMultiplier = getChannelMultiplier();

      return (
        baseRate *
        industryMultiplier *
        sizeMultiplier *
        channelMultiplier *
        (1 - conservativeReduction)
      );
    },
    [icpSelections, getChannelMultiplier, conservativeReduction]
  );

  // Calculate projection
  const calculateProjection = useCallback((): FunnelProjection => {
    const warmthTier = SIGNAL_WARMTH_TIERS.find((t) => t.id === signalWarmth);
    if (!warmthTier) {
      return {
        touches: 0,
        responses: 0,
        meetings: 0,
        opportunities: 0,
        clients: 0,
        revenue: 0,
        ltv: 0,
      };
    }

    // Calculate touches
    let linkedinTouches = 0;
    let emailTouches = 0;

    if (channels.linkedinOutreach) {
      linkedinTouches =
        linkedin.identities * linkedin.messagesPerDay * 5 * linkedin.weeksActive;
    }
    if (channels.emailOutreach) {
      emailTouches = email.listSize * email.cadencePerWeek * (linkedin.weeksActive / 4);
    }

    const totalTouches = linkedinTouches + emailTouches;

    // Calculate responses using warmth tier rates
    const linkedinResponseRate = getEffectiveResponseRate(warmthTier.linkedinReplyRate);
    const emailResponseRate = getEffectiveResponseRate(warmthTier.emailReplyRate);

    const linkedinResponses = linkedinTouches * linkedinResponseRate;
    const emailResponses = emailTouches * emailResponseRate;
    const totalResponses = linkedinResponses + emailResponses;

    // Conversion rates (industry benchmarks with conservative reduction)
    const meetingRate = 0.3 * (1 - conservativeReduction);
    const closeRate = 0.2 * (1 - conservativeReduction);

    const meetings = totalResponses * meetingRate;
    const opportunities = meetings;
    const clients = meetings * closeRate;
    const revenue = clients * economics.avgDealSize;
    const totalLtv = clients * economics.ltv;

    return {
      touches: Math.round(totalTouches),
      responses: Math.round(totalResponses),
      meetings: Math.round(meetings),
      opportunities: Math.round(opportunities),
      clients: Math.round(clients * 10) / 10,
      revenue: Math.round(revenue),
      ltv: Math.round(totalLtv),
    };
  }, [
    signalWarmth,
    channels,
    linkedin,
    email,
    economics,
    conservativeReduction,
    getEffectiveResponseRate,
  ]);

  const projection = calculateProjection();
  const roi = investment > 0 ? ((projection.revenue - investment) / investment) * 100 : 0;
  const breakEvenDeals = investment > 0 ? investment / economics.avgDealSize : 0;

  // Notify parent of projection changes
  useEffect(() => {
    if (onProjectionChange) {
      onProjectionChange(projection);
    }
  }, [projection, onProjectionChange]);

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${currencySymbol}${value.toFixed(0)}`;
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📈</span>
        <h3 className="text-xl font-bold text-white">GTM ROI Calculator</h3>
      </div>

      {/* Signal Warmth Selection */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
          🎯 Outreach Warmth Level
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {SIGNAL_WARMTH_TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSignalWarmth(tier.id)}
              className={`p-4 rounded-xl border text-left transition ${
                signalWarmth === tier.id
                  ? 'bg-blue-500/20 border-blue-500/50'
                  : 'bg-zinc-800/50 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">{tier.label}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-blue-400">
                    {(tier.emailReplyRate * 100).toFixed(0)}% email
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="text-green-400">
                    {(tier.linkedinReplyRate * 100).toFixed(0)}% LI
                  </span>
                </div>
              </div>
              <p className="text-white/50 text-xs">{tier.description}</p>
              {tier.tools && (
                <div className="mt-2 flex gap-1">
                  {tier.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {signalWarmth === 'intentBased' && (
          <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-green-400 text-sm">
              💡 Intent-based outreach delivers <span className="font-bold">14x</span> better
              response rates vs cold. We use Triggify + Clay to identify engaged prospects.
            </p>
          </div>
        )}
      </div>

      {/* Channels */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
          Channels
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'linkedinOutreach', label: 'LinkedIn Outreach' },
            { key: 'emailOutreach', label: 'Email Outreach' },
            { key: 'contentMarketing', label: 'Content Marketing' },
            { key: 'linkedinAds', label: 'LinkedIn Ads' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() =>
                setChannels((prev) => ({
                  ...prev,
                  [key]: !prev[key as keyof typeof prev],
                }))
              }
              className={`p-3 rounded-xl border text-center transition ${
                channels[key as keyof typeof channels]
                  ? 'bg-blue-500/20 border-blue-500/50 text-white'
                  : 'bg-zinc-800/50 border-white/5 text-white/50'
              }`}
            >
              <div className="text-sm font-medium">{label}</div>
            </button>
          ))}
        </div>

        {getChannelMultiplier() > 1 && (
          <p className="mt-3 text-xs text-blue-400">
            💡 Combined channels = +{((getChannelMultiplier() - 1) * 100).toFixed(0)}% response
            rate boost
          </p>
        )}
      </div>

      {/* Volume Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* LinkedIn Volume */}
        {channels.linkedinOutreach && (
          <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-4">LinkedIn Outreach</h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Identities</label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={linkedin.identities}
                  onChange={(e) =>
                    setLinkedin((prev) => ({ ...prev, identities: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="text-right text-sm text-white">{linkedin.identities}</div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Messages/day</label>
                <input
                  type="range"
                  min={10}
                  max={50}
                  value={linkedin.messagesPerDay}
                  onChange={(e) =>
                    setLinkedin((prev) => ({ ...prev, messagesPerDay: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="text-right text-sm text-white">{linkedin.messagesPerDay}</div>
              </div>
              <div className="text-center text-blue-400 text-sm font-semibold">
                → {(linkedin.identities * linkedin.messagesPerDay * 5 * linkedin.weeksActive).toLocaleString()}{' '}
                total touches
              </div>
            </div>
          </div>
        )}

        {/* Email Volume */}
        {channels.emailOutreach && (
          <div className="bg-zinc-800/50 border border-white/5 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white mb-4">Email Outreach</h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">List Size</label>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={email.listSize}
                  onChange={(e) =>
                    setEmail((prev) => ({ ...prev, listSize: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="text-right text-sm text-white">
                  {email.listSize.toLocaleString()}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Emails/prospect/week</label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={email.cadencePerWeek}
                  onChange={(e) =>
                    setEmail((prev) => ({ ...prev, cadencePerWeek: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="text-right text-sm text-white">{email.cadencePerWeek}</div>
              </div>
              <div className="text-center text-blue-400 text-sm font-semibold">
                → {(email.listSize * email.cadencePerWeek * (linkedin.weeksActive / 4)).toLocaleString()}{' '}
                total sends
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ICP Selection */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
          👤 Target ICP
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-white/40 block mb-2">Job Title</label>
            <select
              value={icpSelections.title}
              onChange={(e) =>
                setIcpSelections((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              {Object.keys(ICP_BENCHMARKS.byTitle).map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-2">Industry</label>
            <select
              value={icpSelections.industry}
              onChange={(e) =>
                setIcpSelections((prev) => ({ ...prev, industry: e.target.value }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              {Object.keys(ICP_BENCHMARKS.byIndustry).map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-2">Company Size</label>
            <select
              value={icpSelections.companySize}
              onChange={(e) =>
                setIcpSelections((prev) => ({ ...prev, companySize: e.target.value }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              {Object.keys(ICP_BENCHMARKS.byCompanySize).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Deal Economics */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
          💵 Deal Economics
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/40 block mb-2">
              Average Deal Size ({currencySymbol})
            </label>
            <input
              type="number"
              value={economics.avgDealSize}
              onChange={(e) =>
                setEconomics((prev) => ({ ...prev, avgDealSize: parseInt(e.target.value) || 0 }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-2">
              Customer LTV ({currencySymbol})
            </label>
            <input
              type="number"
              value={economics.ltv}
              onChange={(e) =>
                setEconomics((prev) => ({ ...prev, ltv: parseInt(e.target.value) || 0 }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Conservative Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider">
            ⚙️ Projection Confidence
          </h4>
          <span className="text-sm text-white">
            Conservative (-{(conservativeReduction * 100).toFixed(0)}%)
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.05}
          value={conservativeReduction}
          onChange={(e) => setConservativeReduction(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-white/40 mt-1">
          Industry benchmarks adjusted for safety. Sources: HubSpot, LinkedIn, Demand Gen Report
        </p>
      </div>

      {/* Projected Outcomes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-white/10 pt-8"
      >
        <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-6 text-center">
          📊 Projected Outcomes ({linkedin.weeksActive} weeks)
        </h4>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Touches', value: projection.touches, color: 'white' },
            { label: 'Responses', value: projection.responses, color: 'blue' },
            { label: 'Meetings', value: projection.meetings, color: 'green' },
            { label: 'Opportunities', value: projection.opportunities, color: 'amber' },
            { label: 'Clients', value: projection.clients, color: 'purple', decimals: 1 },
            {
              label: 'Revenue',
              value: projection.revenue,
              color: 'green',
              format: 'currency',
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`text-2xl md:text-3xl font-black text-${stat.color}-400`}
              >
                {stat.format === 'currency' ? (
                  formatCurrency(stat.value)
                ) : (
                  <CountUp
                    end={stat.value}
                    duration={1}
                    decimals={stat.decimals || 0}
                    separator=","
                  />
                )}
              </div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ROI Summary */}
        {investment > 0 && (
          <div className="bg-gradient-to-r from-green-500/10 via-blue-500/5 to-green-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-white/50 text-sm mb-1">Investment</div>
                <div className="text-xl font-bold text-white">
                  {formatCurrency(investment)}
                </div>
              </div>
              <div>
                <div className="text-white/50 text-sm mb-1">ROI</div>
                <div className="text-2xl font-black text-green-400">
                  <CountUp end={roi} duration={1} decimals={0} />x
                </div>
              </div>
              <div>
                <div className="text-white/50 text-sm mb-1">Break-even</div>
                <div className="text-xl font-bold text-blue-400">
                  {breakEvenDeals.toFixed(1)} deals
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Link */}
        {showDashboardLink && dashboardUrl && (
          <div className="mt-6 text-center">
            <a
              href={dashboardUrl}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
            >
              Open Full Dashboard &rarr;
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
