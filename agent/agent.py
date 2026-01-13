"""GTM Strategy Agent - Pydantic AI with HITL confirmations."""

import os
import re
import uuid
from typing import Optional
from dotenv import load_dotenv
from pydantic_ai import Agent

from models import GTMState, GTMRequirements, ConfirmationRequest
from tools import recognize_tools, get_industry_data, search_agencies
from memory import ConversationMemory

from pathlib import Path

# Load env from parent directory
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)

# Verify API key is set
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError(f"GOOGLE_API_KEY not found. Checked: {env_path}")

# System prompt for the agent
SYSTEM_PROMPT = """You are an expert GTM strategist helping users build their go-to-market plan.

Your job is to:
1. Extract information from what the user says
2. Validate and structure it into GTM requirements
3. Proactively show them relevant data (industry stats, tool info)
4. Request soft confirmations for key data points
5. Search for matching agencies when you have enough info

## EXTRACTION RULES

Listen for and extract:
- Company/product name
- Industry (gaming, fintech, healthcare, edtech, saas, etc.)
- Category (B2B SaaS, DTC, Enterprise, Marketplace, Consumer)
- Stage/maturity (idea, pre-launch, early, growth, scale)
- Target market (who they sell to)
- Regions (US, UK, Europe, Global, etc.)
- Budget (any mention of dollars/money)
- Tools they use (HubSpot, Clay, Instantly, Salesforce, etc.)
- What help they need (demand gen, ABM, content, PLG, brand, SEO)
- Their goals and challenges

## CONFIRMATION FLOW

When you extract something important (industry, budget, strategy), create a soft confirmation:
- Don't block the conversation
- Show what you understood
- Let them correct if needed
- Auto-confirm on next message if not corrected

## RESPONSE STYLE

Be conversational and brief. Ask one question at a time.
When you learn something, acknowledge it and show them data if available.

Example:
User: "We're in the games industry"
You: "Gaming - great space! I'm seeing a $200B+ market with 8.4% growth.
[Show industry card]
Who's your target customer - casual gamers, hardcore, or developers?"
"""


class GTMAgent:
    """GTM Strategy Agent with state management and HITL."""

    def __init__(self, user_id: Optional[str] = None, thread_id: Optional[str] = None):
        self.state = GTMState()
        self.agent = Agent(
            "google-gla:gemini-2.0-flash",
            system_prompt=SYSTEM_PROMPT,
        )
        # Initialize memory if ZEP_API_KEY is set
        self.user_id = user_id or f"user_{uuid.uuid4().hex[:8]}"
        self.thread_id = thread_id or f"thread_{uuid.uuid4().hex[:8]}"
        self.memory = ConversationMemory(self.user_id, self.thread_id)

    def calculate_progress(self) -> int:
        """Calculate how complete the requirements are."""
        req = self.state.requirements
        fields = [
            req.company_name,
            req.industry or req.category,
            req.target_market,
            req.strategy_type,
            req.budget,
            req.primary_goal,
            len(req.needed_specializations or []) > 0,
        ]
        filled = sum(1 for f in fields if f)
        return int((filled / len(fields)) * 100)

    def extract_from_message(self, message: str) -> dict:
        """Extract GTM requirements from a user message."""
        extracted = {}
        message_lower = message.lower()

        # Industry detection
        industries = ["gaming", "games", "fintech", "healthcare", "healthtech",
                     "edtech", "saas", "b2b saas", "ecommerce", "ai"]
        for ind in industries:
            if ind in message_lower:
                extracted["industry"] = ind
                # Get industry data
                data = get_industry_data(ind)
                if data:
                    self.state.industry_data = data
                break

        # Category detection
        if "b2b" in message_lower and "saas" in message_lower:
            extracted["category"] = "b2b_saas"
        elif "dtc" in message_lower or "direct to consumer" in message_lower:
            extracted["category"] = "dtc"
        elif "enterprise" in message_lower:
            extracted["category"] = "enterprise"
        elif "marketplace" in message_lower:
            extracted["category"] = "marketplace"
        elif "consumer" in message_lower:
            extracted["category"] = "consumer"

        # Stage/maturity detection
        stages = {
            "idea": ["idea", "concept", "thinking about"],
            "pre_launch": ["pre-launch", "pre launch", "about to launch", "launching soon"],
            "early": ["early stage", "just launched", "seed", "pre-seed"],
            "growth": ["growth", "series a", "series b", "scaling"],
            "scale": ["scale", "enterprise", "series c", "mature"],
        }
        for stage, keywords in stages.items():
            if any(kw in message_lower for kw in keywords):
                extracted["maturity"] = stage
                break

        # Budget detection - require $ sign or explicit budget context
        # Look for patterns like $50k, $50,000, "budget of 50k", "50k/month"
        budget_patterns = [
            r'\$(\d{1,3}(?:,\d{3})*|\d+)\s*(?:k|K)?',  # $50k, $50,000
            r'budget\s*(?:of|is|:)?\s*\$?(\d{1,3}(?:,\d{3})*|\d+)\s*(?:k|K)?',  # budget of 50k
            r'(\d{1,3}(?:,\d{3})*|\d+)\s*(?:k|K)\s*(?:per|\/|a)?\s*(?:month|mo)',  # 50k/month
        ]
        for pattern in budget_patterns:
            budget_match = re.search(pattern, message, re.IGNORECASE)
            if budget_match:
                amount = budget_match.group(1).replace(",", "")
                # Only accept if it's a reasonable budget number (> 100 or has k/K)
                has_k = bool(re.search(r'\d+\s*[kK]', message))
                if has_k:
                    extracted["budget"] = int(amount) * 1000
                elif int(amount) >= 1000:  # Only accept raw numbers >= 1000
                    extracted["budget"] = int(amount)
                break

        # Tool recognition - avoid duplicates
        tools = recognize_tools(message)
        if tools:
            existing_names = {t.name for t in self.state.recognized_tools}
            new_tools = [t for t in tools if t.name not in existing_names]
            self.state.recognized_tools.extend(new_tools)
            extracted["tech_stack"] = [t.name for t in tools]

        # Specialization needs
        specs = {
            "demand gen": ["demand gen", "demand generation", "lead gen"],
            "abm": ["abm", "account based", "account-based"],
            "content": ["content", "content marketing", "blog"],
            "plg": ["plg", "product led", "product-led", "self-serve"],
            "brand": ["brand", "branding", "positioning"],
            "seo": ["seo", "search engine", "organic search"],
            "paid": ["paid", "ppc", "ads", "advertising"],
        }
        found_specs = []
        for spec, keywords in specs.items():
            if any(kw in message_lower for kw in keywords):
                found_specs.append(spec)
        if found_specs:
            extracted["needed_specializations"] = found_specs

        # Strategy type hints
        if "product led" in message_lower or "plg" in message_lower or "self-serve" in message_lower:
            extracted["strategy_type"] = "plg"
        elif "sales" in message_lower and ("led" in message_lower or "driven" in message_lower):
            extracted["strategy_type"] = "sales_led"
        elif "hybrid" in message_lower or ("product" in message_lower and "sales" in message_lower):
            extracted["strategy_type"] = "hybrid"

        # Region detection
        regions = {
            "us": ["us", "usa", "united states", "america"],
            "uk": ["uk", "united kingdom", "britain"],
            "europe": ["europe", "eu", "emea"],
            "apac": ["apac", "asia", "pacific"],
            "global": ["global", "worldwide", "international"],
        }
        found_regions = []
        for region, keywords in regions.items():
            if any(kw in message_lower for kw in keywords):
                found_regions.append(region.upper())
        if found_regions:
            extracted["target_regions"] = found_regions

        return extracted

    def update_requirements(self, extracted: dict) -> list[ConfirmationRequest]:
        """Update requirements and return confirmation requests."""
        confirmations = []
        req = self.state.requirements

        for field, value in extracted.items():
            if field == "tech_stack":
                req.tech_stack = list(set((req.tech_stack or []) + value))
            elif field == "needed_specializations":
                req.needed_specializations = list(set((req.needed_specializations or []) + value))
            elif field == "target_regions":
                req.target_regions = list(set((req.target_regions or []) + value))
            else:
                setattr(req, field, value)

            # Create soft confirmation for important fields
            if field in ["industry", "category", "budget", "strategy_type"]:
                confirmations.append(ConfirmationRequest(
                    field=field,
                    value=str(value),
                    display_label=field.replace("_", " ").title(),
                    confidence=0.9
                ))

        self.state.progress_percent = self.calculate_progress()
        return confirmations

    async def process_message(self, message: str) -> dict:
        """Process a user message and return state updates."""
        # Store user message in Zep memory
        await self.memory.add_user_message(
            content=message,
            metadata={"type": "user_input"}
        )

        # Extract info from message
        extracted = self.extract_from_message(message)

        # Update requirements and get confirmations
        confirmations = self.update_requirements(extracted)
        self.state.pending_confirmations = confirmations

        # Search agencies if we have enough info
        agencies = []
        if self.state.progress_percent >= 40:
            req = self.state.requirements
            specs = req.needed_specializations or []
            if not specs and req.category == "b2b_saas":
                specs = ["B2B Marketing", "GTM"]

            agencies = await search_agencies(
                specializations=specs,
                category_tags=["B2B Marketing Agency"] if req.category == "b2b_saas" else [],
                max_budget=req.budget,
                limit=5
            )
            self.state.matched_agencies = agencies

        # Store assistant response summary in memory
        await self.memory.add_assistant_message(
            content=f"Extracted: {list(extracted.keys())}. Progress: {self.state.progress_percent}%",
            metadata={"type": "extraction_result", "fields": list(extracted.keys())}
        )

        return {
            "extracted": extracted,
            "confirmations": [c.model_dump() for c in confirmations],
            "state": {
                "requirements": self.state.requirements.model_dump(),
                "progress_percent": self.state.progress_percent,
                "industry_data": self.state.industry_data.model_dump() if self.state.industry_data else None,
                "recognized_tools": [t.model_dump() for t in self.state.recognized_tools],
                "matched_agencies": [a.model_dump() for a in self.state.matched_agencies],
            },
            "memory": {
                "user_id": self.user_id,
                "thread_id": self.thread_id,
            }
        }

    def confirm_field(self, field: str) -> None:
        """Confirm a field (user accepted the extraction)."""
        if field not in self.state.confirmed_fields:
            self.state.confirmed_fields.append(field)
        # Remove from pending
        self.state.pending_confirmations = [
            c for c in self.state.pending_confirmations if c.field != field
        ]

    def correct_field(self, field: str, new_value: str) -> None:
        """Correct a field (user provided different value)."""
        if hasattr(self.state.requirements, field):
            setattr(self.state.requirements, field, new_value)
        self.confirm_field(field)

    async def get_conversation_history(self, last_n: int = 10) -> str:
        """Get recent conversation history from memory."""
        return await self.memory.get_context(last_n)

    async def search_history(self, query: str, limit: int = 5) -> list[dict]:
        """Search conversation history for relevant context."""
        return await self.memory.search(query, limit)


# Global agent instance
gtm_agent = GTMAgent()
