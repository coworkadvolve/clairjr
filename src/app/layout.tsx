import type { Metadata, Viewport } from 'next';
import { Barlow } from 'next/font/google';

import { defaultMetadata } from '@/lib/seo/metadata';

import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: '/logo/favicon-orange.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={barlow.variable}>
      <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-SZF5584V5J"></script>
      <script dangerouslySetInnerHTML={{ __html: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-SZF5584V5J');" }} /></head>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
