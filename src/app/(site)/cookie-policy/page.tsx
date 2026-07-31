import { CookiePolicyPage } from '@/views/CookiePolicyPage';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.cookiePolicy;

export default function Page() {
  return <CookiePolicyPage />;
}
