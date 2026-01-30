'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Calendly booking link
const BOOKING_LINK = 'https://calendly.com/my-first-quest';

// Pages where we hide this widget (they have their own CTAs)
const HIDDEN_PATHS = ['/climatise'];

export function FloatingBookingWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Expanded state */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-4 w-72 bg-zinc-900 border border-blue-500/30 rounded-2xl p-5 shadow-2xl shadow-blue-500/20"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 text-white/40 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👋</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Hey there!</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Ready to scale your GTM? Book a free 30-min strategy call.
                  </p>
                  <a
                    href={BOOKING_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold transition"
                  >
                    Book Free Call →
                  </a>
                  <p className="text-white/40 text-xs mt-3">No obligation • 100% free</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative group"
          >
            {/* Animated rings */}
            <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-blue-500/40 to-blue-600/40 animate-pulse" />

            {/* Button */}
            <span className="relative flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 animate-float">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="hidden sm:inline">Book a Call</span>
              <span className="sm:hidden">📞</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
