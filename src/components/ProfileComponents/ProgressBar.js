import React from 'react'
import { Box, VStack, Text, HStack } from 'native-base'

import colors from '../../styled-components/colors'

const ProgressBar = ({ text = 'Progress', progress = 0, total = 100 }) => {

  const state = progress / (total === 0 ? 1 : total) * 100

  return (
    <VStack
      minW='100%'
    >
      <HStack
        minW='100%'
        justifyContent='space-between'
        pr={2}
      >
        <Text
          fontSize='xs'
          bold
          color={colors.gray}
        >
          {text}
        </Text>
        <Text
          bold
          fontSize='xs'
          color={colors.gray}
        >
          {progress}
        </Text>
      </HStack>
      <Box
        minH={2}
        h={2}
        maxH={2}
        minW={`${100}%`}
        w='100%'
        maxW='100%'
        bgColor={colors.gray4}
        borderRadius={50}
      >
        <Box
          minH={2}
          h={2}
          maxH={2}
          minW={`${state}%`}
          w={`${state}%`}
          maxW={`${state}%`}
          bgColor={colors.navBar.activeColor}
          borderRadius={50}
        >
        </Box>
      </Box>
    </VStack>
  )
}

export default ProgressBar