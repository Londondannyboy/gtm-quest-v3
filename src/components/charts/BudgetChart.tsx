'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BudgetAllocation {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

function calculateBudgetAllocation(budget: number, strategy?: string): BudgetAllocation[] {
  // Budget allocation varies by strategy
  const allocations: Record<string, Record<string, number>> = {
    plg: {
      'Product': 30,
      'Content & SEO': 25,
      'Paid Acquisition': 20,
      'Community': 15,
      'Sales': 10,
    },
    sales_led: {
      'Sales Team': 35,
      'ABM & Outbound': 25,
      'Content & SEO': 20,
      'Events': 12,
      'Tools': 8,
    },
    hybrid: {
      'Sales Team': 25,
      'Product': 20,
      'Content & SEO': 20,
      'Paid Acquisition': 20,
      'Events': 15,
    },
    default: {
      'Content & SEO': 25,
      'Paid Acquisition': 25,
      'Sales': 20,
      'Events': 15,
      'Tools': 15,
    },
  };

  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  const allocation = allocations[strategy || 'default'] || allocations.default;

  return Object.entries(allocation).map(([category, percentage], index) => ({
    category,
    percentage,
    amount: Math.round((budget * percentage) / 100),
    color: colors[index % colors.length],
  }));
}

export function BudgetChart({
  budget,
  strategy,
}: {
  budget?: number;
  strategy?: string;
}) {
  const monthlyBudget = budget || 10000;
  const data = calculateBudgetAllocation(monthlyBudget, strategy);

  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white">Budget Allocation</h3>
          <p className="text-white/50 text-sm">
            ${monthlyBudget.toLocaleString()}/mo recommended split
          </p>
        </div>
        <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">
          Monthly
        </span>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
            <XAxis
              type="number"
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <YAxis
              type="category"
              dataKey="category"
              stroke="#666"
              fontSize={11}
              width={100}
              tick={{ fill: '#999' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                      <div className="text-white font-medium">{item.category}</div>
                      <div className="text-emerald-400">
                        ${item.amount.toLocaleString()} ({item.percentage}%)
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.category} className="text-center">
            <div className="text-xs font-bold" style={{ color: item.color }}>
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
