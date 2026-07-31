import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { getSanityClient } from './client';
import { projectId } from './env';

export function urlForImage(source: SanityImageSource) {
  if (!projectId) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to your environment variables.',
    );
  }

  return createImageUrlBuilder(getSanityClient()).image(source);
}
