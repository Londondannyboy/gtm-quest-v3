'use client';

const tools = [
  {
    name: 'Clay',
    description: 'Data enrichment & outbound automation',
    badge: 'Specialist',
    featured: true,
  },
  {
    name: 'HubSpot',
    description: 'CRM & marketing automation',
    badge: null,
    featured: false,
  },
  {
    name: 'Salesforce',
    description: 'Enterprise CRM & sales cloud',
    badge: null,
    featured: false,
  },
  {
    name: 'Smartlead',
    description: 'Email outreach at scale',
    badge: null,
    featured: false,
  },
  {
    name: 'Apollo',
    description: 'Sales intelligence & engagement',
    badge: null,
    featured: false,
  },
  {
    name: 'Outreach',
    description: 'Sales execution platform',
    badge: null,
    featured: false,
  },
];

export function TechStack() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span
            className="text-blue-400 text-sm font-bold uppercase tracking-wider animate-fadeIn"
          >
            Tech Expertise
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white animate-fadeIn"
            style={{ animationDelay: '100ms' }}
          >
            GTM Tools We Know Inside Out
          </h2>
          <p
            className="text-white/70 max-w-2xl mx-auto animate-fadeIn"
            style={{ animationDelay: '200ms' }}
          >
            Our agencies are experts in the leading go-to-market tools and platforms
          </p>
        </div>

        {/* Featured Tool - Clay */}
        <div
          className="mb-8 animate-fadeIn"
          style={{ animationDelay: '300ms' }}
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/30 rounded-2xl p-6 md:p-8 hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center text-3xl">
                🏺
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">Clay</h3>
                  <span className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    Specialist
                  </span>
                </div>
                <p className="text-white/70">
                  We specialize in Clay for data enrichment, waterfall enrichment sequences,
                  and building automated outbound workflows that deliver qualified leads at scale.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://clay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                >
                  Learn about Clay
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tools
            .filter((tool) => !tool.featured)
            .map((tool, index) => (
              <div
                key={tool.name}
                className="bg-zinc-900 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 text-center animate-fadeIn"
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                <p className="text-white/50 text-xs">{tool.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
