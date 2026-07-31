'use client';

import { createContext, useContext, type ReactNode } from 'react';

import type { SiteSettings } from '@/lib/content-types';
import { defaultSiteSettings } from '@/lib/content-types';

const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
