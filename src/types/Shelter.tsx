import { DonationType } from './Donation';

export type Contact = {
  name: string;
  email: string;
  phone?: string;
  description: string;
};

export type Address = {
  id?: number;
  latitude?: number;
  longitude?: number;
  name?: string;
  street: string;
  city: string;
  countryCode: string;
  postalCode: string;
  contacts: Contact[];
};

export type Shelter = {
  logo?: string;
  name: string;
  address: Address;
  donationLocations: Address[];
  donationTypes: {
    [key in DonationType]: boolean;
  };
};
