import Link from 'next/link';

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

export function CTAPathwayCards() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Two Ways to Accelerate Your GTM
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Work with our team or build your strategy independently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* PRIMARY: Work With Us - Takes 2 columns */}
          <div className="md:col-span-2">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent rounded-2xl p-8 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                    🚀
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-2xl text-white">
                        Work With Us
                      </h3>
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                        Recommended
                      </span>
                    </div>
                    <p className="text-white/70 text-lg">
                      Get hands-on GTM execution from our team. We implement the Quest System for you.
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    '4-channel ABM setup',
                    'UK/GDPR compliant',
                    'Signal-triggered outreach',
                    'Full handover included',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg transition">
                    Book a Strategy Call
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* SECONDARY: Build Your Own - Single column, subtle */}
          <div>
            <Link
              href="/dashboard"
              className="block h-full bg-zinc-900/50 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-zinc-900"
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl mb-4">
                  🛠️
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-white">
                    Build Your Own
                  </h3>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    Free
                  </span>
                </div>

                <p className="text-white/60 text-sm mb-6 flex-1">
                  Use our AI-powered strategy builder to visualize and plan your go-to-market motion.
                </p>

                <span className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition">
                  Start Building
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
