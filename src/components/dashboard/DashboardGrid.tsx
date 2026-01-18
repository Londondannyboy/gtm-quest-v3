'use client';

import { TAMChart } from '@/components/charts/TAMChart';
import { GrowthChart } from '@/components/charts/GrowthChart';
import { BudgetChart } from '@/components/charts/BudgetChart';
import { BenchmarkChart } from '@/components/charts/BenchmarkChart';

interface GTMRequirements {
  company_name?: string;
  industry?: string;
  category?: string;
  maturity?: string;
  strategy_type?: string;
  budget?: number;
}

export function DashboardGrid({ requirements }: { requirements: GTMRequirements }) {
  const hasEnoughData =
    requirements.industry ||
    requirements.category ||
    requirements.strategy_type ||
    requirements.budget;

  if (!hasEnoughData) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Market Intelligence</h2>
        <span className="text-white/40 text-sm">Based on your profile</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* TAM/SAM/SOM Chart */}
        {(requirements.industry || requirements.category) && (
          <TAMChart industry={requirements.industry || requirements.category} />
        )}

        {/* Growth Projection */}
        {requirements.strategy_type && (
          <GrowthChart
            strategy={requirements.strategy_type}
            budget={requirements.budget}
          />
        )}

        {/* Budget Allocation */}
        {requirements.budget && (
          <BudgetChart
            budget={requirements.budget}
            strategy={requirements.strategy_type}
          />
        )}

        {/* Benchmark Comparison */}
        {(requirements.industry || requirements.maturity) && (
          <BenchmarkChart
            industry={requirements.industry}
            maturity={requirements.maturity}
          />
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StatCard
          label="Target Market Size"
          value={requirements.industry ? '$50-200B' : 'TBD'}
          trend="+12% YoY"
          positive
        />
        <StatCard
          label="Est. CAC"
          value={requirements.budget ? `$${Math.round((requirements.budget * 0.3) / 10)}` : 'TBD'}
          trend="Industry avg"
        />
        <StatCard
          label="Time to ROI"
          value={requirements.strategy_type === 'plg' ? '6-12 mo' : '9-18 mo'}
          trend={requirements.strategy_type ? 'Based on strategy' : 'TBD'}
        />
        <StatCard
          label="Success Rate"
          value="73%"
          trend="w/ agency partner"
          positive
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  positive,
}: {
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-white/10">
      <div className="text-white/50 text-xs mb-1">{label}</div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className={`text-xs mt-1 ${positive ? 'text-emerald-400' : 'text-white/40'}`}>
        {trend}
      </div>
    </div>
  );
}
