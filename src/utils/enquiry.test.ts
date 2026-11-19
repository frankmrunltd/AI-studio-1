import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BookingFormValues,
  buildGeneralWhatsAppUrl,
  formatBookingWhatsAppMessage,
  formatContactWhatsAppMessage,
  hasValidationErrors,
  isValidEmail,
  isValidPhoneNumber,
  validateBookingForm,
  validateContactForm,
} from './enquiry';
import { getNextTheme, resolveInitialTheme } from './theme';

test('phone number validation accepts valid UK and international numbers and rejects invalid ones', () => {
  assert.equal(isValidPhoneNumber('07851 564381'), true);
  assert.equal(isValidPhoneNumber('+44 7851 564381'), true);
  assert.equal(isValidPhoneNumber('01234-567890'), true);
  assert.equal(isValidPhoneNumber('12345'), false);
  assert.equal(isValidPhoneNumber('abcde123456'), false);
  assert.equal(isValidPhoneNumber(''), false);
});

test('optional email validation allows blank and valid emails, rejects malformed emails', () => {
  assert.equal(isValidEmail(''), true);
  assert.equal(isValidEmail('customer@example.co.uk'), true);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('missing@tld'), false);
});

test('booking form validation rejects empty submission and passes complete valid input', () => {
  const empty: BookingFormValues = {
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

  const emptyErrors = validateBookingForm(empty);
  assert.equal(hasValidationErrors(emptyErrors), true);
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.serviceRequired);
  assert.ok(emptyErrors.problemDescription);
  assert.ok(emptyErrors.consent);

  const valid: BookingFormValues = {
    ...empty,
    fullName: 'Sarah Taylor',
    phone: '07851 564381',
    email: 'sarah@example.com',
    serviceRequired: 'Bathroom Plumbing',
    problemDescription: 'Leaking shower mixer valve in upstairs bathroom.',
    preferredDate: '2026-12-01',
    preferredTime: 'Afternoon',
    photoNames: ['shower-leak.jpg'],
    consent: true,
  };

  const validErrors = validateBookingForm(valid);
  assert.equal(hasValidationErrors(validErrors), false);

  const formatted = formatBookingWhatsAppMessage(valid);
  assert.match(formatted, /Name: Sarah Taylor/);
  assert.match(formatted, /Service Required: Bathroom Plumbing/);
  assert.match(formatted, /Preferred Date: 2026-12-01/);
  assert.match(formatted, /shower-leak\.jpg/);
});

test('contact form validation and formatting work properly', () => {
  const badErrors = validateContactForm({
    fullName: '',
    phone: '123',
    message: 'Hi',
    consent: false,
  });
  assert.equal(hasValidationErrors(badErrors), true);

  const validContact = {
    fullName: 'David Patel',
    phone: '07851 564381',
    message: 'Need a quote for replacing our kitchen sink tap.',
    consent: true,
  };
  assert.equal(hasValidationErrors(validateContactForm(validContact)), false);
  const msg = formatContactWhatsAppMessage(validContact);
  assert.match(msg, /David Patel/);
  assert.match(msg, /kitchen sink tap/);
});

test('general WhatsApp URL uses verified international number and prefilled enquiry message', () => {
  const url = buildGeneralWhatsAppUrl();
  assert.ok(url.startsWith('https://wa.me/447851564381?text='));
  assert.ok(
    decodeURIComponent(url).includes(
      'Hello JTR Plumbing and Maintenance. I would like to enquire about your plumbing and maintenance services.'
    )
  );
});

test('theme helpers resolve stored preference, system fallback, and toggle correctly', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme(null, false), 'light');
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});
