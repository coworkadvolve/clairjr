import { PrivacyPolicyPage } from '@/views/PrivacyPolicyPage';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.privacyPolicy;

export default function Page() {
  return <PrivacyPolicyPage />;
}
