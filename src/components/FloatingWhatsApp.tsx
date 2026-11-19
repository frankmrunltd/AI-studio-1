import React from 'react';
import { buildGeneralWhatsAppUrl } from '../utils/enquiry';
import { WhatsAppIcon } from './BrandLogo';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with JTR Plumbing and Maintenance on WhatsApp"
      title="Chat on WhatsApp — 07851 564381"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 h-12 px-3.5 sm:px-4 rounded-xl bg-[#0E0E0E] dark:bg-[#FF6500] text-white border border-neutral-700/80 dark:border-[#FF6500] shadow-lg hover:bg-[#FF6500] dark:hover:bg-[#E55A00] hover:border-[#FF6500] transition-all duration-200 hover:-translate-y-0.5"
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      <span className="hidden sm:inline font-display font-bold text-xs tracking-wider uppercase whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
};
