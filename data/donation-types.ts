import { Donation, DonationType } from '../interfaces/Donation';

export const allDonationTypes: Donation[] = [
  {
    type: DonationType.MONEY,
    image: 'img/donation-type_money.jpeg',
  },
  {
    type: DonationType.OBJECT,
    image: 'img/donation-type_object.jpeg',
  },
  {
    type: DonationType.SUPPORT,
    image: 'img/donation-type_support.jpeg',
  },
  {
    type: DonationType.WISHLIST,
    image: 'img/donation-type_wishlist.jpeg',
  },
];
