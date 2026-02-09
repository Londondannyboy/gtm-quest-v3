'use client';

import Image from 'next/image';
import { SocialShare } from '@/components/ui/SocialShare';

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

// Static hero background (WebP for optimal performance)
const HERO_BG_IMAGE = '/hero-bg.webp';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center bg-black">
      {/* Background: CSS gradient for mobile (fast), image for desktop */}
      <div className="absolute inset-0 z-0" role="presentation" aria-hidden="true">
        {/* Mobile: Pure CSS gradient background (no image download) */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />

        {/* Desktop only: Load actual image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={HERO_BG_IMAGE}
            alt=""
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
        </div>

        {/* Dark overlay for both */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24 md:py-32 animate-fadeIn">
        {/* Logo image for SEO */}
        <div className="mb-4">
          <Image
            src="/gtm-agency-quest-logo.png"
            alt="GTM Agency UK - Go-To-Market Strategy & Execution Consultants"
            width={80}
            height={80}
            className="mx-auto rounded-xl"
            priority
          />
        </div>

        {/* SEO H1 - styled as badge */}
        <h1 className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm text-sm text-green-400 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Best GTM Agency UK
        </h1>

        {/* Visual Headline */}
        <div className="mb-6">
          <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            The Quest
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
            GTM System
          </span>
        </div>

        {/* Value Proposition */}
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4">
          A supercharged GTM consultant — without the big agency cost.
        </p>

        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Clay-based outbound system. Signal-triggered campaigns.
          <br className="hidden md:block" />
          UK/GDPR compliant. Full handover included.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg shadow-green-500/25 hover:scale-[1.02] hover:-translate-y-0.5"
          >
            Book a Strategy Call
          </a>
          <a
            href="#quest-system"
            className="text-white hover:text-green-400 px-8 py-4 rounded-xl font-medium transition-all duration-200 border border-white/20 hover:border-green-500/50 hover:scale-[1.02]"
          >
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12">
          {[
            { value: '30 min', label: 'Discovery Call' },
            { value: '4 weeks', label: 'To Launch' },
            { value: 'Full', label: 'Handover' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Social Sharing */}
        <div className="mt-8 flex justify-center">
          <SocialShare
            url="https://gtm.quest"
            title="GTM Agency Quest | Best GTM Agency UK"
            description="UK GTM agency building revenue engines with 4-channel ABM and Clay-based outbound systems."
          />
        </div>
      </div>
    </section>
  );
}
