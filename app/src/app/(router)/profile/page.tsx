"use client"
import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@/b__pages/profile/ui').then(mod => mod.default), { ssr: false });

export default  function Profile() {
  return <ProfilePage></ProfilePage>
}


