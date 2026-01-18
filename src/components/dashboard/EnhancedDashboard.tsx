'use client';

import { motion } from 'framer-motion';
import { AnimatedStat, AnimatedProgressRing } from '@/components/ui/AnimatedStats';
import { Globe3DCompact } from '@/components/visualizations/Globe3D';
import { TAMChart } from '@/components/charts/TAMChart';
import { GrowthChart } from '@/components/charts/GrowthChart';
import { BudgetChart } from '@/components/charts/BudgetChart';
import { BenchmarkChart } from '@/components/charts/BenchmarkChart';

interface GTMRequirements {
  company_name?: string;
  industry?: string;
  category?: string;
  maturity?: string;
  target_market?: string;
  target_regions?: string[];
  strategy_type?: string;
  budget?: number;
  primary_goal?: string;
}

interface EnhancedDashboardProps {
  requirements: GTMRequirements;
  progress: number;
  agencyCount: number;
}

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export function EnhancedDashboard({
  requirements,
  progress,
  agencyCount,
}: EnhancedDashboardProps) {
  const hasEnoughData =
    requirements.industry ||
    requirements.category ||
    requirements.strategy_type ||
    requirements.budget;

  if (!hasEnoughData) {
    return null;
  }

  // Calculate estimated metrics
  const estimatedCAC = requirements.budget
    ? Math.round((requirements.budget * 0.3) / 10)
    : 0;
  const estimatedLeads = requirements.budget
    ? Math.round(requirements.budget / (estimatedCAC || 100))
    : 0;
  const estimatedROI = requirements.strategy_type === 'plg' ? 340 : 280;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Progress */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-white/10"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {requirements.company_name
              ? `${requirements.company_name}'s GTM Dashboard`
              : 'Your GTM Dashboard'}
          </h2>
          <p className="text-white/50">
            Real-time market intelligence based on your profile
          </p>
        </div>
        <AnimatedProgressRing progress={progress} size={100} />
      </motion.div>

      {/* Key Metrics Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedStat
          value={agencyCount}
          label="Matched Agencies"
          sublabel="Ready to connect"
          icon={<span>🎯</span>}
          color="emerald"
          delay={0}
        />
        <AnimatedStat
          value={estimatedLeads}
          label="Est. Monthly Leads"
          sublabel="Based on budget"
          icon={<span>📈</span>}
          color="blue"
          delay={150}
        />
        <AnimatedStat
          value={estimatedCAC}
          prefix="$"
          label="Est. CAC"
          sublabel="Industry benchmark"
          icon={<span>💰</span>}
          color="purple"
          delay={300}
        />
        <AnimatedStat
          value={estimatedROI}
          suffix="%"
          label="Expected ROI"
          sublabel="12-month projection"
          icon={<span>🚀</span>}
          color="yellow"
          delay={450}
        />
      </motion.div>

      {/* Main Charts Grid */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-4">
        {/* TAM/SAM/SOM */}
        {(requirements.industry || requirements.category) && (
          <motion.div variants={itemVariants}>
            <TAMChart industry={requirements.industry || requirements.category} />
          </motion.div>
        )}

        {/* 3D Globe - Target Regions */}
        {requirements.target_regions && requirements.target_regions.length > 0 ? (
          <motion.div variants={itemVariants}>
            <Globe3DCompact regions={requirements.target_regions} />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Globe3DCompact regions={['North America', 'Europe', 'APAC']} />
          </motion.div>
        )}

        {/* Growth Projection */}
        {requirements.strategy_type && (
          <motion.div variants={itemVariants}>
            <GrowthChart
              strategy={requirements.strategy_type}
              budget={requirements.budget}
            />
          </motion.div>
        )}

        {/* Budget Allocation */}
        {requirements.budget && (
          <motion.div variants={itemVariants}>
            <BudgetChart
              budget={requirements.budget}
              strategy={requirements.strategy_type}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Benchmark Chart - Full Width */}
      {(requirements.industry || requirements.maturity) && (
        <motion.div variants={itemVariants}>
          <BenchmarkChart
            industry={requirements.industry}
            maturity={requirements.maturity}
          />
        </motion.div>
      )}

      {/* Quick Insights */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl p-6 border border-emerald-500/20"
      >
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-xl">💡</span>
          AI Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <InsightCard
            title="Market Timing"
            content={`The ${requirements.industry || 'technology'} market is showing strong growth signals. Now is an optimal time to invest in GTM.`}
            type="positive"
          />
          <InsightCard
            title="Strategy Fit"
            content={`A ${requirements.strategy_type?.replace('_', '-') || 'hybrid'} approach aligns well with your ${requirements.maturity || 'growth'} stage and target market.`}
            type="neutral"
          />
          <InsightCard
            title="Recommendation"
            content={`Consider partnering with agencies specializing in ${requirements.primary_goal || 'demand generation'} for fastest results.`}
            type="action"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function InsightCard({
  title,
  content,
  type,
}: {
  title: string;
  content: string;
  type: 'positive' | 'neutral' | 'action';
}) {
  const colors = {
    positive: 'border-emerald-500/30 bg-emerald-500/5',
    neutral: 'border-blue-500/30 bg-blue-500/5',
    action: 'border-purple-500/30 bg-purple-500/5',
  };

  const icons = {
    positive: '✅',
    neutral: '📊',
    action: '🎯',
  };

  return (
    <div className={`rounded-xl p-4 border ${colors[type]}`}>
      <div className="flex items-center gap-2 mb-2">
        <span>{icons[type]}</span>
        <span className="font-medium text-white text-sm">{title}</span>
      </div>
      <p className="text-white/60 text-sm">{content}</p>
    </div>
  );
}
