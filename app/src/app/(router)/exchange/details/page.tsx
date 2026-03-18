"use client"
import dynamic from 'next/dynamic';

const ExchangeDetailsPage = dynamic(() => import('@/b__pages/exchangeDetails/ui').then(mod => mod.default), { ssr: false });

export default function ExchangeDetails() {
  return <ExchangeDetailsPage></ExchangeDetailsPage>
}
