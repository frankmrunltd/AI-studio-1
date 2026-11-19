import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/enquiry';
import { WhatsAppIcon } from './BrandLogo';

export const WhatsAppSection: React.FC = () => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <section
      aria-labelledby="whatsapp-cta-heading"
      className="bg-[#0B0B0B] text-white border-b border-neutral-800/80 py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#141414] border border-neutral-800 px-6 py-10 sm:px-12 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF6500] mb-2">Direct Messaging</p>
            <h2
              id="whatsapp-cta-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white"
            >
              Need Plumbing Assistance?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-300 leading-relaxed">
              Have a question or need to discuss a plumbing issue? Contact JTR directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-sm tracking-wider uppercase transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>CHAT WITH US ON WHATSAPP</span>
            </a>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-neutral-700 hover:border-white text-white font-semibold text-sm transition-colors tabular-nums whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
