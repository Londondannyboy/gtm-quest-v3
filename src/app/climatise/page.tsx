'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const phases = [
  {
    phase: 1,
    title: 'Foundation',
    weeks: 'Weeks 1-2',
    icon: '🏗️',
    items: [
      'Supabase/Neon database architecture',
      'Clay workspace with ICP-specific tables',
      'Signal scrapers: Find a Tender, bidstats.uk',
      'Initial enrichment waterfalls',
    ],
  },
  {
    phase: 2,
    title: 'Campaign Infrastructure',
    weeks: 'Weeks 2-3',
    icon: '⚙️',
    items: [
      'LaGrowthMachine setup with proxy config',
      'Instantly domains and warmup',
      'LinkedIn safety protocols',
      'HubSpot integration & RevOps dashboards',
    ],
  },
  {
    phase: 3,
    title: 'Launch Tier 1 ICPs',
    weeks: 'Week 4+',
    icon: '🚀',
    items: [
      'Government Contract Bidders campaign live',
      'SECR December YE sequence active',
      'NHS Tier 1 outreach running',
      'Signal monitoring in Slack',
    ],
  },
  {
    phase: 4,
    title: 'Handover',
    weeks: 'Ongoing',
    icon: '🎓',
    items: [
      'Documentation and runbooks',
      'Team training sessions',
      'Ongoing optimisation support',
      'Full RevOps handover',
    ],
  },
];

const icpCategories = [
  { name: 'Regulatory-Driven', count: 12, examples: 'SECR, NHS, PPN 006, PAS 2080' },
  { name: 'Supply Chain Pressure', count: 6, examples: 'Tesco, Sainsburys, FMCG' },
  { name: 'Voluntary/Values-Driven', count: 3, examples: 'B Corp, SBTi, CDP' },
  { name: 'Sector-Specific', count: 12, examples: 'MATs, Universities, Manufacturing' },
  { name: 'Emerging', count: 4, examples: 'Insurance, Franchises, Recruitment' },
];

const tier1Icps = [
  { name: 'Government Contract Bidders', count: '5,000+', urgency: 'Critical', trigger: 'PPN 006' },
  { name: 'NHS Suppliers Tier 1', count: '2,000', urgency: 'High', trigger: 'April 2027' },
  { name: 'SECR December Year-End', count: '3,300', urgency: 'High', trigger: '30 Sept deadline' },
  { name: 'SECR March Year-End', count: '4,400', urgency: 'High', trigger: '31 Dec deadline' },
  { name: 'National Highways Suppliers', count: '500', urgency: 'Critical', trigger: 'PAS 2080 by 2025' },
];

export default function ClimatisePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-green-600/10" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/" className="text-blue-400 text-sm hover:text-blue-300 mb-4 inline-block">
              ← Back to GTM Quest
            </Link>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-blue-400 font-bold">GTM Quest</span>
              <span className="text-white/40">×</span>
              <span className="text-green-400 font-bold">Climatise</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Go-To-Market Engineering
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your end-to-end emissions solution deserves an end-to-end GTM system.
              A proposal for building scalable, automated outbound infrastructure
              targeting <span className="text-green-400 font-semibold">37 defined ICPs</span> across UK carbon accounting.
            </p>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white">37</div>
              <div className="text-white/60 text-sm">ICPs Defined</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">100K+</div>
              <div className="text-white/60 text-sm">Decision Makers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">15,200</div>
              <div className="text-white/60 text-sm">High-Intent Companies</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Embedded Presentation */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              Full Proposal
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              GTM Pilot Presentation
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900 rounded-2xl p-4 border border-white/10"
          >
            <iframe
              src="https://gamma.app/embed/j6g4b0py5xapwxz"
              style={{ width: '100%', height: '500px' }}
              allow="fullscreen"
              title="Climatise GTM Pilot"
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ICP Categories */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              The Challenge
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">
              37 ICPs, Complex Signals, Manual Chaos
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Climatise has defined 37 Ideal Customer Profiles across 5 categories.
              Without automation, you are leaving pipeline on the table.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {icpCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-center hover:border-green-500/30 transition"
              >
                <div className="text-2xl font-black text-green-400 mb-1">{cat.count}</div>
                <div className="text-white font-semibold text-sm mb-2">{cat.name}</div>
                <div className="text-white/50 text-xs">{cat.examples}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 1 ICPs */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              Priority Targets
            </span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">
              Tier 1 ICPs: Where We Start
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              15,200 high-intent companies with hard deadlines driving purchase urgency.
            </p>
          </motion.div>

          <div className="space-y-4">
            {tier1Icps.map((icp, index) => (
              <motion.div
                key={icp.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500/30 transition"
              >
                <div>
                  <h3 className="font-bold text-white text-lg">{icp.name}</h3>
                  <p className="text-white/50 text-sm">{icp.trigger}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{icp.count}</div>
                    <div className="text-white/50 text-xs">Companies</div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      icp.urgency === 'Critical'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {icp.urgency} Urgency
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Timeline */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              The Build
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              What Gets Built: 4-Phase Timeline
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              RevOps-first architecture - built for handover, not dependency
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-blue-500" />

            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Phase indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                    {phase.icon}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition ${
                    index % 2 === 0 ? 'md:mr-auto md:max-w-lg' : 'md:ml-auto md:max-w-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Phase {phase.phase}
                      </span>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                      {phase.weeks}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-green-400 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your GTM System?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Let&apos;s build a GTM system as sophisticated as your emissions platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://cal.com/mike-hanley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/25"
              >
                Book a Call with Dan
              </a>
              <a
                href="mailto:dan@gtm.quest"
                className="text-white hover:text-blue-400 px-8 py-4 rounded-xl font-medium transition border border-white/20 hover:border-blue-500/50"
              >
                dan@gtm.quest
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
