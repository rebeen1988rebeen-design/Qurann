'use client';
import dynamic from 'next/dynamic';
const QuranApp = dynamic(() => import('./quran-app'), { ssr: false });
export default function Page() {
  return <QuranApp />;
}
