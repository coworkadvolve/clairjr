import { ServicesPage } from '@/views/ServicesPage';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata.services;

export default function Page() {
  return <ServicesPage />;
}
