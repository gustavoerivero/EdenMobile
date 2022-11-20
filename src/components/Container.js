import React from 'react'
import { ScrollView } from 'react-native'
import colors from '../styled-components/colors'
import NavBar from './NavBar'
import Background from './Background'
import styles from './styled-components/styles'
import StatusBar from './StatusBar'

const Container = ({ statusBarStyle, statusBarColor, hiddenStatusBar, children }) => {
  return (
    <ScrollView
      minH='100%'
      contentContainerStyle={styles.containerOut}
    >
      <StatusBar 
        backgroundColor={statusBarColor}
        hidden={hiddenStatusBar}
        statusBarStyle={statusBarStyle}
      />
      <Background
        topColor={colors.white}
        bottomColor={colors.gray1}
      >
        <NavBar />
        {children}
      </Background>
    </ScrollView>
  )
}

export default Container