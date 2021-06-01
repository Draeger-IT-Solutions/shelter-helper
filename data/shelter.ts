import { DonationType } from '../src/types/Donation';
import { Shelter } from '../src/types/Shelter';

export const shelter: Shelter = {
  name: 'Tierheim Berlin',
  address: {
    name: 'Tierheim Berlin',
    city: 'Berlin',
    contacts: [],
    countryCode: 'de',
    latitude: 52.5755261,
    longitude: 13.5437656,
    postalCode: '13057',
    street: 'Hausvaterweg 39',
  },
  logo: 'img/logos/logo-tierheim-berlin.svg',
  donationTypes: {
    [DonationType.MONEY]: true,
    [DonationType.MONEY_SUBSCRIPTION]: true,
    [DonationType.SPONSORING]: true,
    [DonationType.OBJECT]: true,
    [DonationType.SUPPORT]: true,
    [DonationType.WISHLIST]: true,
  },
  donationLocations: [
    {
      id: 0,
      name: 'Kaufland - Berlin-Marzahn',
      city: 'Berlin',
      contacts: [],
      countryCode: 'de',
      latitude: 52.5338134,
      longitude: 13.5382983,
      postalCode: '12681',
      street: 'Märkische Allee 166 168, 172',
    },
    {
      id: 1,
      name: 'REWE - Marzahner Promenade',
      city: 'Berlin',
      contacts: [],
      countryCode: 'de',
      latitude: 52.5442163,
      longitude: 13.5431698,
      postalCode: '12679',
      street: 'Marzahner Promenade 1A, 12679 Berlin',
    },
  ],
};
