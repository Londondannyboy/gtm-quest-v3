'use client';

import { ReactNode, Suspense, lazy } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

// Check if Neon Auth is configured at build time
const isAuthConfigured = !!process.env.NEXT_PUBLIC_NEON_AUTH_URL;

// Lazy load the auth wrapper only when configured
// This ensures the Neon Auth SDK is not bundled when auth is disabled
const LazyAuthWrapper = isAuthConfigured
  ? lazy(() => import('./AuthWrapper'))
  : null;

export function AuthProvider({ children }: AuthProviderProps) {
  // If auth is not configured, just render children without any auth wrapper
  if (!isAuthConfigured || !LazyAuthWrapper) {
    return <>{children}</>;
  }

  // Use null fallback to prevent duplicate rendering during Suspense
  // The children will only render once inside LazyAuthWrapper
  return (
    <Suspense fallback={null}>
      <LazyAuthWrapper>{children}</LazyAuthWrapper>
    </Suspense>
  );
}
