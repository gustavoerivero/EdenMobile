import { HStack } from 'native-base'
import React from 'react'

import Eden from '../assets/logo/eden.svg'

const NavBar = ({ navigation }) => {
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