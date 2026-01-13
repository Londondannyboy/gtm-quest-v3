'use client';

import { ReactNode } from 'react';
import { authClient, NeonAuthUIProvider } from '@/lib/auth';

interface AuthProviderProps {
  children: ReactNode;
}

// Check if Neon Auth is configured
const isAuthConfigured = !!process.env.NEXT_PUBLIC_NEON_AUTH_URL;

export function AuthProvider({ children }: AuthProviderProps) {
  // If auth is not configured, just render children without the provider
  if (!isAuthConfigured) {
    return <>{children}</>;
  }

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
