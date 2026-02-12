'use client';

import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: 'AI Strategy Builder',
    description: 'Get a personalized GTM roadmap with AI-powered recommendations',
    image: '/gtm-agency-matching.svg',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    title: 'Market Analysis',
    description: 'TAM/SAM/SOM calculations and competitive landscape mapping',
    image: '/gtm-agency-matching.svg',
    gradient: 'from-purple-500/20 to-purple-500/5',
  },
  {
    title: 'Agency Matching',
    description: 'AI-powered matching with 200+ vetted GTM agencies worldwide',
    image: '/gtm-agency-matching.svg',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
];

const dashboardStats = [
  { label: 'Market Size', value: '$4.2B', trend: '+12%' },
  { label: 'Target Accounts', value: '2,500', trend: '+8%' },
  { label: 'Pipeline Value', value: '$1.8M', trend: '+24%' },
  { label: 'Win Rate', value: '32%', trend: '+5%' },
];

export function DashboardShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span
            className="text-blue-400 text-sm font-bold uppercase tracking-wider "
          >
            Powerful Dashboard
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white "
            style={{ animationDelay: '100ms' }}
          >
            Everything You Need in One Place
          </h2>
          <p
            className="text-white/80 max-w-2xl mx-auto "
            style={{ animationDelay: '200ms' }}
          >
            Our AI-powered dashboard gives you market insights, strategy recommendations,
            and agency matches — all in real-time
          </p>
        </div>

        {/* Dashboard Preview */}
        <div
          className="relative "
          style={{ animationDelay: '300ms' }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl opacity-30" />

          {/* Dashboard mockup */}
          <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-white/60 text-sm">GTM Quest Dashboard</div>
              <div className="text-blue-400 text-sm font-medium">Live Preview</div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {dashboardStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-xl p-4 border border-white/5 hover:scale-105 transition-all duration-300 "
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-white/70 text-xs mb-1">{stat.label}</div>
                  <div className="flex items-end gap-2">
                    <span className="text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-blue-400 text-xs font-medium">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`bg-gradient-to-br ${feature.gradient} rounded-xl p-5 border border-white/10 hover:scale-105 transition-all duration-300 `}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="aspect-video bg-black/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      title={`GTM Agency - ${feature.title}`}
                      width={300}
                      height={169}
                      className="w-full h-full object-contain p-4 opacity-70"
                    />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12 "
          style={{ animationDelay: '900ms' }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-105"
          >
            Try the Dashboard
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
