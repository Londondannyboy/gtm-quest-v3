'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BOOKING_LINK = 'https://calendly.com/my-first-quest';

const packages = [
  {
    name: 'Starter',
    tagline: 'Get your system running',
    description: 'Perfect for teams new to outbound. We build your Clay-based system, launch your first campaigns, and hand it over.',
    features: [
      'Clay-powered enrichment & sequencing',
      'LinkedIn + email outreach setup',
      'Signal-triggered targeting',
      'Monthly optimization call',
      'Full system handover',
    ],
    accentColor: 'green',
    borderColor: 'border-green-500/30',
    glowColor: 'from-green-500/10 to-emerald-500/10',
    textColor: 'text-green-400',
  },
  {
    name: 'Growth',
    tagline: 'Scale with support',
    description: 'For teams ready to move faster. More capacity, tighter iteration cycles, and dedicated support as you scale.',
    features: [
      'Everything in Starter',
      'Expanded outreach capacity',
      'Priority signal processing',
      'Weekly strategy calls',
      'Dedicated account support',
    ],
    accentColor: 'orange',
    borderColor: 'border-orange-500/30',
    glowColor: 'from-orange-500/10 to-amber-500/10',
    textColor: 'text-orange-400',
  },
];

const comparisons = [
  { label: 'Traditional Agency', note: 'Long contracts, slow iteration, big overhead' },
  { label: 'Building In-House', note: 'Months of ramp-up, hiring headaches' },
  { label: 'Quest System', note: 'Live in weeks, you own everything, full handover', highlight: true },
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
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
      <div className={`absolute -inset-1 bg-gradient-to-r ${pkg.glowColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className={`relative bg-zinc-900/80 backdrop-blur rounded-2xl border ${pkg.borderColor} overflow-hidden h-full`}>
        {/* Header */}
        <div className={`p-6 border-b ${pkg.borderColor}`}>
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-2xl font-bold ${pkg.textColor}`}>{pkg.name}</h3>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">
              Clay-based
            </span>
          </div>
          <p className="text-zinc-400 text-sm">{pkg.tagline}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-zinc-400 text-sm mb-6">{pkg.description}</p>

          <ul className="space-y-3">
            {pkg.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
                className="flex items-center gap-3 text-zinc-300 text-sm"
              >
                <svg className={`w-5 h-5 ${pkg.textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              index === 0
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
            }`}
          >
            Talk to Us
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

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6"
          >
            Consultant, Not Agency
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Supercharged GTM —{' '}
            <span className="bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
              Without the Overhead
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            We build your Clay-based outbound system, train your team, and hand it over.
            You own the infrastructure. No long contracts. No bloated retainers.
          </motion.p>
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Why Teams Choose Us</h3>
            <div className="space-y-3">
              {comparisons.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    item.highlight
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-zinc-800/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.highlight ? 'bg-green-500' : 'bg-zinc-600'
                  }`} />
                  <div>
                    <span className={`font-medium ${item.highlight ? 'text-green-400' : 'text-zinc-400'}`}>
                      {item.label}
                    </span>
                    <span className="text-zinc-500 text-sm block">{item.note}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-zinc-600 text-sm">
            Pricing discussed on call based on your needs.{' '}
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              Book a free strategy session
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
