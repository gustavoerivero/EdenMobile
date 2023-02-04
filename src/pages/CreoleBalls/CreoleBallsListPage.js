import React, { useState, useCallback } from 'react'
import { RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Divider, FlatList, HStack, Stack, Text, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import useLoading from '../../hooks/useLoading'

import colors from '../../styled-components/colors'
import CreoleGameCard from '../../components/CreoleBallsComponents/CreoleGameCard'
import NotFound from '../../components/NotFound'

import ScheduleService from '../../services/calendar/CalendarService'
import TournamentService from '../../services/tournaments/TournamentsService'

const CreoleBallsListPage = ({ navigation, route }) => {

  const tournament = route?.params

  const Tournament = new TournamentService()

  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [modality, setModality] = useState({})
  const [playersTeamA, setPlayersTeamA] = useState([])
  const [playersTeamB, setPlayersTeamB] = useState([])
  const [refreshing, setRefreshing] = useState()

  const onRefresh = useCallback(() => {
    setIsLoading(true)
    setEvents([])
    getData()
  }, [])

  const getData = async () => {
    try {

      setIsLoading(true)

      const { data } = await Tournament.get(tournament?.id)

      let auxData = data?.data


      let calendar = auxData?.fase_de_torneo[0]?.calendario
      setModality(auxData?.fase_de_torneo[0]?.modalidad)

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
              pt={2}
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
              pt={1}
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
                  <CreoleGameCard
                    id={item?.id}
                    title={tournament.title}
                    teamA={item?.equipo_a}
                    teamB={item?.equipo_b}
                    date={item?.fecha}
                    status={item?.estado}
                    maxTime={modality?.tiempo_maximo_minutos}
                    forfeit={modality?.tiempo_forfeit_minutos}
                    maxPoints={modality?.puntuacion_maxima}
                    navigation={navigation}
                    playersTeamA={item?.jugadores_equipo_a || []}
                    playersTeamB={item?.jugadores_equipo_b || []}
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

export default CreoleBallsListPage