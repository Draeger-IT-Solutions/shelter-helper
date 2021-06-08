import { Box, Flex, Heading, Text } from '@chakra-ui/react';
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
    <Flex direction={'column'}>
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
        display={'block'}
        dangerouslySetInnerHTML={{
          __html: t('donation.money.description'),
        }}
      />

      <Card badgeTitle={location && t('common.viaQrCode')} mt={8}>
        {location && (
          <Text as={'p'} pb={4}>
            {location?.name} - {location?.street}
          </Text>
        )}
        <Box pb={4}>
          <MoneyDonationForm location={location} />
        </Box>
        <Text
          as={'small'}
          display={'block'}
          lineHeight={1.2}
          dangerouslySetInnerHTML={{ __html: t('donation.money.feesHint') }}
        />
      </Card>
    </Flex>
  );
}
