'use client';

import { motion } from 'framer-motion';

interface RetainerOption {
  title: string;
  rate: string;
  daysPerWeek: string;
  recommended: string;
  description: string;
  includes?: string[];
}

interface OneOffOption {
  type: string;
  rate: string;
  description: string;
}

interface InvestmentOptionsProps {
  retainer: RetainerOption;
  oneOffOptions: OneOffOption[];
  trainingCallout?: {
    title: string;
    description: string;
    icon?: string;
  };
  fastTrack?: {
    title: string;
    description: string;
    when?: string;
    items: { name: string; description?: string; icon: string }[];
    note?: string;
  };
  footer?: string;
}

/**
 * Investment options section showing retainer and one-off pricing.
 */
export function InvestmentOptions({
  retainer,
  oneOffOptions,
  trainingCallout,
  fastTrack,
  footer,
}: InvestmentOptionsProps) {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-green-400 text-sm font-bold uppercase tracking-wider">
            Investment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Flexible Engagement Options
          </h2>
          <p className="text-white/70">
            Choose the model that works best for your needs.
          </p>
        </motion.div>

        {/* Retainer Option - Highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500/20 via-green-500/10 to-blue-500/20 border-2 border-green-500/40 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold border border-green-500/30">
                Recommended
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {retainer.title}
                </h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-white font-semibold">
                    {retainer.daysPerWeek}
                  </span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    {retainer.recommended}
                  </span>
                </div>
                <p className="text-white/70 mb-4">{retainer.description}</p>
                {retainer.includes && (
                  <div className="flex flex-wrap gap-3">
                    {retainer.includes.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/5 text-white/60 px-3 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-green-400">
                  {retainer.rate.replace('/day', '')}
                </div>
                <div className="text-white/50 text-sm">per day</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* One-Off Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
            One-Off Engagements
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {oneOffOptions.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition"
              >
                <h5 className="font-bold text-white mb-2">{option.type}</h5>
                <p className="text-white/50 text-sm mb-4">
                  {option.description}
                </p>
                <div className="text-xl font-black text-blue-400">
                  {option.rate}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Training Callout */}
        {trainingCallout && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{trainingCallout.icon || '🎓'}</span>
              <h4 className="font-bold text-white">{trainingCallout.title}</h4>
            </div>
            <p className="text-white/60 text-sm">
              {trainingCallout.description}
            </p>
          </motion.div>
        )}

        {/* Optional Fast Track */}
        {fastTrack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">🚀</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-purple-400">
                    {fastTrack.title}
                  </h4>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                    Optional Add-on
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  {fastTrack.description}
                </p>
                {fastTrack.when && (
                  <p className="text-amber-400/80 text-xs mb-4">
                    {fastTrack.when}
                  </p>
                )}
                <div className="grid md:grid-cols-4 gap-3 mb-4">
                  {fastTrack.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-black/30 rounded-lg p-3 text-center"
                    >
                      <div className="text-lg mb-1">{item.icon}</div>
                      <div className="text-white text-xs font-semibold">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                {fastTrack.note && (
                  <p className="text-white/40 text-xs italic">
                    {fastTrack.note}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {footer && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/50 mt-6 text-sm"
          >
            {footer}
          </motion.p>
        )}
      </div>
    </section>
  );
}
