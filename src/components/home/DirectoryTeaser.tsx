'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Specialization', examples: 'ABM, Demand Gen, RevOps' },
  { name: 'Region', examples: 'US, UK, EU, APAC' },
  { name: 'Tool Stack', examples: 'Clay, HubSpot, Salesforce' },
];

export function DirectoryTeaser() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-8 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-sm font-bold uppercase tracking-wider"
          >
            Agency Directory
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold mt-4 mb-4 text-white"
          >
            Looking for a different type of agency?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 mb-6"
          >
            Browse 200+ vetted GTM agencies by:
          </motion.p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-zinc-800 px-4 py-2 rounded-lg"
              >
                <span className="text-white font-medium text-sm">{category.name}</span>
                <span className="text-white/40 text-xs ml-2">{category.examples}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/agencies"
              className="inline-flex items-center gap-2 text-white hover:text-blue-400 px-6 py-3 rounded-xl font-medium transition border border-white/20 hover:border-blue-500/50"
            >
              Browse Directory
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
