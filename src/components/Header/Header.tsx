import { HStack, IconButton } from '@chakra-ui/react';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';

import { ThemeSwitcher } from '../Theme/ThemeSwitcher';

export type HeaderType = {};

export default function Header({}: HeaderType) {
  return (
    <HStack justifyContent={'space-between'} p={2}>
      <ThemeSwitcher />
      <IconButton
        variant={'ghost'}
        aria-label={'toggle-menu'}
        icon={<HiOutlineMenuAlt4 />}
      />
    </HStack>
  );
}
