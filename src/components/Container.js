import React from 'react'

import NavBar from './NavBar'
import Background from './Background'
import StatusBar from './StatusBar'

import colors from '../styled-components/colors'

const Container = ({
  statusBarStyle = 'default',
  statusBarColor = colors.bgSecondary,
  hiddenStatusBar = false,
  hiddenNavBar = false,
  backgroundTopColor = colors.white,
  backgroundBottomColor = colors.gray1,
  children
}) => {

  return (
    <Background
      topColor={backgroundTopColor}
      bottomColor={backgroundBottomColor}
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