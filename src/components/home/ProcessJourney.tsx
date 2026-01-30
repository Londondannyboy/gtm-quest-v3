'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    step: 1,
    title: 'Tell Us About Your Business',
    description:
      'Share your company details, target market, and growth goals through our AI-guided questionnaire.',
    duration: '5 min',
    icon: '💬',
  },
  {
    step: 2,
    title: 'Get Matched with Agencies',
    description:
      'Our AI analyzes 200+ agencies and recommends the perfect fit based on your specific needs.',
    duration: 'Instant',
    icon: '🎯',
  },
  {
    step: 3,
    title: 'Review & Compare',
    description:
      'Compare agency profiles, specializations, case studies, and client reviews side-by-side.',
    duration: '10 min',
    icon: '📊',
  },
  {
    step: 4,
    title: 'Connect & Grow',
    description:
      'Get introduced directly to your matched agencies and start building your GTM motion.',
    duration: 'Free',
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
            className="text-emerald-400 text-sm font-bold uppercase tracking-wider"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-4"
          >
            From Discovery to Connection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Four simple steps to find your perfect GTM partner. No sales calls, no commitment required.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 via-purple-500 to-amber-500" />

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
                <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-emerald-500 flex items-center justify-center text-xl">
                  {step.icon}
                </div>
              </div>

              {/* Content card */}
              <div
                className={`flex-1 bg-zinc-900 rounded-xl p-6 border border-white/10 hover:border-emerald-500/30 transition
                  ${index % 2 === 0 ? 'md:mr-auto md:max-w-md' : 'md:ml-auto md:max-w-md'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">
                    <span className="text-emerald-400 mr-2">Step {step.step}:</span>
                    {step.title}
                  </h3>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded flex-shrink-0 ml-2">
                    {step.duration}
                  </span>
                </div>
                <p className="text-white/60 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
