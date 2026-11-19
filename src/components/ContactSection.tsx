import React, { useId, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Phone,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { EnquirySubmissionResult, submitContactEnquiry } from '../services/enquiryService';
import {
  ContactFormValues,
  ContactValidationErrors,
  buildGeneralWhatsAppUrl,
  hasValidationErrors,
  validateContactForm,
} from '../utils/enquiry';
import { FacebookIcon, WhatsAppIcon } from './BrandLogo';

const INITIAL_CONTACT: ContactFormValues = {
  fullName: '',
  phone: '',
  message: '',
  consent: false,
};

export const ContactSection: React.FC = () => {
  const formId = useId();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_CONTACT);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<EnquirySubmissionResult | null>(null);

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl();

  const updateField = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    if (hasValidationErrors(validationErrors)) return;

    setIsSubmitting(true);
    try {
      const submission = await submitContactEnquiry(values);
      setResult(submission);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    'w-full rounded-lg border bg-white dark:bg-[#0D0D0D] px-4 py-3 text-sm text-[#0E0E0E] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors focus:outline-none focus:border-[#FF6500]';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white dark:bg-[#080808] py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Details (Verified Details Only) */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#FF6500] mb-2">Contact Us</p>
            <h2
              id="contact-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white"
            >
              Get in Touch With JTR Plumbing and Maintenance
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {BUSINESS_INFO.tagline} Reach us directly by phone, WhatsApp, Facebook or the quick
              enquiry form.
            </p>

            <div className="mt-8 space-y-4">
              {/* Click-to-Call Phone Card */}
              <a
                href={BUSINESS_INFO.phoneHref}
                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#FAFAFA] dark:bg-[#121212] p-5 hover:border-[#FF6500] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#FF6500]/10 dark:bg-[#FF6500]/15 text-[#FF6500] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Phone (Click to Call)
                    </p>
                    <p className="font-display font-bold text-lg text-[#0E0E0E] dark:text-white tabular-nums mt-0.5">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#FF6500] group-hover:underline whitespace-nowrap">
                  Call Now
                </span>
              </a>

              {/* Direct WhatsApp Card */}
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#FAFAFA] dark:bg-[#121212] p-5 hover:border-[#25D366] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#25D366]/10 text-[#16a34a] dark:text-[#25D366] flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      WhatsApp Direct
                    </p>
                    <p className="font-display font-bold text-lg text-[#0E0E0E] dark:text-white tabular-nums mt-0.5">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#16a34a] dark:text-[#25D366] group-hover:underline whitespace-nowrap">
                  Open Chat
                </span>
              </a>

              {/* Dedicated Facebook Social Link (Clearly Identified Editable Placeholder) */}
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit JTR Plumbing and Maintenance on Facebook (placeholder profile URL)"
                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#FAFAFA] dark:bg-[#121212] p-5 hover:border-[#FF6500] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-neutral-200/80 dark:bg-neutral-800 text-[#0E0E0E] dark:text-white flex items-center justify-center shrink-0">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Facebook
                    </p>
                    <p className="font-display font-bold text-base text-[#0E0E0E] dark:text-white truncate mt-0.5">
                      {BUSINESS_INFO.name}
                    </p>
                    {BUSINESS_INFO.facebookIsPlaceholder && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        Placeholder link — update with verified Facebook URL
                      </p>
                    )}
                  </div>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-neutral-400 group-hover:text-[#FF6500] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Short Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#FAFAFA] dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8">
              <h3 className="font-display font-bold text-xl text-[#0E0E0E] dark:text-white mb-1">
                Send a Quick Message
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                Have a quick question? Leave your details below to start a WhatsApp enquiry with JTR.
              </p>

              {result ? (
                <div
                  role="status"
                  aria-live="polite"
                  data-testid="contact-success-panel"
                  className="space-y-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#FF6500] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display font-bold text-lg text-[#0E0E0E] dark:text-white">
                        Message Ready for WhatsApp
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                        Click below to send your message directly to {BUSINESS_INFO.name}. Opening
                        WhatsApp does not confirm an appointment until we reply and agree next steps.
                      </p>
                    </div>
                  </div>

                  <pre className="whitespace-pre-wrap font-sans text-sm rounded-lg bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800 p-4 text-neutral-800 dark:text-neutral-200">
                    {result.formattedMessage}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={result.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-xs tracking-wider uppercase transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Open in WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setValues(INITIAL_CONTACT);
                        setErrors({});
                        setResult(null);
                      }}
                      className="px-4 py-3 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-[#0E0E0E] dark:hover:text-white cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} className="space-y-5">
                  {hasValidationErrors(errors) && (
                    <div
                      role="alert"
                      className="rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/70 px-4 py-3 flex items-start gap-2 text-sm text-red-800 dark:text-red-200"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Please complete the required fields below.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${formId}-name`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Your Name <span className="text-[#FF6500]">*</span>
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={values.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        aria-invalid={Boolean(errors.fullName)}
                        placeholder="Your name"
                        className={`${inputBaseClass} ${
                          errors.fullName
                            ? 'border-red-500'
                            : 'border-neutral-300 dark:border-neutral-700'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-phone`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Phone Number <span className="text-[#FF6500]">*</span>
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        placeholder="07851 564381"
                        className={`${inputBaseClass} tabular-nums ${
                          errors.phone
                            ? 'border-red-500'
                            : 'border-neutral-300 dark:border-neutral-700'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-message`}
                      className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                    >
                      Message <span className="text-[#FF6500]">*</span>
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      rows={4}
                      required
                      value={values.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      placeholder="How can JTR Plumbing and Maintenance help?"
                      className={`${inputBaseClass} resize-y ${
                        errors.message
                          ? 'border-red-500'
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        id={`${formId}-consent`}
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => updateField('consent', e.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        className="mt-1 h-4 w-4 rounded accent-[#FF6500] cursor-pointer shrink-0"
                      />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        I consent to JTR Plumbing and Maintenance contacting me about this enquiry.{' '}
                        <span className="text-[#FF6500]">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0E0E0E] hover:bg-[#262626] dark:bg-[#FF6500] dark:hover:bg-[#E55A00] text-white font-display font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Preparing Message...</span>
                      </>
                    ) : (
                      <span>SEND ENQUIRY</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
