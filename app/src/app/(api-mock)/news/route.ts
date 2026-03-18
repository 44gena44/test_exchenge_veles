import { NextResponse } from 'next/server';
import { newsItems } from '@/shared/lib/mock';

export const dynamic = 'force-dynamic';

const newsList = newsItems.map((item) => ({
  title: item.title,
  description: item.description,
  label: item.tag,
}));

export async function GET() {
  return NextResponse.json({ news_list: newsList });
}
