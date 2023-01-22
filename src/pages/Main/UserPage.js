import React from 'react'
import { ScrollView } from 'native-base'
import Container from '../../components/Container'

import useAuthContext from '../../hooks/useAuthContext'
import LoginForm from '../../components/LoginComponents/LoginForm'

const UserPage = ({ navigation }) => {

  const {
    state: { isAuthenticated },
  } = useAuthContext()

  return (
    <Container
      hiddenNavBar={!isAuthenticated}
    >
      <ScrollView
        minH='100%'
      >
        {!isAuthenticated &&
          <LoginForm />
        }
      </ScrollView>
    </Container>
  )

}

export default UserPage