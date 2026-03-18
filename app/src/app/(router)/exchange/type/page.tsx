"use client"
import dynamic from 'next/dynamic';

const ExchangeTypePage = dynamic(() => import('@/b__pages/exchangeType/ui').then(mod => mod.default), { ssr: false });

export default function ExchangeType() {
  return <ExchangeTypePage></ExchangeTypePage>
}
