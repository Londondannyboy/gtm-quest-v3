# Session 11 Restart Prompt: Homepage Narrative Arc & Climatise v1.1

> **Date:** 2026-01-31
> **Status:** Complete
> **Build:** 282 pages - passing

---

## What Was Accomplished

### 1. Climatise Pitch v1.1 Update (`/climatise`)

Updated the Climatise proposal with Quest System branding and ABM methodology:

- **Changelog Header**: v1.0 (30 Jan) → v1.1 (31 Jan)
- **Quest System Branding**: 4-channel ABM (LinkedIn Ads → Content → Intent → Outbound)
- **UK/GDPR Tracking**: Company-level via Leadfeeder, Smart Links for individuals
- **ABM Scaling**: ABM Light (4 identities) vs Full ABM (8+ identities)
- **Decision Maker Clusters**: CFO/Sustainability/CEO messaging differentiation
- **Conservative Messaging**: No specific stats or ROI guarantees

### 2. Homepage Narrative Arc Reorganization

Repositioned GTM Quest homepage around three pillars:

| Priority | Pillar | Goal | CTA |
|----------|--------|------|-----|
| **Primary** | GTM Quest as Agency | Book calls, rank for "GTM agency" | "Book a Strategy Call" |
| **Secondary** | Build Your Own | Showcase AI tool | "Start Building" |
| **Tertiary** | Agency Directory | SEO play, 200+ agencies | "Browse Directory" |

### 3. Components Modified/Created

#### Modified:

**`HeroSection.tsx`**
- Badge: "UK GTM Agency" (green theme, was blue)
- H1: "The GTM Agency That Builds Revenue Engines"
- Subheadline: Quest System positioning
- Primary CTA: "Book a Strategy Call" → Calendly
- Secondary CTA: "See How It Works" → scrolls to #quest-system

**`CTAPathwayCards.tsx`**
- Simplified from 4 cards to 2:
  1. "Work With Us" (Recommended) → Calendly
  2. "Build Your Own" (Free) → /dashboard

**`QuestSystemSection.tsx`**
- Added `id="quest-system"` and `scroll-mt-20` for hero linking
- Header: "How We Work" / "The Quest System"
- Framing: "When you work with us, this is what we implement"
- Animated progress bars with `useInView` hook
- UK/GDPR callout prominent
- Tool stack marquee carousel (Clay, LGM, Trigify, etc.)

**`ProcessJourney.tsx`**
- Changed from "How We Match You" to "Working With Us"
- 4 new steps:
  1. Discovery Call (30 min)
  2. System Design (Week 1)
  3. Build & Launch (Weeks 2-4)
  4. Optimize & Scale (Ongoing)

#### Created:

**`BuildYourOwnSection.tsx`**
- DIY tool showcase
- Blue/purple gradient theme
- Features: Visualize GTM motion, Chat with AI, Export plans
- CTA: "Start Building" → /dashboard
- Tag: "Free forever • No signup required • Beautiful visualizations"

**`DirectoryTeaser.tsx`**
- Agency directory bridge section
- Categories: Specialization, Region, Tool Stack
- CTA: "Browse Directory" → /agencies

### 4. Page.tsx Section Order

```
1. HomeSchema (structured data)
2. HomeClient (Hero)
3. CTAPathwayCards (2 cards)
4. QuestSystemSection (4-channel ABM)
5. SocialProof (stats)
6. ProcessJourney (4 steps)
7. BuildYourOwnSection (DIY)
8. DirectoryTeaser (directory bridge)
9. TopAgencies2026 (rankings)
10. CountrySections (geo-SEO)
11. SEOContent + FAQSection
```

### 5. Removed Sections

- **TLDRSection** (absorbed into hero)
- **TableOfContents** (cleaner flow)
- **ExplainerSection** (redundant)
- **TechStack** (merged into QuestSystem carousel)
- **DashboardShowcase** (merged into BuildYourOwn)

### 6. SEO Updates

- Meta title: `"GTM Agency | Go-To-Market Strategy & Execution | GTM Quest"`
- "GTM agency" keyword in H1, meta title, key sections
- hreflang tags maintained for geo-targeting

---

## Key File Paths

```
src/app/page.tsx                              # Main homepage (section order)
src/app/climatise/page.tsx                    # Climatise pitch v1.1
src/components/home/HeroSection.tsx           # Agency-first hero
src/components/home/CTAPathwayCards.tsx       # 2-card CTA
src/components/home/QuestSystemSection.tsx    # 4-channel ABM
src/components/home/ProcessJourney.tsx        # Working With Us
src/components/home/BuildYourOwnSection.tsx   # NEW - DIY tool showcase
src/components/home/DirectoryTeaser.tsx       # NEW - Directory bridge
.claude/plans/lexical-painting-flurry.md      # Full implementation plan
```

---

## Quest System: 4-Channel ABM

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ LinkedIn Ads │──▶│   Content    │──▶│    Intent    │──▶│   Outbound   │
│  Awareness   │   │    Trust     │   │   Tracking   │   │  Conversion  │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

**Synergy Quote:**
> "Your LinkedIn ad mentions a framework → Your content breaks it down → Your website offers a deeper dive → Your outreach ties it all together."

---

## Tech Details

- **Scroll linking**: Hero "See How It Works" → `#quest-system` (smooth scroll)
- **Animations**: Framer Motion + useInView for scroll-triggered progress bars
- **Tool carousel**: Marquee animation with double array for seamless loop
- **Theme**: Green gradient for hero (agency positioning), blue for DIY tool

---

## Potential Next Steps

1. **A/B test hero CTAs** (different copy variations)
2. **Add testimonials** to SocialProof section
3. **Enhance BuildYourOwn** with dashboard preview animation
4. **Add case studies** linking to Climatise-style pitches
5. **Track conversion** from "See How It Works" scroll clicks

---

## Restart Command

To continue work on this feature:

```
Read the plan at .claude/plans/lexical-painting-flurry.md for full context.
The homepage narrative arc is complete. Build passes (282 pages).
Focus areas: testimonials, A/B testing, or case studies.
```
