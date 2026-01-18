'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  color?: 'emerald' | 'blue' | 'purple' | 'yellow' | 'white';
  delay?: number;
}

const colorClasses = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  yellow: 'text-yellow-400',
  white: 'text-white',
};

export function AnimatedStat({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  icon,
  color = 'emerald',
  delay = 0,
}: AnimatedStatProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white/50 text-xs mb-1">{label}</div>
          <div className={`text-3xl font-bold ${colorClasses[color]}`}>
            {isVisible ? (
              <>
                {prefix}
                <CountUp
                  end={value}
                  duration={2}
                  separator=","
                  decimals={value % 1 !== 0 ? 1 : 0}
                />
                {suffix}
              </>
            ) : (
              <span className="opacity-0">{prefix}{value}{suffix}</span>
            )}
          </div>
          {sublabel && (
            <div className="text-white/40 text-xs mt-1">{sublabel}</div>
          )}
        </div>
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1, rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
            className="text-2xl"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

interface AnimatedStatsGridProps {
  stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    sublabel?: string;
    icon?: React.ReactNode;
    color?: 'emerald' | 'blue' | 'purple' | 'yellow' | 'white';
  }>;
}

export function AnimatedStatsGrid({ stats }: AnimatedStatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <AnimatedStat
          key={stat.label}
          {...stat}
          delay={index * 150}
        />
      ))}
    </div>
  );
}

// Animated progress ring
export function AnimatedProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#10b981',
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-white"
        >
          <CountUp end={progress} duration={1.5} suffix="%" />
        </motion.span>
      </div>
    </div>
  );
}
