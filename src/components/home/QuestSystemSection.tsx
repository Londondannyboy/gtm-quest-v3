'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// The Quest System 4 Channels
const channels = [
  {
    name: 'LinkedIn Ads',
    purpose: 'Awareness',
    description: 'Build recognition before outreach',
    icon: '📢',
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
  },
  {
    name: 'Content',
    purpose: 'Trust',
    description: 'Thought leadership that softens outreach',
    icon: '📝',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  },
  {
    name: 'Intent Tracking',
    purpose: 'Timing',
    description: 'Know when prospects are ready',
    icon: '🎯',
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  },
  {
    name: 'Outbound',
    purpose: 'Conversion',
    description: 'Contextual, relevant outreach',
    icon: '🚀',
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  },
];

// Timeline milestones
const timeline = [
  { month: 'Month 1', label: 'System live', progress: 30, color: 'bg-blue-500' },
  { month: 'Month 2', label: 'Pipeline forming', progress: 60, color: 'bg-purple-500' },
  { month: 'Month 3+', label: 'Full velocity', progress: 100, color: 'bg-green-500' },
];

// Tool stack for carousel
const tools = [
  { name: 'Clay', icon: '🏺', description: 'Enrichment & Orchestration' },
  { name: 'La Growth Machine', icon: '⚙️', description: 'LinkedIn Automation' },
  { name: 'Trigify', icon: '🎯', description: 'Intent Signals' },
  { name: 'Instantly', icon: '📧', description: 'Email Infrastructure' },
  { name: 'Sales Navigator', icon: '🔗', description: 'LinkedIn Premium' },
  { name: 'Leadfeeder', icon: '🏢', description: 'Visitor Identification' },
  { name: 'Smartlead', icon: '📬', description: 'Email Outreach' },
  { name: 'Apollo', icon: '🚀', description: 'Sales Intelligence' },
];

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

// Tool Card for Carousel
function ToolCard({ tool }: { tool: typeof tools[0] }) {
  return (
    <div className="flex-shrink-0 w-36 bg-zinc-900 border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/30 transition mx-2">
      <div className="text-2xl mb-2">{tool.icon}</div>
      <div className="text-white text-sm font-semibold">{tool.name}</div>
      <div className="text-white/40 text-[10px] mt-1">{tool.description}</div>
    </div>
  );
}

export function QuestSystemSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-green-400 text-sm font-bold uppercase tracking-wider"
          >
            Our Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white"
          >
            The Quest System: 4-Channel ABM
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Signal-triggered multi-channel outreach that compounds over time.
            Built for UK/EU compliance, not retrofitted.
          </motion.p>
        </div>

        {/* 4-Channel Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {channels.map((channel, i) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-b ${channel.color} border rounded-xl p-4 text-center min-w-[130px] cursor-default`}
                >
                  <div className="text-3xl mb-2">{channel.icon}</div>
                  <div className="text-white font-semibold text-sm">{channel.name}</div>
                  <div className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{channel.purpose}</div>
                </motion.div>
                {i < channels.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="text-white/30 mx-2 text-xl"
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Synergy Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center max-w-2xl mx-auto"
          >
            <p className="text-white/60 text-sm italic">
              &ldquo;Your LinkedIn ad mentions a framework → Your content breaks it down →
              Your website offers a deeper dive → Your outreach ties it all together.&rdquo;
            </p>
            <p className="text-green-400 text-xs font-semibold mt-2">
              The magic happens when channels reinforce each other.
            </p>
          </motion.div>
        </motion.div>

        {/* UK/GDPR Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 border border-amber-500/20 rounded-xl p-6"
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
          className="mb-16"
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

        {/* Tool Stack Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-bold text-lg mb-6 text-center">Our GTM Stack</h3>

          {/* Marquee Container */}
          <div className="relative">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

            {/* Marquee */}
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: [0, -1200] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Double the tools for seamless loop */}
                {[...tools, ...tools].map((tool, i) => (
                  <ToolCard key={`${tool.name}-${i}`} tool={tool} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
