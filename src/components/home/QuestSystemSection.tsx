'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Neon color scheme: Orange, Green, Blue (not light blue)
const channels = [
  {
    name: 'LinkedIn Ads',
    glowColor: 'green',
    borderColor: 'border-green-500/50',
    shadowColor: 'shadow-green-500/20',
    glowClass: 'hover:shadow-green-500/40 hover:border-green-400',
    headerGlow: 'bg-green-500/10 border-green-500/30',
    accentText: 'text-green-400',
    purpose: {
      items: ['Build recognition', 'Seed ideas early', 'Warm the audience'],
    },
    action: {
      title: 'Run',
      items: ['Document ads', 'Thought leader ads'],
    },
    tools: ['LinkedIn', 'Clay', 'Ahrefs'],
  },
  {
    name: 'Content',
    glowColor: 'orange',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-orange-500/20',
    glowClass: 'hover:shadow-orange-500/40 hover:border-orange-400',
    headerGlow: 'bg-orange-500/10 border-orange-500/30',
    accentText: 'text-orange-400',
    purpose: {
      items: ['Build authority', 'Stay top-of-mind', 'Soften outreach'],
    },
    action: {
      title: 'Publish',
      items: ['Founder-led content', 'Frameworks', 'Insights'],
    },
    tools: ['SuperGrow', 'Claude', 'Canva'],
  },
  {
    name: 'Tracking',
    glowColor: 'blue',
    borderColor: 'border-blue-500/50',
    shadowColor: 'shadow-blue-500/20',
    glowClass: 'hover:shadow-blue-500/40 hover:border-blue-400',
    headerGlow: 'bg-blue-500/10 border-blue-500/30',
    accentText: 'text-blue-400',
    purpose: {
      items: ['Identify leads', 'Outbound timing', 'Aligned message'],
    },
    action: {
      title: 'Track',
      items: ['Post engagement', 'Website visits', 'Tool clicks'],
    },
    tools: ['Apify', 'NeonDB', 'RapidAPI'],
  },
  {
    name: 'Outbound',
    glowColor: 'purple',
    borderColor: 'border-purple-500/50',
    shadowColor: 'shadow-purple-500/20',
    glowClass: 'hover:shadow-purple-500/40 hover:border-purple-400',
    headerGlow: 'bg-purple-500/10 border-purple-500/30',
    accentText: 'text-purple-400',
    purpose: {
      items: ['Contextual outreach', 'Increase responses', 'Shorten sales cycle'],
    },
    action: {
      title: 'Reference',
      items: ['Ads they viewed', 'Engaged content', 'Page visits'],
    },
    tools: ['Instantly', 'Gemini', 'Sonnet'],
  },
];

// Timeline milestones
const timeline = [
  { month: 'Month 1', label: 'System live', progress: 30, glowColor: 'from-blue-500 to-blue-400', shadow: 'shadow-blue-500/50' },
  { month: 'Month 2', label: 'Pipeline forming', progress: 60, glowColor: 'from-orange-500 to-orange-400', shadow: 'shadow-orange-500/50' },
  { month: 'Month 3+', label: 'Full velocity', progress: 100, glowColor: 'from-green-500 to-green-400', shadow: 'shadow-green-500/50' },
];

// Animated neon channel card
function ChannelCard({ channel, index }: { channel: typeof channels[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
      }}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${
        channel.glowColor === 'green' ? 'from-green-500/20 to-emerald-500/20' :
        channel.glowColor === 'orange' ? 'from-orange-500/20 to-amber-500/20' :
        channel.glowColor === 'blue' ? 'from-blue-500/20 to-cyan-500/20' :
        'from-purple-500/20 to-pink-500/20'
      } rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Main card */}
      <div className={`relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl border ${channel.borderColor} ${channel.shadowColor} shadow-lg transition-all duration-300 ${channel.glowClass} overflow-hidden`}>

        {/* Header with glow */}
        <div className={`${channel.headerGlow} border-b ${channel.borderColor} px-5 py-4`}>
          <h3 className={`font-bold text-lg ${channel.accentText}`}>{channel.name}</h3>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Purpose */}
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Purpose</div>
            <ul className="space-y-1.5">
              {channel.purpose.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + i * 0.1 + 0.3 }}
                  className="text-zinc-300 text-sm flex items-center gap-2"
                >
                  <span className={`w-1 h-1 rounded-full ${channel.accentText.replace('text', 'bg')}`} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Action */}
          <div>
            <div className={`text-xs uppercase tracking-wider ${channel.accentText} mb-2`}>{channel.action.title}</div>
            <ul className="space-y-1.5">
              {channel.action.items.map((item, i) => (
                <li key={i} className="text-zinc-400 text-sm flex items-center gap-2">
                  <span className="text-zinc-600">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="pt-2 border-t border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {channel.tools.map((tool, i) => (
                <span
                  key={i}
                  className={`text-xs px-2.5 py-1 rounded-full bg-zinc-800/50 border ${channel.borderColor} ${channel.accentText}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Animated flow arrow
function FlowArrow({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
      className="hidden lg:flex items-center justify-center px-2"
    >
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-zinc-600 text-2xl"
      >
        →
      </motion.div>
    </motion.div>
  );
}

// Animated progress bar with neon glow
function AnimatedProgressBar({ milestone, index }: { milestone: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <div className="w-24 text-right">
        <span className="text-white font-semibold text-sm">{milestone.month}</span>
      </div>
      <div className="flex-1 h-10 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800">
        <motion.div
          className={`h-full bg-gradient-to-r ${milestone.glowColor} rounded-full ${milestone.shadow}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${milestone.progress}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.3, ease: 'easeOut' }}
          style={{ boxShadow: `0 0 20px currentColor` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
          {milestone.label}
        </span>
      </div>
    </motion.div>
  );
}

export function QuestSystemSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="quest-system" className="py-24 bg-black overflow-hidden scroll-mt-20 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block bg-zinc-900/50 backdrop-blur border border-zinc-800 text-zinc-400 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            Here&apos;s the exact system we built
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            The 4-channel ABM system
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              that converts
            </span>
          </motion.div>
        </div>

        {/* 4-Channel Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mb-20">
          {channels.map((channel, index) => (
            <div key={channel.name} className="flex items-stretch">
              <ChannelCard channel={channel} index={index} />
              {index < channels.length - 1 && <FlowArrow index={index} />}
            </div>
          ))}
        </div>

        {/* Synergy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl px-8 py-6 max-w-3xl">
            <p className="text-zinc-300 text-lg italic mb-3">
              &ldquo;Your LinkedIn ad mentions a framework → Your content breaks it down → Your website offers a deeper dive → Your outreach ties it all together.&rdquo;
            </p>
            <p className="text-transparent bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text font-semibold">
              The magic happens when channels reinforce each other.
            </p>
          </div>
        </motion.div>

        {/* UK/GDPR Section with glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-zinc-900/80 backdrop-blur border border-orange-500/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="text-5xl">🇬🇧</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-bold text-xl mb-2">UK/EU GDPR-First Approach</h3>
                <p className="text-zinc-400">
                  Company-level tracking via Leadfeeder. Smart Links bridge the individual tracking gap.
                  Built for UK compliance from day one, not retrofitted from US playbooks.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full border border-orange-500/30">
                  GDPR Compliant
                </span>
                <span className="text-sm bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
                  Smart Links
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-bold text-xl mb-8 text-center">What to Expect</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {timeline.map((milestone, index) => (
              <AnimatedProgressBar key={milestone.month} milestone={milestone} index={index} />
            ))}
          </div>
          <p className="text-zinc-600 text-sm text-center mt-6">
            Timeline is indicative. Results compound as signals inform optimization.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
