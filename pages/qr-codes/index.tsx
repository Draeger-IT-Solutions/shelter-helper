import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { shelter } from '../../data/shelter';
import { DonationType } from '../../src/types/Donation';

type QrCodeForm = {
  type: DonationType;
  location?: number;
};

export default function QrCodePage(): JSX.Element {
  const { t } = useTranslation();

  // @TODO Add correct full url
  const getQrCodeValue = (type: DonationType, location?: number) =>
    `${process.env.NEXT_PUBLIC_HOST}/donate/${type}?location=${location}`;

  const [qrCodeValue, setQrCodeValue] = useState<string>(
    getQrCodeValue(DonationType.MONEY)
  );

  const { handleSubmit, register } = useForm<QrCodeForm>({
    defaultValues: { type: DonationType.MONEY },
    mode: 'onChange',
  });

  const onChange = ({ location, type }: QrCodeForm) => {
    setQrCodeValue(getQrCodeValue(type, location));
  };

  return (
    <Container maxW={'7xl'} pb={40}>
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
              {t(`qrCodePage.title`)}
            </Text>
            <br />
            <Text as={'span'} color={'red.400'} fontWeight={300} fontSize={22}>
              {t('qrCodePage.subtitle')}
            </Text>
          </Heading>
          <Text
            color={'gray.500'}
            dangerouslySetInnerHTML={{ __html: t('qrCodePage.description') }}
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
          <QRCode value={qrCodeValue} size={300} />
          <Box py={4} w={300}>
            <form onChange={handleSubmit(onChange)}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>{t('qrCodePage.form.type.label')}</FormLabel>
                  <Select variant="filled" {...register('type')}>
                    {Object.entries(shelter.donationTypes).map(
                      ([type, isEnabled]) =>
                        isEnabled && (
                          <option key={`select--${type}`} value={type}>
                            {t(`donationType.${type}.title`)}
                          </option>
                        )
                    )}
                  </Select>
                  <Text as={'small'} color={'grey.400'}>
                    {t('qrCodePage.form.type.hint')}
                  </Text>
                </FormControl>
                <FormControl>
                  <FormLabel>{t('qrCodePage.form.location.label')}</FormLabel>
                  <Select
                    variant="filled"
                    placeholder={t('qrCodePage.form.location.placeholder')}
                    {...register('location')}
                  >
                    {shelter.donationLocations.map(({ id, street, name }) => (
                      <option key={`select--${street}`} value={id}>
                        {name} - {street}
                      </option>
                    ))}
                  </Select>
                  <Text as={'small'} color={'grey.400'}>
                    {t('qrCodePage.form.location.hint')}
                  </Text>
                </FormControl>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
