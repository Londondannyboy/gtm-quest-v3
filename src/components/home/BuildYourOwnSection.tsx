'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  { text: 'Visualize your GTM motion', icon: '📊' },
  { text: 'Chat with AI to refine strategy', icon: '💬' },
  { text: 'Export actionable plans', icon: '📄' },
];

export function BuildYourOwnSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-zinc-900/80 backdrop-blur border border-blue-500/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-blue-400 text-sm font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20"
              >
                DIY Option
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold mt-4 mb-4 text-white"
              >
                Not ready for an agency? Build your own GTM strategy.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 max-w-xl mx-auto"
              >
                Our AI-powered strategy builder helps you visualize and plan your go-to-market motion
                with stunning graphics and actionable insights.
              </motion.p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700 px-4 py-2 rounded-full"
                >
                  <span>{feature.icon}</span>
                  <span className="text-zinc-300 text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/25"
              >
                Start Building
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-zinc-500 text-sm mt-4">
                Free forever • No signup required • Beautiful visualizations
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
