'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  clientName: string;
  clientLogo: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  sidebar?: ReactNode;
}

/**
 * Dashboard layout wrapper for pitch pages.
 * Provides consistent header and optional sidebar for AI chat.
 */
export function DashboardLayout({
  clientName,
  clientLogo,
  title = 'GTM Dashboard',
  subtitle,
  children,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 rounded-lg p-2">
              <Image
                src={clientLogo}
                alt={clientName}
                width={100}
                height={30}
                className="h-6 w-auto"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-xs text-white/50">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/GTM Logo New.png"
                alt="GTM Quest"
                width={80}
                height={24}
                className="h-5 w-auto opacity-60"
              />
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                Beta
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Main Dashboard Area */}
        <main className={`flex-1 ${sidebar ? 'lg:pr-80' : ''}`}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>

        {/* Optional Sidebar (for AI chat) */}
        {sidebar && (
          <aside className="hidden lg:block fixed right-0 top-16 bottom-0 w-80 border-l border-white/10 bg-zinc-900/50">
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  );
}
