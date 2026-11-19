import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { ABOUT_MEDIA, BUSINESS_INFO } from '../data/business';
import { SafeImage } from './SafeImage';

interface AboutSectionProps {
  onGetInTouchClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGetInTouchClick }) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#F7F7F7] dark:bg-[#0E0E0E] border-b border-neutral-200 dark:border-neutral-900 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Authentic Craftsmanship Photograph */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-200 dark:bg-[#161616] min-h-[300px] sm:min-h-[380px]">
              <SafeImage
                src={ABOUT_MEDIA.image}
                alt={ABOUT_MEDIA.alt}
                fallbackTitle="JTR Plumbing and Maintenance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Editorial About Story & Brand Identity */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#FF6500] mb-2">About JTR</p>

            <h2
              id="about-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white leading-tight"
            >
              Practical Expertise. Dependable Plumbing Solutions.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              JTR Plumbing and Maintenance provides plumbing and property maintenance services
              covering both internal and external plumbing requirements. Our focus is on delivering
              practical solutions, quality workmanship and a professional customer experience.
            </p>

            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Whether you need a straightforward repair indoors, improvements to bathroom or kitchen
              fittings, or dependable attention to external pipework and ongoing property upkeep, we
              approach every enquiry with clear communication and respect for your property.
            </p>

            {/* Brand Reference Lockup using the supplied JTR Business Profile Emblem */}
            <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#080808] shrink-0 border border-neutral-800">
                <SafeImage
                  src={BUSINESS_INFO.brandLogoReference}
                  alt="JTR Plumbing and Maintenance brand emblem"
                  fallbackTitle="JTR"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-base text-[#0E0E0E] dark:text-white">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {BUSINESS_INFO.tagline}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onGetInTouchClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#141414] hover:border-[#FF6500] text-[#0E0E0E] dark:text-white font-semibold text-sm transition-colors tabular-nums whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
