'use client';

import dynamic from 'next/dynamic';

const StudioClient = dynamic(() => import('./StudioClient'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[100dvh] items-center justify-center bg-[#101112] text-white">
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white"
          aria-hidden
        />
        <p className="text-sm text-white/70">Loading Sanity Studio…</p>
      </div>
    </div>
  ),
});

export default function StudioLoader() {
  return <StudioClient />;
}
