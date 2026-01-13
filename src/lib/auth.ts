'use client';

import { createAuthClient } from '@neondatabase/neon-js/auth/next';

// Create the auth client - this reads NEON_AUTH_BASE_URL from env automatically
export const authClient = createAuthClient();

// Re-export Neon Auth components and hooks for easy access
export {
  NeonAuthUIProvider,
  AuthView,
  UserButton,
  SignedIn,
  SignedOut,
  useAuthData,
  useAuthenticate,
} from '@neondatabase/neon-js/auth/react/ui';

