import { loadStripe as _loadStripe, Stripe } from '@stripe/stripe-js';
import type { Stripe as StripeType } from 'stripe';

import { HOST, STRIPE_PUBLIC_KEY } from '../../config';
import { StripeCheckoutSessionPostBody } from '../types/Stripe';

let stripePromise: Promise<Stripe | null>;
export function loadStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = _loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
}

export async function requestStripeCheckout(
  data: StripeCheckoutSessionPostBody
): Promise<
  StripeType.Response<StripeType.Checkout.Session> & {
    statusCode: number;
    message?: string;
  }
> {
  try {
    const response = await fetch(`${HOST}/api/stripe/checkout_sessions`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}
