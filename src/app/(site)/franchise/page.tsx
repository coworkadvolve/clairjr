import { FranchisePage } from '@/views/FranchisePage';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.franchise;

export default function Page() {
  return <FranchisePage />;
}
