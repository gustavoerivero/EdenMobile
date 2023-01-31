import React, { forwardRef } from 'react'
import { Input } from 'native-base'

import colors from '../../styled-components/colors'

const StyledField = ({ style = {}, ...props }, ref) => {
  const inputStyle = {
    ...style
  }
  return (
    <Input
      style={inputStyle}
      bgColor={colors.textField.bgSecondColor}
      borderColor={colors.base}
      placeholderTextColor='rgba(40, 10, 57, .5)'
      h={8}
      w={{
        base: "100%",
        md: "25%"
      }}
      size='sm'
      borderRadius={12}
      color={colors.textField.text}
      {...props}
    />
  )
}

export default forwardRef(StyledField)