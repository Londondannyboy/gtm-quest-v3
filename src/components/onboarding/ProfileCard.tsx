'use client';

interface ProfileField {
  key: string;
  label: string;
  icon: string;
  value?: string | number | string[];
  formatter?: (value: string | number | string[]) => string;
}

interface GTMRequirements {
  company_name?: string;
  company_size?: string;
  industry?: string;
  category?: string;
  maturity?: string;
  target_market?: string;
  target_regions?: string[];
  strategy_type?: string;
  budget?: number;
  primary_goal?: string;
  timeline_urgency?: string;
  needed_specializations?: string[];
  tech_stack?: string[];
}

function formatBudget(value: string | number | string[]): string {
  if (typeof value === 'number') {
    return `$${value.toLocaleString()}/mo`;
  }
  return String(value);
}

function formatStrategy(value: string | number | string[]): string {
  if (typeof value === 'string') {
    return value.replace('_', '-').replace(/\b\w/g, l => l.toUpperCase()) + ' Growth';
  }
  return String(value);
}

function formatArray(value: string | number | string[]): string {
  if (Array.isArray(value)) {
    return value.slice(0, 3).join(', ') + (value.length > 3 ? '...' : '');
  }
  return String(value);
}

function FieldCard({ field, isComplete }: { field: ProfileField; isComplete: boolean }) {
  const displayValue = field.value && field.formatter
    ? field.formatter(field.value)
    : Array.isArray(field.value)
    ? field.value.join(', ')
    : field.value;

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-300 ${
        isComplete
          ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/30'
          : 'bg-zinc-900/50 border-white/5'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
            isComplete ? 'bg-emerald-500/20' : 'bg-white/5'
          }`}
        >
          {field.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs ${isComplete ? 'text-emerald-400' : 'text-white/40'}`}>
            {field.label}
          </div>
          {isComplete ? (
            <div className="font-semibold text-white truncate">{displayValue}</div>
          ) : (
            <div className="text-white/30 text-sm">Not set</div>
          )}
        </div>
        {isComplete && (
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileCard({ requirements }: { requirements: GTMRequirements }) {
  const fields: ProfileField[] = [
    {
      key: 'company_name',
      label: 'Company',
      icon: '🏢',
      value: requirements.company_name,
    },
    {
      key: 'industry',
      label: 'Industry',
      icon: '🎯',
      value: requirements.industry || requirements.category,
    },
    {
      key: 'company_size',
      label: 'Company Size',
      icon: '👥',
      value: requirements.company_size || requirements.maturity,
    },
    {
      key: 'target_market',
      label: 'Target Market',
      icon: '🌍',
      value: requirements.target_market,
    },
    {
      key: 'target_regions',
      label: 'Target Regions',
      icon: '📍',
      value: requirements.target_regions,
      formatter: formatArray,
    },
    {
      key: 'budget',
      label: 'Budget',
      icon: '💰',
      value: requirements.budget,
      formatter: formatBudget,
    },
    {
      key: 'strategy_type',
      label: 'GTM Strategy',
      icon: '🚀',
      value: requirements.strategy_type,
      formatter: formatStrategy,
    },
    {
      key: 'primary_goal',
      label: 'Primary Goal',
      icon: '🎪',
      value: requirements.primary_goal,
    },
    {
      key: 'timeline_urgency',
      label: 'Timeline',
      icon: '⏱️',
      value: requirements.timeline_urgency,
    },
  ];

  const completedCount = fields.filter((f) => {
    if (Array.isArray(f.value)) return f.value.length > 0;
    return !!f.value;
  }).length;

  const progress = Math.round((completedCount / fields.length) * 100);

  return (
    <div className="bg-zinc-900/80 rounded-2xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Your GTM Profile</h2>
          <p className="text-white/50 text-sm">
            {completedCount} of {fields.length} fields completed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-emerald-400">{progress}%</div>
          <div className="w-12 h-12 relative">
            <svg className="w-12 h-12 -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-white/10"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 125.6} 125.6`}
                className="text-emerald-400 transition-all duration-500"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Field Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {fields.map((field) => {
          const isComplete = Array.isArray(field.value)
            ? field.value.length > 0
            : !!field.value;
          return <FieldCard key={field.key} field={field} isComplete={isComplete} />;
        })}
      </div>

      {/* Tech Stack (if present) */}
      {requirements.tech_stack && requirements.tech_stack.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs text-white/40 mb-2">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {requirements.tech_stack.map((tool) => (
              <span
                key={tool}
                className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Specializations (if present) */}
      {requirements.needed_specializations && requirements.needed_specializations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs text-white/40 mb-2">Needs</div>
          <div className="flex flex-wrap gap-2">
            {requirements.needed_specializations.map((spec) => (
              <span
                key={spec}
                className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-lg text-sm"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
