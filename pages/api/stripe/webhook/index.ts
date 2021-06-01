import { buffer, RequestHandler } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

import stripeClient from '../../../../src/stripe/client';

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(400);

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(
      buf.toString(),
      sig,
      webhookSecret
    );
  } catch (err) {
    // On error, log and return the error message
    console.error(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const {
          // amount_total,
          // currency,
          // customer_details,
          payment_status,
          // metadata,
          // customer,
          // payment_intent,
        } = event.data.object as Stripe.Checkout.Session;

        if (payment_status === 'paid') {
          console.log('PAYMENT PAID');
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        console.log('PAYMENT SUCCEEDED');
        break;
      }

      case 'checkout.session.async_payment_failed': {
        console.error('PAYMENT FAILED');
        break;
      }
    }

    return res.send(200);
  } catch (err) {
    // On error, log and return the error message.
    console.error(`❌ Error message: ${err}`);
    return res.status(400).send(`Webhook Error: ${err}`);
  }
};

export default cors(webhookHandler as RequestHandler);
