'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface TAMData {
  tam: number; // Total Addressable Market
  sam: number; // Serviceable Addressable Market
  som: number; // Serviceable Obtainable Market
  industry: string;
}

// Industry TAM data lookup (in billions)
const INDUSTRY_DATA: Record<string, TAMData> = {
  saas: { tam: 250, sam: 75, som: 7.5, industry: 'SaaS' },
  fintech: { tam: 200, sam: 60, som: 6, industry: 'FinTech' },
  healthtech: { tam: 180, sam: 45, som: 4.5, industry: 'HealthTech' },
  edtech: { tam: 120, sam: 30, som: 3, industry: 'EdTech' },
  ecommerce: { tam: 500, sam: 100, som: 10, industry: 'E-commerce' },
  ai: { tam: 400, sam: 80, som: 8, industry: 'AI/ML' },
  games: { tam: 200, sam: 40, som: 4, industry: 'Gaming' },
  b2b: { tam: 300, sam: 90, som: 9, industry: 'B2B Services' },
  enterprise: { tam: 350, sam: 105, som: 10.5, industry: 'Enterprise Software' },
  cybersecurity: { tam: 150, sam: 45, som: 4.5, industry: 'Cybersecurity' },
  martech: { tam: 120, sam: 36, som: 3.6, industry: 'MarTech' },
  default: { tam: 200, sam: 50, som: 5, industry: 'Technology' },
};

function getIndustryData(industry?: string): TAMData {
  if (!industry) return INDUSTRY_DATA.default;

  const lower = industry.toLowerCase();
  for (const [key, data] of Object.entries(INDUSTRY_DATA)) {
    if (lower.includes(key) || key.includes(lower)) {
      return data;
    }
  }
  return INDUSTRY_DATA.default;
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6'];

export function TAMChart({ industry }: { industry?: string }) {
  const data = getIndustryData(industry);

  const chartData = [
    { name: 'TAM', value: data.tam, fullName: 'Total Addressable Market' },
    { name: 'SAM', value: data.sam, fullName: 'Serviceable Addressable Market' },
    { name: 'SOM', value: data.som, fullName: 'Serviceable Obtainable Market' },
  ];

  return (
    <div className="bg-zinc-900 rounded-xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white">Market Opportunity</h3>
          <p className="text-white/50 text-sm">{data.industry} Industry</p>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
          TAM/SAM/SOM
        </span>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
                      <div className="text-white font-medium">{item.fullName}</div>
                      <div className="text-emerald-400">${item.value}B</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              formatter={(value) => <span className="text-white/70 text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="text-center">
            <div className="text-lg font-bold" style={{ color: COLORS[index] }}>
              ${item.value}B
            </div>
            <div className="text-white/40 text-xs">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
