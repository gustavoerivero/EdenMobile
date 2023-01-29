import React, { useRef } from 'react'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { Box } from 'native-base'

import colors from '../styled-components/colors'

const StyledSwitch = ({ value = false, setValue }) => {

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current

  const translateInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 23]
  })

  const handlePress = () => {
    setValue(!value)
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  const animateTranslation = {
    transform: [{
      translateX: translateInterpolation,
    }]
  }

  const styles = {
    circle: {
      width: 17,
      height: 17,
      borderRadius: 50,
      backgroundColor: colors.white
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Box
        minW={12}
        w={12}
        maxW={12}
        minH={6}
        h={6}
        maxH={6}
        borderRadius={20}
        px={1}
        bgColor={value ? colors.navBar.activeColor : colors.gray2}
        justifyContent='center'
        justifyItems='center'
      >
        <Animated.View
          style={{
            ...styles.circle,
            ...animateTranslation,
          }}
        >

        </Animated.View>
      </Box>
    </TouchableWithoutFeedback>
  )
}



export default StyledSwitch