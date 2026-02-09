'use client';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CurrencyCode, CURRENCIES } from '@/types/pitch';

interface ROIDataPoint {
  month: string;
  cumulativeRevenue: number;
  cumulativeInvestment: number;
  roi: number;
}

interface ROITimelineProps {
  data: ROIDataPoint[];
  currency?: CurrencyCode;
  breakEvenMonth?: string;
  title?: string;
}

/**
 * ROI timeline chart showing cumulative revenue vs investment.
 */
export function ROITimeline({
  data,
  currency = 'GBP',
  breakEvenMonth,
  title = 'ROI Timeline',
}: ROITimelineProps) {
  const currencySymbol = CURRENCIES[currency].symbol;

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${currencySymbol}${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const revenue = payload.find((p) => p.name === 'Revenue')?.value || 0;
      const investment = payload.find((p) => p.name === 'Investment')?.value || 0;
      const roiValue = investment > 0 ? ((revenue - investment) / investment) * 100 : 0;

      return (
        <div className="bg-zinc-800 border border-white/10 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatValue(entry.value)}
            </p>
          ))}
          <p className="text-sm text-white/70 mt-2 pt-2 border-t border-white/10">
            ROI: <span className={roiValue >= 0 ? 'text-green-400' : 'text-red-400'}>
              {roiValue.toFixed(0)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Find break-even point index
  const breakEvenIndex = data.findIndex(
    (d) => d.cumulativeRevenue >= d.cumulativeInvestment
  );

  return (
    <div
      className="bg-zinc-900 border border-white/10 rounded-2xl p-6 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {breakEvenMonth && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">Break-even:</span>
            <span className="text-sm font-bold text-green-400">{breakEvenMonth}</span>
          </div>
        )}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="month"
              stroke="#666"
              tick={{ fill: '#999', fontSize: 12 }}
            />
            <YAxis
              stroke="#666"
              tick={{ fill: '#999', fontSize: 12 }}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Break-even reference line */}
            {breakEvenIndex >= 0 && (
              <ReferenceLine
                x={data[breakEvenIndex]?.month}
                stroke="#22c55e"
                strokeDasharray="5 5"
                label={{
                  value: 'Break-even',
                  position: 'top',
                  fill: '#22c55e',
                  fontSize: 12,
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey="cumulativeRevenue"
              name="Revenue"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              type="monotone"
              dataKey="cumulativeInvestment"
              name="Investment"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-white/70">Cumulative Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-white/70">Total Investment</span>
        </div>
      </div>
    </div>
  );
}
