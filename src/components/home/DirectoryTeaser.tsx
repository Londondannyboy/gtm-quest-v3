import Link from 'next/link';

const categories = [
  { name: 'Specialization', examples: 'ABM, Demand Gen, RevOps' },
  { name: 'Region', examples: 'US, UK, EU, APAC' },
  { name: 'Tool Stack', examples: 'Clay, HubSpot, Salesforce' },
];

export function DirectoryTeaser() {
  return (
    <section className="py-16 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-8 text-center">
          <span className="text-zinc-400 text-sm font-bold uppercase tracking-wider">
            Agency Directory
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-4 mb-4 text-white">
            Looking for a different type of agency?
          </h2>
          <p className="text-zinc-400 mb-6">
            Browse 200+ vetted GTM agencies by:
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-zinc-800/50 border border-zinc-700 px-4 py-2 rounded-lg"
              >
                <span className="text-white font-medium text-sm">{category.name}</span>
                <span className="text-zinc-400 text-xs ml-2">{category.examples}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div>
            <Link
              href="/agencies"
              className="inline-flex items-center gap-2 text-white hover:text-orange-400 px-6 py-3 rounded-xl font-medium transition border border-zinc-700 hover:border-orange-500/50"
            >
              Browse Directory
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
