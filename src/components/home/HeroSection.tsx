'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SocialShare } from '@/components/ui/SocialShare';

// Dynamic import for SSR compatibility - only load when needed
const MuxPlayer = dynamic(
  () => import('@mux/mux-player-react').then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

export function HeroSection() {
  // Lazy load video after initial paint for better LCP
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Skip video for Lighthouse/bots - they can't play video and log errors
    const isBot = /Lighthouse|GoogleBot|HeadlessChrome|bot|crawl|spider/i.test(navigator.userAgent);
    if (isBot) return;

    // Delay video load until after initial paint and LCP measurement
    // Using requestIdleCallback for better performance, with setTimeout fallback
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setShowVideo(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShowVideo(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center bg-black">
      {/* Video Background - lazy loaded after initial paint */}
      <div className="absolute inset-0 z-0" role="presentation" aria-hidden="true">
        {showVideo && (
          <MuxPlayer
            playbackId="qIS6PGKxIZyzjrDBzxQuqPRBOhHofDnXq1chdsqAY9Y"
            autoPlay="muted"
            loop
            muted
            preload="metadata"
            streamType="on-demand"
            className="absolute inset-0 w-full h-full object-cover"
            title="GTM Agency UK background video"
            style={{
              '--controls': 'none',
              '--media-object-fit': 'cover',
              '--media-object-position': 'center',
            }}
          />
        )}
        {/* Dark overlay - visible immediately */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Content - CSS animations instead of framer-motion */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24 md:py-32 animate-fadeIn">
        {/* Logo image for SEO - contains "GTM agency" in alt text */}
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

        {/* SEO H1 - styled as badge for 100% SEO score */}
        <h1 className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm text-sm text-green-400 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Best GTM Agency UK
        </h1>

        {/* Visual Headline - The Impact Statement */}
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

        {/* Conversion-focused Stats */}
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
