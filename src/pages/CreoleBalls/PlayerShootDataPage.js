import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const PlayerShootDataPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [shoot, setShoot] = useState(0)
  const [firstShoot, setFirstShoot] = useState(null)
  const [secondShoot, setSecondShoot] = useState(null)

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
                30:00
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
                {`${game?.teamA.slice(0, 3).toUpperCase()}`}
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
                {`${game?.teamB.slice(0, 3).toUpperCase()}`}
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
              minW='100%'
              justifyContent='center'
              space={3}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('A')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('B')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('M')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('a')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('b')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
                    setSecondShoot('b')
                  }
                }}
              >
                <Box
                  bgColor={firstShoot !== 'b' && secondShoot !== 'b' ? colors.gray3 : colors.creoleStartGame.selectedShoot}
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('m')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('N')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                  if (!firstShoot || shoot === 0) {
                    setFirstShoot('F')
                  }
                  if ((firstShoot && !secondShoot) || shoot === 1) {
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
                w={100}
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
                setShoot(1)
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Siguiente lanzamiento
              </Text>
            </Button>
          </Stack>

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
                navigation?.navigate(game?.selectedTeam === game?.teamA ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  selectedTeam: game?.selectedTeam === game?.teamA ? game?.teamA : game?.teamB,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  scoreTeamA: game?.scoreTeamA,
                  scoreTeamB: game?.scoreTeamB,
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
                  scoreTeamA: game?.scoreTeamA,
                  scoreTeamB: game?.scoreTeamB,
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