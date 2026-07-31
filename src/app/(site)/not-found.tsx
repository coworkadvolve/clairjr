import Link from 'next/link';

import { Button } from '@/components/Button';
import { routes } from '@/lib/routes';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white py-20">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <p className="text-brand-orange font-semibold uppercase tracking-wider mb-4">404</p>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Page Not Found</h1>
        <p className="text-neutral-600 mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={routes.home}>
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
          <Link href={routes.products}>
            <Button variant="outline" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
