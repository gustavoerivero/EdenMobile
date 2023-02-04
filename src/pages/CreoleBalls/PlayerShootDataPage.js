import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const PlayerShootDataPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [shoot, setShoot] = useState(0)

  const [numberShoot, setNumberShoot] = useState(1)

  const [firstShoot, setFirstShoot] = useState(null)
  const [secondShoot, setSecondShoot] = useState(null)

  const player = game?.selectedTeam === game?.teamA?.nombre ?
  game?.rosterA.find(member => member?.persona?.id === game?.selectedPlayer) :
  game?.rosterB.find(member => member?.persona?.id === game?.selectedPlayer)

  const name = `${player?.persona?.nombres} ${player?.persona?.apellidos}`

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
              minW={layout.width * .48}
              alignItems='center'
              justifyContent='center'
              space={10}
            >
              <Text
                bold
                fontSize='4xl'
                color={game?.colorTeamA}
              >
                {game?.teamA?.abreviatura}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                {game?.scoreTeamA}
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
                {game?.scoreTeamB}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={game?.colorTeamB}
              >
                {game?.teamB?.abreviatura}
              </Text>

            </HStack>
          </HStack>

          <HStack
            alignItems='center'
            mt={2}
            mb={2}
            space={2}
            minW='100%'
            justifyContent='center'
          >
            <Stack
              justifyContent='center'
              alignItems='center'
            >
              <Text
                fontSize='2xl'
                color={colors.creoleStartGame.scoreColor}
                textAlign='center'
                pt={1}
              >
                {cutText(name, 33)}
              </Text>
            </Stack>
          </HStack>

          <Stack
            minH={5}
            bgColor={game?.initialTeam === game?.selectedTeam ? game?.colorTeamA : game?.colorTeamB}
            mb={2}
          >
          </Stack>

          <Stack
            justifyContent='center'
            alignItems='center'
            pt={4}
            pb={6}
          >
            <Text
              bold
              fontSize='md'
              textAlign='center'
              color={colors.creoleStartGame.scoreColor}
            >
              Jugada realizada
            </Text>
          </Stack>

          <VStack
            space={3}
            mb={3}
          >
            <HStack
              minW='100%'
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('A')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('A')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'A' && secondShoot !== 'A' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='lg'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    A
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('B')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('B')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'B' && secondShoot !== 'B' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='lg'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    B
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('M')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('M')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'M' && secondShoot !== 'M' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='lg'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    M
                  </Text>
                </Box>
              </TouchableOpacity>
            </HStack>

            <HStack
              minW='100%'
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('a')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('a')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'a' && secondShoot !== 'a' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='lg'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    a
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('b')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('b')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'b' && secondShoot !== 'b' ?
                    colors.gray3 : colors.creoleStartGame.selectedShoot
                  }
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='lg'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    b
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('m')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('m')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'm' && secondShoot !== 'm' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='lg'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    m
                  </Text>
                </Box>
              </TouchableOpacity>
            </HStack>

            <HStack
              minW='100%'
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('N')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('N')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'N' && secondShoot !== 'N' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={215}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='md'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    Bola nula
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (numberShoot === 1) {
                    setFirstShoot('F')
                  }

                  if (numberShoot === 2) {
                    setSecondShoot('F')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'F' && secondShoot !== 'F' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={100}
                  h={50}
                  justifyContent='center'
                  alignItems='center'
                  px={3}
                >
                  <Text
                    bold
                    fontSize='sm'
                    color={colors.creoleStartGame.scoreColor}
                    textAlign='center'
                  >
                    Mingo fuera
                  </Text>
                </Box>
              </TouchableOpacity>
            </HStack>
          </VStack>

          <HStack
            justifyContent='space-between'
            mx={10}
            my={2}
            h={85}
          >
            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
            >
              <Text
                bold
                fontSize='sm'
                textAlign='center'
                color={colors.creoleStartGame.scoreColor}
              >
                Lanzamiento 1
              </Text>
              <Box
                justifyContent='center'
                alignItems='center'
                w={100}
                h={50}
                borderRadius={10}
                borderColor={colors.creoleStartGame.teamSelectedTextColor}
                borderWidth={numberShoot === 1 ? 2 : 1}
                bgColor={numberShoot === 1 ? colors.creoleStartGame.smoothColor : colors.white}
              >
                <Text
                  bold
                  fontSize={firstShoot === 'N' || firstShoot === 'F' ? 'sm' : 'xl'}
                  color={colors.creoleStartGame.scoreColor}
                >
                  {firstShoot === 'N' ? 'Bola nula' : firstShoot === 'F' ? 'Mingo fuera' : firstShoot}
                </Text>
              </Box>
            </VStack>

            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
            >
              <Text
                bold
                fontSize='sm'
                textAlign='center'
                color={colors.creoleStartGame.scoreColor}
              >
                Lanzamiento 2
              </Text>
              <Box
                justifyContent='center'
                alignItems='center'
                w={100}
                h={50}
                borderRadius={10}
                borderColor={colors.creoleStartGame.teamSelectedTextColor}
                borderWidth={numberShoot === 2 ? 2 : 1}
                bgColor={numberShoot === 2 ? colors.creoleStartGame.smoothColor : colors.white}
              >
                <Text
                  bold
                  fontSize={secondShoot === 'N' || secondShoot === 'F' ? 'sm' : 'xl'}
                  color={colors.creoleStartGame.scoreColor}
                >
                  {secondShoot === 'N' ? 'Bola nula' : secondShoot === 'F' ? 'Mingo fuera' : secondShoot}
                </Text>
              </Box>
            </VStack>
          </HStack>

          <HStack
            w='100%'
            justifyContent='center'
            alignItems='center'
            mt={4}
            space={2}
          >
            <Button
              w={layout.width * .45}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              disabled={numberShoot === 1}
              bgColor={numberShoot === 1 ? colors.gray2 : colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                setNumberShoot(1)
              }}
            >
              <Text
                bold
                fontSize='sm'
                textAlign='center'
                color={numberShoot === 1 ? colors.gray : colors.white}
              >
                Previo lanzamiento
              </Text>
            </Button>
            <Button
              w={layout.width * .45}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              disabled={numberShoot === 2 || !firstShoot}
              bgColor={numberShoot === 2 || !firstShoot ? colors.gray2 : colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                setNumberShoot(2)
              }}
            >
              <Text
                bold
                fontSize='sm'
                textAlign='center'
                color={numberShoot === 2 || !firstShoot ? colors.gray : colors.white}
              >
                Siguiente lanzamiento
              </Text>
            </Button>

          </HStack>

        </Stack>

        <VStack
          space={2}
          px={5}
          alignItems='center'
          minH='9%'
          maxH='9%'
        >
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          <HStack
            justifyContent='space-between'
            minW='100%'
            space={2}
          >
            <Button
              w={layout.width * .45}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.gray3}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate(game?.selectedTeam === game?.teamA?.nombre ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  id: game?.id,
                  title: game?.title,
                  selectedTeam: game?.selectedTeam === game?.teamA?.nombre ? game?.teamA?.nombre : game?.teamB?.nombre,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  scoreTeamA: game?.scoreTeamA,
                  scoreTeamB: game?.scoreTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
                  date: game?.date,
                  maxPoints: game?.maxPoints,
                  forfeit: game?.forfeit,
                  maxTime: game?.maxTime
                })
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.gray}
              >
                Cambio de jugador
              </Text>
            </Button>
            <Button
              w={layout.width * .45}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate(game?.teamA?.nombre !== game?.selectedTeam ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  id: game?.id,
                  title: game?.title,
                  selectedTeam: game?.selectedTeam !== game?.teamA?.nombre ? game?.teamA?.nombre : game?.teamB?.nombre,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  scoreTeamA: game?.scoreTeamA,
                  scoreTeamB: game?.scoreTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
                  date: game?.date,
                  maxPoints: game?.maxPoints,
                  forfeit: game?.forfeit,
                  maxTime: game?.maxTime,
                })
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Cambio de equipo
              </Text>
            </Button>
          </HStack>
        </VStack>

      </VStack>
    </Container >
  )
}

export default PlayerShootDataPage