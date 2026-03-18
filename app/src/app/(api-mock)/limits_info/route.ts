import { NextResponse } from 'next/server';
import { limitsInfo } from '@/shared/lib/mock';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(limitsInfo);
}
