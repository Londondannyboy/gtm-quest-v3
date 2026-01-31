'use client';

import Image from 'next/image';

interface UrgencyMessage {
  text: string;
  icon?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  subtext?: string;
}

interface StickyCTAProps {
  clientLogo: string;
  clientName: string;
  urgency?: UrgencyMessage;
  ctaText: string;
  ctaLink: string;
  mobileUrgencyText?: string;
}

/**
 * Sticky CTA bar fixed to bottom of screen.
 */
export function StickyCTA({
  clientLogo,
  clientName,
  urgency,
  ctaText,
  ctaLink,
  mobileUrgencyText,
}: StickyCTAProps) {
  return (
    <>
      {/* Spacer for sticky CTA bar */}
      <div className="h-20 bg-zinc-950" />

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-zinc-900/98 via-zinc-900 to-zinc-900/98 backdrop-blur-md border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4">
          {/* Mobile: Logo + Urgency + CTA */}
          <div className="flex sm:hidden items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-lg p-1.5">
                <Image
                  src={clientLogo}
                  alt={clientName}
                  width={80}
                  height={24}
                  className="h-5 w-auto"
                />
              </div>
              {mobileUrgencyText && (
                <div className="text-amber-400 text-xs font-medium">
                  {mobileUrgencyText}
                </div>
              )}
            </div>
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25"
            >
              {ctaText}
            </a>
          </div>

          {/* Desktop: Logo + Urgency justification + CTA */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            {/* Client logo */}
            <div className="bg-white/10 rounded-lg p-2">
              <Image
                src={clientLogo}
                alt={clientName}
                width={100}
                height={30}
                className="h-6 w-auto"
              />
            </div>

            {/* Urgency justification */}
            {urgency && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                  {urgency.icon && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{urgency.text}</span>
                  {urgency.sourceUrl && (
                    <a
                      href={urgency.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      &nearr;
                    </a>
                  )}
                </div>
                {urgency.subtext && (
                  <p className="text-white/40 text-xs mt-1">{urgency.subtext}</p>
                )}
              </div>
            )}

            {/* CTA */}
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-500/25"
            >
              <span>{ctaText}</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
