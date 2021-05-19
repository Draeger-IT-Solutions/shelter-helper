import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

import stripe from '../../../../utils/stripe-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session_id: string = req.query.session_id as string;
  try {
    if (!session_id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
      session_id,
      { expand: ['payment_intent'] }
    );

    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
