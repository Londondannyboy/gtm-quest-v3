"""FastAPI server with AG-UI endpoint for CopilotKit."""

import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from dotenv import load_dotenv
import json
import asyncio

from agent import gtm_agent
from models import GTMState

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
