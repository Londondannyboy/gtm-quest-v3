'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TOCItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
}

const tocItems: TOCItem[] = [
  { id: 'tldr', label: 'Quick Summary', shortLabel: 'TL;DR', icon: '⚡' },
  { id: 'what-is-gtm', label: 'What is GTM Agency Matching?', shortLabel: 'What is GTM?', icon: '❓' },
  { id: 'top-agencies-2026', label: 'Top 10 GTM Agencies 2026', shortLabel: 'Top 10', icon: '🏆' },
  { id: 'gtm-agencies-by-country', label: 'GTM Agencies by Country', shortLabel: 'By Country', icon: '🌍' },
  { id: 'resources', label: 'GTM Resources & Guides', shortLabel: 'Resources', icon: '📚' },
  { id: 'faq', label: 'Frequently Asked Questions', shortLabel: 'FAQ', icon: '💬' },
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const activeIndex = tocItems.findIndex((t) => t.id === activeSection);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / tocItems.length) * 100 : 0;

  return (
    <>
      {/* Mobile: Horizontal scrollable pills */}
      <nav
        className="lg:hidden sticky top-14 z-30 bg-black/95 backdrop-blur-sm border-b border-white/10 -mx-4 px-4"
        aria-label="Table of contents"
      >
        <div className="flex gap-2 py-3 overflow-x-auto no-scrollbar">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                activeSection === item.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.shortLabel}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop: Floating sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isSticky ? 1 : 0, x: isSticky ? 0 : -20 }}
        className="hidden lg:block fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
        style={{ pointerEvents: isSticky ? 'auto' : 'none' }}
        aria-label="Table of contents"
      >
        <div className="bg-zinc-900/95 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            On This Page
          </div>
          <ul className="space-y-1">
            {tocItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const isPast = activeIndex > index;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition group ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400'
                        : isPast
                          ? 'text-white/50 hover:text-white/70'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm
                        ${isActive ? 'bg-blue-500/30' : 'bg-white/5 group-hover:bg-white/10'}`}
                    >
                      {isPast ? '✓' : item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.shortLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Progress indicator */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-white/70">
                {activeIndex + 1}/{tocItems.length}
              </span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Inline TOC for desktop - cleaner design */}
      <div className="hidden lg:block bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          On This Page
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {tocItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 text-white/80 hover:text-blue-400 transition py-2 group w-full text-left"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-blue-500/20 flex items-center justify-center text-sm transition">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
