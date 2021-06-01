import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

export const breakpoints = createBreakpoints({
  sm: '36em',
  md: '48em',
  lg: '62em',
  xl: '75em',
  '2xl': '96em',
});

export const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

export const colors = {
  brand: {
    '50': '#E7EBFE',
    '100': '#BBC6FC',
    '200': '#8FA1FA',
    '300': '#637CF8',
    '400': '#405FF6',
    '500': '#0B33F4',
    '600': '#0929C3',
    '700': '#1D1B7A',
    '800': '#051461',
    '900': '#020A31',
  },
  purple: {
    800: '#271035',
  },
  grey: {
    200: '#f9f9ff',
    300: '#fbf8f8',
    400: '#A0A0A0',
    500: '#9E9BB8',
    600: '#1F2336',
    800: '#101220',
  },
};

export const components = {
  Link: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
    },
  },
};

export const fonts = {
  body: "'Inter', sans-serif",
};

export const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
};

export const sizes = {
  container: {
    lg: '1030px',
    xl: '1240px',
  },
};

export const textStyles = {
  baseStyle: {
    color: colors.brand['800'],
  },
};

export const styles = {
  global: {
    body: {},
    h1: {
      fontSize: '2rem',
      fontWeight: '700',
    },
    form: {
      width: '100%',
    },
    a: {
      color: colors.brand['400'],
    },
  },
};

const theme = extendTheme({
  breakpoints,
  colors,
  config,
  components,
  fonts,
  fontWeights,
  sizes,
  styles,
  textStyles,
});

export default theme;
