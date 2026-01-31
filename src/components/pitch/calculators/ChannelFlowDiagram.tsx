'use client';

import { motion } from 'framer-motion';
import type { ABMChannels, RegionId } from '@/types/pitch';
import { CHANNEL_MULTIPLIERS } from '@/types/pitch';

interface ChannelFlowDiagramProps {
  activeChannels: ABMChannels;
  region: RegionId;
  onChannelToggle: (channel: keyof ABMChannels) => void;
  onRegionChange: (region: RegionId) => void;
}

interface ChannelBoxProps {
  id: keyof ABMChannels;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  isActive: boolean;
  onToggle: () => void;
  purposes: string[];
  actions: string[];
  isLast?: boolean;
}

function ChannelBox({
  title,
  subtitle,
  icon,
  color,
  isActive,
  onToggle,
  purposes,
  actions,
  isLast
}: ChannelBoxProps) {
  const colorClasses = {
    green: 'from-green-500/20 to-green-600/10 border-green-500/50 hover:border-green-400',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/50 hover:border-blue-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/50 hover:border-purple-400',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/50 hover:border-amber-400',
  };

  const activeColorClasses = {
    green: 'from-green-500/30 to-green-600/20 border-green-400 shadow-green-500/20',
    blue: 'from-blue-500/30 to-blue-600/20 border-blue-400 shadow-blue-500/20',
    purple: 'from-purple-500/30 to-purple-600/20 border-purple-400 shadow-purple-500/20',
    amber: 'from-amber-500/30 to-amber-600/20 border-amber-400 shadow-amber-500/20',
  };

  const colorClass = isActive
    ? activeColorClasses[color as keyof typeof activeColorClasses]
    : colorClasses[color as keyof typeof colorClasses];

  return (
    <div className="flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative p-4 rounded-xl bg-gradient-to-b ${colorClass} border cursor-pointer transition-all duration-300 ${isActive ? 'shadow-lg' : 'opacity-60'}`}
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Toggle indicator */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-green-500 text-white' : 'bg-zinc-700 text-zinc-400'}`}>
          {isActive ? '✓' : '○'}
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-semibold text-white text-sm">{title}</h4>
            <p className="text-xs text-zinc-400">{subtitle}</p>
          </div>
        </div>

        {/* Purpose */}
        <div className="mb-2">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Purpose</p>
          <ul className="space-y-0.5">
            {purposes.map((p, i) => (
              <li key={i} className="text-xs text-zinc-300 flex items-center gap-1">
                <span className="text-zinc-500">→</span> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Run</p>
          <ul className="space-y-0.5">
            {actions.map((a, i) => (
              <li key={i} className="text-xs text-zinc-300 flex items-center gap-1">
                <span className="text-zinc-500">•</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Arrow connector */}
      {!isLast && (
        <div className="px-2">
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0.3 }}
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke={isActive ? '#22c55e' : '#71717a'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      )}
    </div>
  );
}

function TimelineBar({ month, label, fill, annotation }: { month: number; label: string; fill: number; annotation?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500 w-16">Month {month}</span>
      <div className="flex-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${fill}%` }}
          transition={{ duration: 0.8, delay: month * 0.1 }}
        />
      </div>
      <span className="text-xs text-zinc-400 w-32">{label}</span>
      {annotation && (
        <span className="text-xs text-amber-400">{annotation}</span>
      )}
    </div>
  );
}

export function ChannelFlowDiagram({
  activeChannels,
  region,
  onChannelToggle,
  onRegionChange,
}: ChannelFlowDiagramProps) {
  // Calculate multiplier based on active channels
  const getMultiplier = () => {
    const activeCount = Object.values(activeChannels).filter(Boolean).length;
    if (activeCount === 4 && activeChannels.intentTracking) {
      return CHANNEL_MULTIPLIERS.fullStackWithIntent;
    }
    if (activeCount === 4) {
      return CHANNEL_MULTIPLIERS.fullStack;
    }
    if (activeChannels.content && activeChannels.outbound) {
      return CHANNEL_MULTIPLIERS.contentPlusOutreach;
    }
    if (activeChannels.intentTracking) {
      return CHANNEL_MULTIPLIERS.intentTracking;
    }
    return 1.0;
  };

  const multiplier = getMultiplier();

  const channels: Array<{
    id: keyof ABMChannels;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    purposes: string[];
    actions: string[];
  }> = [
    {
      id: 'linkedinAds',
      title: 'LinkedIn Ads',
      subtitle: 'Awareness',
      icon: '📢',
      color: 'green',
      purposes: ['Build recognition', 'Seed ideas early', 'Warm the audience'],
      actions: ['Document ads', 'Thought leader ads', 'Smart Links ⭐'],
    },
    {
      id: 'content',
      title: 'Content',
      subtitle: 'Trust Building',
      icon: '📝',
      color: 'blue',
      purposes: ['Build authority', 'Stay top-of-mind', 'Soften outreach'],
      actions: ['Founder-led content', 'Frameworks', 'Insights'],
    },
    {
      id: 'intentTracking',
      title: 'Intent Tracking',
      subtitle: 'Timing',
      icon: '🎯',
      color: 'purple',
      purposes: ['Identify leads', 'Outbound timing', 'Aligned message'],
      actions: ['Post engagement', 'Website visits', 'Tool clicks'],
    },
    {
      id: 'outbound',
      title: 'Outbound',
      subtitle: 'Conversion',
      icon: '🚀',
      color: 'amber',
      purposes: ['Contextual reach', 'Increase responses', 'Shorten cycle'],
      actions: ['Ads they viewed', 'Engaged content', 'Page visits'],
    },
  ];

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            📊 The 4-Channel ABM System
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Click channels to toggle • Active: {Object.values(activeChannels).filter(Boolean).length}/4
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Region:</span>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value as RegionId)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500"
          >
            <option value="uk_eu">UK / EU (GDPR)</option>
            <option value="us">United States</option>
          </select>
        </div>
      </div>

      {/* Channel Flow */}
      <div className="flex items-start justify-center gap-1 mb-6 overflow-x-auto pb-4">
        {channels.map((channel, index) => (
          <ChannelBox
            key={channel.id}
            {...channel}
            isActive={activeChannels[channel.id]}
            onToggle={() => onChannelToggle(channel.id)}
            isLast={index === channels.length - 1}
          />
        ))}
      </div>

      {/* Multiplier Display */}
      <div className="text-center mb-6 p-4 bg-zinc-800/50 rounded-xl">
        <p className="text-sm text-zinc-400 mb-1">Response Rate Multiplier</p>
        <p className="text-3xl font-bold text-green-400">{multiplier.toFixed(1)}x</p>
        {multiplier >= 2.8 && (
          <p className="text-xs text-amber-400 mt-1">
            ⚡ All 4 channels + intent tracking = maximum impact
          </p>
        )}
        {!activeChannels.intentTracking && Object.values(activeChannels).some(Boolean) && (
          <p className="text-xs text-zinc-500 mt-1">
            Enable Intent Tracking for +80% additional lift
          </p>
        )}
      </div>

      {/* Synergy Message */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 mb-6 border border-green-500/20">
        <p className="text-sm text-zinc-300 italic">
          &ldquo;Your LinkedIn ad mentions a framework → Your content breaks it down →
          Your website offers a deeper dive → Your email ties it all together.&rdquo;
        </p>
        <p className="text-xs text-green-400 mt-2 font-medium">
          The magic happens when channels reinforce each other.
        </p>
      </div>

      {/* GDPR Notice */}
      {region === 'uk_eu' && (
        <div className="bg-amber-500/10 rounded-lg p-3 mb-6 border border-amber-500/20">
          <p className="text-xs text-amber-300">
            ⚠️ <strong>UK/EU (GDPR):</strong> Website visitor tracking limited to company-level identification only.
            Individual tracking requires explicit consent. LinkedIn & email engagement tracking unaffected.
          </p>
        </div>
      )}

      {/* Timeline */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          📅 Expected Timeline
        </h4>
        <div className="space-y-2">
          <TimelineBar month={1} label="Building awareness" fill={10} />
          <TimelineBar month={2} label="Pipeline forming" fill={40} annotation="← First meetings" />
          <TimelineBar month={3} label="Meaningful pipeline" fill={80} annotation="← First deals" />
          <TimelineBar month={4} label="Full velocity" fill={100} />
        </div>
        <p className="text-xs text-zinc-500 mt-4">
          Based on ColdIQ case study: $7.83M pipeline over 10 months
        </p>
      </div>
    </div>
  );
}

export default ChannelFlowDiagram;
