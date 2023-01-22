import React, { useCallback, useState } from 'react'
import { ActivityIndicator, useWindowDimensions, RefreshControl } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { FlatList, Stack, Text, VStack } from 'native-base'

import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'
import useLoading from '../../hooks/useLoading'

import colors from '../../styled-components/colors'

import NotFound from '../../components/NotFound'

import { getEvents } from '../../services/events/EventsService'

import { formatDate, getHour } from '../../utilities/functions'

const HomePage = ({ navigation }) => {

  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [events, setEvents] = useState(null)
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
      >
        <InfoCard
          key={item?.id}
          id={item?.id}
          type={item?.tipo || ""}
          title={item?.nombre || ""}
          date={formatDate(item?.creado) || ""}
          hour={getHour(item?.creado) || ""}
          description={item?.descripcion || ""}
          location={item?.instalacion?.nombre || ""}
          area={item?.area?.nombre || ""}
          image={`https://medinajosedev.com/storage/${item?.imagen_principal}` || ""}
          navigation={navigation}
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
        py={5}
        px={3}
        height={layout.height}
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
            maxH={layout.height * .80}
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

export default HomePage