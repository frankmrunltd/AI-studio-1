import React, { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/enquiry';
import { ThemeMode } from '../utils/theme';
import { BrandLogo, WhatsAppIcon } from './BrandLogo';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onBookServiceClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onBookServiceClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappUrl = buildGeneralWhatsAppUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/90'
          : 'bg-white dark:bg-[#080808] border-b border-neutral-200/80 dark:border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          aria-label="JTR Plumbing and Maintenance Home"
          className="inline-flex items-center shrink-0 focus-visible:rounded-md"
        >
          <BrandLogo compact />
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#FF6500] dark:hover:text-[#FF6500] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#FF6500] after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (WhatsApp, Theme Switcher, Book a Service CTA, Mobile Toggle) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with JTR Plumbing and Maintenance on WhatsApp"
            title="Chat on WhatsApp (07851 564381)"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-200 hover:border-[#25D366] hover:text-[#16a34a] dark:hover:text-[#25D366] transition-colors shrink-0"
          >
            <WhatsAppIcon className="w-[18px] h-[18px]" />
          </a>

          <ThemeSwitcher theme={theme} onToggle={onToggleTheme} />

          <button
            type="button"
            onClick={onBookServiceClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            BOOK A SERVICE
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-800 dark:text-neutral-100 hover:border-[#FF6500] transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0C0C0C] px-4 pt-4 pb-6 shadow-lg"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-3 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-[#181818] hover:text-[#FF6500] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookServiceClick();
              }}
              className="w-full py-3.5 px-5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer"
            >
              BOOK A SERVICE
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-800 dark:text-neutral-100 hover:border-[#FF6500] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
                <span>Call Us</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-neutral-800 dark:text-neutral-100 hover:border-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#16a34a] dark:text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
