import React, { forwardRef } from 'react'
import { Input } from 'native-base'

import colors from '../styled-components/colors'

const StyledField = ({ style = {}, placeholderTextColor = 'rgba(40, 10, 57, .5)', textColor = colors.textField.text, size = 'md', h = 50, baseW = '95%', mdW = '25%', bgColor = colors.base, borderColor = colors.textField.borderColor, ...props }, ref) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
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

export default forwardRef(StyledField)