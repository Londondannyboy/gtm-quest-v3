'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface OpportunityItem {
  text: string;
  highlight?: string;
  color: 'blue' | 'green' | 'amber' | 'red' | 'purple';
}

interface AskItem {
  text: string;
  highlight?: string;
}

interface RiskMitigation {
  label: string;
  description: string;
}

interface HeroSectionProps {
  clientName: string;
  clientLogo: string;
  contactName: string;
  contactTitle: string;
  gtmLogo?: string;
  opportunities: OpportunityItem[];
  asks: AskItem[];
  riskMitigations?: RiskMitigation[];
  ctaLink: string;
  ctaText?: string;
  gradientColors?: { from: string; to: string };
}

const colorClasses = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  purple: 'text-purple-400',
};

/**
 * Hero section for pitch pages showing opportunity, ask, and primary CTA.
 */
export function HeroSection({
  clientName,
  clientLogo,
  contactName,
  contactTitle,
  gtmLogo = '/gtm-agency-quest-logo.png',
  opportunities,
  asks,
  riskMitigations,
  ctaLink,
  ctaText = 'Discuss Proposal',
  gradientColors = { from: 'blue-500', to: 'green-500' },
}: HeroSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-zinc-950 to-black border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src={gtmLogo}
              alt="GTM Agency Quest"
              width={80}
              height={28}
              className="h-6 w-auto"
            />
            <span className="text-white/30">&times;</span>
            <Image
              src={clientLogo}
              alt={clientName}
              width={90}
              height={28}
              className="h-6 w-auto bg-white/10 rounded px-2 py-1"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
            GTM Proposal
          </h1>
          <p className="text-white/50 text-sm">
            Prepared for {contactName}, {contactTitle}
          </p>
        </motion.div>

        {/* Two Column: Opportunity + Ask */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* The Opportunity */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h2 className="text-blue-400 text-xs uppercase tracking-wider mb-4">
              The Opportunity
            </h2>
            <ul className="space-y-3">
              {opportunities.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`${colorClasses[item.color]} text-lg`}>
                    &bull;
                  </span>
                  <span className="text-white/80">
                    {item.highlight && (
                      <span className={`${colorClasses[item.color]} font-bold`}>
                        {item.highlight}
                      </span>
                    )}{' '}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Ask */}
          <div className="bg-zinc-900 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-green-400 text-xs uppercase tracking-wider mb-4">
              The Ask
            </h2>
            <ul className="space-y-3">
              {asks.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-400">&check;</span>
                  <span className="text-white/80">
                    {item.highlight && (
                      <span className="font-semibold text-white">
                        {item.highlight}
                      </span>
                    )}{' '}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Risks & Mitigations */}
        {riskMitigations && riskMitigations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 mb-8"
          >
            <h2 className="text-white/50 text-xs uppercase tracking-wider mb-4">
              Risks & Mitigations
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {riskMitigations.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-400">&check;</span>
                  <span className="text-white/70">
                    <span className="text-white">{item.label}:</span>{' '}
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-${gradientColors.from} to-${gradientColors.to} hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition`}
          >
            {ctaText}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <p className="text-white/40 text-sm mt-4">
            Scroll down for the full proposal &darr;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
