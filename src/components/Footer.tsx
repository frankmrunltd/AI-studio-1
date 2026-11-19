import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS, SERVICES } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/enquiry';
import { BrandLogo, FacebookIcon, WhatsAppIcon } from './BrandLogo';

interface FooterProps {
  onSelectService: (serviceName: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenLegal }) => {
  const whatsappUrl = buildGeneralWhatsAppUrl();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-neutral-300 border-t border-neutral-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/90">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" aria-label="JTR Plumbing and Maintenance Home" className="inline-flex">
              <BrandLogo onDark />
            </a>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              {BUSINESS_INFO.tagline} Practical workmanship, clear communication and dependable
              service for your property.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp JTR Plumbing and Maintenance"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 bg-[#141414] text-neutral-300 hover:border-[#FF6500] hover:text-[#FF6500] transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JTR Plumbing and Maintenance on Facebook (placeholder URL)"
                title="Facebook (Placeholder URL)"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 bg-[#141414] text-neutral-300 hover:border-[#FF6500] hover:text-[#FF6500] transition-colors"
              >
                <FacebookIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-sm text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-[#FF6500] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-sm text-white mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.name)}
                    className="text-left text-neutral-400 hover:text-[#FF6500] transition-colors cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-sm text-white mb-4">Direct Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-white font-semibold hover:text-[#FF6500] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-[#FF6500] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#FF6500]" />
                  <span>Message on WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-[#FF6500] transition-colors"
                >
                  <FacebookIcon className="w-4 h-4 text-[#FF6500]" />
                  <span>Facebook (Placeholder Link)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 pb-12 sm:pb-4 sm:pr-40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#FF6500] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#FF6500] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
