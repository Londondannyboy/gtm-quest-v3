const BOOKING_LINK = 'https://calendly.com/my-first-quest';

const packages = [
  {
    name: 'Starter',
    tagline: 'Get your system running',
    description: 'Perfect for teams new to outbound. We build your Clay-based system, launch your first campaigns, and hand it over.',
    features: [
      'Clay-powered enrichment & sequencing',
      'LinkedIn + email outreach setup',
      'Signal-triggered targeting',
      'Monthly optimization call',
      'Full system handover',
    ],
    borderColor: 'border-green-500/30',
    glowColor: 'from-green-500/10 to-emerald-500/10',
    textColor: 'text-green-400',
    isPrimary: true,
  },
  {
    name: 'Growth',
    tagline: 'Scale with support',
    description: 'For teams ready to move faster. More capacity, tighter iteration cycles, and dedicated support as you scale.',
    features: [
      'Everything in Starter',
      'Expanded outreach capacity',
      'Priority signal processing',
      'Weekly strategy calls',
      'Dedicated account support',
    ],
    borderColor: 'border-orange-500/30',
    glowColor: 'from-orange-500/10 to-amber-500/10',
    textColor: 'text-orange-400',
    isPrimary: false,
  },
];

const comparisons = [
  { label: 'Traditional Agency', note: 'Long contracts, slow iteration, big overhead' },
  { label: 'Building In-House', note: 'Months of ramp-up, hiring headaches' },
  { label: 'Quest System', note: 'Live in weeks, you own everything, full handover', highlight: true },
];

function PackageCard({ pkg }: { pkg: typeof packages[0] }) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${pkg.glowColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className={`relative bg-zinc-900/80 backdrop-blur rounded-2xl border ${pkg.borderColor} overflow-hidden h-full`}>
        {/* Header */}
        <div className={`p-6 border-b ${pkg.borderColor}`}>
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-2xl font-bold ${pkg.textColor}`}>{pkg.name}</h3>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">
              Clay-based
            </span>
          </div>
          <p className="text-zinc-400 text-sm">{pkg.tagline}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-zinc-400 text-sm mb-6">{pkg.description}</p>

          <ul className="space-y-3">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                <svg className={`w-5 h-5 ${pkg.textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 block w-full text-center py-3 rounded-xl font-bold transition ${
              pkg.isPrimary
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
            }`}
          >
            Talk to Us
          </a>
        </div>
      </div>
    </div>
  );
}

export function ABMApproachSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            Consultant, Not Agency
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Supercharged GTM —{' '}
            <span className="bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
              Without the Overhead
            </span>
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            We build your Clay-based outbound system, train your team, and hand it over.
            You own the infrastructure. No long contracts. No bloated retainers.
          </p>
        </div>

        {/* Comparison */}
        <div className="mb-16">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Why Teams Choose Us</h3>
            <div className="space-y-3">
              {comparisons.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    item.highlight
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-zinc-800/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.highlight ? 'bg-green-500' : 'bg-zinc-600'
                  }`} />
                  <div>
                    <span className={`font-medium ${item.highlight ? 'text-green-400' : 'text-zinc-400'}`}>
                      {item.label}
                    </span>
                    <span className="text-zinc-500 text-sm block">{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-zinc-600 text-sm">
            Pricing discussed on call based on your needs.{' '}
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline"
            >
              Book a free strategy session
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
