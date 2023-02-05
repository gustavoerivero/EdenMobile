import React from 'react'
import { ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Box, Button, Divider, HStack, ScrollView, Stack, Text, Tooltip, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'

import styles from './styled-components/styles'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'
import TeamPreviewCard from '../../components/TeamPreviewCard'

const DominoTournamentPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const event = route?.params

  return (
    <Container
      hiddenNavBar={true}
      statusBarColor={colors.infoCard.bottomColor}
    >
      <ScrollView
        minH='100%'
      >
        <VStack
          minH='100%'
          justifyContent='space-between'
        >
          <VStack>
            <Stack>
              <ImageBackground
                source={{
                  uri: event.image ? event.image : 'ac'
                }}
                imageStyle={styles.imageBackground}
                resizeMode='cover'
              >
                <LinearGradient
                  colors={[colors.infoCard.bottomColor, colors.infoCard.middleBottomColor, colors.infoCard.middleColor, colors.infoCard.topColor]}
                  style={styles.gradient}
                >
                  <HStack
                    p={5}
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation?.goBack()
                      }}
                    >
                      <HStack
                        space={1}
                      >
                        <Icon
                          name='arrow-back-outline'
                          color='white'
                          size={30}
                        />
                        <Text
                          fontSize='xl'
                          color='white'
                          bold
                        >
                          Atrás
                        </Text>
                      </HStack>
                    </TouchableOpacity>
                    
                  </HStack>
                </LinearGradient>
              </ImageBackground>
            </Stack>

            <VStack
              pt='1'
              px={3}
              justifyContent='space-between'
            >
              <Stack space={3}>
                <HStack maxH='110'>
                  <Stack
                    minW='80%'
                    maxW='80%'
                  >
                    <Text
                      bold
                      color={colors.text.primary}
                      fontSize='3xl'
                    >
                      {cutText(event.title, 30)}
                    </Text>
                  </Stack>

                  <Divider
                    orientation='vertical'
                    bgColor={colors.divider.primary}
                    borderRadius={50}
                  />

                  <VStack
                    minW='20%'
                    maxW='20%'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Text
                      fontSize='sm'
                      bold
                      color={colors.text.primary}
                    >
                      Prox.
                    </Text>
                    <Icon
                      name='md-timer-outline'
                      size={40}
                      color={colors.text.primary}
                    />
                  </VStack>

                </HStack>

                <VStack
                  minW='94%'
                  minH='85'
                  bgColor={styles.winnerInfo.backgroundColor}
                  borderRadius={10}
                  p={2}
                >
                  <HStack
                    minW='100%'
                    alignItems='center'
                    space={1}
                  >
                    <Icon
                      name='star'
                      size={15}
                      color={styles.winnerInfo.fontColor}
                    />
                    <Text
                      fontSize='md'
                      color={styles.winnerInfo.fontColor}
                    >
                      Ganador
                    </Text>
                  </HStack>
                  <Stack
                    minW='100%'
                    maxW='100%'
                    alignItems='center'
                    bgColor={styles.winnerInfo.backgroundColor}
                  >
                    <Text
                      fontSize='lg'
                      fontColor={colors.gray}
                      fontWeight='thin'
                    >
                      No definido
                    </Text>
                  </Stack>

                </VStack>

                <HStack
                  space={3}
                  mx={3}
                  maxW='80%'
                  alignItems='center'
                >
                  <Icon
                    name='calendar-outline'
                    color={colors.icon.primary}
                    size={50}
                  />
                  <VStack>
                    <Text
                      bold
                      fontSize='lg'
                      color={colors.text.primary}
                    >
                      {event.date}
                    </Text>
                    <Text
                      fontSize='sm'
                      color={colors.text.description}
                      italic
                    >
                      {event.hour}
                    </Text>
                  </VStack>
                </HStack>

                <HStack
                  space={3}
                  mx={3}
                  maxW='80%'
                  alignItems='center'
                >
                  <Icon
                    name='location-outline'
                    color={colors.icon.primary}
                    size={50}
                  />
                  <VStack>
                    <Text
                      bold
                      fontSize='lg'
                      color={colors.text.primary}
                    >
                      {event.location}
                    </Text>
                    <Text
                      fontSize='sm'
                      color={colors.text.description}
                      italic
                    >
                      {event.area}
                    </Text>
                  </VStack>
                </HStack>

                <VStack
                  space={2}
                  w='100%'
                  maxW='100%'
                >
                  <Text
                    bold
                    fontSize='xl'
                    color={colors.text.primary}
                  >
                    Descripción
                  </Text>
                  <Text
                    fontSize='sm'
                    color={colors.text.description}
                    italic
                  >
                    {event.description}
                  </Text>
                </VStack>

                <VStack
                  space={2}
                  w='100%'
                  maxW='100%'
                >
                  <Text
                    fontSize='lg'
                    color={colors.text.primary}
                  >
                    Equipos del torneo
                  </Text>
                  {!event?.tournament ?
                    <Text
                      fontSize='sm'
                      color={colors.text.description}
                      italic
                    >
                      Aún no hay equipos registrados en el torneo.
                    </Text>
                    :
                    <VStack>
                      {event?.tournament?.map((item, key) => (
                        <Stack
                          key={key}
                          m={1}
                        >
                          <TeamPreviewCard
                            teamID={item.id}
                            teamName={item.name}
                            teamImage={item.image}
                            teamMembers={item.members}
                            navigation={navigation}
                          />
                        </Stack>
                      ))}
                    </VStack>
                  }
                </VStack>
              </Stack>


              <HStack
                maxW='100%'
                w='100%'
                my={3}
                h={12}
                px={10}
                justifyContent='space-between'
                alignItems='center'
              >
                <HStack
                  space={5}
                >
                  <Tooltip
                    label='Juegos'
                    placement='bottom right'
                    _text={{ color: 'black' }}
                    openDelay={200}
                  >
                    <TouchableOpacity
                      activeOpacity={.75}
                      disabled={false /*!event.tournament*/}
                      onPress={() => {
                        console.log(`Game list button is pressed`)
                        navigation?.navigate('DominoListPage', {
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
                      }}
                    >
                      <Box
                        w={12}
                        h={12}
                        borderRadius={50}
                        bgColor={event?.tournament ? colors.icon.primary : colors.gray2}
                        shadow={3}
                        alignItems='center'
                        justifyContent='center'
                        pl={.5}
                      >
                        <Icon
                          name='list-circle-outline'
                          color={event?.tournament ? colors.white : colors.gray}
                          size={40}
                        />
                      </Box>
                    </TouchableOpacity>
                  </Tooltip>

                </HStack>

                <Button
                  borderRadius={10}
                  backgroundColor={colors.icon.primary}
                  shadow={3}
                  w='40%'
                  onPress={() => {
                    console.log('Comment button is pressed')
                    navigation?.navigate('Comentarios', event)
                  }}
                >
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

export default DominoTournamentPage