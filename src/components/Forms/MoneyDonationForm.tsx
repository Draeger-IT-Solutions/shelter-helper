import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { HOST } from '../../../config';
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
    `${HOST}/donate/money${location?.id ? `?location=${location.id}` : ''}`,
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { amount: DEFAULT_DONATION_AMOUNT },
    mode: 'onChange',
  });
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

    setIsLoading(false);

    if (!error) return;
    console.warn(error.message);
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ amount }) => {
    await handleDonation(amount);
  };

  if (isLoading) return <p>...is loading</p>;

  return (
    <Stack>
      <HStack>
        {[1, 2, 5].map((amount) => (
          <Button
            key={`money-donation-form__donate-btn--${amount}`}
            variant={'outline'}
            type="submit"
            colorScheme="brand"
            width={'100%'}
            minH={14}
            fontSize={'md'}
            fontWeight={'600'}
            onClick={() => handleDonation(amount)}
          >
            {formatAmountForDisplay(amount, 'eur')}
          </Button>
        ))}
      </HStack>

      <Text as={'p'} py={4} textAlign={'center'}>
        {t('common.or')}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="md">
          <Input
            {...register('amount', { min: 1, max: 10000, required: true })}
            type={'number'}
            min={1}
            max={10000}
            required
            textAlign={'center'}
            pr="7rem"
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
        {errors.amount?.type === 'required' && 'Amount is required'}
        {errors.amount?.type === 'min' &&
          'Amount must be bigger than or equal to 1'}
        {errors.amount?.type === 'max' && 'Amount cant be bigger than 10000'}
      </form>
    </Stack>
  );
}
