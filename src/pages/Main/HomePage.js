import React, { useCallback, useState } from 'react'
import { ActivityIndicator, useWindowDimensions, RefreshControl, TouchableOpacity } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { Box, Divider, FlatList, ScrollView, Stack, Text, VStack } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'
import useLoading from '../../hooks/useLoading'

import colors from '../../styled-components/colors'

import NotFound from '../../components/NotFound'

import { getEvents } from '../../services/events/EventsService'

import { formatDate, getHour, getDate } from '../../utilities/functions'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../../components/StyledField'
import StyledBadge from '../../components/StyledBadge'

const HomePage = ({ navigation }) => {

  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [search, setSearch] = useState('')

  const [categoriesSelected, setCategoriesSelected] = useState(['Todo'])

  const layout = useWindowDimensions()

  const { showErrorToast } = useCustomToast()

  const categories = [
    'Todo', 'Torneos', 'Eventos', 'Actividades'
  ]

  const handleCategories = (text) => {
    let updatedCategoriesSelected = [...categoriesSelected];
    if (text === 'Todo') {
      updatedCategoriesSelected = ['Todo']
    } else if (categoriesSelected.includes(text)) {
      updatedCategoriesSelected = categoriesSelected.filter(item => item !== text)
    } else {
      if (categoriesSelected.includes('Todo')) {
        updatedCategoriesSelected = [text]
      } else {
        updatedCategoriesSelected = [...categoriesSelected, text]
      }
    }
    if (updatedCategoriesSelected.length === 0) {
      updatedCategoriesSelected = ['Todo']
    }    
    if (updatedCategoriesSelected?.length === categories?.length - 1 && !categoriesSelected?.includes('Todo')) {
      updatedCategoriesSelected = ['Todo']
    }
    setCategoriesSelected(updatedCategoriesSelected)
    getData()
  }

  const getCategory = (text) => {
    return categoriesSelected?.includes(text)
  }

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
      tipo: 'A',
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
      tipo: 'B',
      creado: '2023-05-22T16:34:00',
      torneo: [
        {
          id: 0,
          name: 'Buitres Fan Club (BFC)',
          image: 'https://dw0i2gv3d32l1.cloudfront.net/uploads/stage/stage_image/82123/optimized_large_thumb_stage.jpg',
          members: [
            {
              id: 0,
              name: 'William Pérez'
            },
            {
              id: 1,
              name: 'Sasha Fitness'
            },
            {
              id: 8,
              name: 'Cristiano Ronaldo'
            },
            {
              id: 9,
              name: 'Robert Pérez'
            },
            {
              id: 10,
              name: 'Simón Bolívar'
            },
            {
              id: 11,
              name: 'Barack Obama'
            },
            {
              id: 12,
              name: 'Michael Jackson'
            },
            {
              id: 13,
              name: 'Cho Mi Yeon'
            }
          ]
        },
        {
          id: 1,
          name: 'Oscarsitos',
          image: 'https://i.pinimg.com/originals/0a/3d/9a/0a3d9a6635d2fd94371fb2fa27847d3b.png',
          members: [
            {
              id: 2,
              name: 'Oscar de León'
            },
            {
              id: 3,
              name: 'Oscarsito'
            },
            {
              id: 4,
              name: 'Oscar Pérez'
            }
          ]
        },
        {
          id: 2,
          name: 'Los masquediches',
          image: null,
          members: [
            {
              id: 5,
              name: 'Chino'
            },
            {
              id: 6,
              name: 'Nacho'
            },
          ]
        },
        {
          id: 3,
          name: 'Los pistoleros',
          image: 'https://blog.logomyway.com/wp-content/uploads/2021/12/oakland-raiders-logo.png',
          members: [
            {
              id: 7,
              name: 'Solo Solín'
            }
          ]
        }
      ],
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

          setEvents(status === 200 ? data?.data : [])

          console.log(`This is the status: ${status}`)
          console.log(data?.data)

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
          date={dayWeek && day && month && year ? `${dayWeek}, ${day} de ${month} de ${year}` : ''}
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
        h='100%'
      >
        <VStack
          pb={1}
          space={1}
          alignItems='center'
          justifyContent='center'
        >
          <Stack
            mx={3}
            alignItems='center'
            justifyContent='center'
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
          </Stack>
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
          <Stack
            px={3}
          >
            <NotFound
              text='Aún no se han publicado eventos en el club.'
            />
          </Stack>

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
            px={3}
            pb={5}
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

export default HomePage