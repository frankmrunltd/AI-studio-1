import React, { useEffect, useId, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ImagePlus,
  Loader2,
  Phone,
  Trash2,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/business';
import { EnquirySubmissionResult, submitServiceRequest } from '../services/enquiryService';
import {
  BookingFormValues,
  BookingValidationErrors,
  PreferredTime,
  PropertyType,
  hasValidationErrors,
  validateBookingForm,
} from '../utils/enquiry';
import { WhatsAppIcon } from './BrandLogo';

interface UploadedPhoto {
  id: string;
  name: string;
  previewUrl: string;
}

interface BookingSectionProps {
  preselectedService: string;
  selectionVersion: number;
}

const PROPERTY_TYPES: PropertyType[] = ['Residential', 'Commercial', 'Other'];
const PREFERRED_TIMES: PreferredTime[] = ['Morning', 'Afternoon', 'Evening', 'Flexible'];

const INITIAL_VALUES: BookingFormValues = {
  fullName: '',
  phone: '',
  email: '',
  serviceRequired: '',
  problemDescription: '',
  propertyType: 'Residential',
  preferredDate: '',
  preferredTime: 'Morning',
  additionalInfo: '',
  photoNames: [],
  consent: false,
};

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  selectionVersion,
}) => {
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const serviceSelectRef = useRef<HTMLSelectElement | null>(null);

  const [values, setValues] = useState<BookingFormValues>({
    ...INITIAL_VALUES,
    serviceRequired: preselectedService,
  });
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [photoError, setPhotoError] = useState<string>('');
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const todayIso = new Date().toISOString().split('T')[0];

  // Sync preselected service when user clicks a Service Card or Gallery CTA
  useEffect(() => {
    if (!preselectedService) return;
    setValues((prev) => ({ ...prev, serviceRequired: preselectedService }));
    setErrors((prev) => ({ ...prev, serviceRequired: undefined }));
    setSubmissionResult(null);
  }, [preselectedService, selectionVersion]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [photos]);

  const updateField = <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError('');
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const remainingSlots = 4 - photos.length;
    if (remainingSlots <= 0) {
      setPhotoError('You can attach up to 4 photographs per enquiry.');
      return;
    }

    const validNewPhotos: UploadedPhoto[] = [];
    for (const file of files.slice(0, remainingSlots)) {
      if (!file.type.startsWith('image/')) {
        setPhotoError('Only image files (JPG, PNG, WEBP, HEIC) can be attached.');
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        setPhotoError('Each photograph must be smaller than 10 MB.');
        continue;
      }
      validNewPhotos.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: file.name,
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (validNewPhotos.length > 0) {
      const updated = [...photos, ...validNewPhotos];
      setPhotos(updated);
      setValues((prev) => ({
        ...prev,
        photoNames: updated.map((p) => p.name),
      }));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (id: string) => {
    const target = photos.find((p) => p.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    setValues((prev) => ({
      ...prev,
      photoNames: updated.map((p) => p.name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitServiceRequest(values);
      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submissionResult) return;
    try {
      await navigator.clipboard.writeText(submissionResult.formattedMessage);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  const handleResetForm = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPhotos([]);
    setPhotoError('');
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmissionResult(null);
    setCopiedSummary(false);
  };

  const inputBaseClass =
    'w-full rounded-lg border bg-white dark:bg-[#0D0D0D] px-4 py-3 text-sm text-[#0E0E0E] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors focus:outline-none focus:border-[#FF6500]';

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="bg-white dark:bg-[#080808] border-b border-neutral-200 dark:border-neutral-900 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Booking Guidance & Direct Contact */}
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-[#FF6500] mb-2">Request a Service</p>
            <h2
              id="booking-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white leading-tight"
            >
              Let&apos;s Get Your Plumbing Sorted.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Tell us what you need, and we&apos;ll get in touch to discuss the next steps.
            </p>

            <div className="mt-8 space-y-5 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <h3 className="font-display font-bold text-sm text-[#0E0E0E] dark:text-white mb-1.5">
                  Helpful Details to Include
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Letting us know the type of fixture, where the issue is located (internal or
                  external), and attaching a clear photo helps us understand your enquiry faster.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#0E0E0E] dark:text-white mb-1.5">
                  Appointment Confirmation
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Submitting this form prepares your enquiry details for JTR Plumbing and
                  Maintenance. Appointments are only confirmed once we have reviewed your request
                  and agreed on a time directly with you.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#0E0E0E] dark:text-white hover:text-[#FF6500] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
                  <span>Prefer to call? {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Service Request Form or Submission Handoff */}
          <div className="lg:col-span-8">
            <div className="rounded-xl bg-[#FAFAFA] dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 lg:p-10">
              {submissionResult ? (
                <div
                  role="status"
                  aria-live="polite"
                  data-testid="booking-success-panel"
                  className="space-y-6"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-lg bg-[#FF6500]/15 text-[#FF6500] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#FF6500] tabular-nums">
                        Enquiry Prepared · Reference {submissionResult.referenceId}
                      </p>
                      <h3 className="font-display font-bold text-2xl text-[#0E0E0E] dark:text-white mt-0.5">
                        Your Service Request Is Ready to Send
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                        Send your prefilled enquiry directly to JTR Plumbing and Maintenance on
                        WhatsApp using the button below.
                      </p>
                    </div>
                  </div>

                  {/* Honest Non-Confirmation Disclaimer */}
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/35 border border-amber-300/70 dark:border-amber-800/70 p-4 flex items-start gap-3 text-sm text-amber-950 dark:text-amber-200">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <p>
                      <strong>Please note:</strong> Opening or sending this message on WhatsApp
                      submits your enquiry, but <strong>does not confirm an appointment</strong>.
                      JTR Plumbing and Maintenance will review your message and contact you directly
                      to discuss availability and confirm next steps.
                    </p>
                  </div>

                  {/* Formatted Enquiry Message Preview */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        Prepared Enquiry Summary
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#FF6500] transition-colors cursor-pointer"
                      >
                        {copiedSummary ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#16a34a]" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed rounded-lg bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800 p-4 text-neutral-800 dark:text-neutral-200 overflow-x-auto">
                      {submissionResult.formattedMessage}
                    </pre>
                    {photos.length > 0 && (
                      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        You selected {photos.length} photograph{photos.length > 1 ? 's' : ''}. Because
                        WhatsApp links cannot automatically attach image files, please attach your
                        photo{photos.length > 1 ? 's' : ''} directly inside the WhatsApp conversation.
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={submissionResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-sm tracking-wider uppercase transition-colors whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Send Request via WhatsApp</span>
                    </a>

                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#171717] text-[#0E0E0E] dark:text-white font-semibold text-sm hover:border-[#FF6500] transition-colors tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#FF6500]" aria-hidden="true" />
                      <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-3.5 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-[#0E0E0E] dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={isSubmitting}
                  className="space-y-6"
                >
                  {/* Summary error notice if user submits invalid form */}
                  {hasValidationErrors(errors) && (
                    <div
                      role="alert"
                      className="rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/70 px-4 py-3 flex items-start gap-2.5 text-sm text-red-800 dark:text-red-200"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Please check the highlighted fields below before submitting your request.</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor={`${formId}-fullName`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Full Name <span className="text-[#FF6500]">*</span>
                      </label>
                      <input
                        id={`${formId}-fullName`}
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? `${formId}-fullName-err` : undefined}
                        placeholder="e.g. James Wilson"
                        className={`${inputBaseClass} ${
                          errors.fullName
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-neutral-300 dark:border-neutral-700'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id={`${formId}-fullName-err`}
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
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
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
                        placeholder="e.g. 07851 564381"
                        className={`${inputBaseClass} tabular-nums ${
                          errors.phone
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-neutral-300 dark:border-neutral-700'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id={`${formId}-phone-err`}
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email (Optional) & Service Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor={`${formId}-email`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Email Address{' '}
                        <span className="font-normal text-neutral-500 dark:text-neutral-400">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id={`${formId}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                        placeholder="you@example.com"
                        className={`${inputBaseClass} ${
                          errors.email
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-neutral-300 dark:border-neutral-700'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id={`${formId}-email-err`}
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-service`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Service Required <span className="text-[#FF6500]">*</span>
                      </label>
                      <select
                        ref={serviceSelectRef}
                        id={`${formId}-service`}
                        name="serviceRequired"
                        required
                        value={values.serviceRequired}
                        onChange={(e) => updateField('serviceRequired', e.target.value)}
                        aria-invalid={Boolean(errors.serviceRequired)}
                        aria-describedby={
                          errors.serviceRequired ? `${formId}-service-err` : undefined
                        }
                        className={`${inputBaseClass} ${
                          errors.serviceRequired
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-neutral-300 dark:border-neutral-700'
                        }`}
                      >
                        <option value="">Select a service category...</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                        <option value="Quote / General Plumbing Enquiry">
                          Quote / General Plumbing Enquiry
                        </option>
                      </select>
                      {errors.serviceRequired && (
                        <p
                          id={`${formId}-service-err`}
                          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                        >
                          {errors.serviceRequired}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Problem Description */}
                  <div>
                    <label
                      htmlFor={`${formId}-description`}
                      className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                    >
                      Describe Your Problem / Requirements <span className="text-[#FF6500]">*</span>
                    </label>
                    <textarea
                      id={`${formId}-description`}
                      name="problemDescription"
                      rows={4}
                      required
                      value={values.problemDescription}
                      onChange={(e) => updateField('problemDescription', e.target.value)}
                      aria-invalid={Boolean(errors.problemDescription)}
                      aria-describedby={
                        errors.problemDescription ? `${formId}-description-err` : undefined
                      }
                      placeholder="Please describe the plumbing repair, installation or maintenance work you need help with..."
                      className={`${inputBaseClass} resize-y ${
                        errors.problemDescription
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    />
                    {errors.problemDescription && (
                      <p
                        id={`${formId}-description-err`}
                        className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        {errors.problemDescription}
                      </p>
                    )}
                  </div>

                  {/* Row 4: Property Type, Preferred Date, Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label
                        htmlFor={`${formId}-propertyType`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Property Type
                      </label>
                      <select
                        id={`${formId}-propertyType`}
                        name="propertyType"
                        value={values.propertyType}
                        onChange={(e) =>
                          updateField('propertyType', e.target.value as PropertyType)
                        }
                        className={`${inputBaseClass} border-neutral-300 dark:border-neutral-700`}
                      >
                        {PROPERTY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-preferredDate`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Preferred Date
                      </label>
                      <input
                        id={`${formId}-preferredDate`}
                        name="preferredDate"
                        type="date"
                        min={todayIso}
                        value={values.preferredDate}
                        onChange={(e) => updateField('preferredDate', e.target.value)}
                        className={`${inputBaseClass} border-neutral-300 dark:border-neutral-700`}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-preferredTime`}
                        className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                      >
                        Preferred Time
                      </label>
                      <select
                        id={`${formId}-preferredTime`}
                        name="preferredTime"
                        value={values.preferredTime}
                        onChange={(e) =>
                          updateField('preferredTime', e.target.value as PreferredTime)
                        }
                        className={`${inputBaseClass} border-neutral-300 dark:border-neutral-700`}
                      >
                        {PREFERRED_TIMES.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Additional Information (Optional) */}
                  <div>
                    <label
                      htmlFor={`${formId}-additionalInfo`}
                      className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5"
                    >
                      Additional Information{' '}
                      <span className="font-normal text-neutral-500 dark:text-neutral-400">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id={`${formId}-additionalInfo`}
                      name="additionalInfo"
                      rows={2}
                      value={values.additionalInfo}
                      onChange={(e) => updateField('additionalInfo', e.target.value)}
                      placeholder="Access notes, parking details, or any helpful context..."
                      className={`${inputBaseClass} border-neutral-300 dark:border-neutral-700 resize-y`}
                    />
                  </div>

                  {/* Row 6: Optional Photo Upload */}
                  <div>
                    <p className="block text-sm font-semibold text-[#0E0E0E] dark:text-neutral-100 mb-1.5">
                      Attach Photographs{' '}
                      <span className="font-normal text-neutral-500 dark:text-neutral-400">
                        (Optional — up to 4 images)
                      </span>
                    </p>

                    <div className="rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0D0D0D] p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                          <ImagePlus className="w-5 h-5 text-[#FF6500] shrink-0" aria-hidden="true" />
                          <span>
                            Add photos of the tap, pipework or issue to reference in your enquiry.
                          </span>
                        </div>
                        <label
                          htmlFor={`${formId}-photos`}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-[#0E0E0E] dark:text-white hover:border-[#FF6500] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Choose Photos
                        </label>
                        <input
                          ref={fileInputRef}
                          id={`${formId}-photos`}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoSelect}
                          className="sr-only"
                        />
                      </div>

                      {photoError && (
                        <p className="mt-2.5 text-xs font-medium text-red-600 dark:text-red-400">
                          {photoError}
                        </p>
                      )}

                      {photos.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {photos.map((photo) => (
                            <div
                              key={photo.id}
                              className="relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#171717]"
                            >
                              <img
                                src={photo.previewUrl}
                                alt={photo.name}
                                className="w-full h-20 object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(photo.id)}
                                aria-label={`Remove ${photo.name}`}
                                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-md bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                              <p className="px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                                {photo.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Required Consent Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        id={`${formId}-consent`}
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => updateField('consent', e.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? `${formId}-consent-err` : undefined}
                        className="mt-1 h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 accent-[#FF6500] cursor-pointer shrink-0"
                      />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        I give permission for JTR Plumbing and Maintenance to contact me by phone,
                        WhatsApp or email regarding this service enquiry.{' '}
                        <span className="text-[#FF6500]">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p
                        id={`${formId}-consent-err`}
                        className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & Transparent WhatsApp Fallback Info */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] disabled:opacity-70 text-white font-display font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Preparing Request...</span>
                        </>
                      ) : (
                        <span>SUBMIT SERVICE REQUEST</span>
                      )}
                    </button>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
                      Submitting formats your enquiry for direct WhatsApp messaging with JTR.
                      Appointments are confirmed only after we speak with you.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
