import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';
import Head from 'next/head';
import React from 'react';

import theme from '../../theme/theme';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Paw from './Paw';

export type LayoutProps = {
  children?: JSX.Element;
  meta?: MetaData;
};

export enum ROBOTS {
  IndexFollow = 'index,follow',
  NoIndexFollow = 'noindex,follow',
  NoIndexNoFollow = 'noindex,nofollow',
}

export type MetaData = {
  title?: string;
  description?: string;
  robots?: ROBOTS;
};

const Layout = ({ children, meta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{meta?.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="desciption" content={meta?.description} />
        <meta name="robots" content={meta?.robots || ROBOTS.NoIndexNoFollow} />
      </Head>

      <Flex direction={'column'} position={'relative'}>
        <Paw
          position={'fixed'}
          top={-120}
          left={0}
          height={600}
          width={600}
          fill={transparentize('red.400', 0.3)(theme)}
          zIndex={-1}
          color={useColorModeValue('red.50', 'red.400')}
          transform={'rotate(-31deg)'}
        />

        <Header />

        <Box flex={1}>{children}</Box>

        <Footer />
      </Flex>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          max-height: fit-content;
        }
      `}</style>
    </>
  );
};

export default Layout;
