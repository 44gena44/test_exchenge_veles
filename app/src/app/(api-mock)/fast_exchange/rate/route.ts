import { NextResponse } from 'next/server';
import { instantExchangeRate, paymentMethods } from '@/shared/lib/mock';

export const dynamic = 'force-dynamic';

const paymentWays = paymentMethods.map((name, index) => ({
  id: index + 1,
  name,
}));

const receiveWays = paymentMethods.map((name, index) => ({
  id: index + 1,
  name,
}));

export async function GET() {
  return NextResponse.json({
    usdt_rub_rate: instantExchangeRate,
    rub_usdt_rate: Number((1 / instantExchangeRate).toFixed(6)),
    network_fee_usdt: 1.5,
    payment_ways: paymentWays,
    receive_ways: receiveWays,
  });
}
