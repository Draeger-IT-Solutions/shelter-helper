import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT } from '../../../../config/stripe';
import { StripeRequestCheckoutSessionPostBody } from '../../../../interfaces/Stripe';
import { formatAmountForStripe } from '../../../../utils/stripe-helper';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      amount,
      success_url,
      cancel_url,
      metadata,
    }: StripeRequestCheckoutSessionPostBody = req.body;
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.');
      }

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        payment_intent_data: {
          metadata,
        },
        metadata,
        line_items: [
          {
            name: `Donation`,
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
            description: `to: ${metadata.talent_name}`,
          },
        ],
        success_url,
        cancel_url,
      };

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
