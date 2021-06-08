import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  HOST,
  MAX_DONATION_AMOUNT,
  MIN_DONATION_AMOUNT,
} from '../../../config';
import { loadStripe, requestStripeCheckout } from '../../stripe/helper';
import { Address } from '../../types/Shelter';
import { StripeCheckoutSessionPostBody } from '../../types/Stripe';
import { formatAmountForDisplay } from '../../utils/formatter';

const DEFAULT_DONATION_AMOUNT = 10;

type MoneyDonationFormType = {
  amount: number;
  location?: Address;
};

type FormValues = Pick<MoneyDonationFormType, 'amount'>;

export default function MoneyDonationForm({
  location,
}: Pick<MoneyDonationFormType, 'location'>): JSX.Element {
  const { t } = useTranslation();

  const [success_url, cancel_url] = [
    `${HOST}/checkout/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    `${HOST}/donate/money${location ? `?location=${location?.id}` : ''}`,
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const amountRegisterOptions = {
    valueAsNumber: true,
    min: {
      value: MIN_DONATION_AMOUNT,
      message: t('form.error.min', {
        inputName: t('common.donationAmount'),
        min: MIN_DONATION_AMOUNT,
      }),
    },
    max: {
      value: MAX_DONATION_AMOUNT,
      message: t('form.error.max', {
        inputName: t('common.donationAmount'),
        max: MAX_DONATION_AMOUNT,
      }),
    },
    required: {
      value: true,
      message: t('form.error.required', {
        inputName: t('common.donationAmount'),
      }),
    },
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleDonation = async (amount: number) => {
    const { id, name } = location || {};

    setIsLoading(true);

    const data: StripeCheckoutSessionPostBody = {
      amount,
      success_url,
      cancel_url,
      metadata: {
        location_id: id,
        location_name: name,
        donation_origin: 'qr-code',
      },
    };
    const response = await requestStripeCheckout(data);

    setIsLoading(false);

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await loadStripe();

    const { error } = stripe
      ? await stripe.redirectToCheckout({
          sessionId: response.id,
        })
      : { error: { message: 'MÖÖÖÖÖP' } };

    if (!error) return;
    console.warn(error.message);
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ amount }) => {
    await handleDonation(amount);
  };

  if (isLoading)
    return (
      <Box textAlign={'center'}>
        <Spinner />
        <p>{t('donation.money.form.loading')}</p>
      </Box>
    );

  return (
    <Stack direction={{ base: 'column', md: 'row' }} alignItems={'center'}>
      <HStack w={'100%'} maxW={'320px'}>
        {[1, 2, 5].map((amount) => (
          <Button
            key={`money-donation-form__donate-btn--${amount}`}
            variant={'outline'}
            type="submit"
            colorScheme="brand"
            fontWeight={'600'}
            fontSize={{ base: 'md', sm: 'xl', lg: '1xl' }}
            onClick={() => handleDonation(amount)}
            width={'100%'}
          >
            {formatAmountForDisplay(amount, 'eur')}
          </Button>
        ))}
      </HStack>

      <Spacer />
      <Text as={'p'} py={2} textAlign={'center'}>
        {t('common.or')}
      </Text>
      <Spacer />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="lg">
          <Input
            {...register('amount', amountRegisterOptions)}
            step={0.01}
            type={'number'}
            required
            textAlign={'center'}
            pr="7rem"
            defaultValue={DEFAULT_DONATION_AMOUNT}
          />
          <InputRightElement w="7rem">
            <Button
              type="submit"
              variant={'solid'}
              colorScheme="brand"
              fontSize={'md'}
              fontWeight={'600'}
              disabled={!!errors?.amount}
            >
              {t('common.button.label.donate')}
            </Button>
          </InputRightElement>
        </InputGroup>

        {(errors.amount?.type === 'required' ||
          errors.amount?.type === 'min' ||
          errors.amount?.type === 'max') &&
          errors.amount.message}
      </form>
    </Stack>
  );
}
