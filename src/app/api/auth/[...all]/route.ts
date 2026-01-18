import { NextResponse } from 'next/server';

// Auth endpoints - require NEXT_PUBLIC_NEON_AUTH_URL to be configured
const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;

if (!authUrl) {
  console.warn('NEXT_PUBLIC_NEON_AUTH_URL is not set - auth endpoints will not work');
}

export async function GET() {
  if (!authUrl) {
    return new NextResponse('Auth not configured. Set NEXT_PUBLIC_NEON_AUTH_URL.', { status: 503 });
  }
  // TODO: Implement Neon Auth handler when configured
  return new NextResponse('Auth not configured', { status: 503 });
}

export async function POST() {
  if (!authUrl) {
    return new NextResponse('Auth not configured. Set NEXT_PUBLIC_NEON_AUTH_URL.', { status: 503 });
  }
  // TODO: Implement Neon Auth handler when configured
  return new NextResponse('Auth not configured', { status: 503 });
}
