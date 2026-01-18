'use client';

import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function useConfetti() {
  const fire = useCallback((options?: confetti.Options) => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'],
    };

    confetti({
      ...defaults,
      ...options,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    });

    confetti({
      ...defaults,
      ...options,
      particleCount: 20,
      scalar: 0.75,
      shapes: ['circle'],
    });
  }, []);

  const fireworks = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const celebration = useCallback(() => {
    // Fire from both sides
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return { fire, fireworks, celebration };
}

export function ConfettiTrigger({ trigger, onComplete }: ConfettiProps) {
  const { celebration } = useConfetti();

  useEffect(() => {
    if (trigger) {
      celebration();
      onComplete?.();
    }
  }, [trigger, celebration, onComplete]);

  return null;
}

// Success animation component
export function SuccessCelebration({ show }: { show: boolean }) {
  const { celebration } = useConfetti();

  useEffect(() => {
    if (show) {
      // Delay slightly for dramatic effect
      const timer = setTimeout(() => {
        celebration();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show, celebration]);

  return null;
}
