/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Hero } from './components/Hero';
import { LegalModal } from './components/LegalModal';
import { Navbar } from './components/Navbar';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { TrustSection } from './components/TrustSection';
import { WhatsAppSection } from './components/WhatsAppSection';
import {
  THEME_STORAGE_KEY,
  ThemeMode,
  applyThemeToDocument,
  getNextTheme,
  resolveInitialTheme,
  saveThemePreference,
} from './utils/theme';

function getInitialBrowserTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    stored = null;
  }
  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return resolveInitialTheme(stored, prefersDark);
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialBrowserTheme);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [selectionVersion, setSelectionVersion] = useState<number>(0);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((current) => {
      const next = getNextTheme(current);
      saveThemePreference(next);
      return next;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceAndScroll = (serviceName: string) => {
    setPreselectedService(serviceName);
    setSelectionVersion((v) => v + 1);
    scrollToSection('booking');
  };

  const handleRequestQuote = () => {
    setPreselectedService('Quote / General Plumbing Enquiry');
    setSelectionVersion((v) => v + 1);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080808] text-[#121212] dark:text-[#F5F5F5] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#FF6500] focus:text-white focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onBookServiceClick={() => scrollToSection('booking')}
      />

      <main id="main-content" className="flex-1">
        <Hero
          onBookServiceClick={() => scrollToSection('booking')}
          onRequestQuoteClick={handleRequestQuote}
        />

        <TrustSection />

        <ServicesSection onSelectService={handleSelectServiceAndScroll} />

        <AboutSection onGetInTouchClick={() => scrollToSection('contact')} />

        <GallerySection onEnquireService={handleSelectServiceAndScroll} />

        <ProcessSection />

        <BookingSection
          preselectedService={preselectedService}
          selectionVersion={selectionVersion}
        />

        <WhatsAppSection />

        <FaqSection />

        <ContactSection />
      </main>

      <Footer
        onSelectService={handleSelectServiceAndScroll}
        onOpenLegal={(type) => setLegalModal(type)}
      />

      <FloatingWhatsApp />

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
