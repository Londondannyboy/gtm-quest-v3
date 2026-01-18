'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
    </div>
  ),
});

// Region coordinates
const REGION_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  'United States': { lat: 39.8283, lng: -98.5795, name: 'United States' },
  'USA': { lat: 39.8283, lng: -98.5795, name: 'United States' },
  'North America': { lat: 39.8283, lng: -98.5795, name: 'North America' },
  'United Kingdom': { lat: 55.3781, lng: -3.4360, name: 'United Kingdom' },
  'UK': { lat: 55.3781, lng: -3.4360, name: 'United Kingdom' },
  'Europe': { lat: 54.5260, lng: 15.2551, name: 'Europe' },
  'EMEA': { lat: 48.8566, lng: 2.3522, name: 'EMEA' },
  'Germany': { lat: 51.1657, lng: 10.4515, name: 'Germany' },
  'France': { lat: 46.2276, lng: 2.2137, name: 'France' },
  'APAC': { lat: 34.0479, lng: 100.6197, name: 'Asia Pacific' },
  'Asia Pacific': { lat: 34.0479, lng: 100.6197, name: 'Asia Pacific' },
  'Australia': { lat: -25.2744, lng: 133.7751, name: 'Australia' },
  'Singapore': { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  'Japan': { lat: 36.2048, lng: 138.2529, name: 'Japan' },
  'India': { lat: 20.5937, lng: 78.9629, name: 'India' },
  'Canada': { lat: 56.1304, lng: -106.3468, name: 'Canada' },
  'LATAM': { lat: -14.2350, lng: -51.9253, name: 'Latin America' },
  'Brazil': { lat: -14.2350, lng: -51.9253, name: 'Brazil' },
  'Middle East': { lat: 29.2985, lng: 42.5510, name: 'Middle East' },
  'Global': { lat: 20, lng: 0, name: 'Global' },
  'Worldwide': { lat: 20, lng: 0, name: 'Worldwide' },
};

interface Globe3DProps {
  regions?: string[];
  size?: number;
  autoRotate?: boolean;
}

export function Globe3D({ regions = [], size = 300, autoRotate = true }: Globe3DProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  // Convert region names to coordinates
  const points = regions
    .map((region) => {
      const coord = REGION_COORDS[region];
      if (coord) {
        return {
          lat: coord.lat,
          lng: coord.lng,
          name: coord.name,
          size: 0.5,
          color: '#10b981',
        };
      }
      return null;
    })
    .filter((p): p is { lat: number; lng: number; name: string; size: number; color: string } => p !== null);

  // Add some default points if no regions specified
  const displayPoints = points.length > 0 ? points : [
    { lat: 39.8283, lng: -98.5795, name: 'North America', size: 0.4, color: '#10b981' },
    { lat: 55.3781, lng: -3.4360, name: 'Europe', size: 0.4, color: '#3b82f6' },
    { lat: 34.0479, lng: 100.6197, name: 'Asia Pacific', size: 0.4, color: '#8b5cf6' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (globeRef.current && autoRotate) {
      try {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
        }
      } catch {
        // Controls not available yet
      }
    }
  }, [autoRotate, mounted]);

  if (!mounted) {
    return (
      <div
        className="flex items-center justify-center bg-zinc-900/50 rounded-xl"
        style={{ width: size, height: size }}
      >
        <div className="animate-pulse text-white/30">Loading globe...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <Globe
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={displayPoints}
        pointAltitude={0.1}
        pointColor="color"
        pointRadius="size"
        pointsMerge={true}
        atmosphereColor="#10b981"
        atmosphereAltitude={0.15}
        // Arc connections between points
        arcsData={displayPoints.length > 1 ? displayPoints.slice(0, -1).map((p, i) => ({
          startLat: p?.lat,
          startLng: p?.lng,
          endLat: displayPoints[i + 1]?.lat,
          endLng: displayPoints[i + 1]?.lng,
          color: '#10b981',
        })) : []}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
      />

      {/* Legend */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-white/50 text-xs">
          {displayPoints.length} Target {displayPoints.length === 1 ? 'Region' : 'Regions'}
        </div>
      </div>
    </motion.div>
  );
}

// Compact version for dashboard
export function Globe3DCompact({ regions = [] }: { regions?: string[] }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-white text-sm">Market Reach</h3>
          <p className="text-white/50 text-xs">Target regions</p>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
          Global
        </span>
      </div>
      <div className="flex justify-center">
        <Globe3D regions={regions} size={200} />
      </div>
    </div>
  );
}
