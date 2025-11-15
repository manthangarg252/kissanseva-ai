import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) return NextResponse.json({ error: 'OPENWEATHER_API_KEY missing' }, { status: 500 });
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  const r = await fetch(url);
  const data = await r.json();
  return NextResponse.json(data);
}
