import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true, reviews: [] });
}

export async function POST(request) {
  try {
    const data = await request.json();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
