import { NextResponse } from 'next/server';
import { exchangeRatesCarousel } from '@/shared/lib/mock';

export const dynamic = 'force-dynamic';

const ratesInfo = exchangeRatesCarousel.map((rate, index) => ({
  id: index + 1,
  weight: index + 1,
  title: rate.title,
  description: rate.description,
  currency_give: 'RUB',
  currency_get: 'USDT',
}));

export async function GET() {
  return NextResponse.json({ rates_info: ratesInfo });
}
