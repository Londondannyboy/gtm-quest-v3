'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface GrowthData {
  year: string;
  conservative: number;
  moderate: number;
  aggressive: number;
}

// Growth projections based on strategy type
function generateGrowthData(startingRevenue: number = 100, strategy?: string): GrowthData[] {
  const years = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
  const growthRates = {
    plg: { conservative: 0.5, moderate: 1.0, aggressive: 2.0 },
    sales_led: { conservative: 0.3, moderate: 0.6, aggressive: 1.2 },
    hybrid: { conservative: 0.4, moderate: 0.8, aggressive: 1.5 },
    default: { conservative: 0.3, moderate: 0.5, aggressive: 1.0 },
  };

  const rates = growthRates[strategy as keyof typeof growthRates] || growthRates.default;

  return years.map((year, index) => ({
    year,
    conservative: Math.round(startingRevenue * Math.pow(1 + rates.conservative, index)),
    moderate: Math.round(startingRevenue * Math.pow(1 + rates.moderate, index)),
    aggressive: Math.round(startingRevenue * Math.pow(1 + rates.aggressive, index)),
  }));
}

export function GrowthChart({
  strategy,
  budget,
}: {
  strategy?: string;
  budget?: number;
}) {
  const startingRevenue = budget ? budget * 12 : 100; // Annual revenue proxy
  const data = generateGrowthData(startingRevenue, strategy);

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}M`;
    }
    return `$${value}K`;
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white">5-Year Growth Projection</h3>
          <p className="text-white/50 text-sm">
            {strategy ? strategy.replace('_', '-').replace(/\b\w/g, l => l.toUpperCase()) : 'General'} Strategy
          </p>
        </div>
        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
          Projection
        </span>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="year"
              stroke="#666"
              fontSize={12}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={formatValue}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                      <div className="text-white font-medium mb-2">{label}</div>
                      {payload.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-white/60">{entry.name}:</span>
                          <span className="text-white">{formatValue(entry.value as number)}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="aggressive"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorAggressive)"
              name="Aggressive"
            />
            <Area
              type="monotone"
              dataKey="moderate"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorModerate)"
              name="Moderate"
            />
            <Line
              type="monotone"
              dataKey="conservative"
              stroke="#8b5cf6"
              strokeDasharray="5 5"
              name="Conservative"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-white/60 text-xs">Aggressive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-white/60 text-xs">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-purple-500" />
          <span className="text-white/60 text-xs">Conservative</span>
        </div>
      </div>
    </div>
  );
}
