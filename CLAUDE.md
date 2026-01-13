# GTM Quest v3

> **Cole Medin Methodology**: PRD-first, modular rules, command-ify, context reset, system evolution.

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
| `app/page.tsx` | Main dashboard + CopilotKit actions |
| `app/api/agencies/search/route.ts` | Agency search API |
| `app/api/copilotkit/route.ts` | CopilotKit runtime (Gemini) |
| `lib/agencies.ts` | Neon query functions |
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
| Frontend | Next.js 15, React 19, TypeScript, Tailwind |
| AI Chat | CopilotKit (useCopilotAction, CopilotSidebar) |
| AI Model | Google Gemini 2.0 Flash |
| Backend Agent | Pydantic AI + FastAPI |
| Database | Neon PostgreSQL |

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
- [x] Pydantic AI backend running
- [x] Industry data extraction (games → $200B market)
- [x] Tool recognition (HubSpot, Clay → show in stack)
- [x] HITL confirmation pills (frontend sends actual user message)
- [x] Neon Auth components ready (LoginPromptModal, auth pages)
- [x] Zep memory integration (conversation history)
- [x] MDX content system (/articles, /articles/[slug])

### Needs Work
- [ ] Configure Neon Auth in dashboard (get auth URL)
- [ ] AG-UI protocol for tighter CopilotKit ↔ Pydantic AI connection
- [ ] Add more MDX content (45 articles + 201 agencies)

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
