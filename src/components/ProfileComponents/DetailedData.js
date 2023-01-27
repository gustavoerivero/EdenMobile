import React from 'react'
import { HStack, Stack, Text } from 'native-base'

import { cutText } from '../../utilities/functions'
import colors from '../../styled-components/colors'

const DetailedData = ({ title = '', data = '' }) => {
  return (
    <HStack
      px={2}
      space={3}
      alignItems='center'
      w='100%'
    >
      <Stack
        w='50%'
        alignItems='center'
        justifyContent='center'
      >
        <Text
          textAlign='right'
          fontSize='xs'
          lineHeight={12}
          color={colors.gray}
        >
          {title}
        </Text>
      </Stack>
      <Stack
        w='50%'
        justifyContent='center'
      >
        <Text
          bold
          fontSize='lg'
          textAlign='left'
          color={colors.navBar.activeColor}
        >
          {cutText(data, 5)}
        </Text>
      </Stack>
    </HStack>
  )
}

export default DetailedData