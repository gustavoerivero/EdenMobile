import React from 'react'
import { HStack } from 'native-base'

import Eden from '../assets/logo/eden.svg'

const NavBar = () => {
  return (
    <HStack
      justifyContent='flex-end'
      pt={2}
      pr={2}
    >
      <Eden width={114} height={45} />
    </HStack>
  )
}

export default NavBar