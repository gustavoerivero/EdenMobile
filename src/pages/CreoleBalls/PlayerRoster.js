import React, { useCallback, useReducer } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/config/actions'

import Container from '../../components/Container'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Stack, VStack, HStack, Text, Divider, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import RosterTeam from '../../components/CreoleBallsComponents/RosterTeam'
import { useFocusEffect } from '@react-navigation/native'

const rosterReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return [...state, action.payload]
    case 'REMOVE_MEMBER':
      return action.payload
    default: return state
  }
}

const PlayerRoster = ({ navigation, domino, match }) => {

  const layout = useWindowDimensions()

  const [firstRoster, firstDispatch] = useReducer(rosterReducer, match.rosterTeamA)
  const [secondRoster, secondDispatch] = useReducer(rosterReducer, match.rosterTeamB)

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

  const dispatch = useDispatch()

  const handleSubmit = (match = {}) => {
    dispatch(addMatch(match))
  }

  useFocusEffect(
    useCallback(() => {
      console.log(match)
    }, [match])
  )

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
            {match?.title}
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
            name={match?.teamA?.nombre}
            team={match?.teamAMembers}
            roster={firstRoster}

            add={addFirstRoster}
            remove={removeFirstRoster}

          />
          <RosterTeam
            id={2}
            teamID={2}
            name={match?.teamB?.nombre}
            team={match?.teamBMembers}
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

                const game = {
                  started: match?.started || true,
                  completed: match?.completed,
                  tournamentId: match?.tournamentId || tournamentID,
                  id: match?.id || id,
                  title: match?.title || title,
                  date: match?.date || date,
                  maxPoints: match?.maxPoints || maxPoints,
                  forfeit: match?.forfeit || forfeit,
                  maxTime: match?.maxTime || maxTime,
                  selectedTeam: match?.selectedTeam || null,
                  initialTeam: match?.initialTeam || null,
                  teamA: match?.teamA || teamA,
                  teamB: match?.teamB || teamB,
                  teamAScore: match?.teamAScore || 0,
                  teamBScore: match?.teamBScore || 0,
                  colorTeamA: match?.colorTeamA || null,
                  colorTeamB: match?.colorTeamB || null,
                  teamAMembers: match?.teamAMembers?.length > 0 ? match?.teamAMembers : playersTeamA,
                  teamBMembers: match?.teamBMembers?.length > 0 ? match?.teamBMembers : playersTeamB,
                  rosterTeamA: firstRoster,
                  rosterTeamB: secondRoster,
                  rounds: match?.rounds?.length > 0 ? match?.rounds : []
                }

                handleSubmit(game)

                navigation?.navigate('StartedGamePage', game)
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

const mapStateToProps = (state) => ({
  match: state.match,
  domino: state.domino
})

export default connect(mapStateToProps)(PlayerRoster)