'use client';

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { CurrencyConfig, MonthlyProjection, ABMProjection } from '@/types/pitch';
import { COLDIQ_BENCHMARKS } from '@/types/pitch';

interface TimelineProjectionProps {
  currency: CurrencyConfig;
  monthlyTouches: number;        // Base monthly outreach volume
  responseRate: number;          // Decimal (e.g., 0.14 for 14%)
  meetingRate: number;           // Decimal
  closeRate: number;             // Decimal
  avgDealSize: number;           // In base currency (GBP)
  totalInvestment: number;       // Total first-year investment
}

export function TimelineProjection({
  currency,
  monthlyTouches,
  responseRate,
  meetingRate,
  closeRate,
  avgDealSize,
  totalInvestment,
}: TimelineProjectionProps) {
  const projection = useMemo((): ABMProjection => {
    const timeline: MonthlyProjection[] = [];

    let cumulativeTouches = 0;
    let cumulativeResponses = 0;
    let cumulativeMeetings = 0;
    let cumulativePipeline = 0;
    let cumulativeClosedDeals = 0;
    let cumulativeRevenue = 0;

    // Month-by-month projection using ColdIQ timeline benchmarks
    for (let month = 1; month <= 12; month++) {
      // Ramp-up factor (Month 1 = 50%, Month 2 = 75%, Month 3+ = 100%)
      const rampFactor = month === 1 ? 0.5 : month === 2 ? 0.75 : 1.0;

      // Monthly metrics
      const touches = Math.round(monthlyTouches * rampFactor);
      const responses = Math.round(touches * responseRate);
      const meetings = Math.round(responses * meetingRate);

      // Pipeline and closes lag by ~2-3 months (ColdIQ benchmark)
      const pipelineDelayFactor = month <= 1 ? 0 : month === 2 ? 0.3 : 1.0;
      const closeDelayFactor = month <= 2 ? 0 : month === 3 ? 0.2 : month === 4 ? 0.5 : 1.0;

      const newPipeline = Math.round(meetings * avgDealSize * pipelineDelayFactor);
      const closedDeals = meetings * closeRate * closeDelayFactor;
      const revenue = closedDeals * avgDealSize;

      cumulativeTouches += touches;
      cumulativeResponses += responses;
      cumulativeMeetings += meetings;
      cumulativePipeline += newPipeline;
      cumulativeClosedDeals += closedDeals;
      cumulativeRevenue += revenue;

      // Calculate cumulative ROI
      const cumulativeROI = totalInvestment > 0
        ? ((cumulativeRevenue - totalInvestment) / totalInvestment) * 100
        : 0;

      // Determine phase
      let phase: MonthlyProjection['phase'] = 'awareness';
      if (month >= 4) phase = 'velocity';
      else if (month >= 3) phase = 'pipeline';
      else if (month >= 2) phase = 'building';

      timeline.push({
        month,
        touches: cumulativeTouches,
        responses: cumulativeResponses,
        meetings: cumulativeMeetings,
        pipelineValue: cumulativePipeline,
        closedDeals: Math.round(cumulativeClosedDeals * 10) / 10,
        revenue: Math.round(cumulativeRevenue),
        cumulativeROI: Math.round(cumulativeROI),
        phase,
      });
    }

    // Find break-even month
    const breakEvenMonth = timeline.findIndex((m) => m.cumulativeROI >= 0) + 1 || 12;

    // Calculate payback period more precisely
    const lastMonth = timeline[11];
    const paybackPeriod = totalInvestment > 0
      ? totalInvestment / (lastMonth.revenue / 12)
      : 0;

    return {
      timeline,
      breakEvenMonth: Math.max(breakEvenMonth, COLDIQ_BENCHMARKS.timeToFirstDeal),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      firstMeetingMonth: COLDIQ_BENCHMARKS.timeToFirstMeeting,
      firstDealMonth: Math.ceil(COLDIQ_BENCHMARKS.timeToFirstDeal),
      totalPipeline: lastMonth.pipelineValue,
      totalRevenue: lastMonth.revenue,
      totalROI: lastMonth.cumulativeROI,
    };
  }, [monthlyTouches, responseRate, meetingRate, closeRate, avgDealSize, totalInvestment]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${currency.symbol}${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${currency.symbol}${(amount / 1000).toFixed(0)}K`;
    }
    return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
  };

  // Chart data for pipeline curve
  const chartData = projection.timeline.map((m) => ({
    month: `M${m.month}`,
    pipeline: Math.round(m.pipelineValue * currency.rate),
    revenue: Math.round(m.revenue * currency.rate),
  }));

  return (
    <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          📅 12-Month Projection
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Based on ColdIQ benchmarks: Month 2 meetings, Month 3-4 first deals
        </p>
      </div>

      {/* Key Milestones */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-zinc-800/50 rounded-xl text-center">
          <p className="text-[10px] text-zinc-500 uppercase">First Meeting</p>
          <p className="text-lg font-bold text-white">Month {projection.firstMeetingMonth}</p>
        </div>
        <div className="p-3 bg-zinc-800/50 rounded-xl text-center">
          <p className="text-[10px] text-zinc-500 uppercase">First Deal</p>
          <p className="text-lg font-bold text-green-400">Month {projection.firstDealMonth}</p>
        </div>
        <div className="p-3 bg-zinc-800/50 rounded-xl text-center">
          <p className="text-[10px] text-zinc-500 uppercase">Break-Even</p>
          <p className="text-lg font-bold text-amber-400">Month {projection.breakEvenMonth}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl text-center border border-green-500/20">
          <p className="text-[10px] text-zinc-500 uppercase">12-Month ROI</p>
          <p className="text-lg font-bold text-green-400">{projection.totalROI}%</p>
        </div>
      </div>

      {/* Pipeline Chart */}
      <div className="mb-6 bg-zinc-800/30 rounded-xl p-4">
        <p className="text-xs text-zinc-500 mb-3">Pipeline Growth Curve</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 10 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [
                  formatCurrency(value as number),
                  '',
                ]}
              />
              <ReferenceLine
                x="M3"
                stroke="#f59e0b"
                strokeDasharray="3 3"
                label={{ value: 'Break-even', fill: '#f59e0b', fontSize: 10, position: 'top' }}
              />
              <Area
                type="monotone"
                dataKey="pipeline"
                stroke="#22c55e"
                fill="url(#pipelineGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-zinc-400">Pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-zinc-400">Closed Revenue</span>
          </div>
        </div>
      </div>

      {/* Month-by-Month Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-500 text-xs">
              <th className="text-left py-2 px-2">Mo</th>
              <th className="text-right py-2 px-2">Touches</th>
              <th className="text-right py-2 px-2">Responses</th>
              <th className="text-right py-2 px-2">Meetings</th>
              <th className="text-right py-2 px-2">Pipeline</th>
              <th className="text-right py-2 px-2">Closed</th>
              <th className="text-right py-2 px-2">Phase</th>
            </tr>
          </thead>
          <tbody>
            {projection.timeline.slice(0, 6).map((m) => (
              <tr
                key={m.month}
                className="border-t border-zinc-800 transition-opacity duration-300"
              >
                <td className="py-2 px-2 text-white font-medium">{m.month}</td>
                <td className="py-2 px-2 text-right text-zinc-400">{m.touches.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-zinc-400">{m.responses.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-zinc-300">{m.meetings.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-green-400">
                  {formatCurrency(m.pipelineValue * currency.rate)}
                </td>
                <td className="py-2 px-2 text-right text-amber-400">
                  {formatCurrency(m.revenue * currency.rate)}
                </td>
                <td className="py-2 px-2 text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      m.phase === 'awareness'
                        ? 'bg-zinc-700 text-zinc-400'
                        : m.phase === 'building'
                        ? 'bg-blue-500/20 text-blue-400'
                        : m.phase === 'pipeline'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {m.phase}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="border-t border-zinc-700">
              <td colSpan={7} className="py-2 px-2 text-center text-xs text-zinc-500">
                ... Months 7-12 continue at full velocity
              </td>
            </tr>
            <tr
              className="border-t border-zinc-600 bg-zinc-800/30 transition-opacity duration-300"
            >
              <td className="py-2 px-2 text-white font-bold">12</td>
              <td className="py-2 px-2 text-right text-zinc-300 font-medium">
                {projection.timeline[11].touches.toLocaleString()}
              </td>
              <td className="py-2 px-2 text-right text-zinc-300 font-medium">
                {projection.timeline[11].responses.toLocaleString()}
              </td>
              <td className="py-2 px-2 text-right text-white font-medium">
                {projection.timeline[11].meetings.toLocaleString()}
              </td>
              <td className="py-2 px-2 text-right text-green-400 font-bold">
                {formatCurrency(projection.totalPipeline * currency.rate)}
              </td>
              <td className="py-2 px-2 text-right text-amber-400 font-bold">
                {formatCurrency(projection.totalRevenue * currency.rate)}
              </td>
              <td className="py-2 px-2 text-right">
                <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                  velocity
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-xl border border-green-500/20">
          <p className="text-xs text-zinc-500 mb-1">Total Pipeline</p>
          <p className="text-xl font-bold text-green-400">
            {formatCurrency(projection.totalPipeline * currency.rate)}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl border border-amber-500/20">
          <p className="text-xs text-zinc-500 mb-1">Closed Revenue</p>
          <p className="text-xl font-bold text-amber-400">
            {formatCurrency(projection.totalRevenue * currency.rate)}
          </p>
        </div>
        <div className="p-4 bg-zinc-800/50 rounded-xl">
          <p className="text-xs text-zinc-500 mb-1">Payback Period</p>
          <p className="text-xl font-bold text-white">
            {projection.paybackPeriod > 0 ? `${projection.paybackPeriod} mo` : '—'}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-zinc-600 mt-4 text-center">
        Projections based on ColdIQ case study benchmarks. Your results may vary based on ICP, messaging quality, and market conditions.
      </p>
    </div>
  );
}

export default TimelineProjection;
