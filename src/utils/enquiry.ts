import { BUSINESS_INFO } from '../data/business';

export type PropertyType = 'Residential' | 'Commercial' | 'Other';
export type PreferredTime = 'Morning' | 'Afternoon' | 'Evening' | 'Flexible';

export interface BookingFormValues {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  problemDescription: string;
  propertyType: PropertyType;
  preferredDate: string;
  preferredTime: PreferredTime;
  additionalInfo: string;
  photoNames: string[];
  consent: boolean;
}

export interface BookingValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceRequired?: string;
  problemDescription?: string;
  consent?: string;
}

export interface ContactFormValues {
  fullName: string;
  phone: string;
  message: string;
  consent: boolean;
}

export interface ContactValidationErrors {
  fullName?: string;
  phone?: string;
  message?: string;
  consent?: string;
}

export function isValidPhoneNumber(rawPhone: string): boolean {
  const cleaned = rawPhone.trim();
  if (!cleaned) return false;
  // Allow digits, spaces, hyphens, parentheses, and optional leading +
  if (!/^\+?[\d\s\-()]+$/.test(cleaned)) return false;
  const digitsOnly = cleaned.replace(/\D/g, '');
  // UK numbers are typically 10-11 digits (or 12 with +44); allow 10-15 international digits
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

export function isValidEmail(rawEmail: string): boolean {
  const cleaned = rawEmail.trim();
  if (!cleaned) return true; // Email is optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleaned);
}

export function validateBookingForm(values: BookingFormValues): BookingValidationErrors {
  const errors: BookingValidationErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter at least 2 characters for your name.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number so we can contact you.';
  } else if (!isValidPhoneNumber(values.phone)) {
    errors.phone = 'Please enter a valid UK or international phone number (e.g. 07851 564381).';
  }

  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address or leave this field blank.';
  }

  if (!values.serviceRequired.trim()) {
    errors.serviceRequired = 'Please select the service you require.';
  }

  if (!values.problemDescription.trim()) {
    errors.problemDescription = 'Please briefly describe your plumbing or maintenance requirements.';
  } else if (values.problemDescription.trim().length < 10) {
    errors.problemDescription = 'Please provide a few more details (at least 10 characters).';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm that JTR Plumbing and Maintenance may contact you about this enquiry.';
  }

  return errors;
}

export function validateContactForm(values: ContactFormValues): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your name.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!isValidPhoneNumber(values.phone)) {
    errors.phone = 'Please enter a valid phone number (e.g. 07851 564381).';
  }

  if (!values.message.trim()) {
    errors.message = 'Please enter a brief message about how we can help.';
  } else if (values.message.trim().length < 8) {
    errors.message = 'Please enter a slightly longer message (at least 8 characters).';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm permission to be contacted regarding your enquiry.';
  }

  return errors;
}

export function hasValidationErrors(
  errors: BookingValidationErrors | ContactValidationErrors
): boolean {
  return Object.values(errors).some(Boolean);
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_INFO.whatsappInternational}?text=${encoded}`;
}

export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(BUSINESS_INFO.whatsappDefaultMessage);
}

export function formatBookingWhatsAppMessage(values: BookingFormValues): string {
  const lines: string[] = [
    'Hello JTR Plumbing and Maintenance,',
    '',
    'I would like to submit a service enquiry:',
    `Name: ${values.fullName.trim()}`,
    `Phone: ${values.phone.trim()}`,
  ];

  if (values.email.trim()) {
    lines.push(`Email: ${values.email.trim()}`);
  }

  lines.push(`Service Required: ${values.serviceRequired.trim()}`);
  lines.push(`Property Type: ${values.propertyType}`);

  if (values.preferredDate.trim()) {
    lines.push(`Preferred Date: ${values.preferredDate.trim()}`);
  }

  if (values.preferredTime) {
    lines.push(`Preferred Time: ${values.preferredTime}`);
  }

  lines.push('');
  lines.push(`Problem / Requirements: ${values.problemDescription.trim()}`);

  if (values.additionalInfo.trim()) {
    lines.push(`Additional Info: ${values.additionalInfo.trim()}`);
  }

  if (values.photoNames.length > 0) {
    lines.push(
      `Photos to share (${values.photoNames.length}): ${values.photoNames.join(', ')} (I will attach these in chat)`
    );
  }

  return lines.join('\n');
}

export function formatContactWhatsAppMessage(values: ContactFormValues): string {
  const lines: string[] = [
    'Hello JTR Plumbing and Maintenance,',
    '',
    'General Website Enquiry:',
    `Name: ${values.fullName.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Message: ${values.message.trim()}`,
  ];
  return lines.join('\n');
}
