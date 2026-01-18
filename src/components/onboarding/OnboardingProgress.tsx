'use client';

interface OnboardingStep {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'company',
    label: 'Company Info',
    description: 'Tell us about your company',
    icon: '🏢',
  },
  {
    id: 'market',
    label: 'Target Market',
    description: 'Who are you selling to?',
    icon: '🎯',
  },
  {
    id: 'strategy',
    label: 'GTM Strategy',
    description: 'How will you go to market?',
    icon: '🚀',
  },
  {
    id: 'needs',
    label: 'Your Needs',
    description: 'What help do you need?',
    icon: '🛠️',
  },
  {
    id: 'matching',
    label: 'Agency Match',
    description: 'Find your perfect partner',
    icon: '🤝',
  },
];

interface GTMRequirements {
  company_name?: string;
  industry?: string;
  category?: string;
  target_market?: string;
  strategy_type?: string;
  budget?: number;
  needed_specializations?: string[];
}

function getStepStatus(stepId: string, requirements: GTMRequirements, hasMatches: boolean): 'complete' | 'current' | 'pending' {
  switch (stepId) {
    case 'company':
      if (requirements.company_name || requirements.industry || requirements.category) {
        return 'complete';
      }
      return 'current';
    case 'market':
      if (!requirements.company_name && !requirements.industry) return 'pending';
      if (requirements.target_market) return 'complete';
      return requirements.company_name ? 'current' : 'pending';
    case 'strategy':
      if (!requirements.target_market) return 'pending';
      if (requirements.strategy_type && requirements.budget) return 'complete';
      return requirements.target_market ? 'current' : 'pending';
    case 'needs':
      if (!requirements.strategy_type) return 'pending';
      if (requirements.needed_specializations && requirements.needed_specializations.length > 0) return 'complete';
      return requirements.strategy_type ? 'current' : 'pending';
    case 'matching':
      if (hasMatches) return 'complete';
      if (requirements.needed_specializations && requirements.needed_specializations.length > 0) return 'current';
      return 'pending';
    default:
      return 'pending';
  }
}

export function OnboardingProgress({
  requirements,
  hasMatches = false,
}: {
  requirements: GTMRequirements;
  hasMatches?: boolean;
}) {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-white/10 p-4">
      <div className="flex items-center justify-between gap-2">
        {ONBOARDING_STEPS.map((step, index) => {
          const status = getStepStatus(step.id, requirements, hasMatches);
          const isLast = index === ONBOARDING_STEPS.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                    status === 'complete'
                      ? 'bg-emerald-500/20 border-2 border-emerald-500'
                      : status === 'current'
                      ? 'bg-blue-500/20 border-2 border-blue-500 animate-pulse'
                      : 'bg-white/5 border-2 border-white/10'
                  }`}
                >
                  {status === 'complete' ? (
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={status === 'current' ? '' : 'opacity-40'}>{step.icon}</span>
                  )}
                </div>
                <div className="mt-2 text-center hidden sm:block">
                  <div
                    className={`text-xs font-medium ${
                      status === 'complete'
                        ? 'text-emerald-400'
                        : status === 'current'
                        ? 'text-blue-400'
                        : 'text-white/40'
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2">
                  <div
                    className={`h-full transition-all duration-500 ${
                      status === 'complete' ? 'bg-emerald-500' : 'bg-white/10'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Compact version for sidebar
export function OnboardingProgressCompact({
  requirements,
  hasMatches = false,
}: {
  requirements: GTMRequirements;
  hasMatches?: boolean;
}) {
  const completedSteps = ONBOARDING_STEPS.filter(
    (step) => getStepStatus(step.id, requirements, hasMatches) === 'complete'
  ).length;

  const currentStep = ONBOARDING_STEPS.find(
    (step) => getStepStatus(step.id, requirements, hasMatches) === 'current'
  );

  const progress = (completedSteps / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="bg-zinc-800/50 rounded-lg p-3 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/60 text-xs">Progress</span>
        <span className="text-emerald-400 text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {currentStep && (
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentStep.icon}</span>
          <span className="text-white/70 text-xs">{currentStep.description}</span>
        </div>
      )}
    </div>
  );
}
