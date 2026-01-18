import { authApiHandler } from '@neondatabase/neon-js/auth/next/server';

// Neon Auth API handler - proxies auth requests to Neon Auth server
export const { GET, POST, PUT } = authApiHandler();
