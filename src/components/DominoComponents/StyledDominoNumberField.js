import React, { forwardRef } from 'react'
import { Input } from 'native-base'

import colors from '../../styled-components/colors'

const StyledDominoNumberField = ({ style = {}, placeholderTextColor = 'rgba(40, 10, 57, .5)', textColor = colors.textField.text, size = 'xl', h = 50, baseW = '95%', mdW = '25%', bgColor = colors.white, borderColor = colors.creoleStartGame.teamSelectedTextColor, ...props }, ref) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
      keyboardType='numeric'
      textAlign='center'
      style={inputStyle}
      bgColor={bgColor}
      borderColor={borderColor}
      placeholderTextColor={placeholderTextColor}
      h={h}
      w={{
        base: baseW,
        md: mdW
      }}
      size={size}
      color={textColor}
      {...props}
    />
  )
}

export default forwardRef(StyledDominoNumberField)