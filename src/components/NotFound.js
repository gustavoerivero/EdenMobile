import React from 'react'
import { VStack, Text } from 'native-base'

import colors from '../styled-components/colors'

import DontFound from '../assets/images/notFound.svg'

const NotFound = ({ fontSize = 'md', textAlign = 'center', colorText = colors.secondary , text = null, widthImage = 300, heightImage = 300, heightStack = '100%', stackAlign = 'center', ...props }) => {
  return (
    <VStack
      minH={heightStack}
      alignItems={stackAlign}
      mx={2}
      my='25%'
      {...props}
    >
      <DontFound
        width={widthImage}
        height={heightImage}
      />
      <Text
        bold
        textAlign={textAlign}
        color={colorText}
        fontSize={fontSize}
      >
        { text ? text : 'Qué extraño... no se ha encontrado información al respecto.'}
        
      </Text>
    </VStack>
  )
}

export default NotFound