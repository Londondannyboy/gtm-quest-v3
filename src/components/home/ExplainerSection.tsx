import Link from 'next/link';
import Image from 'next/image';

export function ExplainerSection() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-950 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
              <Image
                src="/gtm-agency-matching.svg"
                alt="GTM agency matching dashboard showing AI-powered go-to-market strategy builder with agency recommendations"
                width={600}
                height={400}
                className="w-full h-full object-contain p-8"
                priority
              />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
              <div className="text-2xl font-bold text-emerald-400">200+</div>
              <div className="text-xs text-white/60">GTM Agencies</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              What is GTM Agency Matching?
            </h2>

            <p className="text-white/70 mb-4 leading-relaxed">
              Finding the right <strong className="text-white">GTM agency</strong> can make or break your go-to-market strategy.
              With hundreds of agencies claiming expertise in B2B growth, demand generation, and account-based marketing,
              how do you find the one that truly fits your needs?
            </p>

            <p className="text-white/70 mb-6 leading-relaxed">
              GTM Quest uses AI to analyze your company profile, growth stage, target market, and strategic priorities.
              Our matching algorithm then recommends <strong className="text-white">GTM agencies</strong> from our vetted database
              that have proven experience with companies like yours. No more endless research or mismatched partnerships.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-white">AI-Powered Analysis</strong>
                  <p className="text-white/60 text-sm">Our AI understands your GTM challenges and matches you with specialized agencies</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-white">Vetted Agency Network</strong>
                  <p className="text-white/60 text-sm">200+ agencies specializing in demand gen, ABM, sales enablement, and more</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="text-white">Completely Free</strong>
                  <p className="text-white/60 text-sm">No fees, no commissions &mdash; just better GTM agency partnerships</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Start Free Matching
              </Link>
              <Link
                href="/agencies"
                className="text-white/70 hover:text-white px-6 py-3 rounded-xl font-medium transition border border-white/10 hover:border-white/20"
              >
                Browse All Agencies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
