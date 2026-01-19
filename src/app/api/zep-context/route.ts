import { NextRequest, NextResponse } from 'next/server';

const ZEP_API_KEY = process.env.ZEP_API_KEY || '';

// Categorize a fact into ontological type for GTM context
function categorize(fact: string, edgeName?: string): 'company' | 'industry' | 'market' | 'budget' | 'strategy' | 'interest' | 'fact' {
  const lower = fact.toLowerCase();
  const edge = (edgeName || '').toLowerCase();

  // Company keywords
  if (['company', 'startup', 'enterprise', 'business', 'founded', 'employees', 'team'].some(k => lower.includes(k))) {
    return 'company';
  }
  // Industry keywords
  if (['saas', 'fintech', 'healthtech', 'edtech', 'ecommerce', 'gaming', 'ai', 'machine learning', 'b2b', 'b2c', 'marketplace'].some(k => lower.includes(k))) {
    return 'industry';
  }
  // Market keywords
  if (['market', 'tam', 'sam', 'som', 'target', 'audience', 'customer', 'segment', 'region', 'geography'].some(k => lower.includes(k))) {
    return 'market';
  }
  // Budget keywords
  if (['budget', 'spend', 'cost', 'price', 'revenue', 'arr', 'mrr', '€', '$', '£', 'k', 'm'].some(k => lower.includes(k))) {
    return 'budget';
  }
  // Strategy keywords
  if (['strategy', 'gtm', 'go-to-market', 'launch', 'channel', 'sales', 'marketing', 'growth', 'outbound', 'inbound', 'plg'].some(k => lower.includes(k))) {
    return 'strategy';
  }
  // Interest keywords
  if (['interested', 'looking for', 'wants', 'prefers', 'likes', 'goal', 'objective'].some(k => lower.includes(k)) || edge.includes('interest')) {
    return 'interest';
  }
  return 'fact';
}

// Clean up fact text for display
function cleanFact(fact: string): string {
  return fact
    .replace(/^(the user |user |they |he |she )/i, '')
    .replace(/^(is |are |has |have |wants |prefers )/i, '')
    .trim();
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId || !ZEP_API_KEY) {
    return NextResponse.json({
      context: '',
      facts: [],
      entities: { company: [], industry: [], market: [], budget: [], strategy: [], interests: [] }
    });
  }

  try {
    // Fetch user's memory from Zep knowledge graph
    const response = await fetch('https://api.getzep.com/api/v2/graph/search', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${ZEP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        query: 'user company industry market budget GTM strategy target audience sales marketing growth',
        limit: 15,
        scope: 'edges',
      }),
    });

    if (!response.ok) {
      console.error('[Zep] Graph search failed:', response.status);
      return NextResponse.json({
        context: '',
        facts: [],
        entities: { company: [], industry: [], market: [], budget: [], strategy: [], interests: [] }
      });
    }

    const data = await response.json();
    const edges = data.edges || [];

    // Extract and categorize facts
    const categorizedFacts: Array<{ fact: string; type: string; clean: string }> = [];
    const entities = {
      company: [] as string[],
      industry: [] as string[],
      market: [] as string[],
      budget: [] as string[],
      strategy: [] as string[],
      interests: [] as string[],
    };

    for (const edge of edges) {
      if (!edge.fact) continue;

      const type = categorize(edge.fact, edge.name);
      const clean = cleanFact(edge.fact);

      categorizedFacts.push({ fact: edge.fact, type, clean });

      // Collect unique entities by type
      if (type === 'company' && !entities.company.includes(clean)) {
        entities.company.push(clean);
      } else if (type === 'industry' && !entities.industry.includes(clean)) {
        entities.industry.push(clean);
      } else if (type === 'market' && !entities.market.includes(clean)) {
        entities.market.push(clean);
      } else if (type === 'budget' && !entities.budget.includes(clean)) {
        entities.budget.push(clean);
      } else if (type === 'strategy' && !entities.strategy.includes(clean)) {
        entities.strategy.push(clean);
      } else if (type === 'interest' && !entities.interests.includes(clean)) {
        entities.interests.push(clean);
      }
    }

    // Build context string grouped by type
    const contextParts: string[] = [];

    if (entities.company.length) {
      contextParts.push(`Company: ${entities.company.join(', ')}`);
    }
    if (entities.industry.length) {
      contextParts.push(`Industry: ${entities.industry.join(', ')}`);
    }
    if (entities.market.length) {
      contextParts.push(`Target Market: ${entities.market.join(', ')}`);
    }
    if (entities.budget.length) {
      contextParts.push(`Budget: ${entities.budget.join(', ')}`);
    }
    if (entities.strategy.length) {
      contextParts.push(`GTM Strategy: ${entities.strategy.join(', ')}`);
    }
    if (entities.interests.length) {
      contextParts.push(`Interests: ${entities.interests.join(', ')}`);
    }

    const context = contextParts.length > 0
      ? contextParts.join('\n')
      : '';

    return NextResponse.json({
      context,
      facts: categorizedFacts,
      entities,
    });
  } catch (error) {
    console.error('[Zep] Error:', error);
    return NextResponse.json({
      context: '',
      facts: [],
      entities: { company: [], industry: [], market: [], budget: [], strategy: [], interests: [] }
    });
  }
}
