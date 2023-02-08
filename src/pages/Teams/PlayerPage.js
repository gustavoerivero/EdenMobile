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
import StatisticService from '../../services/statistics/StatisticService'

const PlayerPage = ({ navigation, route }) => {

  const player = route?.params
  const User = new UserService()
  const Statistic = new StatisticService()

  const [isLoading, setIsLoading] = useState(true)
  const [loaded, setLoaded] = useState(true)

  const [userData, setUserData] = useState()
  const [statisticDomino, setStatisticDomino] = useState()
  const [statisticBalls, setStatisticBalls] = useState()


  const getData = async () => {

    
    if (loaded) {
      try {
      setIsLoading(true)
console.log(player?.playerID)
      let { data } = await User.getUserByID(player?.playerID)
      setUserData(data?.data)

      //BALLS STATISTICS
      const responseB = await Statistic.getBallStatisticByID(player?.playerID)
      setStatisticBalls(responseB?.data)

      //DOMINO STATISTICS
      const respondeD = await Statistic.getDominoStatisticByID(player?.playerID)
      setStatisticDomino(respondeD?.data)

      setIsLoading(false)
      setLoaded(false)

    } catch (error) {
      console.log(`User error: ${error}`)
        showErrorToast('No se pudo obtener los datos del jugador')
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
      <ScrollView minH='100%'>
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

{statisticBalls.participados > 0 &&
  <CreoleProfileCard
            gamesPlayed={statisticBalls.participados || 0}
            gamesWon={statisticBalls?.ganados || 0}
            gamesLost={statisticBalls?.perdidos || 0}
            arrimeBueno={statisticBalls?.lanzamientos?.A || 0}
            arrimeMalo={statisticBalls?.lanzamientos?.a || 0}
            bocheBueno={statisticBalls?.lanzamientos?.B || 0}
            bocheMalo={statisticBalls?.lanzamientos?.b || 0}
            marranaBuena={statisticBalls?.lanzamientos?.M || 0}
            marranaMala={statisticBalls?.lanzamientos?.m || 0}
            mingoFuera={statisticBalls?.lanzamientos?.F || 0}
            />
}

{statisticDomino?.total_juegos > 0 &&
              <DominoesProfileCard
              gamesPlayed={statisticDomino?.total_juegos || 0}
              gamesWon={statisticDomino?.total_juegos_ganados || 0}
              gamesLost={statisticDomino?.total_juegos_perdidos || 0}
              points={statisticDomino?.puntos_acumulados || 0}
            />
            }

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