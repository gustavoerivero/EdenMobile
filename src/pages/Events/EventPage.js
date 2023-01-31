import React from 'react'
import { ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button, HStack, Stack, Text, Tooltip, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'

import styles from './styled-components/styles'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const EventPage = ({ navigation, route }) => {

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
              <Stack maxH='110' >
                <Text
                  bold
                  color={colors.text.primary}
                  fontSize={event.title.length > 30 ? '3xl' : '4xl'}
                >
                  {cutText(event.title, 50)}
                </Text>
              </Stack>

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
              justifyContent='flex-end'
              alignItems='center'
            >
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

    </Container>
  )
}

export default EventPage