import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const result = await sql`
      SELECT * FROM user_preferences WHERE user_id = ${userId}
    `;

    if (result.length === 0) {
      return NextResponse.json({ profile: null });
    }

    const profile = result[0];
    return NextResponse.json({
      profile: {
        company_name: profile.company_name,
        industry: profile.industry,
        target_market: profile.target_market,
        category: profile.stage,
        budget: profile.budget ? Number(profile.budget) : null,
        strategy_type: profile.strategy_preference,
        needed_specializations: profile.challenges || [],
        tech_stack: profile.interested_agencies || [],
        zep_synced: profile.zep_synced,
        updated_at: profile.updated_at,
      },
      completionPercent: calculateCompletion(profile),
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// POST - Create or update a single field
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const body = await request.json();
    const { field, value } = body;

    // Check if user profile exists
    const existing = await sql`
      SELECT id FROM user_preferences WHERE user_id = ${userId}
    `;

    const isNew = existing.length === 0;

    // Handle each field with specific queries
    if (isNew) {
      // Create profile with initial values
      await sql`
        INSERT INTO user_preferences (user_id, created_at, updated_at)
        VALUES (${userId}, NOW(), NOW())
        ON CONFLICT (user_id) DO NOTHING
      `;
    }

    // Update specific field
    const processedValue = Array.isArray(value) ? value : value;

    switch (field) {
      case 'company_name':
        await sql`UPDATE user_preferences SET company_name = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'industry':
        await sql`UPDATE user_preferences SET industry = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'target_market':
        await sql`UPDATE user_preferences SET target_market = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'category':
        await sql`UPDATE user_preferences SET stage = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'budget':
        await sql`UPDATE user_preferences SET budget = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'strategy_type':
        await sql`UPDATE user_preferences SET strategy_preference = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'needed_specializations':
        await sql`UPDATE user_preferences SET challenges = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      case 'tech_stack':
        await sql`UPDATE user_preferences SET interested_agencies = ${processedValue}, updated_at = NOW() WHERE user_id = ${userId}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
    }

    // Fetch updated profile
    const updated = await sql`
      SELECT * FROM user_preferences WHERE user_id = ${userId}
    `;

    return NextResponse.json({
      success: true,
      completionPercent: calculateCompletion(updated[0]),
    });
  } catch (error) {
    console.error('Error saving user profile:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// PUT - Bulk update profile
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const body = await request.json();
    const {
      company_name,
      industry,
      target_market,
      category,
      budget,
      strategy_type,
      needed_specializations,
      tech_stack,
    } = body;

    // Check if user profile exists
    const existing = await sql`
      SELECT id FROM user_preferences WHERE user_id = ${userId}
    `;

    if (existing.length === 0) {
      // Create new profile with all fields
      await sql`
        INSERT INTO user_preferences (
          user_id, company_name, industry, target_market, stage,
          budget, strategy_preference, challenges, interested_agencies,
          created_at, updated_at
        )
        VALUES (
          ${userId}, ${company_name || null}, ${industry || null},
          ${target_market || null}, ${category || null},
          ${budget || null}, ${strategy_type || null},
          ${needed_specializations || []}, ${tech_stack || []},
          NOW(), NOW()
        )
      `;
    } else {
      // Update all fields
      await sql`
        UPDATE user_preferences
        SET
          company_name = COALESCE(${company_name || null}, company_name),
          industry = COALESCE(${industry || null}, industry),
          target_market = COALESCE(${target_market || null}, target_market),
          stage = COALESCE(${category || null}, stage),
          budget = COALESCE(${budget || null}, budget),
          strategy_preference = COALESCE(${strategy_type || null}, strategy_preference),
          challenges = COALESCE(${needed_specializations || null}, challenges),
          interested_agencies = COALESCE(${tech_stack || null}, interested_agencies),
          updated_at = NOW()
        WHERE user_id = ${userId}
      `;
    }

    // Fetch updated profile
    const updated = await sql`
      SELECT * FROM user_preferences WHERE user_id = ${userId}
    `;

    return NextResponse.json({
      success: true,
      profile: updated[0],
      completionPercent: calculateCompletion(updated[0]),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculateCompletion(profile: any): number {
  if (!profile) return 0;

  const fields = [
    profile.company_name,
    profile.industry,
    profile.target_market || profile.stage,
    profile.budget,
    profile.strategy_preference,
    profile.challenges?.length > 0,
  ];

  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}
