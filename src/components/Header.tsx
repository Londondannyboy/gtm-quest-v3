'use client';

import { UserButton, SignedIn, SignedOut } from '@/lib/auth';
import Link from 'next/link';

// Check if Neon Auth is configured
const isAuthConfigured = typeof window !== 'undefined'
  ? !!process.env.NEXT_PUBLIC_NEON_AUTH_URL
  : false;

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-white text-lg">
          GTM Quest
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/articles"
            className="text-white/60 hover:text-white text-sm transition"
          >
            Articles
          </Link>

          {/* Auth Button - only show if configured */}
          {isAuthConfigured ? (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/auth/sign-in"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Sign In
                </Link>
              </SignedOut>
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
