'use client';

import { useState } from 'react';

interface TOCItem {
  id: string;
  label: string;
  icon?: string;
}

const tocItems: TOCItem[] = [
  { id: 'tldr', label: 'Quick Summary', icon: '1' },
  { id: 'what-is-gtm', label: 'What is GTM Agency Matching?', icon: '2' },
  { id: 'top-agencies-2026', label: 'Top 10 GTM Agencies 2026', icon: '3' },
  { id: 'gtm-agencies-by-country', label: 'GTM Agencies by Country', icon: '4' },
  { id: 'resources', label: 'GTM Resources & Guides', icon: '5' },
  { id: 'faq', label: 'Frequently Asked Questions', icon: '6' },
];

export function TableOfContents() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 md:p-6 mb-8" aria-label="Table of contents">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full md:cursor-default"
      >
        <h2 className="text-sm font-bold text-white/80 uppercase tracking-wider">
          On This Page
        </h2>
        <span className="md:hidden text-white/40">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      <ul className={`mt-4 space-y-2 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-3 text-white/60 hover:text-emerald-400 transition py-1 group"
            >
              <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-emerald-500/20 flex items-center justify-center text-xs font-medium">
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
