import React from 'react'
import { ScrollView, Text, VStack } from 'native-base'

import Container from '../../components/Container'

import useAuthContext from '../../hooks/useAuthContext'
import LoginForm from '../../components/LoginComponents/LoginForm'
import ProfileComponent from '../../components/ProfileComponents/ProfileComponent'

import colors from '../../styled-components/colors'
import CreoleProfileCard from '../../components/ProfileComponents/CreoleProfileCard'
import DominoesProfileCard from '../../components/ProfileComponents/DominoesProfileCard'
import ContactCard from '../../components/ProfileComponents/ContactCard'
import Modal from '../../components/Modal'

const UserPage = ({ navigation }) => {

  const {
    state: { isAuthenticated },
  } = useAuthContext()

  return (
    <Container
      hiddenNavBar={true}
    >
      <ScrollView
        minH='100%'
      >
        {!isAuthenticated ?
          <LoginForm />
          :
          <VStack
            p={5}
            mt={15}
            space={3.5}
            minH='100%'
            alignItems='center'
          >
            <ProfileComponent />
            <CreoleProfileCard
              gamesPlayed={7}
              gamesWon={3}
              gamesLost={4}
              arrimeBueno={12}
              arrimeMalo={2}
              bocheBueno={0}
              bocheMalo={4}
              marranaBuena={1}
              marranaMala={0}
              mingoFuera={1}
            />
            <DominoesProfileCard
              gamesPlayed={6}
              gamesWon={4}
              gamesLost={2}
              points={250}
            />
            <ContactCard

            />
          </VStack>
        }
      </ScrollView>
    </Container>
  )

}

export default UserPage