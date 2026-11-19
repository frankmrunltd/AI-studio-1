import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Info, X } from 'lucide-react';
import { SERVICES, ServiceCategory } from '../data/business';
import { SafeImage } from './SafeImage';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeService, setActiveService] = useState<ServiceCategory | null>(null);

  useEffect(() => {
    if (!activeService) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeService]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white dark:bg-[#080808] border-b border-neutral-200 dark:border-neutral-900 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF6500] mb-2">Our Services</p>
            <h2
              id="services-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white"
            >
              Internal &amp; External Plumbing and Property Maintenance
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
            Explore our key plumbing and maintenance categories below. Select any service to prefill
            your enquiry and discuss your specific job directly with JTR.
          </p>
        </div>

        {/* 6 Photographic Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF6500]/60"
            >
              {/* Photographic Header */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-[#1A1A1A]">
                <SafeImage
                  src={service.image}
                  alt={service.imageAlt}
                  fallbackTitle={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-xl text-[#0E0E0E] dark:text-white">
                    {service.name}
                  </h3>
                  <span className="font-display text-xs font-bold text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0">
                    {service.index}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-5">
                  {service.shortDescription}
                </p>

                {/* Bullet Highlights */}
                <ul className="space-y-2 mb-6 flex-1">
                  {service.items.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <Check
                        className="w-4 h-4 text-[#FF6500] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Actions */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/90 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    aria-label={`Learn more about ${service.name}`}
                    className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#FF6500] dark:hover:text-[#FF6500] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Learn More
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.name)}
                    aria-label={`Request ${service.name} service`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-xs tracking-wide uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Service Scope Confirmation Note */}
        <div className="mt-10 flex items-start gap-3 rounded-lg bg-[#F7F7F7] dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800/90 px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400">
          <Info className="w-4 h-4 text-[#FF6500] shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            The categories listed above outline typical internal and external plumbing and property
            maintenance enquiries. Please get in touch with details of your specific job so we can
            confirm suitability and discuss how we can help.
          </p>
        </div>
      </div>

      {/* Accessible Service Detail Modal */}
      {activeService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setActiveService(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-xl overflow-hidden bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-neutral-100 dark:bg-[#1A1A1A]">
              <SafeImage
                src={activeService.image}
                alt={activeService.imageAlt}
                fallbackTitle={activeService.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Close service details"
                className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-black/75 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-7">
              <p className="text-xs font-semibold text-[#FF6500] mb-1">
                Service Category {activeService.index}
              </p>
              <h3
                id="service-modal-title"
                className="font-display font-bold text-2xl text-[#0E0E0E] dark:text-white mb-3"
              >
                {activeService.name}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 mb-5">
                {activeService.detailedOverview}
              </p>

              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2.5">
                Typical Enquiries Covered
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                {activeService.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-800 dark:text-neutral-200"
                  >
                    <Check className="w-4 h-4 text-[#FF6500] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-500 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const selected = activeService.name;
                    setActiveService(null);
                    onSelectService(selected);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
