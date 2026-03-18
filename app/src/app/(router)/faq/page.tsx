"use client"
import dynamic from 'next/dynamic';

const FaqPage = dynamic(() => import('@/b__pages/faq/ui').then(mod => mod.default), { ssr: false });

export default function Faq() {
  return <FaqPage></FaqPage>
}
