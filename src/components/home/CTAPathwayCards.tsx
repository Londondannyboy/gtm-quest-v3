'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const pathways = [
  {
    id: 'gtm-quest-direct',
    title: 'Work with GTM Quest',
    description: 'Get hands-on help with your go-to-market strategy and execution from our expert team.',
    icon: '🎯',
    href: '/contact',
    color: 'blue',
    badge: 'Recommended',
  },
  {
    id: 'find-agency',
    title: 'Find Your Perfect Agency',
    description: 'Let our AI match you with the ideal agency from 200+ vetted GTM specialists.',
    icon: '🔍',
    href: '/dashboard',
    color: 'cyan',
    badge: null,
  },
  {
    id: 'build-strategy',
    title: 'Build Your GTM Strategy',
    description: 'Use our AI-powered tools to create a comprehensive go-to-market plan.',
    icon: '🛠️',
    href: '/dashboard',
    color: 'purple',
    badge: 'Beta',
  },
  {
    id: 'browse-directory',
    title: 'Browse Agency Directory',
    description: 'Explore our complete directory of 200+ GTM agencies by specialization and region.',
    icon: '📚',
    href: '/agencies',
    color: 'indigo',
    badge: null,
  },
];

const colorClasses: Record<string, { border: string; shadow: string; iconBg: string; iconText: string }> = {
  blue: {
    border: 'hover:border-blue-500/50',
    shadow: 'hover:shadow-blue-500/10',
    iconBg: 'bg-blue-500/20',
    iconText: 'text-blue-400',
  },
  cyan: {
    border: 'hover:border-cyan-500/50',
    shadow: 'hover:shadow-cyan-500/10',
    iconBg: 'bg-cyan-500/20',
    iconText: 'text-cyan-400',
  },
  purple: {
    border: 'hover:border-purple-500/50',
    shadow: 'hover:shadow-purple-500/10',
    iconBg: 'bg-purple-500/20',
    iconText: 'text-purple-400',
  },
  indigo: {
    border: 'hover:border-indigo-500/50',
    shadow: 'hover:shadow-indigo-500/10',
    iconBg: 'bg-indigo-500/20',
    iconText: 'text-indigo-400',
  },
};

export function CTAPathwayCards() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Choose Your Path to GTM Success
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Whether you need hands-on help or want to explore on your own,
            we have the right solution for your go-to-market journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pathways.map((pathway, index) => {
            const colors = colorClasses[pathway.color];
            return (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={pathway.href}
                  className={`block bg-zinc-900 rounded-2xl p-6 border border-white/10
                    transition-all duration-300 hover:shadow-xl group
                    ${colors.border} ${colors.shadow}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                        ${colors.iconBg} ${colors.iconText}`}
                    >
                      {pathway.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition">
                          {pathway.title}
                        </h3>
                        {pathway.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium
                              ${
                                pathway.badge === 'Beta'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}
                          >
                            {pathway.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm">{pathway.description}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
