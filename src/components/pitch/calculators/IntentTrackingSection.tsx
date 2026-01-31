'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type {
  RegionId,
  VisitorIdTool,
  SocialTrackingTool,
  IntentTrackingInputs,
  CurrencyConfig,
} from '@/types/pitch';
import {
  REGION_CONFIGS,
  VISITOR_ID_TOOLS,
  SOCIAL_TRACKING_TOOLS,
} from '@/types/pitch';

interface IntentTrackingSectionProps {
  region: RegionId;
  currency: CurrencyConfig;
  onCostChange?: (monthlyCost: number) => void;
  onTrackingChange?: (tracking: IntentTrackingInputs) => void;
}

export function IntentTrackingSection({
  region,
  currency,
  onCostChange,
  onTrackingChange,
}: IntentTrackingSectionProps) {
  const regionConfig = REGION_CONFIGS[region];

  const [tracking, setTracking] = useState<IntentTrackingInputs>({
    tools: {
      visitorIdentification: {
        enabled: true,
        tool: 'leadfeeder',
        monthlyCost: VISITOR_ID_TOOLS.leadfeeder?.monthlyCost || 0,
      },
      socialEngagement: {
        enabled: true,
        tool: 'trigify',
        monthlyCost: SOCIAL_TRACKING_TOOLS.trigify?.monthlyCost || 0,
      },
      contentEngagement: {
        enabled: true,
        smartLinks: true,
      },
    },
    signalTypes: {
      websiteVisits: true,
      contentDownloads: true,
      linkedinPostEngagement: true,
      linkedinAdEngagement: true,
      emailOpens: true,
      emailClicks: true,
    },
  });

  // Calculate total cost
  const totalMonthlyCost =
    (tracking.tools.visitorIdentification.enabled ? tracking.tools.visitorIdentification.monthlyCost : 0) +
    (tracking.tools.socialEngagement.enabled ? tracking.tools.socialEngagement.monthlyCost : 0);

  useEffect(() => {
    onCostChange?.(totalMonthlyCost);
    onTrackingChange?.(tracking);
  }, [tracking, totalMonthlyCost, onCostChange, onTrackingChange]);

  const updateVisitorTool = (tool: VisitorIdTool) => {
    const toolInfo = VISITOR_ID_TOOLS[tool];
    setTracking((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        visitorIdentification: {
          ...prev.tools.visitorIdentification,
          tool,
          monthlyCost: toolInfo?.monthlyCost || 0,
        },
      },
    }));
  };

  const updateSocialTool = (tool: SocialTrackingTool) => {
    const toolInfo = SOCIAL_TRACKING_TOOLS[tool];
    setTracking((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        socialEngagement: {
          ...prev.tools.socialEngagement,
          tool,
          monthlyCost: toolInfo?.monthlyCost || 0,
        },
      },
    }));
  };

  const formatCurrency = (amount: number) => {
    return `${currency.symbol}${Math.round(amount * currency.rate).toLocaleString()}`;
  };

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🎯 Intent Tracking
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Identify buying signals to time your outreach perfectly
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500">Region</p>
          <p className="text-sm text-white font-medium">{regionConfig.label}</p>
        </div>
      </div>

      {/* GDPR Warning for UK/EU */}
      {region === 'uk_eu' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-amber-500/10 rounded-lg p-4 mb-6 border border-amber-500/20"
        >
          <p className="text-sm text-amber-300 font-medium mb-1">
            ⚠️ UK/EU GDPR Considerations
          </p>
          <p className="text-xs text-amber-200/80">
            Website visitor identification limited to <strong>company-level only</strong>.
            Individual person tracking requires explicit consent.
            LinkedIn and email engagement tracking remains fully functional.
          </p>
        </motion.div>
      )}

      {/* Visitor Identification */}
      <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tracking.tools.visitorIdentification.enabled}
                onChange={(e) =>
                  setTracking((prev) => ({
                    ...prev,
                    tools: {
                      ...prev.tools,
                      visitorIdentification: {
                        ...prev.tools.visitorIdentification,
                        enabled: e.target.checked,
                      },
                    },
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
            <div>
              <h4 className="text-sm font-semibold text-white">Website Visitor Identification</h4>
              <p className="text-xs text-zinc-500">
                {region === 'uk_eu' ? 'Company-level identification (GDPR compliant)' : 'Individual + company identification'}
              </p>
            </div>
          </div>
          <span className="text-green-400 font-medium">
            {tracking.tools.visitorIdentification.enabled
              ? formatCurrency(tracking.tools.visitorIdentification.monthlyCost)
              : '—'}
            <span className="text-xs text-zinc-500">/mo</span>
          </span>
        </div>

        {tracking.tools.visitorIdentification.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3"
          >
            <label className="text-xs text-zinc-500 block mb-2">Tool</label>
            <select
              value={tracking.tools.visitorIdentification.tool}
              onChange={(e) => updateVisitorTool(e.target.value as VisitorIdTool)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            >
              <option value="leadfeeder">Leadfeeder ({formatCurrency(150)}/mo)</option>
              <option value="clearbit_reveal">Clearbit Reveal ({formatCurrency(350)}/mo)</option>
              <option value="albacross">Albacross ({formatCurrency(200)}/mo)</option>
            </select>
            <p className="text-xs text-zinc-500 mt-2">
              {VISITOR_ID_TOOLS[tracking.tools.visitorIdentification.tool]?.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Social Engagement Tracking */}
      <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tracking.tools.socialEngagement.enabled}
                onChange={(e) =>
                  setTracking((prev) => ({
                    ...prev,
                    tools: {
                      ...prev.tools,
                      socialEngagement: {
                        ...prev.tools.socialEngagement,
                        enabled: e.target.checked,
                      },
                    },
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
            <div>
              <h4 className="text-sm font-semibold text-white">LinkedIn Engagement Tracking</h4>
              <p className="text-xs text-zinc-500">Track likes, comments, shares on your posts</p>
            </div>
          </div>
          <span className="text-green-400 font-medium">
            {tracking.tools.socialEngagement.enabled
              ? formatCurrency(tracking.tools.socialEngagement.monthlyCost)
              : '—'}
            <span className="text-xs text-zinc-500">/mo</span>
          </span>
        </div>

        {tracking.tools.socialEngagement.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3"
          >
            <label className="text-xs text-zinc-500 block mb-2">Tool</label>
            <select
              value={tracking.tools.socialEngagement.tool}
              onChange={(e) => updateSocialTool(e.target.value as SocialTrackingTool)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            >
              <option value="trigify">Trigify ({formatCurrency(99)}/mo)</option>
              <option value="teamfluence">Teamfluence ({formatCurrency(99)}/mo)</option>
              <option value="phantom_buster">PhantomBuster ({formatCurrency(69)}/mo)</option>
            </select>
            <p className="text-xs text-zinc-500 mt-2">
              {SOCIAL_TRACKING_TOOLS[tracking.tools.socialEngagement.tool]?.description}
            </p>

            {/* Intent-based impact highlight */}
            <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-xs text-green-300">
                <strong>14x higher response rate</strong> when targeting people who engaged with relevant content
                (Intent-based vs cold outreach)
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Smart Links (Content Engagement) */}
      <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tracking.tools.contentEngagement.smartLinks}
                onChange={(e) =>
                  setTracking((prev) => ({
                    ...prev,
                    tools: {
                      ...prev.tools,
                      contentEngagement: {
                        ...prev.tools.contentEngagement,
                        enabled: e.target.checked,
                        smartLinks: e.target.checked,
                      },
                    },
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                Smart Links
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">⭐ GTM Quest</span>
              </h4>
              <p className="text-xs text-zinc-500">Sales Navigator feature for 1:1 content tracking</p>
            </div>
          </div>
          <span className="text-zinc-500 text-sm">Included</span>
        </div>

        {tracking.tools.contentEngagement.smartLinks && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
          >
            <p className="text-xs text-amber-200 mb-2">
              <strong>Smart Links</strong> let you share content and see exactly who opens it:
            </p>
            <ul className="text-xs text-zinc-300 space-y-1">
              <li>• Know exactly who from target company viewed your content</li>
              <li>• Trigger personalized outreach based on engagement</li>
              <li>• Run 1:1 or 1:many targeted LinkedIn campaigns</li>
            </ul>
            <p className="text-xs text-zinc-500 mt-2 italic">
              Included in Sales Navigator cost (already in your infrastructure)
            </p>
          </motion.div>
        )}
      </div>

      {/* Signal Types */}
      <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Active Signal Types</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { key: 'websiteVisits', label: 'Website visits', gdprRestricted: region === 'uk_eu' },
            { key: 'contentDownloads', label: 'Content downloads', gdprRestricted: false },
            { key: 'linkedinPostEngagement', label: 'LinkedIn post engagement', gdprRestricted: false },
            { key: 'linkedinAdEngagement', label: 'LinkedIn ad engagement', gdprRestricted: false },
            { key: 'emailOpens', label: 'Email opens', gdprRestricted: false },
            { key: 'emailClicks', label: 'Email clicks', gdprRestricted: false },
          ].map(({ key, label, gdprRestricted }) => (
            <label
              key={key}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                tracking.signalTypes[key as keyof typeof tracking.signalTypes]
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-zinc-900/50 border border-zinc-700'
              }`}
            >
              <input
                type="checkbox"
                checked={tracking.signalTypes[key as keyof typeof tracking.signalTypes]}
                onChange={(e) =>
                  setTracking((prev) => ({
                    ...prev,
                    signalTypes: {
                      ...prev.signalTypes,
                      [key]: e.target.checked,
                    },
                  }))
                }
                className="w-4 h-4 text-green-500 bg-zinc-700 border-zinc-600 rounded focus:ring-green-500"
              />
              <span className="text-xs text-zinc-300">{label}</span>
              {gdprRestricted && (
                <span className="text-[10px] text-amber-400">*</span>
              )}
            </label>
          ))}
        </div>
        {region === 'uk_eu' && (
          <p className="text-[10px] text-amber-400 mt-2">* Company-level only in UK/EU</p>
        )}
      </div>

      {/* Cost Summary */}
      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Total Intent Tracking Cost</p>
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(totalMonthlyCost)}
              <span className="text-sm text-zinc-500 font-normal">/month</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">Impact on Response Rates</p>
            <div className="mt-1">
              <span className="text-xs text-zinc-400">Cold: 1% → </span>
              <span className="text-sm text-green-400 font-bold">Intent: 14%</span>
              <span className="text-xs text-green-500 ml-1">(+1,300%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntentTrackingSection;
