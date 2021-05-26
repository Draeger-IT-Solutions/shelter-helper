import {
  Box,
  Button,
  createIcon,
  Flex,
  Heading,
  Icon,
  IconButton,
  IconProps,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function HomeMain() {
  const { t } = useTranslation();
  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: 'column', md: 'row' }}
      height={'100vh'}
      maxH={800}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading lineHeight={1.1} position={'relative'}>
          <Blob
            position={'absolute'}
            opacity={0.13}
            top={-120}
            left={250}
            zIndex={-1}
            color={useColorModeValue('red.50', 'red.400')}
            transform={'rotate(-31deg)'}
          />
          <Text
            as={'span'}
            position={'relative'}
            fontSize={{ base: '4xl', sm: '5xl', lg: '8xl' }}
            lineHeight={0.75}
          >
            {t('homepage.title')}
          </Text>
          <br />
          <Text as={'span'} color={'red.400'} fontWeight={300} fontSize={22}>
            {t('homepage.subtitle')}
          </Text>
        </Heading>
        <Text
          color={'gray.500'}
          dangerouslySetInnerHTML={{ __html: t('homepage.description') }}
        />
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            colorScheme={'red'}
            bg={'red.400'}
            _hover={{ bg: 'red.500' }}
          >
            Get started
          </Button>
          <Button
            rounded={'full'}
            size={'lg'}
            fontWeight={'normal'}
            px={6}
            leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}
          >
            How It Works
          </Button>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        justify={'center'}
        align={'center'}
        position={'relative'}
        w={'full'}
      >
        <Box
          position={'relative'}
          height={'300px'}
          rounded={'2xl'}
          boxShadow={'2xl'}
          width={'full'}
          overflow={'hidden'}
        >
          <IconButton
            aria-label={'Play Button'}
            variant={'ghost'}
            _hover={{ bg: 'transparent' }}
            icon={<PlayIcon w={12} h={12} />}
            size={'lg'}
            color={'white'}
            position={'absolute'}
            left={'50%'}
            top={'50%'}
            transform={'translateX(-50%) translateY(-50%)'}
          />
          <Image
            alt={'Hero Image'}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={'100%'}
            src={'http://placekitten.com/604/300'}
          />
        </Box>
      </Flex>
    </Stack>
  );
}

const PlayIcon = createIcon({
  displayName: 'PlayIcon',
  viewBox: '0 0 58 58',
  d: 'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
});

export const Blob = (props: IconProps) => {
  return (
    <Icon
      height={600}
      width={600}
      fill="#ff0000"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.954 11c3.33 0 7.057 6.123 7.632 8.716.575 2.594-.996 4.729-3.484 4.112-1.092-.271-3.252-1.307-4.102-1.291-.925.016-2.379.836-3.587 1.252-2.657.916-4.717-1.283-4.01-4.073.774-3.051 4.48-8.716 7.551-8.716zm10.793-4.39c1.188.539 1.629 2.82.894 5.27-.704 2.341-2.33 3.806-4.556 2.796-1.931-.877-2.158-3.178-.894-5.27 1.274-2.107 3.367-3.336 4.556-2.796zm-21.968.706c-1.044.729-1.06 2.996.082 5.215 1.092 2.12 2.913 3.236 4.868 1.87 1.696-1.185 1.504-3.433-.082-5.215-1.596-1.793-3.824-2.599-4.868-1.87zm15.643-7.292c1.323.251 2.321 2.428 2.182 5.062-.134 2.517-1.405 4.382-3.882 3.912-2.149-.407-2.938-2.657-2.181-5.061.761-2.421 2.559-4.164 3.881-3.913zm-10.295.058c-1.268.451-1.92 2.756-1.377 5.337.519 2.467 2.062 4.114 4.437 3.269 2.06-.732 2.494-3.077 1.377-5.336-1.125-2.276-3.169-3.721-4.437-3.27z" />
    </Icon>
  );
};
