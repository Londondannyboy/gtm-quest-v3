# GTM Quest v3

> **Cole Medin Methodology**: PRD-first, modular rules, command-ify, context reset, system evolution.

## PRD Documents
Detailed specs in `.claude/prd/`:
- `agency-data-enrichment.md` - Agency database enrichment (Neon project: morning-rain-33890830)

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
