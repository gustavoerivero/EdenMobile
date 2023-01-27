import React from 'react'
import { VStack, Text } from 'native-base'

import colors from '../../styled-components/colors'

const NumberGameData = ({ title = '', number = 0 }) => {
  return (
    <VStack
      justifyContent='center'
      alignItems='center'
      space={1}
    >
      <Text
        bold
        textAlign='center'
        fontSize='xl'
        color={colors.gray}
      >
        {number}
      </Text>
      <Text
        textAlign='center'
        fontSize='xs'
        color={colors.gray}
        lineHeight={12}
      >
        {title}
      </Text>
    </VStack>
  )
}

export default NumberGameData