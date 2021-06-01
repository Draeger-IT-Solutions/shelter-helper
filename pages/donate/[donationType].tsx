import { Container } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { shelter } from '../../data/shelter';
import MoneyDonation from '../../src/components/Donation/MoneyDonation';
import { DonationType } from '../../src/types/Donation';

type DonateWithReasonPageType = {
  type: DonationType;
};

export default function DonateWithTypePage({
  type,
}: DonateWithReasonPageType): JSX.Element {
  const { query } = useRouter();
  const locationId =
    process.browser && query.location && parseInt(query.location as string);

  const location = shelter.donationLocations.find(
    ({ id }) => id === locationId
  );

  return (
    <Container maxW={'7xl'} pb={40}>
      DONATION PAGE WITH REASON: {type}
      for location {location?.name || ''} - {location?.street || ''}
      {type === DonationType.MONEY && <MoneyDonation location={location} />}
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = [];

  Object.entries(shelter.donationTypes).forEach(
    ([type, isEnabled]) => isEnabled && paths.push(`/donate/${type}`)
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      type: context?.params?.donationType || '',
    },
  };
};
