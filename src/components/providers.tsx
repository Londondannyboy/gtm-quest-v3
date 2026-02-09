'use client';

import { AuthProvider } from './AuthProvider';

// CopilotKit is only needed on dashboard - loaded there via DashboardClient
// Removing it from global providers to reduce bundle size on other pages

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
