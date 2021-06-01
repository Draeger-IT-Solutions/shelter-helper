import i18n from 'i18next';
import { RequestHandler } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import {
  CURRENCY,
  MAX_DONATION_AMOUNT,
  MIN_DONATION_AMOUNT,
  STRIPE_API_VERSION,
} from '../../../../config';
import { StripeCheckoutSessionPostBody } from '../../../../src/types/Stripe';
import { formatAmountForStripe } from '../../../../src/utils/formatter';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: STRIPE_API_VERSION,
});

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { success_url, cancel_url, metadata }: StripeCheckoutSessionPostBody =
    req.body;

  const amount = parseInt(req.body.amount);

  try {
    // Validate the amount that was passed from the client.
    if (
      isNaN(amount) ||
      amount <= MIN_DONATION_AMOUNT ||
      amount >= MAX_DONATION_AMOUNT
    ) {
      throw new Error(`Invalid amount: ${amount}`);
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
          name: i18n.t(`checkout.stripeCheckout.name`) || 'Donation',
          amount: formatAmountForStripe(amount),
          currency: CURRENCY,
          quantity: 1,
          description:
            i18n.t('checkout.stripeCheckout.description') ||
            `Via QR Code: ${metadata.location_name} - ${metadata.location_name}`,
        },
      ],
      success_url,
      cancel_url,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    res.status(200).json(checkoutSession);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default cors(requestHandler as RequestHandler);
