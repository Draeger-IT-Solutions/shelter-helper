import { Flex } from '@chakra-ui/react';

import { allDonationTypes } from '../../../data/donation-types';
import DonationTypeCard from './DonationTypeCard';

export default function DonationList() {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      {allDonationTypes.map((donationType) => (
        <DonationTypeCard
          key={`donation-card__${donationType.type}`}
          {...donationType}
        />
      ))}
    </Flex>
  );
}
