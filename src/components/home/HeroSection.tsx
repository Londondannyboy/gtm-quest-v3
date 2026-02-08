'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamic import for SSR compatibility
const MuxPlayer = dynamic(
  () => import('@mux/mux-player-react').then((mod) => mod.default),
  { ssr: false }
);

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center">
      {/* MUX Video Background */}
      <div className="absolute inset-0 z-0" role="presentation" aria-hidden="true">
        <MuxPlayer
          playbackId="qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"
          autoPlay="muted"
          loop
          muted
          preload="auto"
          streamType="on-demand"
          poster={`https://image.mux.com/qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y/thumbnail.webp?time=0`}
          className="absolute inset-0 w-full h-full object-cover"
          title="GTM Agency UK background video"
          style={{
            '--controls': 'none',
            '--media-object-fit': 'cover',
            '--media-object-position': 'center',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Content with staggered animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24 md:py-32"
      >
        {/* SEO H1 - styled as badge for 100% SEO score */}
        <motion.h1
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm text-sm text-green-400 font-medium"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          GTM Agency UK
        </motion.h1>

        {/* Visual Headline - The Impact Statement */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            The Quest
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
            GTM System
          </span>
        </motion.div>

        {/* Value Proposition */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4"
        >
          A supercharged GTM consultant — without the big agency cost.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-white/60 max-w-2xl mx-auto mb-10"
        >
          Clay-based outbound system. Signal-triggered campaigns.
          <br className="hidden md:block" />
          UK/GDPR compliant. Full handover included.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-500/25"
          >
            Book a Strategy Call
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03, borderColor: 'rgba(34, 197, 94, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            href="#quest-system"
            className="text-white hover:text-green-400 px-8 py-4 rounded-xl font-medium transition border border-white/20"
          >
            See How It Works
          </motion.a>
        </motion.div>

        {/* Conversion-focused Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12"
        >
          {[
            { value: '30 min', label: 'Discovery Call' },
            { value: '4 weeks', label: 'To Launch' },
            { value: 'Full', label: 'Handover' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-white/60">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
