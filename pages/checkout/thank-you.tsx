import { Container, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { allDonationTypes } from '../../data/donation-types';
import DonationTypeCard from '../../src/components/DonationType/DonationTypeCard';

export default function ThankYou(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Container maxW={'7xl'} pb={40}>
      <Heading as={'h1'}>{t('checkout.thankYou.title')}</Heading>
      <small>{t('checkout.thankYou.subtitle')}</small>
      <p>{t('checkout.thankYou.description')}</p>

      <Flex
        w="full"
        alignItems="center"
        justifyContent={'space-between'}
        mt={12}
      >
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
