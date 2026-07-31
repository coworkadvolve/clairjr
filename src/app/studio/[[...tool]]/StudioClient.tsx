'use client';

import { NextStudio } from 'next-sanity/studio';

import { projectId } from '@/sanity/env';
import config from '../../../../sanity.config';

export default function StudioClient() {
  if (!projectId) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-[#101112] px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="mb-3 text-xl font-semibold">Sanity Studio unavailable</h1>
          <p className="text-sm text-white/70">
            Set <code className="text-white">NEXT_PUBLIC_SANITY_PROJECT_ID</code> in your
            environment variables and redeploy.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
