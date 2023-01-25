import React, { useState, useCallback } from 'react'
import { ActivityIndicator, RefreshControl, useWindowDimensions } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { VStack, FlatList, Stack } from 'native-base'
import Container from '../../components/Container'
import EventItem from '../../components/CalendarComponents/EventItem'

import NotFound from '../../components/NotFound'

import useLoading from '../../hooks/useLoading'

import { getEvents } from '../../services/events/EventsService'

import colors from '../../styled-components/colors'

const CalendarPage = ({ navigation }) => {

  const started = [
    {
      id: 1,
      name: 'Yoga',
      date: '2023-01-03',
      type: 1
    },
    {
      id: 2,
      name: 'Torneo de bolas criollas',
      date: '2023-01-14',
      type: 1
    },
    {
      id: 3,
      name: 'Torneo de dominó',
      date: '2023-01-25',
      type: 1
    },
    {
      id: 4,
      name: 'Futbolito',
      date: '2023-02-08',
      type: 1
    },
    {
      id: 5,
      name: 'Esgrima',
      date: '2023-02-10',
      type: 1
    },
    {
      id: 6,
      name: 'Carreritas',
      date: '2023-02-14',
      type: 1
    },
    {
      id: 7,
      name: 'Torneo de Minecraft',
      date: '2023-10-12',
      type: 1
    },
    {
      id: 8,
      name: 'Torneo de Call of Duty',
      date: '2023-12-12',
      type: 1
    },
  ]


  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [events, setEvents] = useState(started)
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const layout = useWindowDimensions()

  const onRefresh = useCallback(() => {
    setIsNextPage(true)
    setCurrentPage(1)
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const getData = () => {

    if (isNextPage) {

      startLoading()
/*
      getEvents(currentPage)
        .then(res => {
          const { data, status } = res

          setEvents(status === 200 ? data?.data?.data : [])

          console.log(data?.data?.data)

          console.log(events)

          setIsNextPage(data?.links?.next ? true : false)
          console.log(`Events: ${events}`)
          console.log(`Next page: ${isNextPage}`)
        })
        .catch(error => {
          console.log(`Event error: ${error}`)
        })
        .finally(() => {
          stopLoading()
        })
*/
    }

  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [currentPage])
  )

  const renderItem = ({ item }) => {

    return (
      <Stack
        py={2}
        alignItems='center'
      >
        <EventItem 
          id={item.id}
          name={item.name}
          date={item.date}
          type={item.type}
        />
      </Stack>
    )
  }

  const renderLoader = () => {
    return (
      isLoading &&
      <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
        <ActivityIndicator size='large' color={colors.primary} />
      </Stack>
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <Container>
      <VStack
        minH='100%'
        minW='100%'
        pt={3}
        py={2}
        alignItems='center'
      >
        {!events || events?.length === 0 ? (
          <NotFound
            text='Aún no se han publicado eventos en el club.'
          />
        ) : events?.length > 0 || !isLoading ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            data={events}
            minW={layout.width}
            maxH={layout.height * .85}
            keyExtractor={item => item?.id}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
          />
        ) : (
          <Stack
            mt={2}
            alignItems='center'
            justifyContent='center'
            alignContent='center'
            alignSelf='center'
          >
            <ActivityIndicator size='large' color={colors.primary} />
          </Stack>
        )}
      </VStack>
    </Container>
  )

}

export default CalendarPage