import React, { useState, useCallback } from 'react'
import { useWindowDimensions, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Divider, FlatList, HStack, Stack, Text, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import useLoading from '../../hooks/useLoading'

import colors from '../../styled-components/colors'
import styles from './styled-components/styles'
import CreoleGameCard from '../../components/CreoleBallsComponents/CreoleGameCard'
import NotFound from '../../components/NotFound'

const games = [
  {
    id: 1,
    date: '01/12/2022',
    teamA: 'Equipo 1',
    teamB: 'Equipo 2'
  },
  {
    id: 2,
    date: '01/12/2022',
    teamA: 'Equipo 1',
    teamB: 'Equipo 2'
  },
  {
    id: 3,
    date: '01/12/2022',
    teamA: 'Equipo 1',
    teamB: 'Equipo 2'
  },
  {
    id: 4,
    date: '01/12/2022',
    teamA: 'Equipo 1',
    teamB: 'Equipo 2'
  },
  {
    id: 5,
    date: '01/12/2022',
    teamA: 'Equipo 1',
    teamB: 'Equipo 2'
  },
  {
    id: 6,
    date: '01/12/2022',
    teamA: 'Equipo 1',
    teamB: 'Equipo 2'
  },
]

const CreoleBallsListPage = ({ navigation, route }) => {

  const tournament = route?.params

  const layout = useWindowDimensions()

  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [events, setEvents] = useState([])
  const [refreshing, setRefreshing] = useState()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (events?.length === 0) startLoading()

      setEvents(games)

      if (events?.length !== 0) stopLoading()

    }, [])
  )


  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW={layout.width}
        minH={layout.height * .95}
        p={5}
        justifyContent='space-between'
      >
        <Stack>
          <HStack
            minH={layout.height * .1}
            maxH={layout.height * .1}
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
            >

              {tournament.title}
            </Text>
          </HStack>
          {events?.length > 0 || !isLoading ? (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              data={events}
              minH={layout.height * .75}
              maxH={layout.height * .75}
              keyExtractor={item => item?.id}
              renderItem={({ item }) => (
                <Stack
                  key={item.id}
                  p={1}
                >
                  <CreoleGameCard
                    id={item.id}
                    title={tournament.title}
                    teamA={item.teamA}
                    teamB={item.teamB}
                    navigation={navigation}
                  />
                </Stack>
              )}
            />
          ) : events?.length === 0 ?
            <Stack
              maxH={layout.height * .75}
            >
              <NotFound
                text='No hay juegos disponibles'
              />
            </Stack>

            :
            <Stack
              mt={2}
              justifyContent='flex-start'
              minH={layout.height * .75}
            >
              <ActivityIndicator size='large' color={colors.primary} />
            </Stack>
          }

        </Stack>

        <VStack space={2}>
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          <Stack
            minH={layout.height * .05}
            maxH={layout.height * .05}
          >

          </Stack>
        </VStack>

      </VStack>
    </Container >
  )
}

export default CreoleBallsListPage