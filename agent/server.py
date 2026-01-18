"""FastAPI server with CopilotKit SDK integration."""

import os
import sys
from pathlib import Path
from typing import Optional

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from dotenv import load_dotenv
import json
import asyncio

# CopilotKit SDK imports
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitRemoteEndpoint, Action as CopilotAction

from agent import gtm_agent
from models import GTMState
from tools import search_agencies as search_agencies_db

load_dotenv()

app = FastAPI(title="GTM Agent")

# CORS for CopilotKit
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# CopilotKit Action Handlers
# ============================================

async def update_requirements_handler(
    company_name: Optional[str] = None,
    industry: Optional[str] = None,
    category: Optional[str] = None,
    maturity: Optional[str] = None,
    target_market: Optional[str] = None,
    target_regions: Optional[list] = None,
    strategy_type: Optional[str] = None,
    budget: Optional[int] = None,
    primary_goal: Optional[str] = None,
    needed_specializations: Optional[list] = None,
    tech_stack: Optional[list] = None,
):
    """Update GTM requirements from extracted data."""
    # Build extracted dict from non-None values
    extracted = {}
    if company_name:
        extracted["company_name"] = company_name
    if industry:
        extracted["industry"] = industry
    if category:
        extracted["category"] = category
    if maturity:
        extracted["maturity"] = maturity
    if target_market:
        extracted["target_market"] = target_market
    if target_regions:
        extracted["target_regions"] = target_regions
    if strategy_type:
        extracted["strategy_type"] = strategy_type
    if budget:
        extracted["budget"] = budget
    if primary_goal:
        extracted["primary_goal"] = primary_goal
    if needed_specializations:
        extracted["needed_specializations"] = needed_specializations
    if tech_stack:
        extracted["tech_stack"] = tech_stack

    # Update the agent state
    confirmations = gtm_agent.update_requirements(extracted)

    return {
        "status": "updated",
        "progress_percent": gtm_agent.state.progress_percent,
        "requirements": gtm_agent.state.requirements.model_dump(),
        "confirmations": [c.model_dump() for c in confirmations],
    }


async def search_agencies_handler(
    specializations: Optional[list] = None,
    category_tags: Optional[list] = None,
    service_areas: Optional[list] = None,
    max_budget: Optional[int] = None,
):
    """Search for matching agencies based on requirements."""
    agencies = await search_agencies_db(
        specializations=specializations or [],
        category_tags=category_tags or [],
        service_areas=service_areas or [],
        max_budget=max_budget,
        limit=5,
    )

    # Update agent state with matched agencies
    gtm_agent.state.matched_agencies = agencies

    return {
        "status": "found",
        "count": len(agencies),
        "agencies": [a.model_dump() for a in agencies],
    }


async def get_state_handler():
    """Get the current GTM state."""
    state = gtm_agent.state
    return {
        "requirements": state.requirements.model_dump(),
        "progress_percent": state.progress_percent,
        "industry_data": state.industry_data.model_dump() if state.industry_data else None,
        "recognized_tools": [t.model_dump() for t in state.recognized_tools],
        "matched_agencies": [a.model_dump() for a in state.matched_agencies],
        "pending_confirmations": [c.model_dump() for c in state.pending_confirmations],
        "confirmed_fields": state.confirmed_fields,
    }


# Define CopilotKit actions
update_requirements_action = CopilotAction(
    name="update_requirements",
    description="Update GTM requirements. Call this after EVERY user message to extract and save their information.",
    parameters=[
        {"name": "company_name", "type": "string", "description": "Company or product name"},
        {"name": "industry", "type": "string", "description": "Industry vertical (gaming, fintech, healthcare, etc.)"},
        {"name": "category", "type": "string", "description": "Business category: b2b_saas, dtc, enterprise, marketplace, consumer"},
        {"name": "maturity", "type": "string", "description": "Company stage: idea, pre_launch, early, growth, scale"},
        {"name": "target_market", "type": "string", "description": "Target customer description"},
        {"name": "target_regions", "type": "array", "description": "Target regions: US, UK, Europe, APAC, Global"},
        {"name": "strategy_type", "type": "string", "description": "GTM strategy: plg, sales_led, hybrid"},
        {"name": "budget", "type": "number", "description": "Monthly marketing budget in USD"},
        {"name": "primary_goal", "type": "string", "description": "Main goal: awareness, leads, revenue, expansion"},
        {"name": "needed_specializations", "type": "array", "description": "What help they need: demand_gen, abm, content, plg, brand, seo, paid"},
        {"name": "tech_stack", "type": "array", "description": "Tools they use: HubSpot, Clay, Salesforce, etc."},
    ],
    handler=update_requirements_handler
)

search_agencies_action = CopilotAction(
    name="search_agencies",
    description="Search for matching GTM agencies. Call when you have gathered enough requirements (industry, budget, or specializations).",
    parameters=[
        {"name": "specializations", "type": "array", "description": "Required specializations: Demand Generation, ABM, Content Marketing, etc."},
        {"name": "category_tags", "type": "array", "description": "Category tags: B2B Marketing Agency, GTM Agency, etc."},
        {"name": "service_areas", "type": "array", "description": "Service areas: North America, Europe, APAC, etc."},
        {"name": "max_budget", "type": "number", "description": "Maximum monthly budget in USD"},
    ],
    handler=search_agencies_handler
)

get_state_action = CopilotAction(
    name="get_state",
    description="Get the current GTM planning state including requirements, progress, and matched agencies.",
    parameters=[],
    handler=get_state_handler
)

# Initialize CopilotKit SDK
copilotkit_sdk = CopilotKitRemoteEndpoint(
    actions=[
        update_requirements_action,
        search_agencies_action,
        get_state_action,
    ]
)

# Add CopilotKit endpoint at /copilotkit
add_fastapi_endpoint(app, copilotkit_sdk, "/copilotkit")


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "agent": "gtm"}


@app.get("/info")
async def info():
    """Agent info for CopilotKit discovery."""
    return {
        "name": "GTM Strategy Agent",
        "description": "Helps build go-to-market plans with HITL confirmations",
        "version": "1.0.0",
        "capabilities": [
            "extract_requirements",
            "search_agencies",
            "fetch_industry_data",
            "recognize_tools",
            "hitl_confirmations"
        ]
    }


@app.post("/process")
async def process_message(request: Request):
    """Process a user message and return state updates."""
    body = await request.json()
    message = body.get("message", "")

    if not message:
        return JSONResponse({"error": "No message provided"}, status_code=400)

    result = await gtm_agent.process_message(message)
    return JSONResponse(result)


@app.post("/confirm")
async def confirm_field(request: Request):
    """Confirm an extracted field."""
    body = await request.json()
    field = body.get("field")

    if not field:
        return JSONResponse({"error": "No field specified"}, status_code=400)

    gtm_agent.confirm_field(field)
    return JSONResponse({"status": "confirmed", "field": field})


@app.post("/correct")
async def correct_field(request: Request):
    """Correct an extracted field with a new value."""
    body = await request.json()
    field = body.get("field")
    value = body.get("value")

    if not field or not value:
        return JSONResponse({"error": "Field and value required"}, status_code=400)

    gtm_agent.correct_field(field, value)
    return JSONResponse({"status": "corrected", "field": field, "value": value})


@app.get("/state")
async def get_state():
    """Get current GTM state."""
    state = gtm_agent.state
    return JSONResponse({
        "requirements": state.requirements.model_dump(),
        "progress_percent": state.progress_percent,
        "industry_data": state.industry_data.model_dump() if state.industry_data else None,
        "recognized_tools": [t.model_dump() for t in state.recognized_tools],
        "matched_agencies": [a.model_dump() for a in state.matched_agencies],
        "pending_confirmations": [c.model_dump() for c in state.pending_confirmations],
        "confirmed_fields": state.confirmed_fields,
    })


@app.post("/reset")
async def reset_state():
    """Reset the agent state."""
    global gtm_agent
    from agent import GTMAgent
    gtm_agent = GTMAgent()
    return JSONResponse({"status": "reset"})


@app.get("/memory/history")
async def get_memory_history(last_n: int = 10):
    """Get conversation history from Zep memory."""
    history = await gtm_agent.get_conversation_history(last_n)
    return JSONResponse({
        "history": history,
        "user_id": gtm_agent.user_id,
        "thread_id": gtm_agent.thread_id,
    })


@app.post("/memory/search")
async def search_memory(request: Request):
    """Search conversation memory."""
    body = await request.json()
    query = body.get("query", "")
    limit = body.get("limit", 5)

    if not query:
        return JSONResponse({"error": "Query required"}, status_code=400)

    results = await gtm_agent.search_history(query, limit)
    return JSONResponse({"results": results})


# AG-UI Protocol endpoint for CopilotKit
@app.post("/")
async def ag_ui_endpoint(request: Request):
    """AG-UI protocol endpoint for CopilotKit integration."""
    try:
        body = await request.json()
        messages = body.get("messages", [])

        # Get the last user message
        user_message = ""
        for msg in reversed(messages):
            if msg.get("role") == "user":
                content = msg.get("content", "")
                if isinstance(content, str):
                    user_message = content
                elif isinstance(content, list):
                    # Handle multi-part content
                    for part in content:
                        if isinstance(part, dict) and part.get("type") == "text":
                            user_message = part.get("text", "")
                            break
                break

        if not user_message:
            # Return a greeting if no user message
            async def stream_greeting():
                yield 'data: {"type":"text","content":"Hello! I\'m your GTM strategist. Tell me about what you\'re building."}\n\n'
                yield 'data: [DONE]\n\n'
            return StreamingResponse(stream_greeting(), media_type="text/event-stream")

        # Process the message
        result = await gtm_agent.process_message(user_message)

        # Build response with state updates
        async def stream_response():
            # Send state update event
            state_event = {
                "type": "state_update",
                "state": result["state"]
            }
            yield f'data: {json.dumps(state_event)}\n\n'

            # Send confirmations if any
            if result["confirmations"]:
                confirm_event = {
                    "type": "confirmations",
                    "items": result["confirmations"]
                }
                yield f'data: {json.dumps(confirm_event)}\n\n'

            # Generate text response based on what was extracted
            extracted = result["extracted"]
            state = result["state"]

            response_parts = []

            # Acknowledge industry
            if "industry" in extracted:
                ind_data = state.get("industry_data")
                if ind_data:
                    response_parts.append(
                        f"**{ind_data['industry']}** - great space! "
                        f"I'm seeing a {ind_data['market_size']} market with {ind_data['growth_rate']} growth."
                    )

            # Acknowledge tools
            tools = state.get("recognized_tools", [])
            if tools:
                tool_names = [t["name"] for t in tools]
                response_parts.append(f"I see you're using {', '.join(tool_names)} - nice stack!")

            # Acknowledge agencies found
            agencies = state.get("matched_agencies", [])
            if agencies:
                response_parts.append(f"Found {len(agencies)} agencies that could help.")

            # Progress update
            progress = state.get("progress_percent", 0)
            if progress > 0:
                response_parts.append(f"We're {progress}% through requirements.")

            # Ask follow-up
            req = state.get("requirements", {})
            if not req.get("target_market"):
                response_parts.append("Who's your target customer?")
            elif not req.get("budget"):
                response_parts.append("What's your marketing budget range?")
            elif not req.get("needed_specializations"):
                response_parts.append("What kind of help are you looking for? (demand gen, ABM, content, etc.)")

            response_text = " ".join(response_parts) if response_parts else "Tell me more about your business."

            text_event = {
                "type": "text",
                "content": response_text
            }
            yield f'data: {json.dumps(text_event)}\n\n'
            yield 'data: [DONE]\n\n'

        return StreamingResponse(stream_response(), media_type="text/event-stream")

    except Exception as e:
        print(f"AG-UI error: {e}")
        import traceback
        traceback.print_exc()

        async def error_stream():
            yield f'data: {{"type":"error","message":"{str(e)}"}}\n\n'
            yield 'data: [DONE]\n\n'
        return StreamingResponse(error_stream(), media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
