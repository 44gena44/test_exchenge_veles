import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const safeJson = async (request: Request) => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  const body = await safeJson(request);
  const amountGive = typeof body?.amount_give === 'number' ? body.amount_give : null;
  const amountGet = typeof body?.amount_get === 'number' ? body.amount_get : null;

  return NextResponse.json({
    id: Date.now(),
    payment_url: 'https://google.com'
  });
}
