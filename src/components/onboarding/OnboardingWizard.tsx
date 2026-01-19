'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingWizardProps {
  onUpdate: (field: string, value: string | string[] | number) => void;
  requirements: {
    company_name?: string;
    industry?: string;
    category?: string;
    target_market?: string;
    strategy_type?: string;
    budget?: number;
    needed_specializations?: string[];
  };
}

const INDUSTRIES = [
  { id: 'saas', label: 'SaaS', icon: '💻', description: 'Software as a Service' },
  { id: 'fintech', label: 'FinTech', icon: '🏦', description: 'Financial Technology' },
  { id: 'healthtech', label: 'HealthTech', icon: '🏥', description: 'Healthcare Technology' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒', description: 'Online Retail' },
  { id: 'gaming', label: 'Gaming', icon: '🎮', description: 'Games & Entertainment' },
  { id: 'edtech', label: 'EdTech', icon: '📚', description: 'Education Technology' },
  { id: 'marketplace', label: 'Marketplace', icon: '🏪', description: 'Two-sided Markets' },
  { id: 'ai_ml', label: 'AI/ML', icon: '🤖', description: 'Artificial Intelligence' },
];

const CATEGORIES = [
  { id: 'b2b_saas', label: 'B2B SaaS', icon: '🏢', description: 'Business to Business' },
  { id: 'b2c', label: 'B2C', icon: '👤', description: 'Direct to Consumer' },
  { id: 'enterprise', label: 'Enterprise', icon: '🏛️', description: 'Large Organizations' },
  { id: 'smb', label: 'SMB', icon: '🏠', description: 'Small & Medium Business' },
];

const STRATEGIES = [
  { id: 'plg', label: 'Product-Led Growth', icon: '🚀', description: 'Self-serve, freemium model' },
  { id: 'sales_led', label: 'Sales-Led', icon: '🤝', description: 'Outbound, demos, enterprise' },
  { id: 'hybrid', label: 'Hybrid', icon: '⚡', description: 'PLG + Sales motion' },
];

const BUDGETS = [
  { id: 10000, label: '$10K/mo', description: 'Early stage' },
  { id: 25000, label: '$25K/mo', description: 'Growing' },
  { id: 50000, label: '$50K/mo', description: 'Scaling' },
  { id: 100000, label: '$100K+/mo', description: 'Enterprise' },
];

const SPECIALIZATIONS = [
  { id: 'demand_gen', label: 'Demand Gen', icon: '📈' },
  { id: 'abm', label: 'ABM', icon: '🎯' },
  { id: 'content', label: 'Content', icon: '✍️' },
  { id: 'seo', label: 'SEO', icon: '🔍' },
  { id: 'paid', label: 'Paid Media', icon: '💰' },
  { id: 'brand', label: 'Branding', icon: '🎨' },
];

type Step = 'company' | 'industry' | 'category' | 'strategy' | 'budget' | 'specializations';

export function OnboardingWizard({ onUpdate, requirements }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('company');
  const [companyName, setCompanyName] = useState(requirements.company_name || '');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(requirements.needed_specializations || []);

  const handleNext = () => {
    const steps: Step[] = ['company', 'industry', 'category', 'strategy', 'budget', 'specializations'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleCompanySubmit = () => {
    if (companyName.trim()) {
      onUpdate('company_name', companyName.trim());
      handleNext();
    }
  };

  const handleSelect = (field: string, value: string | number) => {
    onUpdate(field, value);
    handleNext();
  };

  const toggleSpec = (specId: string) => {
    const newSpecs = selectedSpecs.includes(specId)
      ? selectedSpecs.filter(s => s !== specId)
      : [...selectedSpecs, specId];
    setSelectedSpecs(newSpecs);
    onUpdate('needed_specializations', newSpecs);
  };

  const completedSteps = [
    requirements.company_name,
    requirements.industry,
    requirements.category,
    requirements.strategy_type,
    requirements.budget,
    requirements.needed_specializations?.length,
  ].filter(Boolean).length;

  const progress = Math.round((completedSteps / 6) * 100);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl border border-white/10 p-8 mb-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Tell us about your GTM needs</h2>
          <p className="text-white/50 text-sm">Complete your profile to get matched with agencies</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">{progress}%</span>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'company', label: 'Company', icon: '🏢' },
          { id: 'industry', label: 'Industry', icon: '🎯' },
          { id: 'category', label: 'Category', icon: '📊' },
          { id: 'strategy', label: 'Strategy', icon: '🚀' },
          { id: 'budget', label: 'Budget', icon: '💰' },
          { id: 'specializations', label: 'Needs', icon: '🛠️' },
        ].map((step, index) => {
          const isComplete = index < completedSteps;
          const isCurrent = step.id === currentStep;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id as Step)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-emerald-500 text-white'
                  : isComplete
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              <span>{isComplete ? '✓' : step.icon}</span>
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Company Name */}
          {currentStep === 'company' && (
            <div className="space-y-4">
              <label className="block text-white/70 text-sm mb-2">What&apos;s your company or product name?</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Acme Corp, ProductX"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleCompanySubmit()}
                />
                <button
                  onClick={handleCompanySubmit}
                  disabled={!companyName.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/10 disabled:text-white/30 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Industry Selection */}
          {currentStep === 'industry' && (
            <div className="space-y-4">
              <label className="block text-white/70 text-sm mb-2">What industry are you in?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleSelect('industry', ind.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                      requirements.industry === ind.id
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{ind.icon}</div>
                    <div className="font-medium text-white">{ind.label}</div>
                    <div className="text-white/40 text-xs">{ind.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category Selection */}
          {currentStep === 'category' && (
            <div className="space-y-4">
              <label className="block text-white/70 text-sm mb-2">Who&apos;s your target customer?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect('category', cat.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                      requirements.category === cat.id
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="font-medium text-white">{cat.label}</div>
                    <div className="text-white/40 text-xs">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Selection */}
          {currentStep === 'strategy' && (
            <div className="space-y-4">
              <label className="block text-white/70 text-sm mb-2">What&apos;s your GTM approach?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {STRATEGIES.map((strat) => (
                  <button
                    key={strat.id}
                    onClick={() => handleSelect('strategy_type', strat.id)}
                    className={`p-6 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                      requirements.strategy_type === strat.id
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-3">{strat.icon}</div>
                    <div className="font-bold text-white text-lg">{strat.label}</div>
                    <div className="text-white/50 text-sm">{strat.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Budget Selection */}
          {currentStep === 'budget' && (
            <div className="space-y-4">
              <label className="block text-white/70 text-sm mb-2">What&apos;s your marketing budget?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {BUDGETS.map((bud) => (
                  <button
                    key={bud.id}
                    onClick={() => handleSelect('budget', bud.id)}
                    className={`p-4 rounded-xl border text-center transition-all hover:scale-[1.02] ${
                      requirements.budget === bud.id
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-white text-lg">{bud.label}</div>
                    <div className="text-white/40 text-xs">{bud.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specializations Selection */}
          {currentStep === 'specializations' && (
            <div className="space-y-4">
              <label className="block text-white/70 text-sm mb-2">What help do you need? (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SPECIALIZATIONS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => toggleSpec(spec.id)}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all hover:scale-[1.02] ${
                      selectedSpecs.includes(spec.id)
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl">{spec.icon}</span>
                    <span className="font-medium text-white">{spec.label}</span>
                    {selectedSpecs.includes(spec.id) && (
                      <span className="ml-auto text-emerald-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
              {selectedSpecs.length > 0 && (
                <div className="pt-4">
                  <p className="text-emerald-400 text-sm">
                    Selected: {selectedSpecs.length} specialization{selectedSpecs.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
