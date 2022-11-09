import React from 'react'
import { ScrollView, VStack } from 'native-base'

import LoginForm from '../../components/LoginComponents/LoginForm'

import colors from '../../styled-components/colors'

const LoginPage = ({ navigation }) => {

  return (
    <ScrollView
      bgColor={colors.primary}
      minH='100%'
      contentContainerStyle={{
        minHeight: '100%'
      }}
    >
      <VStack
        justifyContent='center'
        my={5}
      >
        <LoginForm />
      </VStack>
    </ScrollView>
  )

}

export default LoginPage