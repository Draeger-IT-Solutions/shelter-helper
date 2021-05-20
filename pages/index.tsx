import { Container, Flex } from '@chakra-ui/react';

import { allDonationTypes } from '../data/donation-types';
import DonationTypeCard from '../src/components/DonationType/DonationTypeCard';
import HomeMain from '../src/components/teaser/HomeMain';

export default function Home(): JSX.Element {
  return (
    <Container maxW={'7xl'} pb={40}>
      <HomeMain />

      <Flex w="full" alignItems="center" justifyContent={'space-between'}>
        {allDonationTypes.map((donationType) => (
          <DonationTypeCard
            key={`donation-card__${donationType.type}`}
            {...donationType}
          />
        ))}
      </Flex>
    </Container>
  );
}
