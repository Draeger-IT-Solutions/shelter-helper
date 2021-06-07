import { Heading, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Address } from '../../types/Shelter';
import Card from '../Card/Card';
import MoneyDonationForm from '../Forms/MoneyDonationForm';

type MoneyDonationType = {
  location?: Address;
};

export default function MoneyDonation({
  location,
}: MoneyDonationType): JSX.Element {
  const { t } = useTranslation();

  return (
    <Stack spacing={{ base: 8, md: 10 }}>
      <Heading
        as={'h1'}
        fontSize={{ base: '4xl', sm: '5xl', lg: '8xl' }}
        lineHeight={1.1}
      >
        {t('donation.money.title')}
        <Text
          as={'span'}
          display={'block'}
          color={'red.400'}
          fontWeight={300}
          fontSize={{ base: 'lg', sm: 'xl', lg: '1xl' }}
          mt={2}
        >
          {t('donation.money.subtitle')}
        </Text>
      </Heading>
      <Text
        color={'gray.500'}
        dangerouslySetInnerHTML={{
          __html: t('donation.money.description'),
        }}
      />
      {location && (
        <Text as={'p'}>
          Ihr QR-Code von
          {location?.name} - {location?.street}
        </Text>
      )}

      <Card badgeTitle={location && t('common.viaQrCode')}>
        <MoneyDonationForm location={location} />
        <Text
          as={'small'}
          display={'block'}
          pt={4}
          lineHeight={1.2}
          dangerouslySetInnerHTML={{ __html: t('donation.money.feesHint') }}
        />
      </Card>
    </Stack>
  );
}
