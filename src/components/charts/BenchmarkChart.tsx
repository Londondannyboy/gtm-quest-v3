'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface BenchmarkData {
  metric: string;
  company: number;
  industry: number;
  topPerformer: number;
}

// Industry benchmarks by category
const BENCHMARKS: Record<string, BenchmarkData[]> = {
  saas: [
    { metric: 'CAC Payback', company: 60, industry: 50, topPerformer: 80 },
    { metric: 'NRR', company: 55, industry: 60, topPerformer: 85 },
    { metric: 'Growth Rate', company: 45, industry: 40, topPerformer: 75 },
    { metric: 'Gross Margin', company: 70, industry: 65, topPerformer: 85 },
    { metric: 'LTV:CAC', company: 50, industry: 55, topPerformer: 80 },
    { metric: 'Win Rate', company: 40, industry: 45, topPerformer: 70 },
  ],
  default: [
    { metric: 'Market Fit', company: 50, industry: 50, topPerformer: 75 },
    { metric: 'Growth', company: 45, industry: 45, topPerformer: 70 },
    { metric: 'Efficiency', company: 55, industry: 50, topPerformer: 80 },
    { metric: 'Retention', company: 60, industry: 55, topPerformer: 85 },
    { metric: 'Revenue', company: 40, industry: 45, topPerformer: 75 },
    { metric: 'Team', company: 50, industry: 50, topPerformer: 70 },
  ],
};

function getBenchmarkData(industry?: string, maturity?: string): BenchmarkData[] {
  // Adjust company scores based on maturity
  const maturityMultiplier: Record<string, number> = {
    early_stage: 0.6,
    growth: 0.8,
    scale: 1.0,
    enterprise: 1.1,
  };

  const multiplier = maturityMultiplier[maturity || 'growth'] || 0.8;
  const baseData = BENCHMARKS.saas; // Default to SaaS benchmarks

  return baseData.map((item) => ({
    ...item,
    company: Math.min(100, Math.round(item.company * multiplier)),
  }));
}

export function BenchmarkChart({
  industry,
  maturity,
}: {
  industry?: string;
  maturity?: string;
}) {
  const data = getBenchmarkData(industry, maturity);

  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white">Performance Benchmarks</h3>
          <p className="text-white/50 text-sm">vs. Industry & Top Performers</p>
        </div>
        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">
          Benchmark
        </span>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#999', fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#666', fontSize: 10 }}
            />
            <Radar
              name="Top Performers"
              dataKey="topPerformer"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
              strokeDasharray="5 5"
            />
            <Radar
              name="Industry Avg"
              dataKey="industry"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
            />
            <Radar
              name="Your Company"
              dataKey="company"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value) => <span className="text-white/70">{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-purple-400 font-bold">
            {Math.round(data.reduce((sum, d) => sum + d.company, 0) / data.length)}%
          </div>
          <div className="text-white/40 text-xs">Your Score</div>
        </div>
        <div>
          <div className="text-blue-400 font-bold">
            {Math.round(data.reduce((sum, d) => sum + d.industry, 0) / data.length)}%
          </div>
          <div className="text-white/40 text-xs">Industry Avg</div>
        </div>
        <div>
          <div className="text-emerald-400 font-bold">
            {Math.round(data.reduce((sum, d) => sum + d.topPerformer, 0) / data.length)}%
          </div>
          <div className="text-white/40 text-xs">Top 10%</div>
        </div>
      </div>
    </div>
  );
}
