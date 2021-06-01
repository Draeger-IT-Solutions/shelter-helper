import { Donation, DonationType } from '../src/types/Donation';

export const allDonationTypes: Donation[] = [
  {
    type: DonationType.MONEY,
    image: '/img/donation-types/money.jpeg',
  },
  {
    type: DonationType.OBJECT,
    image: '/img/donation-types/object.jpeg',
  },
  {
    type: DonationType.SUPPORT,
    image: '/img/donation-types/support.jpeg',
  },
  {
    type: DonationType.WISHLIST,
    image: '/img/donation-types/wishlist.jpeg',
  },
];
