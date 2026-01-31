'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Enhanced 4-Channel ABM data structure
const channels = [
  {
    name: 'LinkedIn Ads',
    color: 'bg-green-100 border-green-300',
    headerBg: 'bg-green-200',
    textColor: 'text-green-800',
    purpose: {
      title: 'Purpose',
      items: ['Build recognition', 'Seed ideas early', 'Warm the audience'],
    },
    action: {
      title: 'Run',
      items: ['Document ads', 'Thought leader ads'],
    },
    tools: [
      { name: 'LinkedIn', icon: 'in' },
      { name: 'Clay', icon: 'clay' },
      { name: 'Ahrefs', icon: 'ahrefs' },
    ],
  },
  {
    name: 'Content',
    color: 'bg-blue-100 border-blue-300',
    headerBg: 'bg-blue-200',
    textColor: 'text-blue-800',
    purpose: {
      title: 'Purpose',
      items: ['Build authority', 'Stay top-of-mind', 'Soften outreach'],
    },
    action: {
      title: 'Publish',
      items: ['Founder-led content', 'Frameworks', 'Insights'],
    },
    tools: [
      { name: 'SuperGrow', icon: 'supergrow' },
      { name: 'Claude', icon: 'claude' },
      { name: 'Canva', icon: 'canva' },
    ],
  },
  {
    name: 'Tracking',
    color: 'bg-cyan-100 border-cyan-300',
    headerBg: 'bg-cyan-200',
    textColor: 'text-cyan-800',
    purpose: {
      title: 'Purpose',
      items: ['Identify leads', 'Outbound timing', 'Aligned message'],
    },
    action: {
      title: 'Track',
      items: ['Post engagement', 'Website visits', 'Tool clicks'],
    },
    tools: [
      { name: 'Apify', icon: 'apify' },
      { name: 'NeonDB', icon: 'neondb' },
      { name: 'RapidAPI', icon: 'rapidapi' },
    ],
  },
  {
    name: 'Outbound',
    color: 'bg-purple-100 border-purple-300',
    headerBg: 'bg-purple-200',
    textColor: 'text-purple-800',
    purpose: {
      title: 'Purpose',
      items: ['Contextual outreach', 'Increase responses', 'Shorten sales cycle'],
    },
    action: {
      title: 'Reference',
      items: ['Ads they viewed', 'Engaged content', 'Page visits'],
    },
    tools: [
      { name: 'Instantly', icon: 'instantly' },
      { name: 'Gemini', icon: 'gemini' },
      { name: 'Sonnet', icon: 'sonnet' },
    ],
  },
];

// Synergy flow steps
const synergySteps = [
  { text: 'Your LinkedIn ad mentions a specific framework', color: 'bg-green-50 border-green-200 text-green-700' },
  { text: 'Your content breaks down that framework', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { text: 'Your website offers a deeper dive', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
  { text: 'Your email ties it all together', color: 'bg-purple-50 border-purple-200 text-purple-700' },
];

// Timeline milestones
const timeline = [
  { month: 'Month 1', label: 'System live', progress: 30, color: 'bg-blue-500' },
  { month: 'Month 2', label: 'Pipeline forming', progress: 60, color: 'bg-purple-500' },
  { month: 'Month 3+', label: 'Full velocity', progress: 100, color: 'bg-green-500' },
];

// Tool icon component
function ToolIcon({ name, icon }: { name: string; icon: string }) {
  const iconMap: Record<string, { bg: string; text: string; label: string }> = {
    // LinkedIn Ads channel
    in: { bg: 'bg-blue-600', text: 'text-white', label: 'in' },
    clay: { bg: 'bg-zinc-800', text: 'text-white', label: 'Clay' },
    ahrefs: { bg: 'bg-orange-500', text: 'text-white', label: 'Ah' },
    // Content channel
    supergrow: { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', text: 'text-white', label: 'SG' },
    claude: { bg: 'bg-orange-300', text: 'text-orange-900', label: 'Cl' },
    canva: { bg: 'bg-cyan-500', text: 'text-white', label: 'Ca' },
    // Tracking channel
    apify: { bg: 'bg-green-500', text: 'text-white', label: 'Ap' },
    neondb: { bg: 'bg-emerald-400', text: 'text-emerald-900', label: 'Ne' },
    rapidapi: { bg: 'bg-blue-700', text: 'text-white', label: 'RA' },
    // Outbound channel
    instantly: { bg: 'bg-blue-500', text: 'text-white', label: 'In' },
    gemini: { bg: 'bg-gradient-to-br from-blue-400 to-purple-500', text: 'text-white', label: 'Ge' },
    sonnet: { bg: 'bg-orange-400', text: 'text-white', label: 'So' },
  };

  const iconData = iconMap[icon] || { bg: 'bg-gray-500', text: 'text-white', label: '?' };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 ${iconData.bg} ${iconData.text} rounded-lg flex items-center justify-center text-xs font-bold`}>
        {iconData.label}
      </div>
      <span className="text-[10px] text-zinc-600">{name}</span>
    </div>
  );
}

// Channel Card Component
function ChannelCard({ channel, index }: { channel: typeof channels[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex flex-col"
    >
      {/* Channel Header */}
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className={`${channel.headerBg} ${channel.textColor} rounded-2xl px-6 py-3 text-center font-bold shadow-sm`}
      >
        {channel.name}
      </motion.div>

      {/* Arrow down */}
      <div className="flex justify-center my-2">
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-zinc-400">
          <path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Purpose Section */}
      <div className={`${channel.color} border rounded-xl p-4 mb-2`}>
        <div className="bg-zinc-900 text-white text-sm font-bold py-2 px-4 rounded-lg mb-3 text-center">
          {channel.purpose.title}
        </div>
        <ul className="space-y-1">
          {channel.purpose.items.map((item, i) => (
            <li key={i} className="text-zinc-700 text-sm flex items-start gap-2">
              <span className="text-zinc-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Section */}
      <div className={`${channel.color} border rounded-xl p-4 mb-2 border-dashed`}>
        <div className="bg-zinc-900 text-white text-sm font-bold py-2 px-4 rounded-lg mb-3 text-center">
          {channel.action.title}
        </div>
        <ul className="space-y-1">
          {channel.action.items.map((item, i) => (
            <li key={i} className="text-zinc-700 text-sm flex items-start gap-2">
              <span className="text-zinc-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tools Section */}
      <div className={`${channel.color} border rounded-xl p-4`}>
        <div className="bg-zinc-900 text-white text-sm font-bold py-2 px-4 rounded-lg mb-3 text-center">
          Tools
        </div>
        <div className="flex justify-center gap-3">
          {channel.tools.map((tool, i) => (
            <ToolIcon key={i} name={tool.name} icon={tool.icon} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Flow Arrow Component (horizontal)
function FlowArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="hidden lg:flex items-start pt-6"
    >
      <svg width="40" height="24" viewBox="0 0 40 24" className="text-zinc-300">
        <path d="M0 12 L30 12 M24 6 L30 12 L24 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

// Progress Bar Component
function AnimatedProgressBar({ milestone, index }: { milestone: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-20 text-right">
        <span className="text-white font-semibold text-sm">{milestone.month}</span>
      </div>
      <div className="flex-1 h-8 bg-zinc-800 rounded-full overflow-hidden relative">
        <motion.div
          className={`h-full ${milestone.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${milestone.progress}%` : 0 }}
          transition={{ duration: 1.2, delay: index * 0.3, ease: 'easeOut' }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white/80 text-xs font-medium">
          {milestone.label}
        </span>
      </div>
    </div>
  );
}

export function QuestSystemSection() {
  return (
    <section id="quest-system" className="py-20 bg-gradient-to-b from-zinc-100 to-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-zinc-200 text-zinc-700 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            Here&apos;s the exact system we built
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900"
          >
            The 4-channel ABM system{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              that converts
            </span>
          </motion.h2>
        </div>

        {/* 4-Channel Flow Diagram */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-2 mb-16">
          {channels.map((channel, index) => (
            <div key={channel.name} className="flex items-start">
              <ChannelCard channel={channel} index={index} />
              {index < channels.length - 1 && <FlowArrow delay={index * 0.15 + 0.3} />}
            </div>
          ))}
        </div>

        {/* Synergy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Magic Quote */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white border border-zinc-200 rounded-full px-6 py-3 shadow-sm">
              <span className="text-zinc-700 font-medium">
                The magic happens when channels reinforce each other.
              </span>
            </div>
          </div>

          {/* Synergy Flow */}
          <div className="relative">
            {/* Connection lines (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2 z-0" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
              {synergySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className={`${step.color} border rounded-xl px-4 py-3 text-center text-sm max-w-[180px]`}>
                    {step.text}
                  </div>
                  {index < synergySteps.length - 1 && (
                    <div className="hidden md:block text-zinc-300 mx-2">→</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-16 border-t border-zinc-200" />

        {/* Dark section for Timeline & GDPR */}
        <div className="bg-zinc-900 rounded-3xl p-8 md:p-12">
          {/* UK/GDPR Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 border border-amber-500/20 rounded-xl p-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="text-4xl">🇬🇧</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-bold mb-1">UK/EU GDPR-First Approach</h3>
                <p className="text-white/60 text-sm">
                  Company-level tracking via Leadfeeder. Smart Links bridge the individual tracking gap.
                  Built for UK compliance from day one, not retrofitted from US playbooks.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">GDPR Compliant</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Smart Links</span>
              </div>
            </div>
          </motion.div>

          {/* Timeline Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-6 text-center">What to Expect</h3>
            <div className="max-w-xl mx-auto space-y-4">
              {timeline.map((milestone, index) => (
                <AnimatedProgressBar key={milestone.month} milestone={milestone} index={index} />
              ))}
            </div>
            <p className="text-white/40 text-xs text-center mt-4">
              Timeline is indicative. Results compound as signals inform optimization.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
