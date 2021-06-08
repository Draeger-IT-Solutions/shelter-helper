import {
  As,
  Box,
  BoxProps,
  forwardRef,
  OmitCommonProps,
  PropsOf,
} from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';
import { PropsWithChildren } from 'react';

import theme, { colors } from '../../theme/theme';

type CardType = PropsWithChildren<
  OmitCommonProps<PropsOf<'div'>, keyof BoxProps> &
    BoxProps & { as?: As<any> | undefined } & {
      badgeTitle?: string;
    }
>;

export default forwardRef<BoxProps, 'div'>(
  ({ badgeTitle, ...props }: CardType, ref) => (
    <Box
      background={transparentize('white', 0.1)(theme)}
      backdropFilter="blur(10px)"
      position={'relative'}
      px="4"
      pb="4"
      pt={badgeTitle ? 8 : 4}
      rounded="2xl"
      shadow="2xl"
      _before={
        badgeTitle
          ? {
              rounded: 'lg',
              background: colors.brand['400'],
              content: `"${badgeTitle}"`,
              padding: '0 4px',
              position: 'absolute',
              top: '-10px',
            }
          : {}
      }
      ref={ref}
      {...props}
    />
  )
);
