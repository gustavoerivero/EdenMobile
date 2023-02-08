import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/config/actions'

import { Box, HStack, Stack, VStack, Text, Divider } from 'native-base'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import colors from '../../styled-components/colors'
import { cutText, getDate, getHour } from '../../utilities/functions'
import useAuthContext from '../../hooks/useAuthContext'
import { useFocusEffect } from '@react-navigation/native'

const CreoleGameCard = ({
  navigation,
  tournamentID = 0,
  id = 0,
  title = '',
  teamA = {},
  teamB = {},
  date = new Date(),
  status = 'D',
  maxPoints = 0,
  maxTime = 0,
  forfeit = 0,
  playersTeamA = [],
  playersTeamB = [],
  teamAScore = 0,
  teamBScore = 0,
  match, 
  domino
}) => {

  const time = getHour(date)
  const { day, month, year } = getDate(date)

  const layout = useWindowDimensions()

  const dispatch = useDispatch()

  const {
    state: { user }
  } = useAuthContext()

  const handleSubmit = (match = {}) => {
    dispatch(addMatch(match))
  }

  const [isScorer, setIsScorer] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setIsScorer(user?.user?.roles?.find(item => item === 'anotador') || false)
    }, [match, domino, user])
  )

  return (
    <Box
      border='1'
      borderRadius='lg'
      bgColor={status !== 'D' ? colors.gray1 : isScorer && domino?.started ? colors.gray1 : isScorer && match?.started ? match?.id === id ? colors.soft1 : colors.gray1 : 'white'}
      shadow={1}
      minH={130}
    >

      <TouchableOpacity
        disabled={status !== 'D' ? true : !isScorer ? true : domino?.started ? true : match?.started ? match?.id !== id : false}
        onPress={() => {

          const game = {
            started: match?.started,
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
            teamAScore: match?.teamAScore || teamAScore,
            teamBScore: match?.teamBScore || teamBScore,
            colorTeamA: match?.colorTeamA || null,
            colorTeamB: match?.colorTeamB || null,
            teamAMembers: playersTeamA,
            teamBMembers: playersTeamB,
            rosterTeamA: match?.rosterTeamA?.length > 0 ? match?.rosterTeamA : [],
            rosterTeamB: match?.rosterTeamB?.length > 0 ? match?.rosterTeamB : [],
            rounds: match?.rounds?.length > 0 ? match?.rounds : []
          }

          handleSubmit(game)

          navigation?.navigate('PlayerRoster', game)
          console.log(`Game ID: ${id} pressed...`)
        }}
      >
        <VStack
          minH={130}
          p={2}
          justifyContent='space-between'
        >
          <HStack
            p={2}
            minH={70}
            alignItems='center'
          >
            <VStack
              w={layout.width * .35}
            >
              <Text
                fontSize='md'
                bold
                color={colors.text.primary}
              >
                Juego Nro. {id}
              </Text>
              <Text
                fontSize='2xs'
                color={colors.text.primary}
              >
                {`${day} de ${month} de ${year}`}
              </Text>
              <Text
                fontSize='2xs'
                color={colors.gray}
              >
                {time}
              </Text>
            </VStack>
            <Stack
              w={layout.width * .45}
            >
              <HStack
                space={2}
                justifyContent='center'
                minW={layout.width * .45}
                maxW={layout.width * .45}
              >
                <VStack
                  alignItems='center'
                  minW={layout.width * .225}
                  maxW={layout.width * .225}
                >
                  <Text
                    color={colors.text.primary}
                    bold
                    fontSize='3xl'
                    textAlign='center'
                  >
                    {match?.started && match?.id === id ? match?.teamAScore : teamAScore}
                  </Text>
                  <Text
                    color={colors.text.primary}
                    fontSize='md'
                    bold
                    fontWeight='thin'
                    textAlign='center'
                  >
                    {cutText(teamA?.abreviatura, 10)}
                  </Text>
                </VStack>
                <Divider
                  orientation='vertical'
                  bgColor={colors.divider.primary}
                  borderRadius={50}
                />
                <VStack
                  alignItems='center'
                  minW={layout.width * .225}
                  maxW={layout.width * .225}
                >
                  <Text
                    bold
                    fontSize='3xl'
                    textAlign='center'
                    color={colors.text.primary}
                  >
                    {match?.started && match?.id === id ? match?.teamBScore : teamBScore}
                  </Text>
                  <Text
                    fontSize='md'
                    fontWeight='thin'
                    bold
                    textAlign='center'
                    color={colors.text.primary}
                  >
                    {cutText(teamB?.abreviatura, 10)}
                  </Text>
                </VStack>
              </HStack>
            </Stack>
          </HStack>
          <Stack
            pb={2}
            pl={2}
          >
            <Text
              color={colors.text.primary}
              fontSize='xs'
            >
              {status === 'D' ?
                'El juego aún no ha comenzado' :
                status === 'P' ? 'El juego está en progreso' :
                  'El juego ha finalizado'
              }
            </Text>
          </Stack>
        </VStack>
      </TouchableOpacity>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  match: state.match,
  domino: state.domino
})

export default connect(mapStateToProps)(CreoleGameCard)