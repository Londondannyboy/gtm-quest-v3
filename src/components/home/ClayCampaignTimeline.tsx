'use client';

import { motion } from 'framer-motion';

const campaignPhases = [
  {
    phase: 1,
    title: 'Discovery & Enrichment',
    description: 'Clay-powered waterfall enrichment to find and qualify your ideal prospects',
    icon: '🔍',
    tools: ['Clay', 'Apify', 'Trigify'],
    color: 'blue',
  },
  {
    phase: 2,
    title: 'Signal Monitoring',
    description: 'Real-time tracking of buying signals: funding, hires, news, intent data',
    icon: '📡',
    tools: ['Scrapers', 'AI Qualification', 'Slack Alerts'],
    color: 'cyan',
  },
  {
    phase: 3,
    title: 'Campaign Execution',
    description: 'Multi-channel outreach with LinkedIn safety and email deliverability',
    icon: '🚀',
    tools: ['LaGrowthMachine', 'Instantly', 'HubSpot'],
    color: 'purple',
  },
  {
    phase: 4,
    title: 'Human Touch',
    description: 'SDR review for high-value prospects with personalized voice notes',
    icon: '🤝',
    tools: ['Breakcold', 'Surfe', 'RevOps'],
    color: 'green',
  },
];

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
};

export function ClayCampaignTimeline() {
  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">How We Run Campaigns</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Clay-Powered GTM Infrastructure
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Signal-triggered outbound at scale. Right message, right time, right prospect.
          </motion.p>
        </div>

        {/* Clay Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 blur-3xl" />
          <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            {/* Flow diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {campaignPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex-1 relative"
                >
                  {/* Connector arrow (except last) */}
                  {index < campaignPhases.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                  )}

                  <div className="bg-zinc-800/50 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[phase.color]} flex items-center justify-center text-xl mb-4`}
                    >
                      {phase.icon}
                    </div>
                    <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">
                      Phase {phase.phase}
                    </div>
                    <h3 className="font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
            <div className="text-2xl md:text-3xl font-black text-white">0%</div>
            <div className="text-white/50 text-sm">Spam Rates</div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
            <div className="text-2xl md:text-3xl font-black text-white">250+</div>
            <div className="text-white/50 text-sm">Data Points</div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
            <div className="text-2xl md:text-3xl font-black text-white">10K+</div>
            <div className="text-white/50 text-sm">Leads/Month</div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
            <div className="text-2xl md:text-3xl font-black text-white">100%</div>
            <div className="text-white/50 text-sm">Human Reviewed (Tier 1)</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
