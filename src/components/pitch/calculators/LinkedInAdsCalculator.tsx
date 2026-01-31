'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { CurrencyConfig, LinkedInAdsInputs, LinkedInAdsOutputs, SmartLinkCampaignType } from '@/types/pitch';

interface LinkedInAdsCalculatorProps {
  currency: CurrencyConfig;
  onOutputChange?: (outputs: LinkedInAdsOutputs) => void;
  onInputChange?: (inputs: LinkedInAdsInputs) => void;
}

export function LinkedInAdsCalculator({
  currency,
  onOutputChange,
  onInputChange,
}: LinkedInAdsCalculatorProps) {
  const [inputs, setInputs] = useState<LinkedInAdsInputs>({
    monthlyBudget: 10000, // £10,000 default
    cpm: 25,              // £25 average LinkedIn CPM
    targetAccounts: 750,  // 500-1000 recommended
    adTypes: {
      thoughtLeader: true,
      documentAds: true,
      smartLinks: true,
    },
    frequency: 8, // Target 8 impressions per account per month
  });

  const [smartLinkCampaignType, setSmartLinkCampaignType] = useState<SmartLinkCampaignType>('one_to_many');

  // Calculate outputs
  const calculateOutputs = useCallback((): LinkedInAdsOutputs => {
    const budgetInCurrency = inputs.monthlyBudget * currency.rate;
    const impressionsPerMonth = (budgetInCurrency / inputs.cpm) * 1000;

    // Estimate unique accounts reached (diminishing returns after frequency)
    const theoreticalReach = impressionsPerMonth / inputs.frequency;
    const actualAccountsReached = Math.min(theoreticalReach, inputs.targetAccounts);
    const reachPercentage = (actualAccountsReached / inputs.targetAccounts) * 100;

    const costPerAccountReached = budgetInCurrency / actualAccountsReached;

    // Attribution lift based on ColdIQ: 1.25x baseline when ads are running
    const attributedPipelineLift = 1.25;

    return {
      impressionsPerMonth: Math.round(impressionsPerMonth),
      reachPercentage: Math.min(100, Math.round(reachPercentage * 10) / 10),
      costPerAccountReached: Math.round(costPerAccountReached * 100) / 100,
      attributedPipelineLift,
    };
  }, [inputs, currency.rate]);

  const outputs = calculateOutputs();

  useEffect(() => {
    onOutputChange?.(outputs);
    onInputChange?.(inputs);
  }, [outputs, inputs, onOutputChange, onInputChange]);

  const formatCurrency = (amount: number) => {
    return `${currency.symbol}${Math.round(amount * currency.rate).toLocaleString()}`;
  };

  const updateInput = <K extends keyof LinkedInAdsInputs>(key: K, value: LinkedInAdsInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          📢 LinkedIn Ads Calculator
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Calculate budget → impressions → awareness lift
        </p>
      </div>

      {/* Budget Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-zinc-400">Monthly Ad Budget</label>
          <span className="text-lg font-bold text-green-400">{formatCurrency(inputs.monthlyBudget)}</span>
        </div>
        <input
          type="range"
          min={5000}
          max={50000}
          step={1000}
          value={inputs.monthlyBudget}
          onChange={(e) => updateInput('monthlyBudget', Number(e.target.value))}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-zinc-600 mt-1">
          <span>{formatCurrency(5000)}</span>
          <span>{formatCurrency(50000)}</span>
        </div>
      </div>

      {/* Target Accounts */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-zinc-400">Target Accounts</label>
          <span className="text-lg font-bold text-white">{inputs.targetAccounts.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={200}
          max={2000}
          step={50}
          value={inputs.targetAccounts}
          onChange={(e) => updateInput('targetAccounts', Number(e.target.value))}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-zinc-600 mt-1">
          <span>200</span>
          <span className="text-green-500">500-1,000 recommended</span>
          <span>2,000</span>
        </div>
      </div>

      {/* CPM & Frequency */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs text-zinc-500 block mb-1">Average CPM</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputs.cpm}
              onChange={(e) => updateInput('cpm', Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            />
            <span className="text-xs text-zinc-500">{currency.symbol}</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">LinkedIn avg: {currency.symbol}20-35</p>
        </div>
        <div>
          <label className="text-xs text-zinc-500 block mb-1">Target Frequency</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputs.frequency}
              onChange={(e) => updateInput('frequency', Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
            />
            <span className="text-xs text-zinc-500">/mo</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">Impressions per account</p>
        </div>
      </div>

      {/* Ad Types */}
      <div className="mb-6 p-4 bg-zinc-800/50 rounded-xl">
        <h4 className="text-sm font-semibold text-white mb-3">Ad Types</h4>
        <div className="space-y-3">
          {[
            { key: 'thoughtLeader', label: 'Thought Leader Ads', desc: 'Founder-led, personal-style content' },
            { key: 'documentAds', label: 'Document Ads', desc: 'Carousel value delivery (PDF/slides)' },
            { key: 'smartLinks', label: 'Smart Links', desc: 'Track individual content engagement', isSpecial: true },
          ].map(({ key, label, desc, isSpecial }) => (
            <label
              key={key}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                inputs.adTypes[key as keyof typeof inputs.adTypes]
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-zinc-900/50 border border-zinc-700'
              }`}
            >
              <input
                type="checkbox"
                checked={inputs.adTypes[key as keyof typeof inputs.adTypes]}
                onChange={(e) =>
                  updateInput('adTypes', {
                    ...inputs.adTypes,
                    [key]: e.target.checked,
                  })
                }
                className="w-4 h-4 text-green-500 bg-zinc-700 border-zinc-600 rounded focus:ring-green-500"
              />
              <div className="flex-1">
                <span className="text-sm text-white flex items-center gap-2">
                  {label}
                  {isSpecial && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">⭐ GTM Quest</span>
                  )}
                </span>
                <span className="text-xs text-zinc-500 block">{desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Smart Links Configuration */}
      {inputs.adTypes.smartLinks && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20"
        >
          <h4 className="text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
            ⭐ Smart Links (Sales Navigator)
          </h4>
          <p className="text-xs text-amber-200/80 mb-3">
            Share content on top of sponsored posts and track exactly who views it.
            Unlike regular ads, you see individual-level engagement.
          </p>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400 block">Campaign Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setSmartLinkCampaignType('one_to_one')}
                className={`flex-1 p-3 rounded-lg text-sm transition-colors ${
                  smartLinkCampaignType === 'one_to_one'
                    ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-400'
                }`}
              >
                <span className="block font-medium">1:1 Personalized</span>
                <span className="text-xs opacity-70">Individual prospect targeting</span>
              </button>
              <button
                onClick={() => setSmartLinkCampaignType('one_to_many')}
                className={`flex-1 p-3 rounded-lg text-sm transition-colors ${
                  smartLinkCampaignType === 'one_to_many'
                    ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-400'
                }`}
              >
                <span className="block font-medium">1:Many</span>
                <span className="text-xs opacity-70">Account-based targeting</span>
              </button>
            </div>
          </div>

          <div className="mt-3 text-xs text-amber-200/60">
            <p className="font-medium mb-1">Benefits:</p>
            <ul className="space-y-0.5">
              <li>• Know exactly who from target company viewed your content</li>
              <li>• Trigger personalized outreach based on engagement</li>
              <li>• Measure content effectiveness per account</li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-800/50 rounded-xl">
          <p className="text-xs text-zinc-500 mb-1">Impressions/Month</p>
          <p className="text-xl font-bold text-white">{outputs.impressionsPerMonth.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-xl">
          <p className="text-xs text-zinc-500 mb-1">Account Reach</p>
          <p className="text-xl font-bold text-green-400">{outputs.reachPercentage}%</p>
          <p className="text-[10px] text-zinc-500">of {inputs.targetAccounts.toLocaleString()} accounts</p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-xl">
          <p className="text-xs text-zinc-500 mb-1">Cost per Account</p>
          <p className="text-xl font-bold text-white">
            {currency.symbol}{outputs.costPerAccountReached.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-500/30">
          <p className="text-xs text-zinc-500 mb-1">Pipeline Lift</p>
          <p className="text-xl font-bold text-green-400">{outputs.attributedPipelineLift}x</p>
          <p className="text-[10px] text-green-400/70">vs baseline (ColdIQ benchmark)</p>
        </div>
      </div>

      {/* Budget Recommendation */}
      <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
        <p className="text-xs text-zinc-400">
          <strong>ColdIQ benchmark:</strong> $10K-50K+/month for LinkedIn ads targeting executives.
          Higher budgets = higher frequency = better recall when outreach hits.
        </p>
      </div>
    </div>
  );
}

export default LinkedInAdsCalculator;
