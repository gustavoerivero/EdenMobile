import React, { useCallback, useState } from 'react'

import { useSelector, useDispatch, connect } from 'react-redux'

import { Box, HStack, Stack, VStack, Text, Divider } from 'native-base'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import colors from '../../styled-components/colors'
import { cutText, getDate, getHour } from '../../utilities/functions'

import useAuthContext from '../../hooks/useAuthContext'
import { useFocusEffect } from '@react-navigation/native'
import { addDomino } from '../../redux/config/actions'

const DominoGameCard = ({
  navigation,
  tournamentID = 0,
  id = 0,
  title = '',
  date = new Date(),
  teamA = {},
  teamB = {},
  teamAMembers = [],
  teamBMembers = [],
  scorer = 1,
  rounds = [],
  maxPoints = 100,
  status = 'D',
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

  const handleSubmit = (domino = {}) => {
    dispatch(addDomino(domino))
  }

  const [isScorer, setIsScorer] = useState(false)

  useFocusEffect(
    useCallback(() => {
      console.log(match)
      setIsScorer(user?.user?.roles?.find(item => item === 'anotador') || false)
    }, [match, domino, user])
  )

  return (
    <Box
      border='1'
      borderRadius='lg'
      bgColor={isScorer && match?.started ? colors.gray1 : isScorer && domino?.started ? domino?.id === id ? colors.soft1 : colors.gray1 : 'white'}
      shadow={1}
      minH={130}
    >

      <TouchableOpacity
        disabled={!isScorer ? true : match?.started ? true : domino?.started ? domino?.id !== id : false}
        onPress={() => {

          const game = {
            started: domino?.started,
            completed: domino?.completed,
            tournamentId: domino?.tournamentId || tournamentID,
            id: domino?.id || id,
            title: domino?.title || title,
            date: domino?.date || date,
            maxPoints: domino?.maxPoints || maxPoints,
            selectedTeam: null,
            initialTeam: null,
            teamA: domino?.teamA || teamA,
            teamB: domino?.teamB || teamB,
            teamAScore: domino?.teamAScore || 0,
            teamBScore: domino?.teamBScore || 0,
            teamAMembers: teamAMembers || [],
            teamBMembers: teamBMembers || [],
            rounds: domino?.rounds?.length > 0 ? domino?.rounds : []
          }

          handleSubmit(game)

          navigation?.navigate('DominoRoster', game)
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
                    {domino?.started && domino?.id === id ? domino?.teamAScore : 0}
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
                    {domino?.started && domino?.id === id ? domino?.teamBScore : 0}
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
    </Box >
  )
}

const mapStateToProps = (state) => ({
  match: state.match,
  domino: state.domino
})

export default connect(mapStateToProps)(DominoGameCard)