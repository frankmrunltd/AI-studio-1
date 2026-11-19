import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white dark:bg-[#121212] border-b border-neutral-200 dark:border-neutral-800">
          <h2
            id="legal-modal-title"
            className="font-display font-bold text-xl text-[#0E0E0E] dark:text-white"
          >
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal notice"
            className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:border-[#FF6500] cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {isPrivacy ? (
            <>
              <p>
                <strong>{BUSINESS_INFO.name}</strong> respects your privacy and handles enquiry
                information responsibly.
              </p>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] dark:text-white pt-2">
                1. Information You Provide
              </h3>
              <p>
                When you use the service request or contact forms on this website, the details you
                enter (such as your name, phone number, optional email address, and description of
                your plumbing or maintenance requirements) are formatted locally in your browser so
                you can send your enquiry directly via WhatsApp or phone.
              </p>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] dark:text-white pt-2">
                2. Theme Preference Storage
              </h3>
              <p>
                This website stores your chosen light or dark theme preference in your browser&apos;s
                local storage solely to keep the interface consistent across visits.
              </p>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] dark:text-white pt-2">
                3. Contacting Us
              </h3>
              <p>
                For any questions about how your enquiry details are handled, please contact{' '}
                {BUSINESS_INFO.name} on {BUSINESS_INFO.phoneDisplay}.
              </p>
            </>
          ) : (
            <>
              <p>
                These website terms govern use of the <strong>{BUSINESS_INFO.name}</strong>{' '}
                website and online enquiry tools.
              </p>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] dark:text-white pt-2">
                1. Service Enquiries &amp; Appointments
              </h3>
              <p>
                Submitting a service request form or opening a prefilled WhatsApp message does not
                constitute a confirmed booking or binding quote. All work scope, pricing and
                appointment times are discussed and agreed directly with you before any work begins.
              </p>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] dark:text-white pt-2">
                2. Service Descriptions &amp; Illustrative Imagery
              </h3>
              <p>
                Service categories listed on this website describe general internal and external
                plumbing and property maintenance areas. Illustrative photographs shown in the
                gallery are clearly labelled as illustrative examples and do not represent verified
                customer projects unless explicitly stated.
              </p>
              <h3 className="font-display font-bold text-base text-[#0E0E0E] dark:text-white pt-2">
                3. Direct Contact
              </h3>
              <p>
                To confirm specific service requirements, please contact {BUSINESS_INFO.name}{' '}
                directly on {BUSINESS_INFO.phoneDisplay}.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
