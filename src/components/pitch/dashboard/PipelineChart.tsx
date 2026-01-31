'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CurrencyCode, CURRENCIES } from '@/types/pitch';

interface PipelineDataPoint {
  month: string;
  conservative: number;
  expected: number;
  optimistic: number;
}

interface PipelineChartProps {
  data: PipelineDataPoint[];
  currency?: CurrencyCode;
  title?: string;
}

/**
 * Pipeline projection chart showing conservative, expected, and optimistic scenarios.
 */
export function PipelineChart({
  data,
  currency = 'GBP',
  title = 'Pipeline Projection',
}: PipelineChartProps) {
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
      return (
        <div className="bg-zinc-800 border border-white/10 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-6">{title}</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
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
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-white/70 text-sm">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="conservative"
              name="Conservative"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorConservative)"
            />
            <Area
              type="monotone"
              dataKey="expected"
              name="Expected"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorExpected)"
            />
            <Area
              type="monotone"
              dataKey="optimistic"
              name="Optimistic"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorOptimistic)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
