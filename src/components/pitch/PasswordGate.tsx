'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PasswordGateProps {
  clientSlug: string;
  clientLogo: string;
  clientName: string;
  tagline: string;
  password: string;
  gradientColors?: { from: string; to: string };
  children: React.ReactNode;
}

/**
 * Password protection wrapper for pitch pages.
 * Uses sessionStorage to persist auth state during session.
 */
export function PasswordGate({
  clientSlug,
  clientLogo,
  clientName,
  tagline,
  password,
  gradientColors = { from: 'blue-500', to: 'green-500' },
  children,
}: PasswordGateProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Session storage key for this specific client
  const storageKey = `${clientSlug}-auth`;

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem(storageKey);
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [storageKey]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsAuthenticated(true);
      sessionStorage.setItem(storageKey, 'true');
      setError('');
      // Track unlock event (future: analytics)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('pitch-unlocked', { detail: { clientSlug } })
        );
      }
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Show loading state while checking session
  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            {/* Client logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 inline-block"
            >
              <Image
                src={clientLogo}
                alt={clientName}
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </motion.div>

            {/* Statement of intent */}
            <h1 className="text-2xl font-bold text-white mb-3">{tagline}</h1>
            <p className="text-white/50 text-sm">
              GTM proposal prepared exclusively for {clientName}.
            </p>
          </div>

          <form
            onSubmit={handlePasswordSubmit}
            className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
          >
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                placeholder="Enter password to continue"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-${gradientColors.from} to-${gradientColors.to} hover:opacity-90 text-white py-3 rounded-lg font-semibold transition`}
            >
              View Proposal
            </button>
          </form>

          <p className="text-center text-white/40 text-xs mt-6">
            Confidential. Prepared by{' '}
            <a
              href="https://gtm.quest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              GTM Quest
            </a>
          </p>
        </motion.div>
      </main>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
}
