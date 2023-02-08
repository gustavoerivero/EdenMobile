import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'

import colors from '../styled-components/colors'

const StyledBadge = ({ text = '', selectedColorText = colors.white, colorText = colors.text.description, fontSize = 'xs', bold = false, italic = false, thin = false, textAlign = 'center', bgColor = colors.gray3, selectedBgColor = colors.bgSecondary, h = 5, w = 50, value = false, onChangeValue, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={.9}
      onPress={onChangeValue}
    >
      <Box 
        h={h}
        w={w}
        bgColor={value ? selectedBgColor : bgColor}
        borderRadius={50}
        shadow={3}
      >
        <Text
          bold={bold}
          italic={italic}
          fontWeight={thin ? 'thin' : 'regular'}
          fontSize={fontSize}
          color={selectedColorText && value ? selectedColorText : colorText}
          textAlign={textAlign}
        >
          {text}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}

export default StyledBadge

