import Link from 'next/link';

export function TLDRSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">TL;DR</span>
            <span className="text-white/40 text-sm">Quick Summary</span>
          </div>

          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            <strong className="text-white">GTM Agency Quest</strong> is a free AI-powered platform that matches B2B companies
            with specialized <strong className="text-emerald-400">go-to-market agencies</strong>. We help you find the right
            partner for demand generation, ABM, sales enablement, and revenue growth from our database of 200+ vetted agencies.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400 mb-1">200+</div>
              <div className="text-white/60 text-sm">Vetted GTM Agencies</div>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400 mb-1">Free</div>
              <div className="text-white/60 text-sm">No Fees or Commissions</div>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400 mb-1">AI</div>
              <div className="text-white/60 text-sm">Powered Matching</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold transition text-sm"
            >
              Start Free Matching
            </Link>
            <Link
              href="/agencies"
              className="text-white/70 hover:text-white px-5 py-2.5 rounded-lg font-medium transition border border-white/10 hover:border-white/20 text-sm"
            >
              Browse Agencies
            </Link>
            <Link
              href="#top-agencies-2026"
              className="text-emerald-400 hover:text-emerald-300 px-5 py-2.5 rounded-lg font-medium transition text-sm"
            >
              Top 10 Agencies 2026 &darr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
