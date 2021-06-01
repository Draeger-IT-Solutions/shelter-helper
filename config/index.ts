export const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'eur';
export const HOST = process.env.NEXT_PUBLIC_HOST || '';
export const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'de-DE';
export const MIN_DONATION_AMOUNT =
  process.env.NEXT_PUBLIC_MIN_DONATION_AMOUNT || 1;
export const MAX_DONATION_AMOUNT =
  process.env.NEXT_PUBLIC_MAX_DONATION_AMOUNT || 10000;
export const STRIPE_API_VERSION =
  process.env.NEXT_PUBLIC_STRIPE_API_VERSION || '';
export const STRIPE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';

export default {
  CURRENCY,
  HOST,
  LOCALE,
  MIN_DONATION_AMOUNT,
  MAX_DONATION_AMOUNT,
  STRIPE_API_VERSION,
  STRIPE_PUBLIC_KEY,
};
