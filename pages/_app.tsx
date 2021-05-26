import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { AppProps } from 'next/app';

import { ThemeSwitcher } from '../src/components/Theme/ThemeSwitcher';
import fonts from '../src/theme/fontFace';
import theme from '../src/theme/theme';
import { I18nProvider } from '../src/utils/i18n';

function ShelterHelper({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <I18nProvider>
      <ChakraProvider theme={theme}>
        <Global styles={fonts} />

        <ThemeSwitcher />

        <Component {...pageProps} />
      </ChakraProvider>
    </I18nProvider>
  );
}

export default ShelterHelper;
