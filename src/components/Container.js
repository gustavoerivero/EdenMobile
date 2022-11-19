import React from 'react'
import { ScrollView } from 'react-native'
import colors from '../styled-components/colors'
import NavBar from './NavBar'
import Background from './Background'

const Container = ({ navigation, children }) => {
  return (
    <ScrollView
      minH='100%'
      contentContainerStyle={{
        minHeight: '100%',
        backgroundColor: colors.gray
      }}
    >
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