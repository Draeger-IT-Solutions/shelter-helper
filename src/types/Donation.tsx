export enum DonationType {
  MONEY = 'money',
  MONEY_SUBSCRIPTION = 'money-subscription',
  SPONSORING = 'sponsoring',
  OBJECT = 'object',
  SUPPORT = 'support',
  WISHLIST = 'wishlist',
}

export type Donation = {
  image: string;
  type: DonationType;
};
