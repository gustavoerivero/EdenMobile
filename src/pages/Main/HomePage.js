import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { Box, Divider, FlatList, ScrollView, Stack, VStack } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'

import colors from '../../styled-components/colors'

import NotFound from '../../components/NotFound'

import { getHour, getDate } from '../../utilities/functions'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../../components/StyledField'
import StyledBadge from '../../components/StyledBadge'

import EventService from '../../services/events/EventsService'
import TournamentService from '../../services/tournaments/TournamentsService'

const HomePage = ({ navigation }) => {

  const Event = new EventService()
  const Tournament = new TournamentService()

  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [search, setSearch] = useState('')

  const [categoriesSelected, setCategoriesSelected] = useState([{ id: -1, name: 'Todo' }])

  const { showErrorToast } = useCustomToast()

  const categories = [
    { id: -1, name: 'Todo' },
    { id: -2, name: 'Torneos' },
    { id: -3, name: 'Eventos' },
    { id: -4, name: 'Actividades' }
  ]

  const [badges, setBadges] = useState(categories)

  const handleCategories = (item) => {
    setCategoriesSelected([item])
    setEvents([])
    setCurrentPage(1)
    setIsNextPage(true)
  }

  const getCategory = (value) => {
    return categoriesSelected?.find(item => item?.name === value?.name)
  }

  const onRefresh = useCallback(() => {
    setEvents([])
    setCurrentPage(1)
    setIsNextPage(true)
  }, [])

  const getData = async () => {

    try {

      if (isNextPage) {
        setIsLoading(true)

        let { data } = categoriesSelected?.find(item => item?.name === 'Todo') ?
          await Event.getFeed(currentPage, search) :
          categoriesSelected?.find(item => item?.name === 'Torneos') ?
            await Tournament.getAll(currentPage, search) :
            categoriesSelected?.find(item => item?.name === 'Eventos') ?
              await Event.getAllEvents(currentPage, search) :
              categoriesSelected?.find(item => item?.name === 'Actividades') ?
                await Event.getAllActivities(currentPage, search) :
                await Event.getAllByType(categoriesSelected[0]?.id, currentPage, search)

        const auxEvents = categoriesSelected?.find(item => item?.name === 'Torneos') ?
          data?.data?.data : data?.data

        let aux = []

        for (const key in auxEvents) {
          let obj = auxEvents[key]

          if (!events.find(item => item.name === obj.name)) {
            aux.push(obj)
          }
        }

        const nextPage = Number(data?.next_page_url?.slice(-1)) || 1

        setIsNextPage(nextPage > currentPage)

        setEvents(prevEvents => [...prevEvents, ...aux])

        setIsLoading(false)

      }
    } catch (error) {
      console.log(`Event error: ${error}`)
      showErrorToast('No se pudo obtener los torneos, eventos y actividades.')
      setIsLoading(false)
    }
  }

  const getTypeEvents = async () => {
    try {
      const { data } = await Event.getTypeEvents()
      let auxData = []
      data?.forEach(element => {
        auxData.push({ id: element?.id, name: element?.nombre })
      })
      setBadges([...categories, ...auxData])
    } catch (error) {
      console.log(`Get type events error: ${error}`)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTypeEvents()
      getData()
    }, [currentPage, search, categoriesSelected])
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
          subtype={item?.tipo?.nombre || null}
          title={item?.nombre || ''}
          date={dayWeek && day && month && year ? `${dayWeek}, ${day} de ${month} de ${year}` : ''}
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
    if (!isLoading && isNextPage) {
      setCurrentPage(currentPage + 1)
    }
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
              onChangeText={(text) => {
                setSearch(text)
                setEvents([])
                setIsNextPage(true)
                setCurrentPage(1)
              }}
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
            {badges?.map((item, key) => (
              <Stack
                key={key}
                m={1}
              >
                <StyledBadge
                  bold
                  text={item?.name}
                  value={getCategory(item)}
                  w={100}
                  onChangeValue={() => handleCategories(item)}
                />
              </Stack>
            ))}

          </ScrollView>
        </VStack>
        <Divider />
        {isLoading && events?.length === 0 ? (
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
            px={3}
            pb={7}
            maxH='83%'
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

export default HomePage