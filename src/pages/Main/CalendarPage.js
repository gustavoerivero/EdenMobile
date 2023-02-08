import React, { useState, useCallback } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { VStack, FlatList, Stack, Divider } from 'native-base'
import Container from '../../components/Container'
import EventItem from '../../components/CalendarComponents/EventItem'

import NotFound from '../../components/NotFound'

import { getHour, getDate } from '../../utilities/functions'

import colors from '../../styled-components/colors'
import useCustomToast from '../../hooks/useCustomToast'
import ScheduleService from '../../services/calendar/CalendarService'

const CalendarPage = ({ navigation }) => {

  const Calendar = new ScheduleService()

  const { showErrorToast } = useCustomToast()

  const [isLoading, setIsLoading] = useState(true)

  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setIsLoading(true)
    setEvents([])
    setCurrentPage(1)
    setIsNextPage(true)
    setIsLoading(false)
    getData()
  }, [])

  const getData = async () => {

    try {
      if (isNextPage) {

        setIsLoading(true)

        let { data } = await Calendar.get(currentPage)

        const auxEvents = data?.data
        let aux = auxEvents || []

        const nextPage = Number(data?.next_page_url?.slice(-1)) || 1

        setIsNextPage(nextPage > currentPage)
        console.log(nextPage > currentPage)

        setEvents(prevEvents => [...prevEvents, ...aux])

        setIsLoading(false)

      }
    } catch (error) {
      console.log(`Calendar error: ${error}`)
      setIsLoading(false)
      showErrorToast('No se pudo obtener los eventos y actividades.')
    }


  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [currentPage])
  )

  const renderItem = ({ item }) => {

    const type = item?.disciplina ? item?.disciplina : item?.es_actividad === '0' ? 'E' : 'A'

    return (
      <Stack
        py={2}
        alignItems='center'
      >
        <EventItem
          id={item?.id}
          name={item?.nombre}
          date={item?.fecha_inicio}
          type={type || 'A'}
          subtype={item?.tipo?.nombre || null}
          title={item?.nombre || ''}
          hour={item?.fecha_inicio ? getHour(item?.fecha_inicio) : getHour(item?.creado)}
          description={item?.descripcion || ''}
          location={item?.instalacion?.nombre || ''}
          area={item?.instalacion?.area?.nombre || ''}
          image={item?.imagen_principal || 'https://via.placeholder.com/561x421/AFFFEA/599182/?text=Sin+imagen'}
          tournament={item?.torneo}
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
        minH='100%'
        minW='100%'
        pt={3}
        py={2}
        alignItems='center'
      >
        <Divider />
        {isLoading ? (
          <Stack
            mt={2}
            alignItems='center'
            justifyContent='center'
            alignContent='center'
            alignSelf='center'
          >
            <ActivityIndicator size='large' color={colors.primary} />
          </Stack>
        ) : !events || events?.length === 0 ? (
          <Stack
            px={3}
          >
            <NotFound
              text='Aún no se han publicado eventos en el club.'
            />
          </Stack>

        ) : events?.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            data={events}
            minW='100%'
            maxH='93%'
            keyExtractor={(item, key) => `${item?.id}${item?.creado}${new Date().toISOString()}${key}`}
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