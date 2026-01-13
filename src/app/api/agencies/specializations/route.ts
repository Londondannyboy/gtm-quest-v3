import { NextResponse } from 'next/server';
import { getSpecializations } from '@/lib/agencies';

export async function GET() {
  try {
    const specializations = await getSpecializations();
    return NextResponse.json(specializations);
  } catch (error) {
    console.error('Get specializations error:', error);
    return NextResponse.json(
      { error: 'Failed to get specializations' },
      { status: 500 }
    );
  }
}
