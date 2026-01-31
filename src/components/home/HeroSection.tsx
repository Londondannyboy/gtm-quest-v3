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

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
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
      {/* MUX Video Background - Optimized for performance */}
      <div className="absolute inset-0 z-0">
        <MuxPlayer
          playbackId="qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"
          autoPlay="muted"
          loop
          muted
          preload="metadata"
          streamType="on-demand"
          maxResolution="720p"
          minResolution="480p"
          poster={`https://image.mux.com/qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y/thumbnail.webp?time=0&width=1280`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            '--controls': 'none',
            '--media-object-fit': 'cover',
            '--media-object-position': 'center',
          }}
        />
        {/* More translucent overlay - increased opacity */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/90" />
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Content with staggered animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24 md:py-32"
      >
        {/* Hidden SEO H2 */}
        <h2 className="sr-only">GTM Agency Matching</h2>

        {/* Top CTA - Book a Call (animated) */}
        <motion.a
          variants={scaleVariants}
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm mb-8 transition-all shadow-lg shadow-green-500/30"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          Book a Strategy Call
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>

        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-400 font-medium">UK GTM Agency</span>
        </motion.div>

        {/* Agency-First H1 (36 chars for SEO) - Animated text */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="block text-white"
          >
            GTM Agency
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
          >
            Building Revenue Engines
          </motion.span>
        </motion.h1>

        {/* Quest System Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
        >
          We run the Quest System: 4-channel ABM that compounds.
          <br className="hidden md:block" />
          Signal-triggered outreach, UK/GDPR compliant, built for results.
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
            { value: '90 days', label: 'To Pipeline' },
            { value: 'No', label: 'Commitment' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              custom={index}
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
