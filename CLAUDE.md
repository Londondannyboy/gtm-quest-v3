# GTM Quest v3

> **Cole Medin Methodology**: PRD-first, modular rules, command-ify, context reset, system evolution.

## PRD Documents
Detailed specs in `.claude/prd/`:
- `agency-data-enrichment.md` - Agency database enrichment (Neon project: morning-rain-33890830)
- `pitch-template-system.md` - Reusable pitch template with calculators

## Quick Start

```bash
# Terminal 1: Frontend
npm run dev              # → localhost:3001

# Terminal 2: Pydantic AI Agent
cd agent && source .venv/bin/activate && python server.py  # → localhost:8000
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GTM QUEST v3                              │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND (Next.js 15)          BACKEND (Pydantic AI)       │
│  ┌─────────────────────┐       ┌─────────────────────┐      │
│  │   localhost:3001    │◄─────►│   localhost:8000    │      │
│  │                     │ polls │                     │      │
│  │ • CopilotSidebar    │/state │ • GTMAgent          │      │
│  │ • Dashboard cards   │       │ • HITL confirmations│      │
│  │ • Progress bar      │       │ • Industry data     │      │
│  │ • Agency matches    │       │ • Tool recognition  │      │
│  │ • Timeline          │       │ • Validation        │      │
│  └─────────────────────┘       └─────────────────────┘      │
│           │                             │                    │
│           │                             │                    │
│  ┌────────▼────────────────────────────▼────────────┐       │
│  │               Neon PostgreSQL                     │       │
│  │               201 agencies                        │       │
│  └───────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Key Files

### Frontend (src/)
| File | Purpose |
|------|---------|
| `app/page.tsx` | Main entry + SEO content |
| `app/agencies/page.tsx` | Agency listing (201 agencies) |
| `app/agencies/[slug]/page.tsx` | Individual agency pages |
| `app/articles/page.tsx` | Article listing |
| `app/articles/[slug]/page.tsx` | MDX article pages |
| `components/home/HomeClient.tsx` | Main dashboard + CopilotKit |
| `components/layout/Header.tsx` | Global navigation |
| `components/layout/Footer.tsx` | Global footer |
| `components/dashboard/EnhancedDashboard.tsx` | Premium visualization dashboard |
| `components/visualizations/Globe3D.tsx` | 3D globe for market reach |
| `components/ui/AnimatedStats.tsx` | Animated counters & progress |
| `components/ui/ParticleBackground.tsx` | Ambient particle effects |
| `components/ui/Confetti.tsx` | Celebration effects |
| `components/charts/*.tsx` | TAM, Growth, Budget, Benchmark charts |
| `components/home/CountrySections.tsx` | Geo-targeted agency sections by country |
| `components/home/HomeSchema.tsx` | Schema.org structured data |
| `components/home/HeroSection.tsx` | Agency-first hero with green theme |
| `components/home/CTAPathwayCards.tsx` | 2-card CTA (Work With Us / Build Your Own) |
| `components/home/QuestSystemSection.tsx` | 4-channel ABM animated methodology |
| `components/home/ProcessJourney.tsx` | "Working With Us" 4-step process |
| `components/home/BuildYourOwnSection.tsx` | DIY tool showcase section |
| `components/home/DirectoryTeaser.tsx` | Agency directory bridge section |
| `components/home/ABMApproachSection.tsx` | Starter/Growth packages (Clay-based) |
| `components/home/EngagementModelsSection.tsx` | 4 engagement models (Handover/Support/Embedded/Scale) |
| `components/home/StickyCTA.tsx` | Floating "Book a Call" button |
| `components/home/SocialProof.tsx` | Stats and trust badges |
| `components/home/TopAgencies2026.tsx` | Top 10 agencies ranking |
| `components/pitch/` | Reusable pitch template components |
| `components/pitch/PitchTemplate.tsx` | Main wrapper with password + CTA |
| `components/pitch/PasswordGate.tsx` | Session-based password protection |
| `components/pitch/calculators/BudgetCalculator.tsx` | Multi-currency budget calculator |
| `components/pitch/calculators/ROICalculator.tsx` | Signal warmth + ICP benchmarks |
| `components/pitch/dashboard/*.tsx` | Pipeline, Channel, ROI charts |
| `types/pitch.ts` | All pitch-related TypeScript interfaces |
| `lib/agencies.ts` | Agency queries + COUNTRY_CONFIG |
| `lib/agencies-db.ts` | Neon query functions |
| `lib/db.ts` | Neon connection |

### Backend (agent/)
| File | Purpose |
|------|---------|
| `server.py` | FastAPI endpoints (/process, /confirm, /state) |
| `agent.py` | GTMAgent with extraction + HITL |
| `models.py` | Pydantic models (GTMRequirements, IndustryData, etc.) |
| `tools.py` | Industry data, tool recognition (HubSpot, Clay, etc.) |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16.1, React 19, TypeScript, Tailwind |
| AI Chat | CopilotKit 1.51.2 (useCopilotAction, CopilotSidebar) |
| AI Model | Google Gemini 2.0 Flash |
| Backend Agent | Pydantic AI + FastAPI (deployed on Railway) |
| Database | Neon PostgreSQL (201 agencies) |
| Visualizations | framer-motion, react-globe.gl, recharts, tsparticles |
| PDF Export | @react-pdf/renderer |
| Email | Resend |
| Content | MDX (56 articles) |

## Environment Variables

```bash
# .env.local (Frontend)
GOOGLE_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://neondb_owner:...@ep-xxx.neon.tech/neondb?sslmode=require

# Neon Auth (optional - for user login)
NEXT_PUBLIC_NEON_AUTH_URL=https://ep-xxx.neon.tech/neondb/auth

# agent/.env (Backend - optional)
ZEP_API_KEY=your_zep_api_key  # For conversation memory
```

## Neon Auth Setup

1. Enable Neon Auth in your Neon project dashboard
2. Get the Auth URL from Settings > Auth
3. Add `NEXT_PUBLIC_NEON_AUTH_URL` to .env.local
4. The login modal will appear after 3+ fields are gathered

## Zep Memory Setup

1. Sign up at https://app.getzep.com
2. Create a project and get your API key
3. Add `ZEP_API_KEY` to agent/.env
4. Memory is automatically used when API key is present
5. Endpoints: GET /memory/history, POST /memory/search

## Current Features

### Working
- [x] CopilotKit chat sidebar with Gemini
- [x] `update_requirements` action (updates frontend state)
- [x] `search_agencies` action (queries Neon)
- [x] Progress dashboard with field checklist
- [x] Agency cards with match scores
- [x] Timeline generation by strategy type
- [x] Pydantic AI backend running (Railway)
- [x] Industry data extraction (games → $200B market)
- [x] Tool recognition (HubSpot, Clay → show in stack)
- [x] HITL confirmation pills (frontend sends actual user message)
- [x] Neon Auth components ready (LoginPromptModal, auth pages)
- [x] Zep memory integration (conversation history)
- [x] MDX content system (56 articles)
- [x] Dynamic agency pages from Neon (201 agencies)
- [x] Global navigation header + footer
- [x] Homepage SEO content sections
- [x] Visual onboarding profile cards
- [x] Premium dashboard visualizations:
  - [x] Animated stat counters (react-countup)
  - [x] Progress ring animation (framer-motion)
  - [x] 3D globe for market reach (react-globe.gl)
  - [x] Particle background effects (tsparticles)
  - [x] Confetti celebration (canvas-confetti)
  - [x] TAM/SAM/SOM chart (recharts)
  - [x] Growth projection chart
  - [x] Budget allocation chart
  - [x] Industry benchmark chart
- [x] GTM Plan Builder with PDF export
- [x] Email delivery (Resend)
- [x] Dynamic sitemap.xml (269 pages)
- [x] 301 redirects for old URLs

### Needs Work
- [ ] Configure Neon Auth in dashboard (get auth URL)
- [ ] AG-UI protocol for tighter CopilotKit ↔ Pydantic AI connection

## API Endpoints

### Backend (localhost:8000)
```
GET  /health              → {"status": "healthy"}
GET  /info                → Agent capabilities
POST /process             → Process user message, return state
POST /confirm             → Confirm a field
POST /correct             → Correct a field value
GET  /state               → Get full GTM state
POST /reset               → Reset agent state
```

### Frontend (localhost:3001)
```
POST /api/agencies/search      → Search agencies by specializations
GET  /api/agencies/specs       → List all specializations
POST /api/copilotkit           → CopilotKit runtime
```

## Commands

| Command | Purpose |
|---------|---------|
| `/prime` | Load project context |
| `/plan {feature}` | Create implementation plan |
| `/execute {plan}` | Build from plan |
| `/evolve` | Improve system after bugs |

---

## Session Log

### 2025-01-13 (Session 1)
- Created v3 from CLAUDE_STARTER_KIT
- Built frontend-only CopilotKit + Gemini
- Timeline forms in real-time

### 2025-01-13 (Session 2)
- Added Neon integration for agency search
- Expanded GTMRequirements (15+ fields)
- Added Pydantic AI backend with:
  - HITL confirmation flow
  - Industry data lookup (games → $200B market)
  - Tool recognition (HubSpot, Clay, etc.)
- Frontend polls backend every 2s
- Components: IndustryDataCard, ToolCard, ConfirmationPill, ProgressDashboard

### 2026-01-13 (Session 3)
- Fixed HITL confirmation pills:
  - Added useCopilotChat hook to capture actual user messages
  - Frontend now sends real user message to backend (not extracted args)
  - Fixed budget extraction regex (was incorrectly parsing "B2B" as $2)
  - Fixed duplicate tools in recognized_tools
- Added Neon Auth integration:
  - AuthProvider component wraps app
  - LoginPromptModal for mid-flow login prompt
  - Auth pages at /auth/[path] (sign-in, sign-up)
  - Triggers after 3+ fields gathered (company_name, industry, target_market, budget)
- Added Zep Memory integration:
  - `agent/memory.py` - ConversationMemory class with Zep SDK
  - Messages stored in Zep on each interaction
  - GET /memory/history - Retrieve conversation history
  - POST /memory/search - Search through past conversations
  - Gracefully handles missing ZEP_API_KEY (no-op)
- Added MDX content system:
  - `content/articles/` - MDX article files
  - `content/agencies/` - MDX agency profiles
  - `src/lib/content.ts` - Content loading utilities
  - `mdx-components.tsx` - Custom MDX styling
  - `/articles` and `/articles/[slug]` routes
- Key files added:
  - `src/lib/auth.ts` - Auth client and exports
  - `src/components/AuthProvider.tsx` - Conditional auth wrapper
  - `src/components/LoginPromptModal.tsx` - Mid-flow login UI
  - `src/app/auth/[path]/page.tsx` - Auth pages
  - `agent/memory.py` - Zep memory integration
  - `src/lib/content.ts` - MDX content utilities

### 2026-01-17 (Session 4) - Major Upgrade
- Implemented 7-phase upgrade plan:
  1. Global Navigation & Footer
  2. Dynamic Agency Pages from Neon (201 pages)
  3. Homepage SEO Content
  4. Visual Onboarding Profile
  5. Dashboard with Market Data Charts (recharts)
  6. GTM Plan Builder with PDF Export
  7. SEO & Performance (sitemap, robots)
- Build generates 259 pages
- Push to GitHub (commit 7423529)

### 2026-01-17 (Session 5) - Missing Pages & Redirects
- Created 10 new MDX articles for Google-indexed URLs
- Added 301 redirects in next.config.ts
- Push to GitHub (commit daf05c5)

### 2026-01-18 (Session 6) - Premium Visualizations
- Added "shock and awe" visualization libraries:
  - framer-motion (smooth animations)
  - react-countup (animated numbers)
  - @tsparticles/react (particle effects)
  - canvas-confetti (celebration effects)
  - react-globe.gl + three (3D globe)
- Created new components:
  - `AnimatedStats.tsx` - Animated counters & progress rings
  - `ParticleBackground.tsx` - Ambient particle effects
  - `Confetti.tsx` - Celebration effects
  - `Globe3D.tsx` - Interactive 3D globe for market reach
  - `EnhancedDashboard.tsx` - Premium visualization dashboard
- Integrated into HomeClient.tsx
- Build generates 269 pages
- Push to GitHub (commit cc6ca44)

### 2026-01-19 (Session 7) - Auto-Save, HITL & Tools Recognition
- **Auto-save to Neon**: Profile data now saves automatically when logged in
  - Created `/api/user-profile` route for CRUD operations
  - Uses existing `user_preferences` table in Neon
  - Real-time save status indicator (Saved/Saving/Error)
- **Enhanced OnboardingWizard**:
  - All steps now clickable for direct editing
  - Added Tools step with 12 GTM tools (HubSpot, Clay, Salesforce, etc.)
  - Profile loads from Neon on mount when authenticated
  - 7 steps total: Company, Industry, Category, Strategy, Budget, Needs, Tools
- **HITL Confirmations in CopilotKit**:
  - AI now knows user's name and profile completion %
  - Instructions include current profile status
  - AI confirms extracted info conversationally
  - Guides based on progress (< 30%, 30-60%, 60-80%, 80%+)
- **Full User Context to AI**:
  - Profile fields (completed vs missing)
  - Zep memory context
  - Progress percentage
  - Tech stack tools
- Key files modified:
  - `src/app/api/user-profile/route.ts` - New API for auto-save
  - `src/components/onboarding/OnboardingWizard.tsx` - Auto-save + tools
  - `src/app/dashboard/DashboardClient.tsx` - Full context to AI

### 2026-01-22 (Session 8) - Zep Memory Sync
- **Zep Memory Sync on Profile Updates**:
  - Profile changes now automatically sync to Zep knowledge graph
  - Facts generated from profile data (company, industry, budget, strategy, etc.)
  - User metadata updated in Zep for AI personalization
  - `zep_synced` timestamp tracked in database
  - Non-blocking async sync (won't slow down profile saves)
- Key file modified:
  - `src/app/api/user-profile/route.ts` - Added `syncToZep()` function
- Build: 273 pages generated successfully

### 2026-01-30 (Session 9) - Agency Enrichment & Geo-Targeting SEO
- **Agency Data Enrichment Complete**:
  - Enriched all 33 remaining thin agencies (descriptions < 100 chars)
  - **0 thin descriptions remaining** (was 33)
  - **75 agencies now have key_services** (was 42)
  - **75 agencies now have b2b_description** (was 42)
  - Added founded_year, employee_count for many agencies
- **Geo-Targeting SEO for "GTM Agency" keyword**:
  - Added country sections to homepage (US, UK, AU, CA, NZ, Ireland)
  - Implemented hreflang tags for geographic targeting
  - Added internal links from agency pages back to country sections
  - Updated sitemap with country section URLs
  - Enhanced Schema.org with geographic ItemList
  - Updated SEOContent regional directory links
- Key files added/modified:
  - `src/components/home/CountrySections.tsx` - New component
  - `src/app/page.tsx` - hreflang tags, country sections
  - `src/app/agencies/[slug]/page.tsx` - Internal country links
  - `src/lib/agencies.ts` - COUNTRY_CONFIG, getAgenciesByCountry()
  - `src/components/home/TableOfContents.tsx` - New TOC item
  - `src/components/home/HomeSchema.tsx` - Geographic schema
  - `src/components/home/SEOContent.tsx` - Regional links
  - `src/app/sitemap.ts` - Country section URLs
- Agency distribution by target country:
  - US: 25 | UK: 10 | AU: 10 | CA: 9 | NZ: 5 | IE: 5
- Build: 279 pages generated successfully

### 2026-01-31 (Session 10) - Pitch Template System
- **Pitch Template System Created**:
  - PRD document at `.claude/prd/pitch-template-system.md`
  - Types file at `src/types/pitch.ts` with all interfaces
  - Reusable section components: HeroSection, Timeline, InvestmentOptions, SocialProof, WhyUs, StickyCTA
  - PasswordGate for session-based password protection
  - **BudgetCalculator**: Multi-currency (GBP/EUR/USD/AUD), live exchange rates, adjustable day counts
  - **ROICalculator**: Signal warmth tiers (Cold 1% → Intent-based 14%), ICP benchmarks by title/industry/size, channel multipliers, conservative reduction slider, funnel projections
  - **Infrastructure Calculator**: Category breakdown (Platform/Email/LinkedIn/Tools), adjustable quantities
  - Dashboard components: PipelineChart, ChannelBreakdown, ROITimeline (recharts)
  - PitchTemplate wrapper component
- **Separate /template Route Created**:
  - Password protected with "gtmquest"
  - BudgetCalculator + Infrastructure breakdown + ROI Calculator
  - Combined investment (Consulting + Software) passed to ROI projections
  - Climatise reverted to original (was a live pitch shown to prospect)
- Key files added:
  - `src/types/pitch.ts` - CurrencyConfig, BudgetTier, SignalWarmthTier, ICP_BENCHMARKS, ROIInputs, FunnelProjection
  - `src/app/template/page.tsx` - Testing route with all calculators
  - `src/components/pitch/` - Full component library
  - `src/components/pitch/index.ts` - Unified exports
- Signal Warmth Tiers (from practitioner data):
  - Cold: 1% email / 5% LinkedIn
  - Targeted: 5% email / 12% LinkedIn
  - Intent-based: 14% email / 25% LinkedIn (Triggify method - 14x improvement)
  - Inbound: 25% email / 40% LinkedIn
- Build: 282 pages generated successfully
- Push to GitHub (commit 7ebcbae)

### 2026-01-31 (Session 11) - Homepage Narrative Arc & Climatise v1.1
- **Climatise v1.1 Pitch Update**:
  - Added changelog header (v1.0 → v1.1)
  - Added "Quest System" branding for 4-channel ABM methodology
  - Added UK/GDPR tracking explanation (company-level via Leadfeeder, Smart Links)
  - Added ABM Light vs Full ABM positioning
  - Added decision maker cluster strategy (CFO/Sustainability/CEO messaging)
  - Conservative messaging (no specific stats or guarantees)
- **Homepage Narrative Arc Reorganization**:
  - **Three Pillars:** Agency (primary), DIY Tool (secondary), Directory (tertiary)
  - **Goal:** Rank for "GTM agency" + drive call bookings
- **Hero Section Updated** (`HeroSection.tsx`):
  - Badge: "UK GTM Agency" (green theme)
  - H1: "The GTM Agency That Builds Revenue Engines"
  - Subheadline: Quest System positioning
  - Primary CTA: "Book a Strategy Call" (Calendly)
  - Secondary CTA: "See How It Works" (scroll to #quest-system)
- **CTAPathwayCards Simplified** to 2 cards:
  - "Work With Us" (Recommended) → Calendly
  - "Build Your Own" (Free) → /dashboard
- **QuestSystemSection Enhanced**:
  - Added id="quest-system" for scroll linking
  - "How We Work" / "The Quest System" headers
  - "When you work with us, this is what we implement" framing
  - 4-channel animated flow (LinkedIn Ads → Content → Intent → Outbound)
  - Animated progress bars with useInView
  - UK/GDPR callout prominent
  - Tool stack marquee carousel
- **ProcessJourney Updated** to "Working With Us":
  - Step 1: Discovery Call (30 min)
  - Step 2: System Design (Week 1)
  - Step 3: Build & Launch (Weeks 2-4)
  - Step 4: Optimize & Scale (Ongoing)
- **New Components Created**:
  - `BuildYourOwnSection.tsx` - DIY tool showcase (blue/purple gradient)
  - `DirectoryTeaser.tsx` - Agency directory bridge (200+ agencies)
- **Page.tsx Section Order** (11 sections):
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
- **Removed Sections**:
  - TLDRSection (absorbed into hero)
  - TableOfContents (cleaner flow)
  - ExplainerSection (redundant)
  - TechStack (merged into QuestSystem carousel)
  - DashboardShowcase (merged into BuildYourOwn)
- **SEO Updates**:
  - Meta title: "GTM Agency | Go-To-Market Strategy & Execution | GTM Quest"
  - "GTM agency" keyword in H1, meta, key sections
  - hreflang tags for geo-targeting maintained
- Build: 282 pages generated successfully

### 2026-01-31 (Session 12) - Dark Neon Theme & Engagement Models
- **SEO Improvements**:
  - H1 as badge: "GTM Agency UK" (SEO optimized, 13 chars)
  - Visual headline: "The Quest GTM System"
  - Meta description shortened to ~145 chars
- **Hero Restructure** (`HeroSection.tsx`):
  - H1 styled as small green badge for 100% SEO score
  - Visual headline split: "The Quest" / "GTM System"
  - Value prop: "A supercharged GTM consultant — without the big agency cost"
  - Staggered Framer Motion animations with spring physics
  - MUX video background with dynamic import
- **Dark Neon Theme**:
  - QuestSystemSection: Black/zinc-950 backgrounds, neon glow effects
  - 4-channel cards with green/orange/blue/purple glows
  - Hover glow intensification
  - Grid pattern backgrounds
  - Multi-color gradient text
- **ABMApproachSection** (consultant positioning):
  - "Consultant, Not Agency" header
  - Starter & Growth packages (no specific pricing)
  - Clay-based badge
  - "Pricing discussed on call" approach
- **EngagementModelsSection** (NEW):
  - 4 engagement models for flexibility:
    1. **Handover** - Build & transfer to your team
    2. **Handover + Support** - Air cover (1-2 days/week consultant)
    3. **Embedded** - Run & optimize for you
    4. **Scale** - Full ABM partnership
  - Dark neon cards with color-coded accents
  - "Choose Your Level of Involvement" positioning
- **Conversion Optimization**:
  - StickyCTA floating button (bottom-left)
  - CTAPathwayCards 2:1 ratio (Work With Us larger)
  - Removed duplicate CTAs from hero
- **Tool Stack Updates**:
  - Added: SuperGrow, Ahrefs, NeonDB, Apify, RapidAPI, Claude, Gemini, Sonnet
  - Removed: Teamfluence
- **TypeScript Fixes**:
  - Framer Motion variants: `as const` and `type: 'spring' as const`
- **Page Section Order** (12 sections):
  1. HomeSchema
  2. HomeClient (Hero)
  3. CTAPathwayCards
  4. QuestSystemSection
  5. ABMApproachSection
  6. EngagementModelsSection (NEW)
  7. SocialProof
  8. ProcessJourney
  9. BuildYourOwnSection
  10. DirectoryTeaser
  11. TopAgencies2026
  12. CountrySections + SEOContent + FAQ
- Build: 282 pages generated successfully
