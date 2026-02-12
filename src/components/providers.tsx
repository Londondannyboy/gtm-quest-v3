// NOTE: This is a SERVER COMPONENT - no 'use client' directive
// This allows children (page content) to be server-rendered for SEO
// Auth context is provided separately via AuthProvider in layout

import { ReactNode } from 'react';

// CopilotKit is only needed on dashboard - loaded there via DashboardClient
// Auth is handled by AuthProvider component directly in layout

export function Providers({ children }: { children: ReactNode }) {
  // Simply pass through children - no client wrapper needed
  // This enables full SSR for page content
  return <>{children}</>;
}
