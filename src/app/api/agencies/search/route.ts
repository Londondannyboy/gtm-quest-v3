import { NextRequest, NextResponse } from 'next/server';
import { searchAgencies, mapUserInput, SPECIALIZATION_MAP, CATEGORY_MAP, REGION_MAP } from '@/lib/agencies';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      specializations = [],
      category_tags = [],
      service_areas = [],
      max_budget,
      limit = 5,
    } = body;

    // Map user-friendly terms to database values
    const mappedSpecs = specializations.flatMap((s: string) =>
      mapUserInput(s, SPECIALIZATION_MAP)
    );
    const mappedCategories = category_tags.flatMap((c: string) =>
      mapUserInput(c, CATEGORY_MAP)
    );
    const mappedRegions = service_areas.flatMap((r: string) =>
      mapUserInput(r, REGION_MAP)
    );

    const results = await searchAgencies({
      specializations: mappedSpecs,
      category_tags: mappedCategories,
      service_areas: mappedRegions,
      max_budget,
      limit,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Agency search error:', error);
    return NextResponse.json(
      { error: 'Failed to search agencies' },
      { status: 500 }
    );
  }
}
