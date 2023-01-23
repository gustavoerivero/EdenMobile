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
import NotificationItem from '../../components/NotificationComponents/NotificationItem'

const NotificationPage = ({ navigation }) => {

  const started = [
    {
      id: 1,
      name: '¡Nuevo evento! Torneo de Bolas Criollas E23.',
      date: '2023-01-03',
      type: 1,
      read: true
    },
    {
      id: 2,
      name: 'Username comentó en el evento de Torneo de Bolas Criollas E23.',
      date: '2023-01-14',
      type: 1,
      read: true
    },
    {
      id: 3,
      name: '¡Nuevo evento! Re-apertura de la cancha de futbolito.',
      date: '2023-01-25',
      type: 1,
      read: false
    },
    {
      id: 4,
      name: 'Importante: Junta directiva para socios del club.',
      date: '2023-02-08',
      type: 1,
      read: false
    },
    {
      id: 5,
      name: 'Username comentó en el evento de Re-apertura de la cancha de futbolito.',
      date: '2023-02-14',
      type: 1,
      read: true
    },
  ]


  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [notification, setEvents] = useState(started)
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

          console.log(notification)

          setIsNextPage(data?.links?.next ? true : false)
          console.log(`Events: ${notification}`)
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
        <NotificationItem 
          id={item.id}
          name={item.name}
          date={item.date}
          type={item.type}
          read={item.read}
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
        {!notification || notification?.length === 0 ? (
          <NotFound
            text='Aún no se han publicado eventos en el club.'
          />
        ) : notification?.length > 0 || !isLoading ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            data={notification}
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

export default NotificationPage