'use client';

import dynamic from 'next/dynamic';

// Dynamic import for SSR compatibility
const MuxPlayer = dynamic(
  () => import('@mux/mux-player-react').then((mod) => mod.default),
  { ssr: false }
);

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center">
      {/* Mux Video Background */}
      <div className="absolute inset-0 z-0">
        <MuxPlayer
          playbackId="qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"
          autoPlay="muted"
          loop
          muted
          preload="auto"
          streamType="on-demand"
          poster={`https://image.mux.com/qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y/thumbnail.webp?time=0`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            '--controls': 'none',
            '--media-object-fit': 'cover',
            '--media-object-position': 'center',
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24 md:py-32">
        {/* Hidden SEO H2 - accessible to screen readers and search engines */}
        <h2 className="sr-only">GTM Agency Matching</h2>

        {/* Top CTA - Book a Call */}
        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm mb-8 animate-pulse-glow transition-all hover:scale-105"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          Book a Strategy Call
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">UK GTM Agency</span>
        </div>

        {/* Agency-First H1 (36 chars for SEO) */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="block text-white">GTM Agency</span>
          <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Building Revenue Engines</span>
        </h1>

        {/* Quest System Subheadline */}
        <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10">
          We run the Quest System: 4-channel ABM that compounds.
          Signal-triggered outreach, UK/GDPR compliant, built for results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-500/25"
          >
            Book a Strategy Call
          </a>
          <a
            href="#quest-system"
            className="text-white hover:text-green-400 px-8 py-4 rounded-xl font-medium transition border border-white/20 hover:border-green-500/50"
          >
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">200+</span>
            <span>GTM Agencies</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">45+</span>
            <span>Strategy Guides</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">Free</span>
            <span>AI Matching</span>
          </div>
        </div>
      </div>
    </section>
  );
}
