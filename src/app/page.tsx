'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { useCopilotAction, useCopilotReadable, useCopilotChat } from '@copilotkit/react-core';
import { LoginPromptModal, useShouldPromptLogin } from '@/components/LoginPromptModal';

// Types
interface Phase {
  name: string;
  duration: string;
  activities: string[];
  status: 'pending' | 'active' | 'completed';
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
  target_kpis?: string[];
  timeline_urgency?: string;
  has_marketing_team?: boolean;
  willing_to_outsource?: boolean;
  needed_specializations?: string[];
  challenges?: string[];
  tech_stack?: string[];
}

interface AgencyMatch {
  id: number;
  name: string;
  slug: string;
  description: string;
  headquarters: string;
  specializations: string[];
  min_budget: number | null;
  match_score: number;
  match_reasons: string[];
  website: string | null;
}

interface IndustryData {
  industry: string;
  market_size: string;
  growth_rate: string;
  key_segments: string[];
  top_players: string[];
}

interface ToolInfo {
  name: string;
  category: string;
  description: string;
}

interface ConfirmationRequest {
  field: string;
  value: string;
  display_label: string;
  confidence: number;
}

interface GTMState {
  requirements: GTMRequirements;
  requirements_progress: number;
  matched_agencies: AgencyMatch[];
  gathering_stage: 'discovery' | 'needs' | 'matching' | 'complete';
  timeline_phases: Phase[];
  industry_data: IndustryData | null;
  recognized_tools: ToolInfo[];
  pending_confirmations: ConfirmationRequest[];
  confirmed_fields: string[];
}

// Industry Data Card Component
function IndustryDataCard({ data }: { data: IndustryData }) {
  return (
    <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-5 border border-emerald-500/30 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          {data.industry}
        </h3>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
          Market Data
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-white/40 text-xs">Market Size</div>
          <div className="text-xl font-bold text-emerald-400">{data.market_size}</div>
        </div>
        <div>
          <div className="text-white/40 text-xs">Growth Rate</div>
          <div className="text-xl font-bold text-emerald-400">{data.growth_rate}</div>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-white/40 text-xs mb-2">Key Segments</div>
        <div className="flex flex-wrap gap-2">
          {data.key_segments.slice(0, 4).map((seg, i) => (
            <span key={i} className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded">
              {seg}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-white/40 text-xs mb-2">Top Players</div>
        <div className="text-white/60 text-sm">
          {data.top_players.slice(0, 4).join(' • ')}
        </div>
      </div>
    </div>
  );
}

// Tool Recognition Card
function ToolCard({ tool }: { tool: ToolInfo }) {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-3 border border-white/10 flex items-center gap-3 animate-fade-in">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">
        🔧
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white truncate">{tool.name}</div>
        <div className="text-xs text-white/40">{tool.category}</div>
      </div>
      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded whitespace-nowrap">
        In Stack
      </span>
    </div>
  );
}

// Confirmation Pill Component
function ConfirmationPill({
  confirmation,
  onConfirm,
  onCorrect
}: {
  confirmation: ConfirmationRequest;
  onConfirm: () => void;
  onCorrect: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1 animate-fade-in">
      <span className="text-yellow-400 text-sm">{confirmation.display_label}:</span>
      <span className="text-white font-medium">{confirmation.value}</span>
      <button
        onClick={onConfirm}
        className="ml-1 text-emerald-400 hover:text-emerald-300 text-sm"
      >
        ✓
      </button>
      <button
        onClick={onCorrect}
        className="text-white/40 hover:text-white text-sm"
      >
        ✎
      </button>
    </div>
  );
}

// Progress Bar with Details
function ProgressDashboard({ progress, requirements }: { progress: number; requirements: GTMRequirements }) {
  const fields = [
    { key: 'industry', label: 'Industry', filled: !!requirements.industry },
    { key: 'target_market', label: 'Target Market', filled: !!requirements.target_market },
    { key: 'budget', label: 'Budget', filled: !!requirements.budget },
    { key: 'strategy_type', label: 'Strategy', filled: !!requirements.strategy_type },
    { key: 'needed_specializations', label: 'Needs', filled: (requirements.needed_specializations?.length || 0) > 0 },
  ];

  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/10 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium">GTM Requirements</span>
        <span className="text-emerald-400 font-bold text-lg">{progress}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {fields.map(f => (
          <span
            key={f.key}
            className={`text-xs px-2 py-1 rounded ${
              f.filled
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/5 text-white/40'
            }`}
          >
            {f.filled ? '✓' : '○'} {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Agency Card
function AgencyCard({ agency }: { agency: AgencyMatch }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-white">{agency.name}</h4>
          <p className="text-white/40 text-sm">{agency.headquarters}</p>
        </div>
        <div className="bg-emerald-500/20 text-emerald-400 text-sm font-bold px-3 py-1 rounded-full">
          {agency.match_score}%
        </div>
      </div>
      <p className="text-white/60 text-sm mb-3 line-clamp-2">{agency.description}</p>
      {agency.match_reasons.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {agency.match_reasons.slice(0, 2).map((reason, i) => (
            <span key={i} className="text-xs bg-white/5 text-white/60 px-2 py-1 rounded">
              {reason}
            </span>
          ))}
        </div>
      )}
      {agency.website && (
        <a
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 text-sm hover:underline"
        >
          Visit website →
        </a>
      )}
    </div>
  );
}

// Timeline Component
function Timeline({ phases, companyName }: { phases: Phase[]; companyName?: string }) {
  if (phases.length === 0) return null;

  return (
    <div className="space-y-4">
      {companyName && (
        <div className="text-sm text-emerald-400 font-medium">
          Timeline for {companyName}
        </div>
      )}
      {phases.map((phase, index) => (
        <div
          key={index}
          className="bg-zinc-900 rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-emerald-400 text-sm font-medium">Phase {index + 1}</span>
              <h4 className="text-lg font-bold text-white">{phase.name}</h4>
            </div>
            <span className="text-white/40 text-sm">{phase.duration}</span>
          </div>
          <ul className="space-y-2">
            {phase.activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                <span className="text-emerald-400 mt-1">→</span>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Generate timeline phases
function generatePhases(req: GTMRequirements): Phase[] {
  const phases: Phase[] = [];

  phases.push({
    name: "Foundation & Research",
    duration: "Weeks 1-2",
    activities: [
      "Market research & competitive analysis",
      "ICP (Ideal Customer Profile) definition",
      "Value proposition refinement",
      "Messaging framework development",
    ],
    status: 'pending',
  });

  if (req.strategy_type === 'plg' || req.strategy_type === 'hybrid') {
    phases.push({
      name: "Product-Led Growth Setup",
      duration: "Weeks 3-4",
      activities: [
        "Self-serve onboarding optimization",
        "Product analytics implementation",
        "Free trial/freemium strategy",
        "In-app messaging setup",
      ],
      status: 'pending',
    });
  }

  if (req.strategy_type === 'sales_led' || req.strategy_type === 'hybrid') {
    phases.push({
      name: "Sales-Led Motion",
      duration: "Weeks 3-5",
      activities: [
        "Sales playbook development",
        "Target account list building",
        "Demo & pitch deck creation",
        "CRM & pipeline setup",
      ],
      status: 'pending',
    });
  }

  phases.push({
    name: "Content & Demand Generation",
    duration: "Weeks 4-6",
    activities: [
      "SEO content strategy",
      "Lead magnet development",
      "Email nurture sequences",
      req.budget && req.budget > 50000 ? "Paid acquisition campaigns" : "Organic social strategy",
    ],
    status: 'pending',
  });

  phases.push({
    name: "Launch & Scale",
    duration: "Weeks 6-8+",
    activities: [
      "Public launch execution",
      "PR & partnerships outreach",
      "Performance optimization",
      "Expansion planning",
    ],
    status: 'pending',
  });

  return phases;
}

// System instructions
const SYSTEM_INSTRUCTIONS = `You are a GTM strategist. You MUST use tools to update the plan.

## CRITICAL REQUIREMENT

You have access to the "update_requirements" tool. Call it after EVERY user message.

Example: User says "I'm building a B2B SaaS product for the games industry"
Call: update_requirements with:
- company_name: "B2B SaaS Product"
- category: "b2b_saas"
- industry: "games"

## CONVERSATION FLOW

Ask one question at a time:
1. What are you building?
2. Who's your target customer?
3. What stage are you at?
4. What's your marketing budget?
5. What help do you need?

After 3-4 exchanges with enough info, call search_agencies.

## REMEMBER

1. ALWAYS call update_requirements first
2. Extract any info into parameters
3. Be conversational and brief`;

export default function Home() {
  const [gtmState, setGtmState] = useState<GTMState>({
    requirements: {},
    requirements_progress: 0,
    matched_agencies: [],
    gathering_stage: 'discovery',
    timeline_phases: [],
    industry_data: null,
    recognized_tools: [],
    pending_confirmations: [],
    confirmed_fields: [],
  });

  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasPromptedLogin, setHasPromptedLogin] = useState(false);

  // Check if we should prompt for login
  const shouldPromptLogin = useShouldPromptLogin(gtmState.requirements);

  // Show login modal when conditions are met (only once)
  useEffect(() => {
    if (shouldPromptLogin && !hasPromptedLogin) {
      setShowLoginModal(true);
      setHasPromptedLogin(true);
    }
  }, [shouldPromptLogin, hasPromptedLogin]);

  // Function to sync with backend
  const syncWithBackend = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/state');
      if (response.ok) {
        const data = await response.json();
        setGtmState(prev => ({
          ...prev,
          requirements: data.requirements || prev.requirements,
          requirements_progress: data.progress_percent || prev.requirements_progress,
          matched_agencies: data.matched_agencies || prev.matched_agencies,
          industry_data: data.industry_data || prev.industry_data,
          recognized_tools: data.recognized_tools || prev.recognized_tools,
          pending_confirmations: data.pending_confirmations || prev.pending_confirmations,
          confirmed_fields: data.confirmed_fields || prev.confirmed_fields,
          timeline_phases: data.requirements?.strategy_type
            ? generatePhases(data.requirements)
            : prev.timeline_phases,
        }));
      }
    } catch (e) {
      // Backend not available, continue with frontend-only mode
      console.log('Backend not available, using frontend-only mode');
    }
  }, []);

  // Poll backend for state updates
  useEffect(() => {
    const interval = setInterval(syncWithBackend, 2000);
    return () => clearInterval(interval);
  }, [syncWithBackend]);

  // Get access to chat messages to capture the actual user input
  // Note: visibleMessages is deprecated but messages is not exposed in useCopilotChat
  const { visibleMessages } = useCopilotChat();
  const lastUserMessageRef = useRef<string>('');

  // Track the last user message whenever messages change
  useEffect(() => {
    // Guard against undefined visibleMessages
    if (!visibleMessages || !Array.isArray(visibleMessages)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chatMessages = visibleMessages as any[];
    for (let i = chatMessages.length - 1; i >= 0; i--) {
      const msg = chatMessages[i];
      if (msg?.role === 'user') {
        // Handle both string and array content
        if (typeof msg.content === 'string') {
          lastUserMessageRef.current = msg.content;
          break;
        }
        // If content is an array, find the text part
        if (Array.isArray(msg.content)) {
          for (const part of msg.content) {
            if (typeof part === 'object' && part?.type === 'text' && part?.text) {
              lastUserMessageRef.current = part.text;
              break;
            }
          }
          break;
        }
      }
    }
  }, [visibleMessages]);

  // Make state readable to AI
  useCopilotReadable({
    description: 'Current GTM requirements',
    value: gtmState.requirements,
  });

  // Update requirements action
  useCopilotAction({
    name: "update_requirements",
    description: "Update GTM requirements. Call after EVERY user message.",
    parameters: [
      { name: "company_name", type: "string" as const },
      { name: "industry", type: "string" as const },
      { name: "category", type: "string" as const },
      { name: "maturity", type: "string" as const },
      { name: "target_market", type: "string" as const },
      { name: "target_regions", type: "string[]" as const },
      { name: "strategy_type", type: "string" as const },
      { name: "budget", type: "number" as const },
      { name: "primary_goal", type: "string" as const },
      { name: "needed_specializations", type: "string[]" as const },
      { name: "tech_stack", type: "string[]" as const },
    ],
    handler: async (args) => {
      // Get the actual user message from the ref (not just extracted args)
      const actualUserMessage = lastUserMessageRef.current;

      // Send actual user message to backend for full extraction
      try {
        if (actualUserMessage) {
          await fetch('http://localhost:8000/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: actualUserMessage }),
          });
          await syncWithBackend();
        }
      } catch (e) {
        // Backend not available
      }

      // Update frontend state
      const newReq = {
        ...gtmState.requirements,
        ...Object.fromEntries(
          Object.entries(args).filter(([, v]) => v !== undefined && v !== null)
        ),
      } as GTMRequirements;

      const fields = [
        newReq.company_name,
        newReq.industry || newReq.category,
        newReq.target_market,
        newReq.strategy_type,
        newReq.budget,
        newReq.primary_goal,
        (newReq.needed_specializations?.length || 0) > 0,
      ];
      const progress = Math.round((fields.filter(Boolean).length / fields.length) * 100);

      setGtmState(prev => ({
        ...prev,
        requirements: newReq,
        requirements_progress: progress,
        timeline_phases: newReq.strategy_type ? generatePhases(newReq) : prev.timeline_phases,
      }));

      return `Updated. Progress: ${progress}%`;
    },
  });

  // Search agencies action
  useCopilotAction({
    name: "search_agencies",
    description: "Search for matching agencies. Call when enough info gathered.",
    parameters: [
      { name: "specializations", type: "string[]" as const },
      { name: "category_tags", type: "string[]" as const },
      { name: "service_areas", type: "string[]" as const },
      { name: "max_budget", type: "number" as const },
    ],
    handler: async (args) => {
      try {
        const response = await fetch('/api/agencies/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            specializations: args.specializations || [],
            category_tags: args.category_tags || [],
            service_areas: args.service_areas || [],
            max_budget: args.max_budget,
            limit: 5,
          }),
        });
        if (response.ok) {
          const agencies = await response.json();
          setGtmState(prev => ({
            ...prev,
            matched_agencies: agencies,
            gathering_stage: 'matching',
          }));
          return `Found ${agencies.length} agencies`;
        }
      } catch (e) {
        console.error('Search error:', e);
      }
      return 'Search failed';
    },
  });

  const handleConfirm = async (field: string) => {
    try {
      await fetch('http://localhost:8000/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field }),
      });
      setGtmState(prev => ({
        ...prev,
        pending_confirmations: prev.pending_confirmations.filter(c => c.field !== field),
        confirmed_fields: [...prev.confirmed_fields, field],
      }));
    } catch (e) {
      // Handle locally
      setGtmState(prev => ({
        ...prev,
        pending_confirmations: prev.pending_confirmations.filter(c => c.field !== field),
      }));
    }
  };

  const { requirements, requirements_progress, matched_agencies, timeline_phases, industry_data, recognized_tools, pending_confirmations } = gtmState;
  const hasData = requirements.company_name || requirements_progress > 0 || industry_data || recognized_tools.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      <CopilotSidebar
        defaultOpen={true}
        instructions={SYSTEM_INSTRUCTIONS}
        labels={{
          title: 'GTM Strategist',
          initial: "Hey! Let's build your GTM plan. What are you building?",
        }}
        className="[&_.copilotKitSidebar]:bg-zinc-900 [&_.copilotKitSidebar]:border-white/10"
      >
        <div className="min-h-screen bg-black p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <header className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-emerald-400">AI-Powered GTM Strategy</span>
              </div>
              <h1 className="text-4xl font-black mb-2">
                Build Your GTM Plan
                <span className="block text-emerald-400">In Minutes, Not Months</span>
              </h1>
              {!hasData && (
                <p className="text-white/60 max-w-xl mx-auto text-sm">
                  Chat with the AI strategist. Watch your dashboard form in real-time.
                </p>
              )}
            </header>

            {/* Pending Confirmations */}
            {pending_confirmations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {pending_confirmations.map(c => (
                  <ConfirmationPill
                    key={c.field}
                    confirmation={c}
                    onConfirm={() => handleConfirm(c.field)}
                    onCorrect={() => {/* TODO: Open edit modal */}}
                  />
                ))}
              </div>
            )}

            {/* Progress Dashboard */}
            {hasData && (
              <ProgressDashboard progress={requirements_progress} requirements={requirements} />
            )}

            {/* Dashboard Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Industry Data */}
              {industry_data && (
                <IndustryDataCard data={industry_data} />
              )}

              {/* Recognized Tools */}
              {recognized_tools.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white/60">Your Tech Stack</h3>
                  {recognized_tools.map((tool, i) => (
                    <ToolCard key={i} tool={tool} />
                  ))}
                </div>
              )}

              {/* Company Info Cards */}
              {requirements.company_name && (
                <div className="bg-zinc-900 rounded-xl p-5 border border-white/10">
                  <div className="text-white/40 text-xs mb-1">Company</div>
                  <div className="font-bold text-lg">{requirements.company_name}</div>
                  {requirements.industry && (
                    <div className="text-white/60 text-sm">{requirements.industry}</div>
                  )}
                  {requirements.maturity && (
                    <div className="text-emerald-400 text-sm mt-1 capitalize">
                      {requirements.maturity.replace('_', ' ')} stage
                    </div>
                  )}
                </div>
              )}

              {/* Strategy & Budget */}
              {(requirements.strategy_type || requirements.budget) && (
                <div className="bg-zinc-900 rounded-xl p-5 border border-white/10">
                  {requirements.strategy_type && (
                    <div className="mb-3">
                      <div className="text-white/40 text-xs mb-1">GTM Strategy</div>
                      <div className="font-bold text-emerald-400 capitalize">
                        {requirements.strategy_type.replace('_', '-')} Growth
                      </div>
                    </div>
                  )}
                  {requirements.budget && (
                    <div>
                      <div className="text-white/40 text-xs mb-1">Budget</div>
                      <div className="font-bold">${requirements.budget.toLocaleString()}/mo</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Matched Agencies */}
            {matched_agencies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Matched Agencies
                  <span className="text-sm font-normal text-white/40">
                    ({matched_agencies.length} found)
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {matched_agencies.slice(0, 4).map(agency => (
                    <AgencyCard key={agency.id} agency={agency} />
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {timeline_phases.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Execution Timeline</h2>
                <Timeline phases={timeline_phases} companyName={requirements.company_name} />
              </div>
            )}

            {/* Empty State */}
            {!hasData && (
              <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-12 text-center">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-3">Your GTM Dashboard</h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Start chatting and watch your personalized dashboard form with market data, matched agencies, and an execution timeline.
                </p>
              </div>
            )}
          </div>
        </div>
      </CopilotSidebar>

      {/* Login Prompt Modal - appears after gathering enough info */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
