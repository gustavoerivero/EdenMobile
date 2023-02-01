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
import DominoGameCard from '../../components/DominoComponents/DominoGameCard'

const games = [
  {
    id: 1,
    date: '01/12/2022',
    teamA: 'Apucla',
    teamB: 'DCyTeam'
  },
  {
    id: 2,
    date: '01/12/2022',
    teamA: 'Agronórmicos',
    teamB: 'Ballysteam'
  },
  {
    id: 3,
    date: '01/12/2022',
    teamA: 'UCLArt',
    teamB: 'Econiteam'
  },
  {
    id: 4,
    date: '01/12/2022',
    teamA: 'Criomed',
    teamB: 'Conteam'
  },
  {
    id: 5,
    date: '01/12/2022',
    teamA: 'Tetrateam',
    teamB: 'CEDYTeam'
  },
  {
    id: 6,
    date: '01/12/2022',
    teamA: 'Anteam',
    teamB: 'Osys'
  },
]

const DominoListPage = ({ navigation, route }) => {

  const tournament = route?.params

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
              minH='90%'
              maxH='90%'
              keyExtractor={item => item?.id}
              renderItem={({ item }) => (
                <Stack
                  key={item.id}
                  p={1}
                >
                  <DominoGameCard
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
              maxH='100%'
            >
              <NotFound
                text='No hay juegos disponibles'
              />
            </Stack>

            :
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
          }

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