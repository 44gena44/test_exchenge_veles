"use client"
import dynamic from 'next/dynamic';

const ExchangeInputPage = dynamic(() => import('@/b__pages/exchangeInput/ui').then(mod => mod.default), { ssr: false });

export default function ExchangeInput() {
  return <ExchangeInputPage></ExchangeInputPage>
}
