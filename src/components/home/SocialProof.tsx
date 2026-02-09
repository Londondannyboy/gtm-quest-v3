'use client';

import CountUp from 'react-countup';

const stats = [
  { value: 200, suffix: '+', label: 'GTM Agencies', icon: '🏢' },
  { value: 500, suffix: '+', label: 'Companies Matched', icon: '🤝' },
  { value: 45, suffix: '+', label: 'Strategy Guides', icon: '📚' },
  { value: 95, suffix: '%', label: 'Match Satisfaction', icon: '⭐' },
];

const trustBadges = [
  { text: 'Free Forever', icon: '✓' },
  { text: 'No Sales Calls', icon: '✓' },
  { text: 'AI-Powered', icon: '✓' },
  { text: 'Vetted Agencies Only', icon: '✓' },
];

export function SocialProof() {
  return (
    <section className="py-12 bg-zinc-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className="text-white/70 text-sm flex items-center justify-center gap-2">
                <span>{stat.icon}</span>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
          {trustBadges.map((badge) => (
            <span key={badge.text} className="flex items-center gap-2">
              <span className="text-blue-400">{badge.icon}</span>
              {badge.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
