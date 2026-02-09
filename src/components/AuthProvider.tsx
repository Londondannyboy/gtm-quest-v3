'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

// Check if Neon Auth is configured at build time
const isAuthConfigured = !!process.env.NEXT_PUBLIC_NEON_AUTH_URL;

export function AuthProvider({ children }: AuthProviderProps) {
  // If auth is not configured, just render children without any auth wrapper
  // This prevents loading the Neon Auth SDK on deployments without auth
  if (!isAuthConfigured) {
    return <>{children}</>;
  }

  // Only import auth when configured - this will tree-shake on non-auth deployments
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { authClient, NeonAuthUIProvider } = require('@/lib/auth');

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      emailOTP
      social={{ providers: ['google'] }}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
