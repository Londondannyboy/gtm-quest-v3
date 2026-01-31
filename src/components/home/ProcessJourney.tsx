'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    step: 1,
    title: 'Discovery Call',
    description:
      'We understand your ICP, market positioning, and growth goals. No sales pitch - just learning.',
    duration: '30 min',
    icon: '💬',
  },
  {
    step: 2,
    title: 'System Design',
    description:
      'We map your Quest System configuration - channels, tools, messaging, and targeting strategy.',
    duration: 'Week 1',
    icon: '🎯',
  },
  {
    step: 3,
    title: 'Build & Launch',
    description:
      'We build your campaigns, set up infrastructure, and launch your first sequences.',
    duration: 'Weeks 2-4',
    icon: '🛠️',
  },
  {
    step: 4,
    title: 'Optimize & Scale',
    description:
      'Monthly iteration based on data. Full handover when you are ready - no dependency.',
    duration: 'Ongoing',
    icon: '🚀',
  },
];

export function ProcessJourney() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-green-400 text-sm font-bold uppercase tracking-wider"
          >
            Working With Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white"
          >
            From Discovery to Revenue
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Four steps to get your Quest System running. No long contracts, full handover included.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 via-purple-500 to-indigo-500" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Step number */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-blue-500 flex items-center justify-center text-xl">
                  {step.icon}
                </div>
              </div>

              {/* Content card */}
              <div
                className={`flex-1 bg-zinc-900 rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition
                  ${index % 2 === 0 ? 'md:mr-auto md:max-w-md' : 'md:ml-auto md:max-w-md'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">
                    <span className="text-blue-400 mr-2">Step {step.step}:</span>
                    {step.title}
                  </h3>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded flex-shrink-0 ml-2">
                    {step.duration}
                  </span>
                </div>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
