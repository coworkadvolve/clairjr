import { createClient, type QueryParams, type SanityClient } from '@sanity/client';

import { apiVersion, dataset, projectId } from './env';

let clientInstance: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to your environment variables.',
    );
  }

  if (!clientInstance) {
    clientInstance = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    });
  }

  return clientInstance;
}

export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return getSanityClient().fetch<T>(query, params);
}

/** @deprecated Use getSanityClient() — kept for image URL builder */
export const client = {
  get config() {
    return getSanityClient().config;
  },
} as Pick<SanityClient, 'config'>;
