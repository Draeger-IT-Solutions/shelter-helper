import { HStack, Text } from '@chakra-ui/react';

export type FooterType = {};

export default function Footer({}: FooterType) {
  return (
    <HStack>
      <Text>Footer text</Text>
    </HStack>
  );
}
