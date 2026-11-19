import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO, HERO_MEDIA } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/enquiry';
import { WhatsAppIcon } from './BrandLogo';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onBookServiceClick: () => void;
  onRequestQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookServiceClick,
  onRequestQuoteClick,
}) => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <section
      id="home"
      className="relative bg-white dark:bg-[#080808] border-b border-neutral-200 dark:border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-stretch">
          {/* Left Column: Brand Statement & Conversion Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#FF6500] tracking-wide mb-3.5">
              JTR Plumbing and Maintenance
            </p>

            <h1 className="font-display font-extrabold text-[clamp(2.25rem,4.1vw,3.55rem)] leading-[1.08] tracking-tight text-[#0E0E0E] dark:text-white">
              Reliable Plumbing. Quality Work. Lasting Solutions.
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-xl">
              From everyday plumbing repairs to external plumbing and property maintenance, JTR
              Plumbing and Maintenance is here to help keep your property working as it should.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onBookServiceClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>BOOK A SERVICE</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onRequestQuoteClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#141414] hover:border-[#0E0E0E] dark:hover:border-white text-[#0E0E0E] dark:text-white font-display font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                GET A FREE QUOTE
              </button>
            </div>

            {/* Direct WhatsApp & Click-to-Call Contact Row */}
            <div className="mt-7 pt-6 border-t border-neutral-200 dark:border-neutral-800/90 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-neutral-900 dark:text-white hover:text-[#16a34a] dark:hover:text-[#25D366] transition-colors whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#16a34a] dark:text-[#25D366]" />
                <span>Message on WhatsApp</span>
              </a>

              <span className="text-neutral-400 dark:text-neutral-600 font-bold" aria-hidden="true">
                ·
              </span>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 font-semibold text-neutral-900 dark:text-white hover:text-[#FF6500] transition-colors tabular-nums whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Subtle Trust Statement Beneath CTAs */}
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Professional Plumbing &amp; Maintenance Solutions
            </p>
          </div>

          {/* Right Column: Dominant Residential Plumbing Photograph */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#141414] min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]">
              <SafeImage
                src={HERO_MEDIA.image}
                alt={HERO_MEDIA.alt}
                loading="eager"
                fallbackTitle="JTR Plumbing and Maintenance"
                className="w-full h-full object-cover object-center"
              />
              {/* Measured contrast bottom scrim for clean business tagline */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pt-14 pb-5">
                <p className="text-xs sm:text-sm font-medium text-white/95 max-w-lg">
                  {BUSINESS_INFO.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
