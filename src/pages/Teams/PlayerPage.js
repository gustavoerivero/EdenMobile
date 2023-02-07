import React, {useState, useCallback, useEffect} from 'react'
import { ScrollView, VStack, Stack } from 'native-base'

import {ActivityIndicator} from 'react-native';

import {useFocusEffect} from '@react-navigation/native'

import Container from '../../components/Container'

import colors from '../../styled-components/colors'
import CreoleProfileCard from '../../components/ProfileComponents/CreoleProfileCard'
import DominoesProfileCard from '../../components/ProfileComponents/DominoesProfileCard'
import PlayerProfileComponent from '../../components/TeamComponents/PlayerProfileComponent'
import PlayerContactCard from '../../components/TeamComponents/PlayerContactCard'

import UserService from '../../services/user/UserService'

const PlayerPage = ({ navigation, route }) => {

  const player = route?.params
  const User = new UserService()

  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState()
  const [loaded, setLoaded] = useState(true)

  const getData = async () => {

    
    if (loaded) {
      try {
      setIsLoading(true)
console.log(player?.playerID)
      let { data } = await User.getUserByID(player?.playerID)

      setUserData(data?.data)
      //console.log(data?.data)
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
    <Container
      hiddenNavBar={true}
    >
      <ScrollView
        minH='100%'
      >
        {isLoading ? (
          <Stack
                      mt={2}
                      alignItems="center"
                      justifyContent="center"
                      alignContent="center"
                      alignSelf="center">
                      <ActivityIndicator size="large" color={colors.primary} />
                    </Stack> 
        ):(
          <VStack
          p={5}
          mt={15}
          space={3.5}
          minH='100%'
          alignItems='center'
        >
          <PlayerProfileComponent
            player={userData}
            position={player?.playerPosition}
            navigation={navigation}
          />
          <CreoleProfileCard
            gamesPlayed={13}
            gamesWon={10}
            gamesLost={3}
            arrimeBueno={12}
            arrimeMalo={2}
            bocheBueno={0}
            bocheMalo={4}
            marranaBuena={1}
            marranaMala={0}
            mingoFuera={1}
          />
          <DominoesProfileCard
            gamesPlayed={20}
            gamesWon={12}
            gamesLost={8}
            points={150}
          />
          <PlayerContactCard
            playerProp={userData}
            playerEmail={userData?.email}
            playerPhones='+2563152648'
          />
        </VStack>
        )
        }
      </ScrollView>
    </Container>
  )

}

export default PlayerPage