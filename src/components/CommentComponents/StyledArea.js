import React, { forwardRef, useState } from 'react'
import { Box, TextArea, HStack } from 'native-base'
import { useWindowDimensions } from 'react-native'

import colors from '../../styled-components/colors'

const StyledField = ({ style = {}, inputH = null, inputMD = null, textSize = null, inputW = null, borderColor = null, bgColor = null, m = null, py = null, px = null, p = 2, h = null, minH = null, maxH = null, w = null, ...props }, ref) => {

  const layout = useWindowDimensions()

  const [height, setHeight] = useState(7)

  const inputStyle = {
    ...style
  }

  return (
    <Box
      w={w ? w : layout.width}
      minH={minH ? minH : layout.height * 0.11}
      maxH={maxH ? maxH : layout.height * 0.11}
      bgColor={colors.white}
      p={p ? p : 0}
      py={py ? py : 0}
      px={px ? px : 0}
      justifyContent='center'
    >
      <HStack
        alignItems='center'
        w='100%'
      >
        <HStack
          w='100%'
        >
          <TextArea
            style={inputStyle}
            bgColor={bgColor ? bgColor : colors.base}
            borderColor={borderColor ? borderColor : colors.textField.borderColor}
            placeholderTextColor='rgba(40, 10, 57, .5)'
            textAlignVertical='center'
            textAlign='justify'
            m={m ? m : 1}
            onContentSizeChange={(event) => {
              setHeight(event.nativeEvent.contentSize.height)
            }}
            variant='unstyled'
            minH={inputH ? inputH : 10}
            h={height}
            maxH={45}
            w={{
              base: inputW ? inputW : '98%',
              md: inputMD ? inputMD : "25%"
            }}
            size={textSize ? textSize : 'md'}
            color={colors.textField.text}
            borderRadius={15}
            {...props}
          />
        </HStack>
      </HStack>
    </Box>
  )
}

export default forwardRef(StyledField)