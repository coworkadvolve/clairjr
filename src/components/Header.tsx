'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './Button';
import { navItems, pathnameToNavKey, routes } from '@/lib/routes';
import type { SiteSettings } from '@/lib/content-types';

interface HeaderProps {
  siteSettings: SiteSettings;
}

export function Header({ siteSettings }: HeaderProps) {
  const primaryPhone = siteSettings.phones[0];
  const pathname = usePathname();
  const currentPage = pathnameToNavKey(pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="bg-brand-orange border-b border-brand-orange sticky top-0 z-50 shadow-sm">
        <div className="bg-neutral-800 text-white py-2">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-6">
                {primaryPhone && (
                  <a href={`tel:${primaryPhone.tel}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <Phone size={14} />
                    <span className="hidden md:inline">{primaryPhone.number}</span>
                  </a>
                )}
                <a href={`mailto:${siteSettings.primaryEmail}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                  <Mail size={14} />
                  <span className="hidden md:inline">{siteSettings.primaryEmail}</span>
                </a>
              </div>
              <div className="text-xs text-white/80">
                {siteSettings.headerTagline}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            <Link
              href={routes.home}
              onClick={handleNavClick}
              className="flex items-center gap-3 group"
            >
              <img
                src="/logo/clair-white-png.png"
                alt="Clair Lighting Solutions"
                className="h-12 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.value}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`font-medium transition-colors relative py-2 uppercase ${
                    currentPage === item.value
                      ? 'text-white'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  {currentPage === item.value && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link href={routes.contact} onClick={handleNavClick}>
                <Button variant="primary" size="md">
                  Get a Quote
                </Button>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-40 border-t border-neutral-200 animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.value}
                href={item.href}
                onClick={handleNavClick}
                className={`text-left px-4 py-3 font-medium transition-colors border-l-4 uppercase ${
                  currentPage === item.value
                    ? 'border-brand-orange text-brand-orange bg-orange-50'
                    : 'border-transparent text-neutral-700 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Link href={routes.contact} onClick={handleNavClick} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
