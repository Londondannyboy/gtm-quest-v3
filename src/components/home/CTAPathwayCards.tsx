'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

const pathways = [
  {
    id: 'work-with-us',
    title: 'Work With Us',
    description: 'Get hands-on GTM execution from our team. We implement the Quest System for you.',
    icon: '🚀',
    href: BOOKING_LINK,
    isExternal: true,
    color: 'green',
    badge: 'Recommended',
    cta: 'Book a Call',
  },
  {
    id: 'build-your-own',
    title: 'Build Your Own',
    description: 'Use our AI-powered strategy builder to visualize and plan your go-to-market motion.',
    icon: '🛠️',
    href: '/dashboard',
    isExternal: false,
    color: 'blue',
    badge: 'Free',
    cta: 'Start Building',
  },
];

const colorClasses: Record<string, { border: string; shadow: string; iconBg: string; iconText: string; ctaBg: string }> = {
  green: {
    border: 'hover:border-green-500/50 border-green-500/30',
    shadow: 'hover:shadow-green-500/10',
    iconBg: 'bg-green-500/20',
    iconText: 'text-green-400',
    ctaBg: 'bg-green-500 hover:bg-green-600',
  },
  blue: {
    border: 'hover:border-blue-500/50',
    shadow: 'hover:shadow-blue-500/10',
    iconBg: 'bg-blue-500/20',
    iconText: 'text-blue-400',
    ctaBg: 'bg-blue-500 hover:bg-blue-600',
  },
};

export function CTAPathwayCards() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Two Ways to Accelerate Your GTM
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Work with our team or build your strategy independently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pathways.map((pathway, index) => {
            const colors = colorClasses[pathway.color];
            const Component = pathway.isExternal ? 'a' : Link;
            const linkProps = pathway.isExternal
              ? { href: pathway.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: pathway.href };

            return (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Component
                  {...linkProps}
                  className={`block bg-zinc-900 rounded-2xl p-6 border border-white/10
                    transition-all duration-300 hover:shadow-xl group h-full
                    ${colors.border} ${colors.shadow}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                          ${colors.iconBg} ${colors.iconText}`}
                      >
                        {pathway.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition">
                            {pathway.title}
                          </h3>
                          {pathway.badge && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium
                                ${
                                  pathway.badge === 'Recommended'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-blue-500/20 text-blue-400'
                                }`}
                            >
                              {pathway.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 text-sm">{pathway.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <span
                        className={`inline-flex items-center gap-2 ${colors.ctaBg} text-white px-4 py-2 rounded-lg font-semibold text-sm transition`}
                      >
                        {pathway.cta}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Component>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
