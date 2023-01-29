import React from 'react'
import { ImageBackground, useWindowDimensions } from 'react-native'

import { Box, Modal } from 'native-base'

import colors from '../styled-components/colors'
import styles from './styled-components/styles'

const StyledModal = ({ children, modalStyle = {} }) => {

  const layout = useWindowDimensions()

  return (
    <ImageBackground
      style={[styles.modalBackground, {
        position: 'absolute',
        top: -layout.height,
        bottom: 0,
        left: -20,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 1,
        minHeight: layout.height * 1.2,
        minWidth: layout.width,
        justifyContent: 'center',
        alignItems: 'center',
      }]}
    >
      <Box
        minW='80%'
        minH={120}
        p={2}
        pb={3}
        bgColor={colors.white}
        shadow={5}
        borderRadius={10}
        style={modalStyle}
      >
        {children}
      </Box>
    </ImageBackground>
  )
}

export default StyledModal