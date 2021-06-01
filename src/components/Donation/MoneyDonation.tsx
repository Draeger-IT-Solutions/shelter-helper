import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Address } from '../../types/Shelter';
import MoneyDonationForm from '../Forms/MoneyDonationForm';

type MoneyDonationType = {
  location?: Address;
};

export default function MoneyDonation({
  location,
}: MoneyDonationType): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
        height={'100vh'}
        maxH={800}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading lineHeight={1.1}>
            <Text
              as={'span'}
              position={'relative'}
              fontSize={{ base: '4xl', sm: '5xl', lg: '8xl' }}
              lineHeight={0.75}
            >
              {t('donation.money.title')}
            </Text>
            <br />
            <Text as={'span'} color={'red.400'} fontWeight={300} fontSize={22}>
              {t('donation.money.subtitle')}
            </Text>
          </Heading>
          <Text
            color={'gray.500'}
            dangerouslySetInnerHTML={{
              __html: t('donation.money.description'),
            }}
          />
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          direction={'column'}
          w={'full'}
        >
          <MoneyDonationForm location={location} />
          {location && (
            <Text as={'p'}>
              Ihr QR-Code von
              {location?.name} - {location?.street}
            </Text>
          )}
        </Flex>
      </Stack>
    </>
  );
}
