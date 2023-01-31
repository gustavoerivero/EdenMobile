import React, { useCallback, useState } from 'react'
import { ActivityIndicator, useWindowDimensions, RefreshControl } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { Box, Divider, FlatList, ScrollView, Stack, Text, VStack } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'
import useLoading from '../../hooks/useLoading'


import colors from '../../styled-components/colors'

import NotFound from '../../components/NotFound'

import { getEvents } from '../../services/events/EventsService'

import { formatDate, getHour } from '../../utilities/functions'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../../components/StyledField'
import StyledBadge from '../../components/StyledBadge'

const PostPage = ({ navigation }) => {

  const layout = useWindowDimensions()

  const { showErrorToast } = useCustomToast()

  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [events, setEvents] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [search, setSearch] = useState('')

  const categories = [
    'Todo', 'Bolas criollas', 'Dominó'
  ]

  const [categoriesSelected, setCategoriesSelected] = useState(['Todo'])

  const handleCategories = (text) => {
    getData()
    if (categoriesSelected?.length === 1 && text === 'Todo') {
      console.log('Jaja ola')
    } else if (categoriesSelected?.length === 1 && !categoriesSelected?.includes('Todo') && categoriesSelected?.includes(text)) {
      const aux = categoriesSelected?.filter(item => item !== text)
      setCategoriesSelected([...aux, 'Todo'])
    } else if (categoriesSelected?.includes(text)) {
      setCategoriesSelected(categoriesSelected?.filter(item => item !== text))
    } else {
      setCategoriesSelected([...categoriesSelected, text])
    }
  }

  const getCategory = (text) => {
    return categoriesSelected?.includes(text)
  }

  const data = [
    {
      id: 0,
      nombre: 'Torneo de dominó',
      descripcion: 'Sábado 26 de noviembre',
      tipo: 'D',
      creado: '2023-01-22T03:24:00',
      instalacion: {
        nombre: 'Área de deportes',
      },
      area: {
        nombre: 'Sector D',
      },
      image: 'https://patasdegallo.com/wp-content/uploads/2016/12/capacidad-mental.jpg'
    },
    {
      id: 1,
      nombre: 'Juegos de bolas criollas',
      descripcion: 'del 01 al 07 de diciembre',
      tipo: 'D',
      creado: '2023-02-14T03:24:00',
      instalacion: {
        nombre: 'Área de deportes',
      },
      area: {
        nombre: 'Sector B',
      },
      image: 'https://http2.mlstatic.com/D_NQ_NP_655547-MLV25593228224_052017-O.webp'
    },
    {
      id: 2,
      nombre: 'Torneo de bolas criollas en playa asiática',
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

          const games = data?.data?.data.filter(game => game?.tipo === 'D' || game?.tipo === 'B')

          setEvents(status === 200 ? games : [])

          setIsNextPage(data?.links?.next ? true : false)
          console.log(`Events: ${games}`)
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
        h='100%'
      >
        <VStack
          pb={1}
          space={1}
        >
          <StyledField
            baseW='100%'
            borderRadius={50}
            placeholder='Buscar...'
            bgColor={colors.white}
            h={10}
            value={search}
            onChangeText={(text) => setSearch(text)}
            InputRightElement={
              <Box
                pr={3}
              >
                <Icon
                  name='search'
                  color={colors.text.description}
                  size={20}
                />
              </Box>
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories?.map((item, key) => (
              <Stack
                key={key}
                m={1}
              >
                <StyledBadge
                  bold
                  text={item}
                  value={getCategory(item)}
                  w={100}
                  onChangeValue={() => handleCategories(item)}
                />
              </Stack>
            ))}
          </ScrollView>
        </VStack>
        <Divider />
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
            maxH='85%'
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

export default PostPage