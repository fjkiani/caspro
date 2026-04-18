import { Suspense } from 'react';
import { HeroSlider } from '@/components/sections/mars/HeroSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] w-full overflow-x-hidden">
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" aria-hidden />}>
        <HeroSlider />
      </Suspense>
    </main>
  );
}