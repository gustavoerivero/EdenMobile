import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const PlayerShootDataPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const selectedRoster = game?.selectedTeam === game?.teamA ? game?.rosterA.find(member => member.id === game?.selectedPlayer) : game?.rosterB.find(member => member.id === game?.selectedPlayer)

  const [player, setPlayer] = useState(selectedRoster)

  const [shoot, setShoot] = useState(0)
  const [firstShoot, setFirstShoot] = useState(null)
  const [secondShoot, setSecondShoot] = useState(null)

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW={layout.width}
        minH={layout.height * .9}
        maxH={layout.height}
        my={5}
        justifyContent='space-between'
      >
        <Stack>
          <HStack
            minH={layout.height * .05}
            maxH={layout.height * .05}
            alignItems='center'
            justifyContent='space-between'
          >
            <HStack
              pt={1}
              pl={5}
              minH={layout.height * .05}
              maxH={layout.height * .05}
              minW={layout.width * .333}
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
              minW={layout.width * .333}
              minH={layout.height * .05}
              maxH={layout.height * .05}
              justifyContent='center'
              alignItems='center'
            >
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.timeColor}
              >
                30:00
              </Text>
            </Stack>

            <Stack
              minW={layout.width * .333}
              minH={layout.height * .05}
              maxH={layout.height * .05}
            >

            </Stack>

          </HStack>
          <HStack
            minH={layout.height * .1}
            maxH={layout.height * .1}
            minW={layout.width}
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
                color={game?.selectedTeam === game?.teamA ? game?.colorTeamA : game?.colorTeamB}
              >
                {`${game?.teamA.slice(0, 3).toUpperCase()}`}
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
              minW={layout.width * .45}
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
                color={game?.selectedTeam !== game?.teamA ? game?.colorTeamA : game?.colorTeamB}
              >
                {`${game?.teamB.slice(0, 3).toUpperCase()}`}
              </Text>

            </HStack>
          </HStack>

          <HStack
            alignItems='center'
            mt={2}
            mb={2}
            space={2}
            minW={layout.width}
            justifyContent='center'
          >
            <Stack
              minW={layout.width}
              maxW={layout.width}
              justifyContent='center'
              alignItems='center'
            >
              <Text
                fontSize='2xl'
                color={colors.creoleStartGame.scoreColor}
                textAlign='left'
                pt={1}
              >
                {game?.selectedTeam === game?.teamA ?
                  game?.rosterA.find(member => member.id === game?.selectedPlayer).name :
                  game?.rosterB.find(member => member.id === game?.selectedPlayer).name
                }
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
              minW={layout.width}
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (!firstShoot) {
                    setFirstShoot('A')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('A')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'A' && secondShoot !== 'A' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
                  if (!firstShoot) {
                    setFirstShoot('B')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('B')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'B' && secondShoot !== 'B' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
                  if (!firstShoot) {
                    setFirstShoot('M')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('M')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'M' && secondShoot !== 'M' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
              minW={layout.width}
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (!firstShoot) {
                    setFirstShoot('a')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('a')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'a' && secondShoot !== 'a' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
                  if (!firstShoot) {
                    setFirstShoot('b')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('b')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'b' && secondShoot !== 'b' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
                  if (!firstShoot) {
                    setFirstShoot('m')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('m')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'm' && secondShoot !== 'm' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
              minW={layout.width}
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (!firstShoot) {
                    setFirstShoot('N')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('N')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'N' && secondShoot !== 'N' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .53}
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
                  if (!firstShoot) {
                    setFirstShoot('F')
                  }
                  if (firstShoot && !secondShoot) {
                    setSecondShoot('F')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'F' && secondShoot !== 'F' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
                  borderRadius={10}
                  shadow={7}
                  w={layout.width * .25}
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
                w={layout.width * .25}
                h={50}
                borderWidth={1}
                borderRadius={10}
                borderColor={colors.creoleStartGame.teamSelectedTextColor}
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
                w={layout.width * .25}
                h={50}
                borderWidth={1}
                borderRadius={10}
                borderColor={colors.creoleStartGame.teamSelectedTextColor}
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

          <Stack
            minW='100%'
            maxW='100%'
            justifyContent='center'
            alignItems='center'
            mt={4}
          >
            <Button
              w={layout.width * .8}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate(game?.selectedTeam !== game?.initialTeam ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  selectedTeam: game?.selectedTeam !== game?.initialTeam ? game?.teamA : game?.teamB,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
                })
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Siguiente lanzamiento {game?.selectedTeam === game?.teamA ? 'true' : 'false'}
              </Text>
            </Button>
          </Stack>

        </Stack>

        <VStack
          space={2}
          px={5}
          alignItems='center'
          minH={layout.height * .05}
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
                navigation?.navigate(game?.selectedTeam === game?.teamA ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  selectedTeam: game?.selectedTeam === game?.teamA ? game?.teamA : game?.teamB,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
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
                navigation?.navigate(game?.teamA !== game?.selectedTeam ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  selectedTeam: game?.teamA !== game?.selectedTeam ? game?.teamA : game?.teamB,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
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