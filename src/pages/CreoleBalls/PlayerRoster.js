import React, { useState, useReducer } from 'react'
import Container from '../../components/Container'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Stack, VStack, HStack, Text, Divider, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import RosterTeam from '../../components/CreoleBallsComponents/RosterTeam'
import { firstTeamData } from './data/teamA'
import { secondTeamData } from './data/teamB'

const rosterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return [...state, action.payload]
    case 'REMOVE_MEMBER':
      return action.payload
    default: return state
  }
}

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

  const [firstTeam, setFirstTeam] = useState(firstTeamData || [])

  const [teamB, setTeamB] = useState(game?.teamB || '')
  const [secondTeam, setSecondTeam] = useState(secondTeamData || [])

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW={layout.width}
        minH={layout.height * .959}
        p={5}
        justifyContent='space-between'
      >
        <Stack>
          <HStack
            minH={layout.height * .1}
            maxH={layout.height * .1}
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
              fontSize='2xl'
              bold
              color={colors.text.primary}
              alignContent='center'
            >

              {game.title}
            </Text>
          </HStack>
        </Stack>

        <Stack>
          <RosterTeam
            id={1}
            teamID={1}
            name={teamA}
            team={firstTeam}
            roster={firstRoster}

            add={addFirstRoster}
            remove={removeFirstRoster}

          />
          <RosterTeam
            id={2}
            teamID={2}
            name={teamB}
            team={secondTeam}
            roster={secondRoster}

            add={addSecondRoster}
            remove={removeSecondRoster}
          />
        </Stack>

        <VStack space={2}>
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
              bgColor={firstRoster.length === 8 && secondRoster.length === 8 ?
                colors.button.bgPrimary :
                colors.gray2
              }
              disabled={firstRoster.length !== 8 || secondRoster.length !== 8}
              onPress={() => {
                console.log('Is pressed')
                navigation?.navigate('StartedGamePage', {
                  teamA: teamA,
                  teamB: teamB,
                  rosterA: firstRoster,
                  rosterB: secondRoster
                })
              }}
            >
              <Text
                bold
                fontSize='md'
                color={firstRoster.length === 8 && secondRoster.length === 8 ?
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