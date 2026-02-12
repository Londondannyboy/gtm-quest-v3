// Neon color scheme: Orange, Green, Blue (not light blue)
const channels = [
  {
    name: 'LinkedIn Ads',
    glowColor: 'green',
    borderColor: 'border-green-500/50',
    shadowColor: 'shadow-green-500/20',
    glowClass: 'hover:shadow-green-500/40 hover:border-green-400',
    headerGlow: 'bg-green-500/10 border-green-500/30',
    accentText: 'text-green-400',
    accentBg: 'bg-green-400',
    purpose: {
      items: ['Build recognition', 'Seed ideas early', 'Warm the audience'],
    },
    action: {
      title: 'Run',
      items: ['Document ads', 'Thought leader ads'],
    },
    tools: ['LinkedIn', 'Clay', 'Ahrefs'],
  },
  {
    name: 'Content',
    glowColor: 'orange',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-orange-500/20',
    glowClass: 'hover:shadow-orange-500/40 hover:border-orange-400',
    headerGlow: 'bg-orange-500/10 border-orange-500/30',
    accentText: 'text-orange-400',
    accentBg: 'bg-orange-400',
    purpose: {
      items: ['Build authority', 'Stay top-of-mind', 'Soften outreach'],
    },
    action: {
      title: 'Publish',
      items: ['Founder-led content', 'Frameworks', 'Insights'],
    },
    tools: ['SuperGrow', 'Claude', 'Canva'],
  },
  {
    name: 'Tracking',
    glowColor: 'blue',
    borderColor: 'border-blue-500/50',
    shadowColor: 'shadow-blue-500/20',
    glowClass: 'hover:shadow-blue-500/40 hover:border-blue-400',
    headerGlow: 'bg-blue-500/10 border-blue-500/30',
    accentText: 'text-blue-400',
    accentBg: 'bg-blue-400',
    purpose: {
      items: ['Identify leads', 'Outbound timing', 'Aligned message'],
    },
    action: {
      title: 'Track',
      items: ['Post engagement', 'Website visits', 'Tool clicks'],
    },
    tools: ['Apify', 'NeonDB', 'RapidAPI'],
  },
  {
    name: 'Outbound',
    glowColor: 'purple',
    borderColor: 'border-purple-500/50',
    shadowColor: 'shadow-purple-500/20',
    glowClass: 'hover:shadow-purple-500/40 hover:border-purple-400',
    headerGlow: 'bg-purple-500/10 border-purple-500/30',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-400',
    purpose: {
      items: ['Contextual outreach', 'Increase responses', 'Shorten sales cycle'],
    },
    action: {
      title: 'Reference',
      items: ['Ads they viewed', 'Engaged content', 'Page visits'],
    },
    tools: ['Instantly', 'Gemini', 'Sonnet'],
  },
];

// Timeline milestones
const timeline = [
  { month: 'Month 1', label: 'System live', progress: 30, colorClass: 'bg-gradient-to-r from-blue-500 to-blue-400' },
  { month: 'Month 2', label: 'Pipeline forming', progress: 60, colorClass: 'bg-gradient-to-r from-orange-500 to-orange-400' },
  { month: 'Month 3+', label: 'Full velocity', progress: 100, colorClass: 'bg-gradient-to-r from-green-500 to-green-400' },
];

function ChannelCard({ channel }: { channel: typeof channels[0] }) {
  return (
    <div className="relative group">
      {/* Glow effect behind card */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${
        channel.glowColor === 'green' ? 'from-green-500/20 to-emerald-500/20' :
        channel.glowColor === 'orange' ? 'from-orange-500/20 to-amber-500/20' :
        channel.glowColor === 'blue' ? 'from-blue-500/20 to-cyan-500/20' :
        'from-purple-500/20 to-pink-500/20'
      } rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Main card */}
      <div className={`relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl border ${channel.borderColor} ${channel.shadowColor} shadow-lg transition-all duration-300 ${channel.glowClass} overflow-hidden`}>

        {/* Header with glow */}
        <div className={`${channel.headerGlow} border-b ${channel.borderColor} px-5 py-4`}>
          <h3 className={`font-bold text-lg ${channel.accentText}`}>{channel.name}</h3>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Purpose */}
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Purpose</div>
            <ul className="space-y-1.5">
              {channel.purpose.items.map((item, i) => (
                <li key={i} className="text-zinc-300 text-sm flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full ${channel.accentBg}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Action */}
          <div>
            <div className={`text-xs uppercase tracking-wider ${channel.accentText} mb-2`}>{channel.action.title}</div>
            <ul className="space-y-1.5">
              {channel.action.items.map((item, i) => (
                <li key={i} className="text-zinc-400 text-sm flex items-center gap-2">
                  <span className="text-zinc-600">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="pt-2 border-t border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {channel.tools.map((tool, i) => (
                <span
                  key={i}
                  className={`text-xs px-2.5 py-1 rounded-full bg-zinc-800/50 border ${channel.borderColor} ${channel.accentText}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center px-2">
      <div className="text-zinc-600 text-2xl animate-pulse">→</div>
    </div>
  );
}

function ProgressBar({ milestone }: { milestone: typeof timeline[0] }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-right">
        <span className="text-white font-semibold text-sm">{milestone.month}</span>
      </div>
      <div className="flex-1 h-10 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800">
        <div
          className={`h-full ${milestone.colorClass} rounded-full`}
          style={{ width: `${milestone.progress}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
          {milestone.label}
        </span>
      </div>
    </div>
  );
}

export function QuestSystemSection() {
  return (
    <section id="quest-system" className="py-24 bg-black overflow-hidden scroll-mt-20 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-zinc-900/50 backdrop-blur border border-zinc-800 text-zinc-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            Here&apos;s the exact system we built
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            The 4-channel ABM system
          </h2>
          <p className="text-lg text-green-400 font-medium mb-2">GTM Agency Methodology</p>

          <div className="inline-block">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              that converts
            </span>
          </div>
        </div>

        {/* 4-Channel Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mb-20">
          {channels.map((channel, index) => (
            <div key={channel.name} className="flex items-stretch">
              <ChannelCard channel={channel} />
              {index < channels.length - 1 && <FlowArrow />}
            </div>
          ))}
        </div>

        {/* Synergy Quote */}
        <div className="text-center mb-20">
          <div className="inline-block bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl px-8 py-6 max-w-3xl">
            <p className="text-zinc-300 text-lg italic mb-3">
              &ldquo;Your LinkedIn ad mentions a framework → Your content breaks it down → Your website offers a deeper dive → Your outreach ties it all together.&rdquo;
            </p>
            <p className="text-transparent bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text font-semibold">
              The magic happens when channels reinforce each other.
            </p>
          </div>
        </div>

        {/* GDPR Section with glow - International focus */}
        <div className="mb-16 relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-zinc-900/80 backdrop-blur border border-orange-500/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="text-5xl">🔒</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-bold text-xl mb-2">Privacy-First Approach</h3>
                <p className="text-zinc-400">
                  Company-level tracking via Leadfeeder. Smart Links bridge the individual tracking gap.
                  Built for GDPR compliance from day one, works globally.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full border border-orange-500/30">
                  GDPR Ready
                </span>
                <span className="text-sm bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
                  Smart Links
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-white font-bold text-xl mb-8 text-center">What to Expect</h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {timeline.map((milestone) => (
              <ProgressBar key={milestone.month} milestone={milestone} />
            ))}
          </div>
          <p className="text-zinc-600 text-sm text-center mt-6">
            Timeline is indicative. Results compound as signals inform optimization.
          </p>
        </div>
      </div>
    </section>
  );
}
