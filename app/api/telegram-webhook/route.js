import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const update = await request.json();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
