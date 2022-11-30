import React from 'react'
import { ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button, Divider, HStack, Stack, Text, Tooltip, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'

import styles from './styled-components/styles'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const CreoleBallsTournamentPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const event = route?.params

  return (
    <Container
      hiddenNavBar={true}
      statusBarColor={colors.infoCard.bottomColor}
    >
      <VStack
        minH={layout.height}
        maxW={layout.width}
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

                  <TouchableOpacity
                    onPress={() => {
                      console.log(`Favorite button is pressed`)
                    }}
                  >
                    <LinearGradient
                      colors={styles.bookmarkGradient}
                      style={styles.bookmarkContainer}
                    >
                      <Stack
                        m={1}
                        h={8}
                        w={8}
                        justifyContent='center'
                        alignItems='center'
                      >
                        <Icon
                          name='bookmark'
                          color='white'
                          size={20}
                        />
                      </Stack>
                    </LinearGradient>
                  </TouchableOpacity>
                </HStack>
              </LinearGradient>
            </ImageBackground>
          </Stack>

          <VStack
            pt='55%'
            px={3}
            h={layout.height * .9}
            justifyContent='space-between'
          >
            <Stack space={3}>
              <HStack maxH='110'>
                <Stack
                  minW={layout.width * .75}
                  maxW={layout.width * .75}
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
                  minW={layout.width * .19}
                  maxW={layout.width * .19}
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
                minW={layout.width * .94}
                minH={layout.height * .1}
                bgColor={styles.winnerInfo.backgroundColor}
                borderRadius={10}
                p={2}
              >
                <HStack
                  minW={layout.width}
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
                  minW={layout.width * .9}
                  maxW={layout.width * .9}
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
                maxW={layout.width * .8}
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
                maxW={layout.width * .8}
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
                w={layout.width * .93}
                maxW={layout.width * .93}
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
            </Stack>


            <HStack
              maxW={layout.width}
              w={layout.width}
              h={12}
              px={10}
              justifyContent='space-between'
              alignItems='center'
            >
              <HStack
                space={5}
              >
                <Tooltip
                  label='Compártelo'
                  placement='bottom right'
                  _text={{ color: 'black' }}
                  openDelay={200}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log(`Share button is pressed`)
                    }}
                  >
                    <Icon
                      name='share-social-outline'
                      color={colors.icon.primary}
                      size={40}
                    />
                  </TouchableOpacity>
                </Tooltip>

                <Tooltip
                  label='Juegos'
                  placement='bottom right'
                  _text={{ color: 'black' }}
                  openDelay={200}
                >
                  <TouchableOpacity
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
                    }}
                  >
                    <Icon
                      name='list-circle-outline'
                      color={colors.icon.primary}
                      size={40}
                    />
                  </TouchableOpacity>
                </Tooltip>

              </HStack>

              <Button
                borderRadius={10}
                backgroundColor={colors.icon.primary}
                shadow={3}
                w='40%'
                onPress={() => console.log('Comment button is pressed')}
              >
                Comentar
              </Button>
            </HStack>

          </VStack>



        </VStack>

      </VStack>

    </Container>
  )
}

export default CreoleBallsTournamentPage