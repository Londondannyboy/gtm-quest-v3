'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BOOKING_LINK = 'https://calendly.com/my-first-quest';

const approaches = [
  {
    name: 'ABM Light',
    tagline: 'Best value for growing teams',
    price: 'From £2,500/mo',
    description: 'Perfect for companies starting their ABM journey. Get the full Quest System at a fraction of traditional agency costs.',
    features: [
      '4 LinkedIn identities',
      '2 email domains',
      'Signal-triggered outreach',
      'Monthly optimization calls',
      'Full system handover',
    ],
    accentColor: 'green',
    borderColor: 'border-green-500/30',
    glowColor: 'from-green-500/10 to-emerald-500/10',
    textColor: 'text-green-400',
    recommended: true,
  },
  {
    name: 'Full ABM',
    tagline: 'Maximum pipeline velocity',
    price: 'From £5,000/mo',
    description: 'For teams ready to scale aggressively. More touchpoints, faster iteration, dedicated support.',
    features: [
      '8+ LinkedIn identities',
      '4+ email domains',
      'Priority signal processing',
      'Weekly strategy calls',
      'Dedicated account manager',
    ],
    accentColor: 'orange',
    borderColor: 'border-orange-500/30',
    glowColor: 'from-orange-500/10 to-amber-500/10',
    textColor: 'text-orange-400',
    recommended: false,
  },
];

const savings = [
  { label: 'Traditional Agency', cost: '£15-25k/mo', note: 'Long contracts, slow iteration' },
  { label: 'In-House Team', cost: '£8-12k/mo', note: '3-6 month ramp-up time' },
  { label: 'Quest System', cost: '£2.5-5k/mo', note: 'Live in 4 weeks, full handover', highlight: true },
];

function ApproachCard({ approach, index }: { approach: typeof approaches[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5, type: 'spring' as const, stiffness: 100 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${approach.glowColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className={`relative bg-zinc-900/80 backdrop-blur rounded-2xl border ${approach.borderColor} overflow-hidden h-full`}>
        {/* Recommended badge */}
        {approach.recommended && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </span>
          </div>
        )}

        {/* Header */}
        <div className={`p-6 border-b ${approach.borderColor}`}>
          <h3 className={`text-2xl font-bold ${approach.textColor}`}>{approach.name}</h3>
          <p className="text-zinc-400 text-sm mt-1">{approach.tagline}</p>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{approach.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-zinc-400 text-sm mb-6">{approach.description}</p>

          <ul className="space-y-3">
            {approach.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
                className="flex items-center gap-3 text-zinc-300 text-sm"
              >
                <svg className={`w-5 h-5 ${approach.textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>

          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 block w-full text-center py-3 rounded-xl font-bold transition ${
              approach.recommended
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
            }`}
          >
            Get Started
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function ABMApproachSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6"
          >
            Skip the Agency Overhead
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Build Your GTM System,{' '}
            <span className="bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
              Not Agency Bills
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            Traditional agencies charge £15-25k/month and lock you into long contracts.
            We build your system, train your team, and hand it over. You own everything.
          </motion.p>
        </div>

        {/* Cost Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Cost Comparison</h3>
            <div className="space-y-3">
              {savings.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    item.highlight
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-zinc-800/50'
                  }`}
                >
                  <div>
                    <span className={`font-medium ${item.highlight ? 'text-green-400' : 'text-white'}`}>
                      {item.label}
                    </span>
                    <span className="text-zinc-500 text-sm ml-2">— {item.note}</span>
                  </div>
                  <span className={`font-bold ${item.highlight ? 'text-green-400' : 'text-zinc-400'}`}>
                    {item.cost}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Approach Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {approaches.map((approach, index) => (
            <ApproachCard key={approach.name} approach={approach} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 text-sm">
            Not sure which is right for you?{' '}
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              Book a free strategy call
            </a>{' '}
            and we&apos;ll help you decide.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
