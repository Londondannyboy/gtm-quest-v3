'use client';

import { useState } from 'react';
import { useAuthData, AuthView } from '@/lib/auth';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export function LoginPromptModal({ isOpen, onClose, onLoginSuccess }: LoginPromptModalProps) {
  const [showAuth, setShowAuth] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 max-w-md w-full mx-4 animate-fade-in">
        {!showAuth ? (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🔐</div>
              <h2 className="text-xl font-bold text-white mb-2">
                Save Your Progress
              </h2>
              <p className="text-white/60 text-sm">
                Create an account to save your GTM plan, get personalized agency recommendations, and access your dashboard anytime.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowAuth(true)}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition"
              >
                Sign In
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-white/40 hover:text-white/60 text-sm transition"
              >
                Continue as Guest
              </button>
            </div>
          </>
        ) : (
          <div className="min-h-[400px]">
            <button
              onClick={() => setShowAuth(false)}
              className="mb-4 text-white/40 hover:text-white text-sm"
            >
              ← Back
            </button>
            {/* AuthView will render the sign-in/sign-up form */}
            <AuthView path="sign-in" />
          </div>
        )}
      </div>
    </div>
  );
}

// Hook to check if user should be prompted to login
export function useShouldPromptLogin(requirements: {
  company_name?: string;
  industry?: string;
  target_market?: string;
  budget?: number;
}) {
  // Check if Neon Auth is configured
  const isAuthConfigured = !!process.env.NEXT_PUBLIC_NEON_AUTH_URL;

  // Count filled fields
  const filledFields = [
    requirements.company_name,
    requirements.industry,
    requirements.target_market,
    requirements.budget,
  ].filter(Boolean).length;

  // Prompt after 3+ fields are filled and auth is configured
  return isAuthConfigured && filledFields >= 3;
}
