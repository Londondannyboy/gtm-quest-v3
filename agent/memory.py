"""Zep memory integration for GTM Agent."""

import os
from typing import Optional
from zep_cloud.client import Zep
from zep_cloud.types import Message as ZepMessage

# Initialize Zep client (requires ZEP_API_KEY env var)
_zep_client: Optional[Zep] = None


def get_zep_client() -> Optional[Zep]:
    """Get the Zep client, initializing if needed."""
    global _zep_client

    api_key = os.getenv("ZEP_API_KEY")
    if not api_key:
        return None

    if _zep_client is None:
        _zep_client = Zep(api_key=api_key)

    return _zep_client


async def ensure_user(user_id: str) -> bool:
    """Ensure a user exists in Zep."""
    client = get_zep_client()
    if not client:
        return False

    try:
        # Try to get the user first
        await client.user.get_async(user_id)
        return True
    except Exception:
        # Create the user if they don't exist
        try:
            await client.user.add_async(user_id=user_id)
            return True
        except Exception as e:
            print(f"Error creating Zep user: {e}")
            return False


async def ensure_thread(thread_id: str, user_id: str) -> bool:
    """Ensure a thread exists in Zep."""
    client = get_zep_client()
    if not client:
        return False

    try:
        # Try to get the thread first
        await client.memory.get_async(thread_id)
        return True
    except Exception:
        # Create the thread if it doesn't exist
        try:
            await client.memory.add_session_async(
                session_id=thread_id,
                user_id=user_id
            )
            return True
        except Exception as e:
            print(f"Error creating Zep thread: {e}")
            return False


async def add_message(
    thread_id: str,
    role: str,
    content: str,
    metadata: Optional[dict] = None
) -> bool:
    """Add a message to Zep memory."""
    client = get_zep_client()
    if not client:
        return False

    try:
        message = ZepMessage(
            role_type=role,
            content=content,
            metadata=metadata or {}
        )
        await client.memory.add_async(thread_id, messages=[message])
        return True
    except Exception as e:
        print(f"Error adding message to Zep: {e}")
        return False


async def get_memory_context(thread_id: str, last_n: int = 10) -> str:
    """Get conversation context from Zep memory."""
    client = get_zep_client()
    if not client:
        return ""

    try:
        memory = await client.memory.get_async(thread_id, lastn=last_n)

        if not memory or not memory.messages:
            return ""

        # Format messages as context
        context_parts = []
        for msg in memory.messages:
            role = msg.role_type.upper() if msg.role_type else "UNKNOWN"
            context_parts.append(f"{role}: {msg.content}")

        return "\n".join(context_parts)
    except Exception as e:
        print(f"Error getting Zep memory: {e}")
        return ""


async def search_memory(
    thread_id: str,
    query: str,
    limit: int = 5
) -> list[dict]:
    """Search through conversation memory."""
    client = get_zep_client()
    if not client:
        return []

    try:
        results = await client.memory.search_async(
            thread_id,
            text=query,
            limit=limit
        )

        return [
            {
                "content": r.message.content if r.message else "",
                "score": r.score,
                "metadata": r.message.metadata if r.message else {}
            }
            for r in results
        ]
    except Exception as e:
        print(f"Error searching Zep memory: {e}")
        return []


class ConversationMemory:
    """Wrapper class for managing conversation memory with Zep."""

    def __init__(self, user_id: str, thread_id: str):
        self.user_id = user_id
        self.thread_id = thread_id
        self._initialized = False

    async def initialize(self) -> bool:
        """Initialize the memory session."""
        if self._initialized:
            return True

        user_ok = await ensure_user(self.user_id)
        if not user_ok:
            return False

        thread_ok = await ensure_thread(self.thread_id, self.user_id)
        if not thread_ok:
            return False

        self._initialized = True
        return True

    async def add_user_message(self, content: str, metadata: Optional[dict] = None) -> bool:
        """Add a user message."""
        if not self._initialized:
            await self.initialize()
        return await add_message(self.thread_id, "user", content, metadata)

    async def add_assistant_message(self, content: str, metadata: Optional[dict] = None) -> bool:
        """Add an assistant message."""
        if not self._initialized:
            await self.initialize()
        return await add_message(self.thread_id, "assistant", content, metadata)

    async def get_context(self, last_n: int = 10) -> str:
        """Get recent conversation context."""
        if not self._initialized:
            await self.initialize()
        return await get_memory_context(self.thread_id, last_n)

    async def search(self, query: str, limit: int = 5) -> list[dict]:
        """Search conversation history."""
        if not self._initialized:
            await self.initialize()
        return await search_memory(self.thread_id, query, limit)
