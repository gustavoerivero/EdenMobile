import React from 'react'
import { ScrollView, VStack } from 'native-base'

import LoginForm from '../../components/LoginComponents/LoginForm'
import Background from '../../components/Background'
import colors from '../../styled-components/colors'

const LoginPage = ({ navigation }) => {

  return (
    <ScrollView
      minH='100%'
      contentContainerStyle={{
        minHeight: '100%'
      }}
    >
      <Background
        topColor={colors.bgPrimary}
        bottomColor={colors.secondary}
      >
        <VStack
          justifyContent='center'
          my={5}
        >
          <LoginForm navigation={navigation} />
        </VStack>
      </Background>
    </ScrollView>
  )

}

export default LoginPage