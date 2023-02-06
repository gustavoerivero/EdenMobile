import React, { useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/creole/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const PlayerShootDataPage = ({ navigation, route, match }) => {

  const layout = useWindowDimensions()

  const dispatch = useDispatch()

  const handleSubmit = (match = {}) => {
    dispatch(addMatch(match))
  }

  const game = route?.params

  const [numberShoot, setNumberShoot] = useState(1)

  const rounds = match?.rounds

  const [firstShoot, setFirstShoot] = useState(null)
  const [secondShoot, setSecondShoot] = useState(null)

  const player = match?.selectedTeam?.nombre === match?.teamA?.nombre ?
    match?.rosterTeamA.find(member => member?.usuario?.id === game?.selectedPlayer) :
    match?.rosterTeamB.find(member => member?.usuario?.id === game?.selectedPlayer)

  const name = `${player?.usuario?.nombres} ${player?.usuario?.apellidos}`

  const updateRound = (round = {}, player = {}) => {
    const { teamAMembers, teamBMembers } = round
    const team = match?.selectedTeam?.nombre === match?.teamA?.nombre ? 'teamAMembers' : 'teamBMembers'
    
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
                {`${match?.maxTime}:00` || '00:00'}
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
                color={match?.initialTeam?.nombre === match?.selectedTeam?.nombre &&
                  match?.initialTeam?.abreviatura === match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB
                }
              >
                {match?.teamA?.abreviatura}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                {match?.teamAScore}
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
                {match?.teamBScore}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={match?.initialTeam?.nombre !== match?.selectedTeam?.nombre &&
                  match?.initialTeam?.abreviatura === match?.teamB?.abreviatura ? match?.colorTeamB : match?.colorTeamA
                }
              >
                {match?.teamB?.abreviatura}
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
            bgColor={match?.initialTeam?.nombre === match?.selectedTeam?.nombre ? match?.colorTeamA : match?.colorTeamB}
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

                const game = {
                  started: match?.started,
                  completed: match?.completed,
                  tournamentId: match?.tournamentId,
                  id: match?.id,
                  title: match?.title,
                  date: match?.date,
                  maxPoints: match?.maxPoints,
                  forfeit: match?.forfeit,
                  maxTime: match?.maxTime,
                  selectedTeam: match?.selectedTeam,
                  initialTeam: match?.initialTeam,
                  teamA: match?.teamA,
                  teamB: match?.teamB,
                  teamAScore: match?.teamAScore,
                  teamBScore: match?.teamBScore,
                  colorTeamA: match?.colorTeamA,
                  colorTeamB: match?.colorTeamB,
                  teamAMembers: match?.teamAMembers,
                  teamBMembers: match?.teamBMembers,
                  rosterTeamA: match?.rosterTeamA,
                  rosterTeamB: match?.rosterTeamB,
                  rounds: match?.rounds
                }

                handleSubmit(game)

                navigation?.navigate(match?.selectedTeam?.nombre === match?.teamA?.nombre ? 'PlayTeamAPage' : 'PlayTeamBPage', game)

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

                const game = {
                  started: match?.started,
                  completed: match?.completed,
                  tournamentId: match?.tournamentId,
                  id: match?.id,
                  title: match?.title,
                  date: match?.date,
                  maxPoints: match?.maxPoints,
                  forfeit: match?.forfeit,
                  maxTime: match?.maxTime,
                  selectedTeam: match?.selectedTeam?.nombre !== match?.teamA?.nombre ? match?.teamA : match?.teamB,
                  initialTeam: match?.initialTeam,
                  teamA: match?.teamA,
                  teamB: match?.teamB,
                  teamAScore: match?.teamAScore,
                  teamBScore: match?.teamBScore,
                  colorTeamA: match?.colorTeamA,
                  colorTeamB: match?.colorTeamB,
                  teamAMembers: match?.teamAMembers,
                  teamBMembers: match?.teamBMembers,
                  rosterTeamA: match?.rosterTeamA,
                  rosterTeamB: match?.rosterTeamB,
                  rounds: match?.rounds
                }

                handleSubmit(game)

                navigation?.navigate(match?.selectedTeam?.nombre !== match?.teamA?.nombre ? 'PlayTeamAPage' : 'PlayTeamBPage', game)

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

const mapStateToProps = (state) => ({
  match: state.match
})

export default connect(mapStateToProps)(PlayerShootDataPage)