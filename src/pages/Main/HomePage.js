import React, { useCallback, useState } from 'react'
import { ActivityIndicator, useWindowDimensions, RefreshControl } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { FlatList, Stack, Text, VStack } from 'native-base'

import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'
import useLoading from '../../hooks/useLoading'

import colors from '../../styled-components/colors'

import NotFound from '../../components/NotFound'

const HomePage = ({ navigation }) => {

  const data = [
    {
      id: 1,
      type: 3,
      title: 'Torneo Magistral de voleyball playero',
      date: '26 noviembre, 2022',
      hour: 'Sábado, 6:00PM - 11:00PM',
      location: 'Cancha de voleyball',
      area: 'Zona deportiva',
      description: 'Torneo magistral de voleyball playero en la cancha de voleyball de concreto porque falta la cancha de voleyball playero...',
      image: 'https://imagenes.elpais.com/resizer/L-x86NTaSVVBr9YZnnn1driudPw=/980x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/CNK6AU3UNFB2REUA4VXS233FKE.jpg'
    },
    {
      id: 2,
      type: 3,
      title: 'Juegos interclub',
      date: '01 diciembre a 07 diciembre, 2022',
      hour: 'Jueves a miércoles, 6:00PM - 11:00PM',
      location: 'Domo deportivo',
      area: 'Zona deportiva',
      description: 'Torneo multidisciplinario de juegos deportivos entre diversos clubes socio-deportivos.',
      image: 'https://warwick.ac.uk/services/sport/find-your-active.jpg'
    },
    {
      id: 3,
      type: 1,
      title: 'Torneo de bolas criollas',
      date: '09 diciembre, 2022',
      hour: 'Viernes, 6:00PM - 11:00PM',
      location: 'Cancha de bolas criollas',
      area: 'Zona deportiva',
      description: 'Viernes 09 de diciembre',
      image: 'https://http2.mlstatic.com/D_NQ_NP_655547-MLV25593228224_052017-O.webp'
    },
    {
      id: 4,
      type: 2,
      title: 'Torneo de dominó',
      date: '12 diciembre, 2022',
      hour: 'Lunes, 6:00PM - 11:00PM',
      location: 'Caney de zonas de estar',
      area: 'Zona recreativa',
      description: 'Lunes 12 de diciembre',
      image: 'https://patasdegallo.com/wp-content/uploads/2016/12/capacidad-mental.jpg'
    },
  ]

  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [events, setEvents] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const layout = useWindowDimensions()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (events?.length === 0) startLoading()

      setEvents(data)

      if (events?.length !== 0) stopLoading()

    }, [])
  )

  return (
    <Container>
      <VStack
        py={5}
        px={3}
        height={layout.height}
      >
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
            maxH={layout.height * .80}
            keyExtractor={item => item?.id}
            renderItem={({ item }) => (
              <Stack
                py={2}
              >
                <InfoCard
                  key={item?.id}
                  id={item?.id}
                  type={item?.type}
                  title={item?.title}
                  date={item?.date}
                  hour={item?.hour}
                  description={item?.description}
                  location={item?.location}
                  area={item?.area}
                  image={item?.image}
                  navigation={navigation}
                />
              </Stack>
            )}
          />
        ) : events?.length === 0 ? (
          <NotFound 
            text='Aún no se han publicado eventos en el club.'
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