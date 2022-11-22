import React from 'react'

import NavBar from './NavBar'
import Background from './Background'
import StatusBar from './StatusBar'

import colors from '../styled-components/colors'

const Container = ({ statusBarStyle, statusBarColor, hiddenStatusBar, hiddenNavBar, children }) => {
  return (
    <Background
      topColor={colors.white}
      bottomColor={colors.gray1}
    >
      <StatusBar
        backgroundColor={statusBarColor}
        hidden={hiddenStatusBar}
        statusBarStyle={statusBarStyle}
      />
      <NavBar
        hidden={hiddenNavBar}
      />
      {children}
    </Background>
  )
}

export default Container