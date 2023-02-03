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

import EventService from '../../services/events/EventsService'
import FacilitiesService from '../../services/facilities/FacilitiesService'
import AreasService from '../../services/areas/AreasService'

const HomePage = ({ navigation }) => {

  const Event = new EventService()

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

  const onRefresh = useCallback(() => {
    setEvents([])
    setIsNextPage(true)
    setCurrentPage(1)
    getData()
  }, [])

  const getData = async () => {

    console.log(`Feed page: ${currentPage}`)

    try {

      if (isNextPage) {
        startLoading()

        const { data } = await Event.getFeed(currentPage)

        const auxEvents = data?.data

        let aux = []

        for (const key in auxEvents) {

          let obj = auxEvents[key]

          if (obj?.instalacion_id) {

            const Facilities = new FacilitiesService()

            const { data } = await Facilities.getFacilitiesByID(obj?.instalacion_id)

            obj = { 
              ...obj, 
              instalacion: { 
                ...data?.data 
              }, 
              area: { 
                ...data?.data?.area 
              } 
            }

          }

          if (obj?.instalacion?.area_id) {

            const Areas = new AreasService()

            const { data } = await Areas.getAreaByID(obj?.instalacion?.area_id)

            obj = { 
              ...obj,
              area: { 
                ...data?.data 
              } 
            }

          }

          aux.push(obj)
        }

        const nextPage = Number(data?.next_page_url?.slice(-1)) || 1

        console.log(`Feed: ${aux}`)
        console.log(`Next page: ${nextPage > currentPage ? 'Yes' : 'No'}`)

        setIsNextPage(nextPage > currentPage ? true : false)
        setEvents([...aux])

      }
    } catch (error) {
      showErrorToast('No se pudo obtener los eventos y actividades.')
      console.log(`Event error: ${error}`)
    } finally {
      stopLoading()
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [currentPage])
  )

  const renderItem = ({ item }) => {

    const { dayWeek, day, month, year } = item?.fecha_inicio ? getDate(item?.fecha_inicio) : getDate(item?.creado)

    const type = item?.disciplina ? item?.disciplina : item?.es_actividad === '0' ? 'E' : 'A'

    return (
      <Stack
        py={2}
      >
        <InfoCard
          id={item?.id}
          type={type || 'A'}
          title={item?.nombre || ""}
          date={dayWeek && day && month && year ? `${dayWeek}, ${day} de ${month} de ${year}` : ''}
          hour={item?.fecha_inicio ? getHour(item?.fecha_inicio) : getHour(item?.creado)}
          description={item?.descripcion || ""}
          location={item?.instalacion?.nombre || ""}
          area={item?.area?.nombre || ""}
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
            pb={7}
            maxH='83%'
            keyExtractor={item => `${item?.id}${item?.creado}${new Date()}`}
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