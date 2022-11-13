import React from 'react'
import { ScrollView, VStack } from 'native-base'

import LoginForm from '../../components/LoginComponents/LoginForm'
import Background from '../../components/Background'

const LoginPage = ({ navigation }) => {

  return (
    <ScrollView
      minH='100%'
      contentContainerStyle={{
        minHeight: '100%'
      }}
    >
      <Background>
        <VStack
          justifyContent='center'
          my={5}
        >
          <LoginForm />
        </VStack>
      </Background>
    </ScrollView>
  )

}

export default LoginPage