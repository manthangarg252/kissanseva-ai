import {NextRequest, NextResponse} from 'next/server';
import { logFeedback } from '@/ai/utils/feedback';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await logFeedback(body);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
