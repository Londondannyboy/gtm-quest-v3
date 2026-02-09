'use client';

import Image from 'next/image';

interface SocialProofProps {
  logo?: string;
  logoAlt?: string;
  tagline?: string;
  description?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  link?: string;
}

/**
 * Social proof section showing GTM Quest branding and credibility.
 */
export function SocialProof({
  logo = '/gtm-agency-quest-logo.png',
  logoAlt = 'GTM Agency Quest',
  tagline = 'Powered by GTM Quest',
  description = "We're building the #1 GTM agency matching platform with AI-powered strategy generation.",
  badge = 'Beta',
  stats = [
    { label: '200+ GTM Agencies', value: '' },
    { label: 'AI GTM Plan Builder', value: '' },
  ],
  link = 'https://gtm.quest',
}: SocialProofProps) {
  return (
    <section className="py-12 md:py-16 bg-zinc-950 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="text-center animate-fadeIn"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src={logo}
              alt={logoAlt}
              width={100}
              height={35}
              className="h-6 md:h-8 w-auto"
            />
            {badge && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-bold border border-blue-500/30">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white mb-3">
            {tagline}
          </h3>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-6">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors duration-200"
            >
              <span>gtm.quest</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            {stats.map((stat, i) => (
              <span key={i}>
                <span className="text-white/30">|</span>
                <span className="text-white/50 ml-4">{stat.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
