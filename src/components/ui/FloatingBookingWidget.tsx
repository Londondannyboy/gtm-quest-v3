'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

// Pages where we hide this widget (they have their own CTAs)
const HIDDEN_PATHS = ['/climatise'];

export function FloatingBookingWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Hide on certain pages
  const isHiddenPage = HIDDEN_PATHS.some(path => pathname?.startsWith(path));

  useEffect(() => {
    if (isHiddenPage) return;

    // Show widget after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHiddenPage]);

  // Don't render on hidden pages
  if (isHiddenPage) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <a
        href={BOOKING_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group block"
      >
        {/* Animated rings - CSS only */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-emerald-500/40 to-emerald-600/40 animate-pulse" />

        {/* Button */}
        <span className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-emerald-500/30 transition-all">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="hidden sm:inline">Book a Call</span>
          <span className="sm:hidden">📞</span>
        </span>
      </a>
    </div>
  );
}
