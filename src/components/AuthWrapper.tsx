'use client';

import { ReactNode } from 'react';
import { authClient, NeonAuthUIProvider } from '@/lib/auth';

interface AuthWrapperProps {
  children: ReactNode;
}

// This component is lazy-loaded only when auth is configured
// It contains the actual Neon Auth SDK imports
export default function AuthWrapper({ children }: AuthWrapperProps) {
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
