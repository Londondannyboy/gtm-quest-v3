'use client';

import { useState, useEffect, useCallback } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';

const CONFIG_ID = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || '';

function VoiceButton({ accessToken }: { accessToken: string }) {
  const { connect, disconnect, status } = useVoice();
  const [isPending, setIsPending] = useState(false);

  const handleToggle = useCallback(async () => {
    if (status.value === 'connected') {
      disconnect();
      return;
    }

    setIsPending(true);
    try {
      await connect({
        auth: { type: 'accessToken', value: accessToken },
        configId: CONFIG_ID,
      });
    } catch (e) {
      console.error('[Voice] Connect error:', e);
    }
    setIsPending(false);
  }, [connect, disconnect, status.value, accessToken]);

  const isConnected = status.value === 'connected';

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative group flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-102 active:scale-98 ${
        isConnected
          ? 'bg-emerald-500/90 hover:bg-emerald-600/90'
          : 'bg-white/10 hover:bg-white/20 border border-white/20'
      }`}
    >
      {/* Pulse ring when connected */}
      {isConnected && (
        <span className="absolute inset-0 rounded-full bg-emerald-500/50 animate-ping" />
      )}

      {/* Mic icon */}
      <span className="relative z-10">
        {isPending ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </span>

      {/* Label */}
      <span className="relative z-10 text-white text-sm font-medium whitespace-nowrap">
        {isPending ? 'Connecting...' : isConnected ? 'Listening...' : 'Talk to GTM Coach'}
      </span>

      {/* Sound wave animation when connected */}
      {isConnected && (
        <div className="flex items-center gap-0.5 ml-1 animate-fadeIn">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="w-1 bg-white rounded-full animate-soundwave"
              style={{
                animationDelay: `${i * 150}ms`,
                height: '8px',
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}

export function CompactVoiceButton() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHumeConfigured, setIsHumeConfigured] = useState(true);

  useEffect(() => {
    // Check if Hume is configured
    if (!CONFIG_ID) {
      setIsHumeConfigured(false);
      return;
    }

    fetch('/api/hume-token')
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        } else {
          setError(data.error || 'No token');
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  // Don't render if Hume isn't configured
  if (!isHumeConfigured) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-200 text-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Voice unavailable
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/60 text-sm">
        <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
        Loading voice...
      </div>
    );
  }

  return (
    <VoiceProvider>
      <VoiceButton accessToken={accessToken} />
    </VoiceProvider>
  );
}
