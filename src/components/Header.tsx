'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, UserButton } from '@/lib/auth';

// Check if Neon Auth is configured
const isAuthConfigured = !!process.env.NEXT_PUBLIC_NEON_AUTH_URL;

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setArticlesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-white text-lg flex items-center gap-2">
          <span className="text-emerald-400">GTM</span>
          <span>Quest</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          {/* Articles Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setArticlesOpen(!articlesOpen)}
              className="text-white/60 hover:text-white text-sm transition flex items-center gap-1"
            >
              Articles
              <svg
                className={`w-4 h-4 transition-transform ${articlesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {articlesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                <Link
                  href="/articles"
                  onClick={() => setArticlesOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:bg-white/5 hover:text-white text-sm border-b border-white/5"
                >
                  All Articles
                </Link>
                <Link
                  href="/articles?category=guide"
                  onClick={() => setArticlesOpen(false)}
                  className="block px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white text-sm"
                >
                  <span className="text-emerald-400 mr-2">📘</span>
                  Guides & Frameworks
                </Link>
                <Link
                  href="/articles?category=comparison"
                  onClick={() => setArticlesOpen(false)}
                  className="block px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white text-sm"
                >
                  <span className="text-blue-400 mr-2">⚖️</span>
                  Tool Comparisons
                </Link>
                <Link
                  href="/articles?category=directory"
                  onClick={() => setArticlesOpen(false)}
                  className="block px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white text-sm"
                >
                  <span className="text-purple-400 mr-2">📍</span>
                  Agency Directories
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/agencies"
            className="text-white/60 hover:text-white text-sm transition"
          >
            Agencies
          </Link>

          <Link
            href="/dashboard"
            className="text-white/60 hover:text-white text-sm transition"
          >
            Dashboard
          </Link>

          {/* Auth - Sign In / User Button */}
          {mounted && isAuthConfigured && (
            <>
              <SignedOut>
                <Link
                  href="/auth/sign-in"
                  className="text-white/60 hover:text-white text-sm transition"
                >
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}

          {/* Get Started CTA */}
          {mounted && (
            <Link
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
            >
              Get Started
            </Link>
          )}

          {/* Beta Badge */}
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Beta
              </span>
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
