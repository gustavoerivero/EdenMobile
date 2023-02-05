import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView, Text, VStack, Stack} from 'native-base'
import {ActivityIndicator} from 'react-native';

import {useFocusEffect} from '@react-navigation/native'

import Container from '../../components/Container'

import useAuthContext from '../../hooks/useAuthContext'
import LoginForm from '../../components/LoginComponents/LoginForm'
import ProfileComponent from '../../components/ProfileComponents/ProfileComponent'

import colors from '../../styled-components/colors'
import CreoleProfileCard from '../../components/ProfileComponents/CreoleProfileCard'
import DominoesProfileCard from '../../components/ProfileComponents/DominoesProfileCard'
import ContactCard from '../../components/ProfileComponents/ContactCard'
import Modal from '../../components/Modal'

import UserService from '../../services/user/UserService'

const UserPage = ({navigation}) => {

  const User = new UserService()

  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState()
  const [loaded, setLoaded] = useState(true)

  const {
    state: {isAuthenticated, user},
  } = useAuthContext()

  const getData = async () => {

    
      if (loaded) {
        try {
        setIsLoading(true)
console.log(user?.user?.usuario?.id)
        let { data } = await User.getUserByID(user?.user?.usuario?.id)

        setUserData(data)
        //console.log(data)
        setIsLoading(false)
        setLoaded(false)

      } catch (error) {
        console.log(`User error: ${error}`)
          showErrorToast('No se pudo obtener los datos del Usuario')
          setIsLoading(false)
          setLoaded(false)
      }
      }
  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, []),
  )

  return (
    <Container hiddenNavBar={true}>
      <ScrollView minH="100%">
        {!isAuthenticated ? (
          <LoginForm />
        ) : isLoading ? (
          <Stack
                      mt={2}
                      alignItems="center"
                      justifyContent="center"
                      alignContent="center"
                      alignSelf="center">
                      <ActivityIndicator size="large" color={colors.primary} />
                    </Stack>
        ) : (
          <VStack p={5} mt={15} space={3.5} minH="100%" alignItems="center">
          <ProfileComponent userProp={userData} />
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
          <ContactCard />
        </VStack>
        )
      }
      </ScrollView>
    </Container>
  )
}

export default UserPage;
