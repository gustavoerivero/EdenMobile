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

import { formatDate, getHour, getDate } from '../../utilities/functions'
import useCustomToast from '../../hooks/useCustomToast'

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

  const { showErrorToast } = useCustomToast()

  const data = [
    {
      id: 0,
      nombre: 'Torneo de voleibol',
      descripcion: 'Sábado 26 de noviembre',
      tipo: 'N',
      creado: '2023-01-22T03:24:00',
      instalacion: {
        nombre: 'Área de deportes',
      },
      area: {
        nombre: 'Sector D',
      },
      image: 'https://imagenes.elpais.com/resizer/L-x86NTaSVVBr9YZnnn1driudPw=/980x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/CNK6AU3UNFB2REUA4VXS233FKE.jpg'
    },
    {
      id: 1,
      nombre: 'Juegos interclub',
      descripcion: 'del 01 al 07 de diciembre',
      tipo: 'N',
      creado: '2023-02-14T03:24:00',
      instalacion: {
        nombre: 'Área de deportes',
      },
      area: {
        nombre: 'Sector B',
      },
      image: 'https://warwick.ac.uk/services/sport/find-your-active.jpg'
    },
    {
      id: 2,
      nombre: 'Torneo de bolas criollas',
      descripcion: 'Viernes 09 de diciembre',
      tipo: 'D',
      creado: '2023-05-22T16:34:00',
      instalacion: {
        nombre: 'Área de deportes',
      },
      area: {
        nombre: 'Sector C',
      },
      image: 'https://http2.mlstatic.com/D_NQ_NP_655547-MLV25593228224_052017-O.webp'
    },
    {
      id: 3,
      nombre: 'Torneo de dominó',
      descripcion: 'Martes 12 de diciembre',
      tipo: 'D',
      creado: '2023-12-12T16:34:00',
      instalacion: {
        nombre: 'Área de caneys',
      },
      area: {
        nombre: 'Sector A',
      },
      image: 'https://patasdegallo.com/wp-content/uploads/2016/12/capacidad-mental.jpg'
    },
  ]

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
          setEvents(data)
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

    const { dayWeek, day, month, year } = getDate(item?.creado)

    return (
      <Stack
        py={2}
      >
        <InfoCard
          key={item?.id}
          id={item?.id}
          type={item?.tipo || ""}
          title={item?.nombre || ""}
          date={`${dayWeek}, ${day} de ${month} de ${year}` || ""}
          hour={getHour(item?.creado) || ""}
          description={item?.descripcion || ""}
          location={item?.instalacion?.nombre || ""}
          area={item?.area?.nombre || ""}
          image={`https://medinajosedev.com/storage/${item?.imagen_principal}` || ""}
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