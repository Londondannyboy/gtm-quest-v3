'use client';

import { ReactNode } from 'react';
import { PasswordGate } from './PasswordGate';
import { StickyCTA } from './sections/StickyCTA';
import type { PitchConfig } from '@/types/pitch';

interface PitchTemplateProps {
  config: PitchConfig;
  children: ReactNode;
}

/**
 * Main pitch template wrapper that handles:
 * - Password protection
 * - Consistent layout
 * - Sticky CTA
 * - Analytics (future)
 *
 * Usage:
 * ```tsx
 * <PitchTemplate config={pitchConfig}>
 *   <HeroSection {...} />
 *   <Timeline {...} />
 *   <InvestmentOptions {...} />
 *   <BudgetCalculator {...} />
 *   <ROICalculator {...} />
 *   <WhyUs {...} />
 *   <SocialProof {...} />
 * </PitchTemplate>
 * ```
 */
export function PitchTemplate({ config, children }: PitchTemplateProps) {
  const {
    client,
    content,
    cta,
  } = config;

  return (
    <PasswordGate
      clientSlug={client.slug}
      clientLogo={client.logo}
      clientName={client.name}
      tagline={content.tagline}
      password={client.password}
    >
      <main className="min-h-screen bg-black">
        {children}

        <StickyCTA
          clientLogo={client.logo}
          clientName={client.name}
          urgency={
            content.urgencyMessage
              ? {
                  text: content.urgencyMessage,
                  icon: 'clock',
                }
              : undefined
          }
          ctaText={cta.buttonText}
          ctaLink={cta.bookingLink}
        />
      </main>
    </PasswordGate>
  );
}
