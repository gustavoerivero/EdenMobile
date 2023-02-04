import React, { useState, useReducer } from 'react'
import Container from '../../components/Container'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Stack, VStack, HStack, Text, Divider, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import RosterTeam from '../../components/CreoleBallsComponents/RosterTeam'
import { firstTeamData } from './data/teamA'
import { secondTeamData } from './data/teamB'

const firstRosterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return [...state, action.payload]
    case 'REMOVE_MEMBER':
      return action.payload
    default: return state
  }
}

const secondRosterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return [...state, action.payload]
    case 'REMOVE_MEMBER':
      return action.payload
    default: return state
  }
}

const PlayerRoster = ({ navigation, route }) => {

  const game = route?.params

  const layout = useWindowDimensions()

  const [firstRoster, firstDispatch] = useReducer(firstRosterReducer, [])
  const [secondRoster, secondDispatch] = useReducer(secondRosterReducer, [])

  const addFirstRoster = (player) => {
    firstDispatch({
      type: 'ADD_MEMBER',
      payload: player
    })
  }

  const removeFirstRoster = (player) => {
    firstDispatch({
      type: 'REMOVE_MEMBER',
      payload: firstRoster.filter(member => member.id !== player.id)
    })
  }

  const addSecondRoster = (player) => {
    secondDispatch({
      type: 'ADD_MEMBER',
      payload: player
    })
  }

  const removeSecondRoster = (player) => {
    secondDispatch({
      type: 'REMOVE_MEMBER',
      payload: secondRoster.filter(member => member.id !== player.id)
    })
  }

  const [teamA, setTeamA] = useState(game?.teamA || '')

  const [firstTeam, setFirstTeam] = useState(game?.playersTeamA || [])

  const [teamB, setTeamB] = useState(game?.teamB || '')
  const [secondTeam, setSecondTeam] = useState(game?.playersTeamB || [])

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW='100%'
        minH='100%'
        p={5}
        justifyContent='space-between'
      >
        <HStack
          minH='10%'
          maxH='10%'
          pr={1}
          space={2}
        >
          <Stack
            pt={1}
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
          </Stack>

          <Text
            pt={2}
            fontSize='2xl'
            bold
            lineHeight={25}
            color={colors.text.primary}
            alignContent='center'
          >
            {game.title}
          </Text>
        </HStack>

        <Stack
          minH='83%'
          maxH='83%'
          justifyContent='center'
          space={3}
        >
          <RosterTeam
            id={1}
            teamID={1}
            name={teamA?.nombre}
            team={firstTeam}
            roster={firstRoster}

            add={addFirstRoster}
            remove={removeFirstRoster}

          />
          <RosterTeam
            id={2}
            teamID={2}
            name={teamB?.nombre}
            team={secondTeam}
            roster={secondRoster}

            add={addSecondRoster}
            remove={removeSecondRoster}
          />
        </Stack>

        <VStack
          space={2}
          minH='7%'
          maxH='7%'
        >
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          <Stack
            minH={layout.height * .05}
            maxH={layout.height * .05}
            justifyContent='center'
            alignItems='center'
          >
            <Button
              w={layout.width * .4}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={firstRoster.length >= 4 && secondRoster.length >= 4 ?
                colors.button.bgPrimary :
                colors.gray2
              }
              disabled={firstRoster.length < 4 || secondRoster.length < 4}
              onPress={() => {
                navigation?.navigate('StartedGamePage', {
                  id: game?.id,
                  title: game?.title,
                  teamA: teamA,
                  teamB: teamB,
                  rosterA: firstRoster,
                  rosterB: secondRoster,
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
                color={firstRoster.length >= 4 && secondRoster.length >= 4 ?
                  colors.white :
                  colors.gray
                }
              >
                Iniciar juego
              </Text>
            </Button>
          </Stack>
        </VStack>
      </VStack>
    </Container>
  )
}

export default PlayerRoster