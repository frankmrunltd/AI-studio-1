import {
  BookingFormValues,
  ContactFormValues,
  buildWhatsAppUrl,
  formatBookingWhatsAppMessage,
  formatContactWhatsAppMessage,
} from '../utils/enquiry';

export interface EnquirySubmissionResult {
  channel: 'whatsapp_fallback' | 'api';
  referenceId: string;
  formattedMessage: string;
  whatsappUrl: string;
  submittedAtIso: string;
}

/**
 * Backend-ready submission adapter.
 *
 * When a backend API, email notification service, or database is connected later,
 * configure VITE_ENQUIRY_API_ENDPOINT to POST the structured payload here and
 * return `{ channel: 'api', ... }` while keeping WhatsApp available as a direct fallback.
 */
export async function submitServiceRequest(
  values: BookingFormValues
): Promise<EnquirySubmissionResult> {
  const formattedMessage = formatBookingWhatsAppMessage(values);
  const whatsappUrl = buildWhatsAppUrl(formattedMessage);

  // Brief realistic processing delay so loading feedback is clear and accessible
  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    channel: 'whatsapp_fallback',
    referenceId: `JTR-${Date.now().toString(36).toUpperCase().slice(-5)}`,
    formattedMessage,
    whatsappUrl,
    submittedAtIso: new Date().toISOString(),
  };
}

export async function submitContactEnquiry(
  values: ContactFormValues
): Promise<EnquirySubmissionResult> {
  const formattedMessage = formatContactWhatsAppMessage(values);
  const whatsappUrl = buildWhatsAppUrl(formattedMessage);

  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    channel: 'whatsapp_fallback',
    referenceId: `JTR-${Date.now().toString(36).toUpperCase().slice(-5)}`,
    formattedMessage,
    whatsappUrl,
    submittedAtIso: new Date().toISOString(),
  };
}
