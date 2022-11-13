import React, { forwardRef } from 'react'
import { Input } from 'native-base'

import colors from '../styled-components/colors'

const StyledField = ({ style = {}, ...props }, ref) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
      style={inputStyle}
      bgColor={colors.base}
      borderColor={colors.textField.borderColor}
      placeholderTextColor='rgba(40, 10, 57, .5)'
      h={50}
      w={{
        base: "95%",
        md: "25%"
      }}
      size='md'
      color={colors.textField.text}
      {...props}
    />
  )
}

export default forwardRef(StyledField)