import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="font-bold text-white text-lg flex items-center gap-2 mb-4">
              <span className="text-emerald-400">GTM</span>
              <span>Quest</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              AI-powered go-to-market strategy builder. Find the right agencies and build your growth plan.
            </p>
          </div>

          {/* Resources */}
          <div>
            <p className="text-white font-semibold mb-4">Resources</p>
            <ul className="space-y-2">
              <li>
                <Link href="/articles?category=guide" className="text-white/60 hover:text-white text-sm transition">
                  GTM Guides
                </Link>
              </li>
              <li>
                <Link href="/articles?category=comparison" className="text-white/60 hover:text-white text-sm transition">
                  Tool Comparisons
                </Link>
              </li>
              <li>
                <Link href="/articles?category=directory" className="text-white/60 hover:text-white text-sm transition">
                  Agency Directories
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-white/60 hover:text-white text-sm transition">
                  All Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Agencies */}
          <div>
            <p className="text-white font-semibold mb-4">Top Agencies</p>
            <ul className="space-y-2">
              <li>
                <Link href="/agencies/specialization/demand-generation" className="text-white/60 hover:text-white text-sm transition">
                  Demand Generation
                </Link>
              </li>
              <li>
                <Link href="/agencies/specialization/abm" className="text-white/60 hover:text-white text-sm transition">
                  Account-Based Marketing
                </Link>
              </li>
              <li>
                <Link href="/agencies/specialization/sales-enablement" className="text-white/60 hover:text-white text-sm transition">
                  Sales Enablement
                </Link>
              </li>
              <li>
                <Link href="/agencies" className="text-white/60 hover:text-white text-sm transition">
                  Browse All Agencies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold mb-4">Get Started</p>
            <ul className="space-y-2">
              <li>
                <Link href="/#chat" className="text-white/60 hover:text-white text-sm transition">
                  Build Your GTM Plan
                </Link>
              </li>
              <li>
                <Link href="/agencies" className="text-white/60 hover:text-white text-sm transition">
                  Find an Agency
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} GTM Agency Quest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
