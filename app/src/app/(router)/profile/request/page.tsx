"use client"
import dynamic from 'next/dynamic';

const RequestPage = dynamic(() => import('@/b__pages/request/ui').then(mod => mod.default), { ssr: false });
 
export default function Request() {
  return <RequestPage></RequestPage>
}
