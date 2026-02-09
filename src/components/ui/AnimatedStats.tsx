'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

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
    <div
      className={`bg-zinc-900/80 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'
      }`}
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
          <div
            className={`text-2xl transition-all duration-500 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            style={{ transitionDelay: `${delay + 300}ms` }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
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
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    // Delay visibility for initial animation
    const visibilityTimer = setTimeout(() => setIsVisible(true), 500);

    // Animate the progress value
    const progressTimer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(progressTimer);
    };
  }, [progress]);

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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-2xl font-bold text-white transition-all duration-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <CountUp end={progress} duration={1.5} suffix="%" />
        </span>
      </div>
    </div>
  );
}
