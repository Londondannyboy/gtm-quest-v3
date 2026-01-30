'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CountUp from 'react-countup';

// Campaign phases
const phases = [
  {
    phase: 1,
    title: 'Foundation',
    weeks: 'Weeks 1-2',
    icon: '🏗️',
    items: [
      'Clay workspace with ICP-specific tables',
      'Signal scrapers: Find a Tender, bidstats.uk',
      'Initial enrichment waterfalls',
      'Optional: Supabase/Neon for high-volume storage',
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
      'HubSpot integration',
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
    title: 'Training & Handover',
    weeks: 'Ongoing',
    icon: '🎓',
    items: [
      'Clay training sessions (build your own)',
      'Documentation and runbooks',
      'Ongoing optimisation support',
      'Full system handover',
    ],
  },
];

// ICP Categories
const icpCategories = [
  { name: 'Regulatory-Driven', count: 12, examples: 'SECR, NHS, PPN 006, PAS 2080', color: 'blue' },
  { name: 'Supply Chain Pressure', count: 6, examples: 'Tesco, Sainsburys, FMCG', color: 'green' },
  { name: 'Voluntary/Values-Driven', count: 3, examples: 'B Corp, SBTi, CDP', color: 'purple' },
  { name: 'Sector-Specific', count: 12, examples: 'MATs, Universities, Manufacturing', color: 'cyan' },
  { name: 'Emerging', count: 4, examples: 'Insurance, Franchises, Recruitment', color: 'amber' },
];

// Tier 1 ICPs
const tier1Icps = [
  { name: 'Government Contract Bidders', count: '5,000+', urgency: 'Critical', trigger: 'PPN 006 Carbon Reduction Plan', deadline: 'Immediate' },
  { name: 'NHS Suppliers Tier 1', count: '2,000', urgency: 'High', trigger: 'Scope 3 reporting requirement', deadline: 'April 2027' },
  { name: 'SECR December Year-End', count: '3,300', urgency: 'High', trigger: 'Annual compliance deadline', deadline: '30 September' },
  { name: 'SECR March Year-End', count: '4,400', urgency: 'High', trigger: 'Annual compliance deadline', deadline: '31 December' },
  { name: 'National Highways Suppliers', count: '500', urgency: 'Critical', trigger: 'PAS 2080 compliance', deadline: 'End of 2025' },
];

// GTM Stack - Clay-Centric
const gtmStack = {
  clay: {
    name: 'Clay',
    tagline: 'The Heart of Your GTM Stack',
    description: 'All-in-one platform for data enrichment, waterfall sequences, and outbound orchestration',
    capabilities: [
      'Waterfall enrichment (Findy, Icypeas, Prospero)',
      'LinkedIn deep enrichment via Apify',
      'AI-powered lead scoring & qualification',
      'Signal monitoring & Slack alerts',
      'Campaign orchestration & sequencing',
    ],
  },
  execution: [
    { name: 'LaGrowthMachine', description: 'LinkedIn automation with 4G proxy protection', primary: true },
    { name: 'Instantly', description: 'Email outreach at scale' },
    { name: 'HubSpot', description: 'System of record' },
    { name: 'Breakcold', description: 'Frontline CRM' },
    { name: 'Surfe', description: 'LinkedIn CRM sync' },
  ],
  optional: [
    { name: 'Supabase/Neon', description: 'Extended data storage (optional)', note: 'For high-volume campaigns' },
    { name: 'Custom Scrapers', description: 'Find a Tender, bidstats.uk, Contract Finder' },
    { name: 'RevOps Dashboards', description: 'Advanced reporting & analytics', note: 'Add-on service' },
  ],
};

// Signal types
const signalTypes = [
  {
    name: 'Government Contract Signals',
    icon: '🏛️',
    triggers: [
      'Daily scraper on Find a Tender and bidstats.uk',
      'AI qualification for carbon-relevant tenders',
      'Instant enrichment of winning companies',
    ],
    message: '"We saw you just won [contract] - PPN 006 requires a Carbon Reduction Plan"',
  },
  {
    name: 'SECR Deadline Signals',
    icon: '📅',
    triggers: [
      'Companies House year-end date extraction',
      '6-9 month prep window targeting',
      'Countdown sequence automation',
    ],
    message: '"Your SECR deadline is in 6 months - here\'s how we help"',
  },
  {
    name: 'NHS Supplier Signals',
    icon: '🏥',
    triggers: [
      'NHS SBS framework list monitoring',
      'Contract award tracking',
      'Scope 3 deadline awareness',
    ],
    message: '"April 2027 is closer than you think - Scope 3 readiness check"',
  },
];

// Investment options
const investmentOptions = [
  { type: 'Clay Training', rate: '£1,000/day', description: 'Learn to build and manage your own Clay workflows', highlight: true },
  { type: 'Workshops & Strategy', rate: '£1,000/day', description: 'ICP refinement, campaign strategy, team enablement' },
  { type: 'System Building', rate: '£750/day', description: 'Clay builds, integrations, campaign setup' },
  { type: 'Ongoing Support', rate: '£500/day', description: 'Maintenance, optimisation, troubleshooting (3 months)' },
];

// Why GTM Quest
const whyGtmQuest = [
  { title: 'Operational Execution', description: 'Not strategy decks - working systems that run' },
  { title: 'RevOps-First Architecture', description: 'Built for handover, not dependency' },
  { title: 'LinkedIn Safety Expertise', description: '4G mobile proxies, proper protocols, zero flags' },
  { title: 'Signal-Triggered Outbound', description: 'Scraper-first approach beats list-buying' },
  { title: 'AI-Native Content', description: 'AEO, Gen-SEO, and llms.txt implementation' },
  { title: 'Local', description: 'Based in Borough - happy to meet in person' },
];

const CORRECT_PASSWORD = 'climatisegtmquest2026';

export default function ClimatisePage() {
  const [showGammaEmbed, setShowGammaEmbed] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image
                src="/GTM Logo New.png"
                alt="GTM Quest"
                width={100}
                height={35}
                className="h-8 w-auto"
              />
              <span className="text-white/40 text-xl">×</span>
              <Image
                src="/climistise logo.png"
                alt="Climatise"
                width={110}
                height={35}
                className="h-8 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Protected Content</h1>
            <p className="text-white/60">
              This pitch deck contains confidential information prepared exclusively for Climatise.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                placeholder="Enter password to continue"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Access Pitch Deck
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Your data is protected. Contact{' '}
            <a href="mailto:dan@gtm.quest" className="text-blue-400 hover:text-blue-300">
              dan@gtm.quest
            </a>{' '}
            for access.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-green-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/" className="text-blue-400 text-sm hover:text-blue-300 mb-4 inline-block">
              ← Back to GTM Quest
            </Link>

            <div className="flex items-center justify-center gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/GTM Logo New.png"
                  alt="GTM Quest"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/40 text-2xl"
              >
                ×
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/climistise logo.png"
                  alt="Climatise"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            >
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Go-To-Market Engineering
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
            >
              Your end-to-end emissions solution deserves an end-to-end GTM system.
              <br />
              <span className="text-green-400 font-semibold">37 defined ICPs</span> across UK carbon accounting.
              <span className="text-blue-400 font-semibold"> 15,200 Tier 1 targets.</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://cal.com/mike-hanley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Book Strategy Call
              </a>
              <button
                onClick={() => setShowGammaEmbed(!showGammaEmbed)}
                className="text-white hover:text-blue-400 px-8 py-4 rounded-xl font-medium transition border border-white/20 hover:border-blue-500/50"
              >
                {showGammaEmbed ? 'Hide' : 'View'} Presentation
              </button>
              <a
                href="https://gamma.app/docs/Climatise-GTM-Pilot-j6g4b0py5xapwxz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white px-6 py-4 rounded-xl font-medium transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in Gamma
              </a>
              <a
                href="/Climitise ICP.pdf"
                download
                className="text-white/70 hover:text-green-400 px-6 py-4 rounded-xl font-medium transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download ICP Analysis
              </a>
            </motion.div>
          </motion.div>

          {/* Key Stats with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-white">
                <CountUp end={37} duration={2} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-white/60 text-sm">ICPs Defined</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-white">
                <CountUp end={15200} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-white/60 text-sm">Tier 1 Targets</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-white">
                <CountUp end={5} duration={1.5} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-white/60 text-sm">Signal Sources</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-white flex items-center justify-center gap-2">
                <span>🏺</span> Clay
              </div>
              <div className="text-white/60 text-sm">Powered</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gamma Embed (collapsible) */}
      {showGammaEmbed && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="py-8 bg-zinc-950"
        >
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10">
              <iframe
                src="https://gamma.app/embed/j6g4b0py5xapwxz"
                style={{ width: '100%', height: '550px' }}
                allow="fullscreen"
                title="Climatise GTM Pilot"
                className="rounded-xl"
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* The Challenge - ICP Categories */}
      <section className="py-20 bg-black">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              37 ICPs, Complex Signals, Manual Chaos
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Without automation, you are leaving pipeline on the table.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {icpCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5 text-center hover:border-green-500/30 transition group"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-black text-green-400 mb-2"
                >
                  {cat.count}
                </motion.div>
                <div className="text-white font-semibold text-sm mb-2">{cat.name}</div>
                <div className="text-white/50 text-xs">{cat.examples}</div>
              </motion.div>
            ))}
          </div>

          {/* Combined TAM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl font-black text-white mb-2">15,200</div>
            <div className="text-white/70">Tier 1 Targets: High-Intent Companies with Hard Deadlines</div>
            <div className="text-white/50 text-sm mt-2">
              Sources: Companies House, Find a Tender, NHS SBS Framework
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tier 1 Priority ICPs */}
      <section className="py-20 bg-zinc-950">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-xl mb-1">{icp.name}</h3>
                    <p className="text-white/60">{icp.trigger}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{icp.count}</div>
                      <div className="text-white/50 text-xs">Companies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-blue-400">{icp.deadline}</div>
                      <div className="text-white/50 text-xs">Deadline</div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        icp.urgency === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {icp.urgency}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Citations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 bg-zinc-900/30 border border-white/5 rounded-lg p-4"
          >
            <p className="text-white/40 text-xs">
              <span className="font-semibold">Data Sources:</span> Government Contract Bidders estimated from{' '}
              <a href="https://www.gov.uk/contracts-finder" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                Contracts Finder
              </a>{' '}
              & PPN 006 requirements. NHS Suppliers from{' '}
              <a href="https://www.sbs.nhs.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                NHS SBS Framework
              </a>
              . SECR figures from{' '}
              <a href="https://www.gov.uk/government/publications/companies-house-official-statistics" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                Companies House
              </a>{' '}
              year-end data. National Highways from{' '}
              <a href="https://nationalhighways.co.uk/suppliers/" target="_blank" rel="noopener noreferrer" className="text-blue-400/70 hover:text-blue-400">
                PAS 2080 supplier requirements
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* GTM Stack - Clay-Centric */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              The Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Clay-Powered GTM Infrastructure
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Everything runs through Clay - your single source of truth for enrichment, qualification, and orchestration.
            </p>
          </motion.div>

          {/* Clay Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-green-500/20 border-2 border-blue-500/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Image
                  src="/Clay image 2.jpg"
                  alt="Clay"
                  width={60}
                  height={60}
                  className="rounded-xl opacity-80"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">🏺</div>
                <div>
                  <h3 className="text-3xl font-black text-white">{gtmStack.clay.name}</h3>
                  <p className="text-blue-400 font-semibold">{gtmStack.clay.tagline}</p>
                </div>
              </div>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">{gtmStack.clay.description}</p>
              <div className="grid md:grid-cols-5 gap-3">
                {gtmStack.clay.capabilities.map((cap, i) => (
                  <div key={i} className="bg-white/5 rounded-lg px-4 py-3 text-center">
                    <span className="text-white/80 text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Execution Layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-green-500/30 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Campaign Execution</h3>
              <div className="space-y-3">
                {gtmStack.execution.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex items-center gap-3 ${tool.primary ? 'bg-green-500/10 -mx-2 px-2 py-2 rounded-lg' : ''}`}
                  >
                    {tool.primary && <span className="text-green-400">★</span>}
                    <div>
                      <div className={`font-semibold ${tool.primary ? 'text-green-400' : 'text-white'}`}>
                        {tool.name}
                      </div>
                      <div className="text-white/50 text-sm">{tool.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Optional Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Optional Add-ons</h3>
                  <p className="text-white/50 text-sm">For high-volume campaigns</p>
                </div>
              </div>
              <div className="space-y-3">
                {gtmStack.optional.map((tool) => (
                  <div key={tool.name} className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white/80">{tool.name}</div>
                      <div className="text-white/40 text-sm">{tool.description}</div>
                    </div>
                    {tool.note && (
                      <span className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded whitespace-nowrap">
                        {tool.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Simplified Architecture Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-zinc-900/50 border border-white/10 rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <div className="bg-blue-500/20 rounded-xl p-4 flex-1">
                <div className="text-blue-400 font-bold">Signal Sources</div>
                <div className="text-white/50 text-sm mt-1">bidstats.uk, Find a Tender, Companies House</div>
              </div>
              <div className="text-white/30 text-2xl">→</div>
              <div className="bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-xl p-4 flex-1 border border-blue-500/30">
                <div className="text-white font-bold flex items-center justify-center gap-2">
                  <span className="text-xl">🏺</span> Clay
                </div>
                <div className="text-white/50 text-sm mt-1">Enrich → Qualify → Orchestrate</div>
              </div>
              <div className="text-white/30 text-2xl">→</div>
              <div className="bg-green-500/20 rounded-xl p-4 flex-1">
                <div className="text-green-400 font-bold">Campaign Execution</div>
                <div className="text-white/50 text-sm mt-1">LGM, Instantly, HubSpot</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signal-Triggered Outbound */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Signal-Triggered Outbound
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Right Message, Right Time
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {signalTypes.map((signal, index) => (
              <motion.div
                key={signal.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition"
              >
                <div className="text-4xl mb-4">{signal.icon}</div>
                <h3 className="text-lg font-bold text-white mb-4">{signal.name}</h3>
                <ul className="space-y-2 mb-4">
                  {signal.triggers.map((trigger, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {trigger}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="text-green-400 text-sm italic">{signal.message}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalisation at Scale */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              The Human Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Personalisation at Scale
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              No automation at the point of execution for high-value prospects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-blue-500/30 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-6">Tier 1 Prospects</h3>
              <ul className="space-y-4">
                {[
                  'LinkedIn acceptance triggers human review, not auto-message',
                  'Full profile enriched: academic background, career path, personality signals',
                  'SDR receives context card: pain points, company signals, personal hooks',
                  'Voice notes from real humans, not AI clones',
                  'Colleague tracking for multi-threading into accounts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="text-blue-400 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-500/10 rounded-lg p-4 text-center">
                <span className="text-blue-400 font-bold">100% Human-Checked</span>
                <span className="text-white/60"> before first real message</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white/60 mb-6">Tertiary Markets</h3>
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <div className="text-white/60">Fully automated sequences acceptable</div>
                  <div className="text-white/40 text-sm mt-2">Lower-value, higher-volume approach</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Timeline */}
      <section className="py-20 bg-zinc-950">
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
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full" />

            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-start gap-6 mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Phase indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/25"
                  >
                    {phase.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition ${
                    index % 2 === 0 ? 'md:mr-auto md:max-w-lg' : 'md:ml-auto md:max-w-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        Phase {phase.phase}
                      </span>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
                      {phase.weeks}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-2 text-white/70"
                      >
                        <span className="text-green-400 mt-1">✓</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Investment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Flexible 2 Days Per Week Engagement
            </h2>
            <p className="text-white/70">
              Weekly rolling break clause. 100% flexibility.
            </p>
          </motion.div>

          <div className="space-y-4">
            {investmentOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                  option.highlight
                    ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 border-2 border-blue-500/40 hover:border-blue-500/60'
                    : 'bg-zinc-900 border border-white/10 hover:border-green-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className={`font-bold text-lg ${option.highlight ? 'text-blue-400' : 'text-white'}`}>{option.type}</h3>
                    {option.highlight && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-bold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-white/60">{option.description}</p>
                </div>
                <div className={`text-2xl font-black whitespace-nowrap ${option.highlight ? 'text-blue-400' : 'text-green-400'}`}>
                  {option.rate}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 bg-zinc-900/50 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎓</span>
              <h4 className="font-bold text-white">Training Available</h4>
            </div>
            <p className="text-white/60 text-sm">
              Want to bring Clay in-house? We offer comprehensive training so your team can build and manage
              campaigns independently. Learn waterfall enrichment, signal monitoring, and campaign orchestration.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/50 mt-6 text-sm"
          >
            Optional: Business development involvement - can support with direct outreach and relationship building.
          </motion.p>
        </div>
      </section>

      {/* Why GTM Quest */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Why GTM Quest
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyGtmQuest.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition text-center"
              >
                <h3 className="font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-white/60 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
              Next Steps
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8">
              Let&apos;s Build Your GTM System
            </h2>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-4 gap-4 text-left">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-blue-400 font-bold mb-1">This Week</div>
                  <div className="text-white/70 text-sm">Confirm engagement scope and start date</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-blue-400 font-bold mb-1">Week 1</div>
                  <div className="text-white/70 text-sm">Workshop - finalise Tier 1 ICP prioritisation</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-blue-400 font-bold mb-1">Week 2-3</div>
                  <div className="text-white/70 text-sm">Build foundation infrastructure</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-green-400 font-bold mb-1">Week 4+</div>
                  <div className="text-white/70 text-sm">Launch campaigns, iterate on data</div>
                </div>
              </div>
            </div>

            <p className="text-xl text-white/70 mb-8">
              Let&apos;s build a GTM system as sophisticated as your emissions platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://cal.com/mike-hanley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Book Strategy Call
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
