import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const StartedGamePage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [coinPressed, setCoinPressed] = useState(false)
  const [shoot, setShoot] = useState(false)
  const [coinTeam, setCoinTeam] = useState(false)
  const [passPage, setPassPage] = useState(false)

  const coinThrow = () => {

    const throws = Math.round(Math.random() * 6)
    setShoot(true)
    setCoinPressed(true)
    setPassPage(true)

    let coin = coinTeam

    const coinShoot = setInterval(() => {
      coin = Math.random() < .5
      setCoinTeam(coin)
    }, throws * 100)

    setTimeout(() => {
      clearInterval(coinShoot)
      setCoinPressed(false)
    }, throws * 500)

    setTimeout(() => {
      navigation?.navigate('ColorTeamPage', {
        id: game?.id,
        title: game?.title,
        selectedTeam: coin ? game?.teamA?.nombre : game?.teamB?.nombre,
        initialTeam: coin ? game?.teamA?.nombre : game?.teamB?.nombre,
        teamA: game?.teamA,
        teamB: game?.teamB,
        rosterA: game?.rosterA,
        rosterB: game?.rosterB,
        date: game?.date,
        maxPoints: game?.maxPoints,
        forfeit: game?.forfeit,
        maxTime: game?.maxTime
      })
      setPassPage(false)
    }, 5000)

  }

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW='100%'
        minH='100%'
        maxH='100%'
        justifyContent='space-between'
      >
        <Stack
          minH='91%'
          maxH='91%'
        >
          <HStack
            minH='5%'
            maxH='5%'
            alignItems='center'
            justifyContent='space-between'
            mt={5}
          >
            <HStack
              pl={5}
              minH='100%'
              maxH='100%'
              minW='33%'
            >
              <TouchableOpacity
                onPress={() => navigation?.goBack()}
              >
                <Icon
                  name='arrow-back-outline'
                  color={colors.text.description}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                fontSize='lg'
                bold
                color={colors.text.primary}
                alignContent='center'
              >
                Volver
              </Text>
            </HStack>

            <Stack
              minW='33%'
              minH='100%'
              maxH='100%'
              justifyContent='center'
              alignItems='center'
            >
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.timeColor}
              >
                {`${game?.maxTime}:00` || '00:00'}
              </Text>
            </Stack>

            <Stack
              minW='33%'
              minH='100%'
              maxH='100%'
            >

            </Stack>

          </HStack>
          <HStack
            minH='10%'
            maxH='10%'
            minW='100%'
            divider={
              <Divider
                bgColor={colors.divider.primary}
                borderRadius={50}
              />
            }
            space={2}
          >
            <HStack
              minW='48%'
              alignItems='center'
              justifyContent='center'
              space={10}
            >
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.text}
              >
                {`${game?.teamA?.abreviatura}`}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                0
              </Text>
            </HStack>

            <HStack
              minW='48%'
              alignItems='center'
              justifyContent='center'
              space={10}
            >
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                0
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.text}
              >
                {`${game?.teamB?.abreviatura}`}
              </Text>

            </HStack>
          </HStack>

          <Stack
            alignItems='center'
            mt={10}
            mb={5}
            pb={10}
          >
            <Text
              bold
              fontSize='lg'
              color={colors.creoleStartGame.text}
            >
              ¿Quién comienza el juego?
            </Text>
          </Stack>

          <HStack
            minW='100%'
            justifyContent='space-around'
            py={3}
            pb={10}
          >
            <VStack
              maxW='50%'
              minW='50%'
              justifyContent='center'
              alignItems='center'
            >
              <TouchableOpacity
                onPress={() => {
                  setShoot(true)
                  setCoinTeam(true)
                }}
                disabled={passPage || coinPressed}
              >
                <Box
                  borderRadius={10}
                  bgColor={colors.creoleStartGame.backgroundIconColor}
                  w='100'
                  h='100'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Icon
                    name='people'
                    color={!shoot ?
                      colors.creoleStartGame.scoreColor :
                      coinTeam ?
                        colors.creoleStartGame.teamAColor :
                        colors.creoleStartGame.scoreColor
                    }
                    size={80}
                  />
                </Box>
              </TouchableOpacity>
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.teamSelectedTextColor}
                textAlign='center'
                pt={1}
              >
                {game?.teamA?.nombre}
              </Text>
            </VStack>

            <VStack
              maxW='50%'
              minW='50%'
              justifyContent='center'
              alignItems='center'
            >
              <TouchableOpacity
                onPress={() => {
                  setShoot(true)
                  setCoinTeam(false)
                }}
                disabled={passPage || coinPressed}
              >
                <Box
                  borderRadius={10}
                  bgColor={colors.creoleStartGame.backgroundIconColor}
                  w='100'
                  h='100'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Icon
                    name='people'

                    color={!shoot ?
                      colors.creoleStartGame.scoreColor :
                      !coinTeam ?
                        colors.creoleStartGame.teamBColor :
                        colors.creoleStartGame.scoreColor
                    }
                    size={80}
                  />
                </Box>
              </TouchableOpacity>
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.teamSelectedTextColor}
                textAlign='center'
                pt={1}
              >
                {game?.teamB?.nombre}
              </Text>
            </VStack>

          </HStack>

          <VStack
            alignItems='center'
            space={3}
            py={5}
          >
            <Button
              w={layout.width * .6}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={!coinPressed && shoot ? colors.button.bgPrimary : colors.gray2}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate('ColorTeamPage', {
                  id: game?.id,
                  title: game?.title,
                  selectedTeam: coinTeam ? game?.teamA?.nombre : game?.teamB?.nombre,
                  initialTeam: coinTeam ? game?.teamA?.nombre : game?.teamB?.nombre,
                  teamA: game?.teamA,
                  teamB: game?.teamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
                  date: game?.date,
                  maxPoints: game?.maxPoints,
                  forfeit: game?.forfeit,
                  maxTime: game?.maxTime
                })
              }}
              disabled={coinPressed || !shoot}
            >
              <Text
                bold
                fontSize='md'
                color={!coinPressed && shoot ? colors.white : colors.gray}
              >
                Comenzar con selección
              </Text>
            </Button>

            <Text
              bold
              fontSize='lg'
              color={colors.creoleStartGame.teamSelectedTextColor}
            >
              o
            </Text>
            <Button
              w={layout.width * .6}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={!coinPressed ? colors.button.bgPrimary : colors.gray2}
              onPress={() => coinThrow()}
              disabled={coinPressed}
            >
              <Text
                bold
                fontSize='md'
                color={!coinPressed ? colors.white : colors.gray}
              >
                Lanzar la moneda
              </Text>
            </Button>
          </VStack>
        </Stack>

        <VStack
          space={2}
          px={5}
          minH='9%'
          maxH='9%'
          alignItems='center'
        >
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          {shoot &&
            <Text
              bold
              fontSize='xl'
              color={colors.creoleStartGame.text}
            >
              {coinTeam ? game.teamA?.nombre : game.teamB?.nombre}
            </Text>
          }
        </VStack>

      </VStack>
    </Container >
  )
}

export default StartedGamePage