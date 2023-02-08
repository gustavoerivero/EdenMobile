import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import {
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Stack,
  Text,
  Tooltip,
  VStack,
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'

import styles from './styled-components/styles'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'
import TeamPreviewCard from '../../components/TeamPreviewCard'

import TournamentService from '../../services/tournaments/TournamentsService'

const CreoleBallsTournamentPage = ({ navigation, route }) => {
  const Tournament = new TournamentService()

  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState([])
  const [calendar, setCalendar] = useState(false)
  const [winnerLoading, setWinnerLoading] = useState(true)
  const [winner, setWinner] = useState(null)

  const event = route?.params

  const getData = async () => {
    if (isLoading) {
      Tournament.get(event?.id)
        .then(res => {
          let { data } = res

          setWinner(data?.data?.ganador_torneo || null)

          let calendar = []
          let auxTeams = []

          data?.data?.fase_de_torneo?.forEach(item => {
            calendar = [...calendar, ...item?.calendario]
            auxTeams = [...auxTeams, ...item?.equipo]
          })

          const uniqueTeams = auxTeams.reduce((acc, curr) => {
            if (!acc.find(obj => obj.id === curr.id)) {
              acc.push(curr)
            }
            return acc
          }, [])

          setCalendar(calendar)

          setTeams(uniqueTeams)
          setWinnerLoading(false)
          setIsLoading(false)
        })
        .catch(error => {
          console.log(`Tournament error: ${error}`)
          setWinnerLoading(false)
          setIsLoading(false)
        })
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData()
    }, [teams]),
  )

  return (
    <Container hiddenNavBar={true} statusBarColor={colors.infoCard.bottomColor}>
      <ScrollView minH="100%">
        <VStack minH="100%" justifyContent="space-between">
          <VStack>
            <Stack>
              <ImageBackground
                source={{
                  uri: event.image ? event.image : 'ac',
                }}
                imageStyle={styles.imageBackground}
                resizeMode="cover">
                <LinearGradient
                  colors={[
                    colors.infoCard.bottomColor,
                    colors.infoCard.middleBottomColor,
                    colors.infoCard.middleColor,
                    colors.infoCard.topColor,
                  ]}
                  style={styles.gradient}>
                  <HStack
                    p={5}
                    justifyContent="space-between"
                    alignItems="center">
                    <TouchableOpacity
                      onPress={() => {
                        navigation?.goBack()
                      }}>
                      <HStack space={1}>
                        <Icon
                          name="arrow-back-outline"
                          color="white"
                          size={30}
                        />
                        <Text fontSize="xl" color="white" bold>
                          Atrás
                        </Text>
                      </HStack>
                    </TouchableOpacity>
                  </HStack>
                </LinearGradient>
              </ImageBackground>
            </Stack>

            <VStack pt="1" px={3} justifyContent="space-between">
              <Stack space={3}>
                <HStack maxH="110">
                  <Stack minW="80%" maxW="80%">
                    <Text bold color={colors.text.primary} fontSize="3xl">
                      {cutText(event.title, 30)}
                    </Text>
                  </Stack>

                  <Divider
                    orientation="vertical"
                    bgColor={colors.divider.primary}
                    borderRadius={50}
                  />

                  <VStack
                    minW="20%"
                    maxW="20%"
                    justifyContent="center"
                    alignItems="center">
                    <Text fontSize="sm" bold color={colors.text.primary}>
                      Prox.
                    </Text>
                    <Icon
                      name="md-timer-outline"
                      size={40}
                      color={colors.text.primary}
                    />
                  </VStack>
                </HStack>

                <VStack
                  minW="94%"
                  minH="85"
                  bgColor={styles.winnerInfo.backgroundColor}
                  borderRadius={10}
                  p={2}>
                  <HStack minW="100%" alignItems="center" space={1}>
                    <Icon
                      name="star"
                      size={15}
                      color={styles.winnerInfo.fontColor}
                    />
                    <Text fontSize="md" color={styles.winnerInfo.fontColor}>
                      Ganador
                    </Text>
                  </HStack>
                  <Stack
                    minW="100%"
                    maxW="100%"
                    alignItems="center"
                    bgColor={styles.winnerInfo.backgroundColor}
                  >
                    {winnerLoading ?
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        alignSelf="center">
                        <ActivityIndicator size="large" color={colors.primary} />
                      </Stack>
                      :
                      <Text
                        fontSize="lg"
                        fontColor={colors.gray}
                        fontWeight="thin">
                        {winner ? winner?.nombre : 'No definido'}
                      </Text>
                    }
                  </Stack>
                </VStack>

                <HStack space={3} mx={3} maxW="80%" alignItems="center">
                  <Icon
                    name="calendar-outline"
                    color={colors.icon.primary}
                    size={50}
                  />
                  <VStack>
                    <Text bold fontSize="lg" color={colors.text.primary}>
                      {event.date}
                    </Text>
                    <Text fontSize="sm" color={colors.text.description} italic>
                      {event.hour}
                    </Text>
                  </VStack>
                </HStack>

                <HStack space={3} mx={3} maxW="80%" alignItems="center">
                  <Icon
                    name="location-outline"
                    color={colors.icon.primary}
                    size={50}
                  />
                  <VStack>
                    <Text bold fontSize="lg" color={colors.text.primary}>
                      {event.location}
                    </Text>
                    <Text fontSize="sm" color={colors.text.description} italic>
                      {event.area}
                    </Text>
                  </VStack>
                </HStack>

                <VStack space={2} w="100%" maxW="100%">
                  <Text bold fontSize="xl" color={colors.text.primary}>
                    Descripción
                  </Text>
                  <Text fontSize="sm" color={colors.text.description} italic>
                    {event.description}
                  </Text>
                </VStack>

                <VStack space={2} w="100%" maxW="100%">
                  <Text fontSize="lg" color={colors.text.primary}>
                    Equipos del torneo
                  </Text>

                  {isLoading && teams?.length === 0 ? (
                    <Stack
                      mt={2}
                      alignItems="center"
                      justifyContent="center"
                      alignContent="center"
                      alignSelf="center">
                      <ActivityIndicator size="large" color={colors.primary} />
                    </Stack>
                  ) : !teams || teams?.length === 0 ? (
                    <Stack px={3}>
                      <Text
                        fontSize="sm"
                        color={colors.text.description}
                        italic>
                        Aún no hay equipos registrados en el torneo.
                      </Text>
                    </Stack>
                  ) : (
                    teams?.length > 0 && (
                      <VStack>
                        {teams?.map((item, key) => (
                          <Stack key={key} m={1}>
                            <TeamPreviewCard
                              teamID={item.id}
                              teamName={item.nombre}
                              teamImage={item.logo}
                              teamMembers={item.jugadores}
                              navigation={navigation}
                            />
                          </Stack>
                        ))}
                      </VStack>
                    )
                  )}
                </VStack>
              </Stack>

              <HStack
                maxW="100%"
                w="100%"
                my={3}
                h={12}
                px={10}
                justifyContent="space-between"
                alignItems="center">
                <HStack space={5}>
                  <Tooltip
                    label="Juegos"
                    placement="bottom right"
                    _text={{ color: 'black' }}
                    openDelay={200}>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      disabled={!calendar}
                      onPress={() => {
                        console.log(`Game list button is pressed`)
                        navigation?.navigate('CreoleBallsListPage', {
                          id: event.id,
                          type: event.type,
                          title: event.title,
                          date: event.date,
                          hour: event.hour,
                          location: event.location,
                          area: event.area,
                          description: event.description,
                          image: event.image,
                        })
                      }}>
                      <Box
                        w={12}
                        h={12}
                        borderRadius={50}
                        bgColor={
                          calendar ? colors.icon.primary : colors.gray2
                        }
                        shadow={3}
                        alignItems="center"
                        justifyContent="center"
                        pl={0.5}>
                        <Icon
                          name="list-circle-outline"
                          color={calendar ? colors.white : colors.gray}
                          size={40}
                        />
                      </Box>
                    </TouchableOpacity>
                  </Tooltip>
                </HStack>

                <Button
                  borderRadius={10}
                  bgColor={colors.icon.primary}
                  shadow={3}
                  w="40%"
                  onPress={() => {
                    console.log('Comment button is pressed')
                    navigation?.navigate('Comentarios', { ...event, type: 'T' })
                  }}>
                  Comentar
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Container>
  )
}

export default CreoleBallsTournamentPage
