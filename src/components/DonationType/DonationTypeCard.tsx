import {
  Box,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Donation, DonationType } from '../../../interfaces/Donation';

export default function DonationTypeCard({ image, type }: Donation) {
  const { t } = useTranslation();
  return (
    <Box
      role={'group'}
      p={6}
      maxW={'280px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={image}
        />
      </Box>

      <Stack pt={10} align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          {t(`donationType.${type}.title`)}
        </Text>

        <Link href={`donate/${type}`} variant={'outline'} colorScheme={'green'}>
          {t(
            `common.button.label.${
              type === DonationType.MONEY ? 'donateNow' : 'learnMore'
            }`
          )}
        </Link>
      </Stack>
    </Box>
  );
}
