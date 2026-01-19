'use client';

import { useState, useEffect, useCallback } from 'react';

interface ZepUser {
  userId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  metadata?: Record<string, any>;
}

interface ZepSession {
  sessionId: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

interface ZepMemoryState {
  userId: string | null;
  isNew: boolean;
  user: ZepUser | null;
  facts: string[];
  sessions: ZepSession[];
  isLoading: boolean;
  error: string | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, any>;
}

export function useZepMemory(userId: string | null) {
  const [state, setState] = useState<ZepMemoryState>({
    userId: null,
    isNew: true,
    user: null,
    facts: [],
    sessions: [],
    isLoading: false,
    error: null,
  });

  // Fetch user memory on mount
  useEffect(() => {
    if (!userId) return;

    const fetchMemory = async () => {
      setState((s) => ({ ...s, isLoading: true, error: null }));

      try {
        const res = await fetch(`/api/zep/user?userId=${encodeURIComponent(userId)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch memory');
        }

        setState({
          userId: data.userId,
          isNew: data.isNew,
          user: data.user || null,
          facts: data.facts || [],
          sessions: data.sessions || [],
          isLoading: false,
          error: null,
        });
      } catch (e: any) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: e.message,
        }));
      }
    };

    fetchMemory();
  }, [userId]);

  // Save user profile
  const saveProfile = useCallback(
    async (profile: {
      email?: string;
      firstName?: string;
      lastName?: string;
      metadata?: Record<string, any>;
    }) => {
      if (!userId) return;

      try {
        const res = await fetch('/api/zep/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, ...profile }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to save profile');
        }

        // Update local state
        setState((s) => ({
          ...s,
          isNew: false,
          user: s.user
            ? { ...s.user, ...profile }
            : { userId, ...profile },
        }));
      } catch (e: any) {
        console.error('[useZepMemory] saveProfile error:', e);
        throw e;
      }
    },
    [userId]
  );

  // Add messages to conversation memory
  const addMessages = useCallback(
    async (sessionId: string, messages: Message[]) => {
      if (!userId) return;

      try {
        const res = await fetch('/api/zep/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, sessionId, messages }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to add messages');
        }
      } catch (e: any) {
        console.error('[useZepMemory] addMessages error:', e);
      }
    },
    [userId]
  );

  // Add facts about the user
  const addFacts = useCallback(
    async (facts: string[]) => {
      if (!userId) return;

      try {
        const res = await fetch('/api/zep/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, facts }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to add facts');
        }

        // Update local state
        setState((s) => ({
          ...s,
          facts: [...s.facts, ...facts],
        }));
      } catch (e: any) {
        console.error('[useZepMemory] addFacts error:', e);
      }
    },
    [userId]
  );

  // Build context string for AI
  const buildContext = useCallback(() => {
    const parts: string[] = [];

    if (state.user) {
      if (state.user.firstName) {
        parts.push(`User Name: ${state.user.firstName}${state.user.lastName ? ' ' + state.user.lastName : ''}`);
      }
      if (state.user.email) {
        parts.push(`Email: ${state.user.email}`);
      }
      if (state.user.metadata) {
        const meta = state.user.metadata;
        if (meta.company) parts.push(`Company: ${meta.company}`);
        if (meta.industry) parts.push(`Industry: ${meta.industry}`);
        if (meta.budget) parts.push(`Budget: ${meta.budget}`);
        if (meta.targetMarket) parts.push(`Target Market: ${meta.targetMarket}`);
        if (meta.gtmStrategy) parts.push(`GTM Strategy: ${meta.gtmStrategy}`);
      }
    }

    if (state.facts.length > 0) {
      parts.push(`Known Facts: ${state.facts.slice(0, 10).join('; ')}`);
    }

    return parts.join('\n');
  }, [state.user, state.facts]);

  return {
    ...state,
    saveProfile,
    addMessages,
    addFacts,
    buildContext,
    isReturningUser: !state.isNew && state.facts.length > 0,
  };
}
