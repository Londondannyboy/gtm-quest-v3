'use client';

import Link from 'next/link';

export function HeroSection({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm text-emerald-400">AI-Powered GTM Strategy</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Find Your Perfect
          <span className="block text-emerald-400">GTM Agency Partner</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
          Build your go-to-market strategy with AI. Get matched with top agencies
          specializing in demand generation, ABM, and B2B growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-emerald-500/25"
          >
            Build Your GTM Plan
          </button>
          <Link
            href="/agencies"
            className="text-white/70 hover:text-white px-8 py-4 rounded-xl font-medium transition border border-white/10 hover:border-white/20"
          >
            Browse 200+ Agencies
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/50">
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
