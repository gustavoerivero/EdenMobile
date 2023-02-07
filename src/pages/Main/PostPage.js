import React, { useCallback, useState } from 'react'
import { ActivityIndicator, useWindowDimensions, RefreshControl } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { Box, Divider, FlatList, ScrollView, Stack, VStack } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import InfoCard from '../../components/HomeComponents/InfoCard'


import colors from '../../styled-components/colors'

import NotFound from '../../components/NotFound'

import { getEvents } from '../../services/events/EventsService'

import { formatDate, getHour, getDate } from '../../utilities/functions'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../../components/StyledField'
import StyledBadge from '../../components/StyledBadge'

import TournamentService from '../../services/tournaments/TournamentsService'

const PostPage = ({ navigation }) => {

  const Tournament = new TournamentService()

  const { showErrorToast } = useCustomToast()

  const wait = (timeOut) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const [isLoading, setIsLoading] = useState(true)

  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [search, setSearch] = useState('')

  const categories = [
    'Todo', 'Bolas criollas', 'Dominó', 'Otro'
  ]

  const [categoriesSelected, setCategoriesSelected] = useState(['Todo'])

  const handleCategories = (text) => {
    setCategoriesSelected([text])
    setEvents([])
    setCurrentPage(1)
    setIsNextPage(true)
    getData()
  }

  const getCategory = (text) => {
    return categoriesSelected?.includes(text)
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

        let { data } = categoriesSelected.includes('Todo') ?
          await Tournament.getAll(currentPage, search) :
          categoriesSelected.includes('Bolas criollas') ?
            await Tournament.getByTournamentType('B', currentPage, search) :
            categoriesSelected.includes('Dominó') ?
              await Tournament.getByTournamentType('D', currentPage, search) :
              await Tournament.getByTournamentType('O', currentPage, search)

        const aux = categoriesSelected.includes('Todo') ? data?.data?.data : data?.data || []
        const auxEvents = []

        aux?.forEach(element => {
          if (!events?.find(item => item?.name === element?.name)) {
            auxEvents.push(element)
          }
        })

        const nextPage = Number(data?.next_page_url?.slice(-1)) || 1

        setIsNextPage(nextPage > currentPage)

        setEvents(prevEvents => [...prevEvents, ...auxEvents])

        setIsLoading(false)

      }
    } catch (error) {
      console.log(`Event error: ${error}`)
      setIsLoading(false)
      showErrorToast('No se pudo obtener los torneos.')
    }

  }

  useFocusEffect(
    useCallback(() => {
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

export default PostPage