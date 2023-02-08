import React, { useState, useCallback } from 'react'
import { RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Divider, FlatList, HStack, Stack, Text, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import useLoading from '../../hooks/useLoading'

import colors from '../../styled-components/colors'
import NotFound from '../../components/NotFound'
import DominoGameCard from '../../components/DominoComponents/DominoGameCard'
import TournamentService from '../../services/tournaments/TournamentsService'

const DominoListPage = ({ navigation, route }) => {

  const tournament = route?.params

  const Tournament = new TournamentService()
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [modality, setModality] = useState({})
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setIsLoading(true)
    setEvents([])
    getData()
    setRefreshing(false)
  }, [])

  const getPoints = (array = [], element) => {
    let points = 0

    array.forEach(item => {
      points += Number(item[element]) || 0
    })

    return points
  }

  const getData = async () => {
    try {

      setIsLoading(true)

      const { data } = await Tournament.get(tournament?.id)

      let auxData = data?.data

      let calendar = []

      auxData?.fase_de_torneo?.forEach(item => {
        calendar = [...calendar, ...item?.calendario]
      })

      console.log(tournament.id)
      console.log(calendar)

      setEvents(calendar)

      setIsLoading(false)

    } catch (error) {
      console.log(`Calendar error: ${error}`)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  )

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW='100%'
        minH='100%'
        justifyContent='space-between'
        p={5}
      >
        <Stack
          minH='93%'
          maxH='93%'
        >
          <HStack
            minH='10%'
            maxH='10%'
            pr={1}
            space={2}
          >
            <Stack
              pt={1}
            >
              <TouchableOpacity
                onPress={() => navigation?.goBack()}
              >
                <Icon
                  name='arrow-back-outline'
                  color={colors.text.description}
                  size={30}
                />
              </TouchableOpacity>
            </Stack>

            <Text
              fontSize='2xl'
              bold
              color={colors.text.primary}
              alignContent='center'
              lineHeight={25}
            >

              {tournament.title}
            </Text>
          </HStack>
          <Divider />
          {isLoading ? (
            <Stack
              mt={2}
              justifyContent='flex-start'
              minH='100%'
            >
              <ActivityIndicator
                size='large'
                color={colors.primary}
              />
            </Stack>
          ) : events?.length === 0 ? (
            <Stack
              maxH='100%'
            >
              <NotFound
                text='No hay juegos disponibles'
              />
            </Stack>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              data={events}
              minH='90%'
              maxH='90%'
              keyExtractor={item => item?.id}
              renderItem={({ item }) => (
                <Stack
                  key={item?.id}
                  p={1}
                >
                  <DominoGameCard
                    id={item?.id}
                    title={tournament?.title}
                    teamA={item?.equipo_a}
                    teamB={item?.equipo_b}
                    teamAMembers={item?.equipo_a?.jugadores}
                    teamBMembers={item?.equipo_b?.jugadores}
                    date={item?.fecha}
                    rounds={item?.rounds || []}
                    maxTime={Number(item?.modalidad?.modalidad?.tiempo_maximo_minutos) || 0}
                    maxPoints={Number(item?.modalidad?.modalidad?.puntuacion_maxima) || 0}
                    status={item?.estado}
                    navigation={navigation}
                    teamAScore={item?.ronda?.length > 0 ? 
                      getPoints(item?.ronda, 'puntuacion_equipo_a') : 0
                    }
                    teamBScore={item?.ronda?.length > 0 ? 
                      getPoints(item?.ronda, 'puntuacion_equipo_b') : 0
                    }
                  />
                </Stack>
              )}
            />
          )}
        </Stack>

        <VStack
          space={2}
          minH='7%'
          maxH='7%'
        >
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          <Stack>

          </Stack>
        </VStack>

      </VStack>
    </Container >
  )
}

export default DominoListPage