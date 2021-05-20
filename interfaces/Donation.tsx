export enum DonationType {
  MONEY = 'money',
  OBJECT = 'object',
  SUPPORT = 'support',
  WISHLIST = 'wishlist',
}

export type Donation = {
  image: string;
  type: DonationType;
};
