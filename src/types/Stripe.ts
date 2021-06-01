export type StripeDonationMetadata = {
  donation_origin: 'qr-code';
  location_id?: number;
  location_name?: string;
};

export type StripeCheckoutSessionPostBody = {
  amount: number;
  success_url: string;
  cancel_url: string;
  metadata: StripeDonationMetadata;
};
