import { DonationType } from '../interfaces/Donation';
import { Shelter } from '../interfaces/Shelter';

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
  donationTypes: {
    [DonationType.MONEY]: true,
    [DonationType.OBJECT]: true,
    [DonationType.SUPPORT]: true,
    [DonationType.WISHLIST]: true,
  },
  donationLocations: [
    {
      name: 'Kaufland Berlin-Marzahn',
      city: 'Berlin',
      contacts: [],
      countryCode: 'de',
      latitude: 52.5338134,
      longitude: 13.5382983,
      postalCode: '12681',
      street: 'Märkische Allee 166 168, 172',
    },
  ],
  logo: 'img/logos/logo-tierheim-berlin.svg',
};
