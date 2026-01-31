'use client';

import { motion } from 'framer-motion';
import { TimelinePhase } from '@/types/pitch';

interface TimelineProps {
  title?: string;
  subtitle?: string;
  description?: string;
  phases: TimelinePhase[];
  gradientColors?: { from: string; via: string; to: string };
}

/**
 * Timeline component showing phased delivery plan.
 */
export function Timeline({
  title = 'The Build',
  subtitle,
  description = 'RevOps-first architecture - built for handover, not dependency',
  phases,
  gradientColors = { from: 'blue-500', via: 'green-500', to: 'purple-500' },
}: TimelineProps) {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
            {title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            {subtitle || `What Gets Built: ${phases.length}-Phase Timeline`}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className={`absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-${gradientColors.from} via-${gradientColors.via} to-${gradientColors.to} rounded-full`}
          />

          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-start gap-6 mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Phase indicator */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/25"
                >
                  {phase.icon}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex-1 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition ${
                  index % 2 === 0
                    ? 'md:mr-auto md:max-w-lg'
                    : 'md:ml-auto md:max-w-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                      Phase {phase.phase}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {phase.title}
                    </h3>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
                    {phase.weeks}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-2 text-white/70"
                    >
                      <span className="text-green-400 mt-1">&check;</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
