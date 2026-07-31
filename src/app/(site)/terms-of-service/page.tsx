import { TermsOfServicePage } from '@/views/TermsOfServicePage';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.termsOfService;

export default function Page() {
  return <TermsOfServicePage />;
}
