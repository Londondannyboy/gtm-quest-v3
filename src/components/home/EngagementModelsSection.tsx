'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BOOKING_LINK = 'https://calendly.com/my-first-quest';

const engagementModels = [
  {
    name: 'Handover',
    tagline: 'Build & Transfer',
    description: 'We build your complete Clay-based system and hand it over to your team. Full documentation, training, and knowledge transfer included.',
    idealFor: 'Teams with in-house ops capacity',
    includes: [
      'Complete system build',
      'Team training sessions',
      'Full documentation',
      'Handover support period',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    accentColor: 'green',
    borderColor: 'border-green-500/30',
    glowColor: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    name: 'Handover + Support',
    tagline: 'Air Cover',
    description: 'System handover plus ongoing consultant support. We stay on as an external resource 1-2 days per week to optimize and troubleshoot.',
    idealFor: 'Teams ramping up internal capability',
    includes: [
      'Everything in Handover',
      '1-2 days/week consultant time',
      'Weekly optimization calls',
      'Slack/email support',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    accentColor: 'orange',
    borderColor: 'border-orange-500/30',
    glowColor: 'from-orange-500/20 to-amber-500/20',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    name: 'Embedded',
    tagline: 'Run & Optimize',
    description: 'We operate your outbound system as an embedded team member. You focus on closing deals while we handle the pipeline machine.',
    idealFor: 'Teams without ops bandwidth',
    includes: [
      'Full system operation',
      'Daily campaign management',
      'A/B testing & optimization',
      'Weekly reporting',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accentColor: 'blue',
    borderColor: 'border-blue-500/30',
    glowColor: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'Scale',
    tagline: 'Full ABM Partnership',
    description: 'Complete go-to-market partnership. Full-stack ABM execution with dedicated resources, expanded capacity, and strategic alignment.',
    idealFor: 'Teams ready to invest in growth',
    includes: [
      'Full ABM execution',
      'Dedicated account team',
      'Multi-channel campaigns',
      'Strategic planning',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    accentColor: 'purple',
    borderColor: 'border-purple-500/30',
    glowColor: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
];

function EngagementCard({ model, index }: { model: typeof engagementModels[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' as const, stiffness: 100 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${model.glowColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className={`relative bg-zinc-900/80 backdrop-blur rounded-2xl border ${model.borderColor} overflow-hidden h-full flex flex-col`}>
        {/* Header */}
        <div className={`p-5 border-b ${model.borderColor}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${model.bgColor} ${model.textColor}`}>
              {model.icon}
            </div>
            <div>
              <h3 className={`text-lg font-bold ${model.textColor}`}>{model.name}</h3>
              <p className="text-zinc-500 text-xs">{model.tagline}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-zinc-400 text-sm mb-4">{model.description}</p>

          <div className="mb-4">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Ideal for:</span>
            <p className="text-zinc-300 text-sm mt-1">{model.idealFor}</p>
          </div>

          <ul className="space-y-2 flex-1">
            {model.includes.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                className="flex items-center gap-2 text-zinc-300 text-sm"
              >
                <svg className={`w-4 h-4 ${model.textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function EngagementModelsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block bg-zinc-800/50 border border-zinc-700 text-zinc-400 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6"
          >
            Engagement Models
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              Level of Involvement
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            From complete handover to full partnership — we flex to fit your team&apos;s needs and capacity.
          </motion.p>
        </div>

        {/* Engagement Cards - 2x2 Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {engagementModels.map((model, index) => (
            <EngagementCard key={model.name} model={model} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-500/25"
          >
            Discuss Your Needs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-zinc-600 text-sm mt-4">
            Not sure which model fits? Let&apos;s figure it out on a call.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
