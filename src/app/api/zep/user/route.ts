import { NextRequest, NextResponse } from 'next/server';
import { ZepClient } from '@getzep/zep-cloud';

const ZEP_API_KEY = process.env.ZEP_API_KEY || '';

// Initialize Zep client
const getZepClient = () => {
  if (!ZEP_API_KEY) {
    throw new Error('ZEP_API_KEY not configured');
  }
  return new ZepClient({ apiKey: ZEP_API_KEY });
};

// GET - Retrieve user memory and context
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const client = getZepClient();

    // Get user from Zep
    let user;
    try {
      const response = await client.user.get(userId);
      user = response;
    } catch (e: any) {
      // User doesn't exist yet
      if (e.statusCode === 404 || e.status === 404) {
        return NextResponse.json({
          userId,
          isNew: true,
          facts: [],
          threads: [],
        });
      }
      throw e;
    }

    // Get user's threads
    let threads: any[] = [];
    try {
      const threadsResponse = await client.user.getThreads(userId);
      threads = threadsResponse || [];
    } catch (e) {
      console.log('[Zep] Failed to get threads:', e);
    }

    // Get facts about the user (from graph search)
    let facts: string[] = [];
    try {
      const graphSearch = await client.graph.search({
        userId,
        query: 'user interests preferences GTM strategy company industry budget target market',
        limit: 20,
      });
      facts = graphSearch?.edges?.map((edge: any) => edge.fact) || [];
    } catch (e) {
      console.log('[Zep] Graph search not available:', e);
    }

    return NextResponse.json({
      userId,
      isNew: false,
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        metadata: user.metadata,
      },
      facts,
      threads: threads.map((t: any) => ({
        threadId: t.threadId,
        createdAt: t.createdAt,
        metadata: t.metadata,
      })),
    });
  } catch (error: any) {
    console.error('[Zep API] GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get user memory' },
      { status: 500 }
    );
  }
}

// POST - Create or update user, add memory
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, firstName, lastName, metadata, threadId, messages, facts } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const client = getZepClient();

    // Create or update user
    try {
      await client.user.get(userId);
      // User exists, update if metadata provided
      if (metadata || firstName || lastName) {
        await client.user.update(userId, {
          email,
          firstName,
          lastName,
          metadata,
        });
      }
    } catch (e: any) {
      if (e.statusCode === 404 || e.status === 404) {
        // Create new user
        await client.user.add({
          userId,
          email,
          firstName,
          lastName,
          metadata: metadata || {},
        });
      } else {
        throw e;
      }
    }

    // Add messages to thread if provided
    if (threadId && messages && messages.length > 0) {
      // Ensure thread exists
      try {
        await client.thread.get(threadId);
      } catch (e: any) {
        if (e.statusCode === 404 || e.status === 404) {
          await client.thread.create({
            threadId,
            userId,
          });
        }
      }

      // Add messages
      await client.thread.addMessages(threadId, {
        messages: messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
          metadata: m.metadata || {},
        })),
      });
    }

    // Add explicit facts if provided (via graph)
    if (facts && facts.length > 0) {
      try {
        await client.graph.add({
          userId,
          type: 'text',
          data: facts.join('\n'),
        });
      } catch (e) {
        console.log('[Zep] Graph add not available:', e);
      }
    }

    return NextResponse.json({
      success: true,
      userId,
      threadId,
    });
  } catch (error: any) {
    console.error('[Zep API] POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save memory' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a thread
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: 'threadId required' }, { status: 400 });
    }

    const client = getZepClient();
    await client.thread.delete(threadId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Zep API] DELETE error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete thread' },
      { status: 500 }
    );
  }
}
