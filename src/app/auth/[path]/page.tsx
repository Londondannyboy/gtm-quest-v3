'use client';

import { AuthView } from '@/lib/auth';

interface AuthPageProps {
  params: Promise<{ path: string }>;
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { path } = await params;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold text-white">
            GTM Quest
          </a>
          <p className="text-white/60 mt-2">
            {path === 'sign-in' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>
        <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6">
          <AuthView path={path} />
        </div>
      </div>
    </div>
  );
}
