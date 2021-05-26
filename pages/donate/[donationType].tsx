import { Container } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { shelter } from '../../data/shelter';
import { DonationType } from '../../interfaces/Donation';

type DonateWithReasonPageType = {
  type: DonationType;
};

export default function DonateWithTypePage({
  type,
}: DonateWithReasonPageType): JSX.Element {
  const { query } = useRouter();
  const location =
    process.browser && query?.location && (query.location as string);

  return (
    <Container maxW={'7xl'} pb={40}>
      DONATION PAGE WITH REASON: {type}
      for location {location || ''}
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
