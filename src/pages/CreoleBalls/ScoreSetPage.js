import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/config/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'
import { useFocusEffect } from '@react-navigation/native'

const ScoreSetPage = ({ navigation, match }) => {

  const layout = useWindowDimensions()

  const [scoreTeamA, setScoreTeamA] = useState(0)
  const [scoreTeamB, setScoreTeamB] = useState(0)
  const [isSetScore, setIsSetScore] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (match = {}) => {
    dispatch(addMatch(match))
  }

  useFocusEffect(
    useCallback(() => {
      console.log(match?.rounds[match?.rounds?.length - 1])
    }, [])
  )

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
                color={match?.initialTeam?.abreviatura === match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB}
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
                color={match?.initialTeam?.abreviatura !== match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB}
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
              minW='100%'
              maxW='100%'
              justifyContent='center'
              alignItems='center'
            >
              <Text
                fontSize='md'
                color={colors.creoleStartGame.scoreColor}
                textAlign='left'
                pt={1}
                bold
              >
                Puntuación
              </Text>
            </Stack>
          </HStack>

          <Stack
            minH={5}
            mb={10}
            minW='100%'
            maxW='100%'
            justifyContent='center'
            alignItems='center'
          >
            <Text
              fontSize='xl'
              color={colors.creoleStartGame.scoreColor}
              textAlign='left'
              bold
            >
              Tiro Nro. {match?.rounds?.length}
            </Text>
          </Stack>

          <VStack
            space={3}
            mb={3}
          >
            <HStack
              minW='100%'
              justifyContent='space-around'
              space={2}
              px={5}
            >
              <VStack
                justifyContent='center'
                alignItems='center'
                space={1}
              >
                <Box
                  bgColor={colors.gray3}
                  borderRadius={10}
                  shadow={7}
                  w={150}
                  h={150}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Icon
                    name='people'
                    color={match?.colorTeamA}
                    size={120}
                  />
                </Box>
                <Text
                  bold
                  fontSize='md'
                  color={colors.creoleStartGame.teamSelectedTextColor}
                  textAlign='center'
                  pt={1}
                >
                  {match?.teamA?.nombre}
                </Text>
              </VStack>

              <VStack
                justifyContent='center'
                alignItems='center'
                space={1}
              >
                <Box
                  bgColor={colors.gray3}
                  borderRadius={10}
                  shadow={7}
                  w={150}
                  h={150}
                  justifyContent='center'
                  alignItems='center'
                >

                  <Icon
                    name='people'
                    color={match?.colorTeamB}
                    size={120}
                  />
                </Box>
                <Text
                  bold
                  fontSize='md'
                  color={colors.creoleStartGame.teamSelectedTextColor}
                  textAlign='center'
                  pt={1}
                >
                  {match?.teamB?.nombre}
                </Text>
              </VStack>

            </HStack>
          </VStack>

          <HStack
            justifyContent='space-around'
            my={2}
            minW='100%'
            minH='25%'
          >
            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
              minW='50%'
            >
              <Button
                w='50%'
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={match?.teamAScore + scoreTeamA >= Number(match?.maxPoints) ||
                  match?.teamBScore + scoreTeamB >= Number(match?.maxPoints) ||
                  (scoreTeamB !== 0 && isSetScore) || scoreTeamA === 8 ?
                  colors.gray2 :
                  colors.button.bgPrimary
                }
                _pressed={colors.bgSecondary}
                disabled={match?.teamAScore + scoreTeamA >= Number(match?.maxPoints) ||
                  match?.teamBScore + scoreTeamB >= Number(match?.maxPoints) ||
                  (scoreTeamB !== 0 && isSetScore) || scoreTeamA === 8
                }
                onPress={() => {
                  if (scoreTeamB === 0 || !isSetScore || scoreTeamA < 8) {
                    setScoreTeamA(scoreTeamA + 1)
                    setIsSetScore(true)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={match?.teamAScore + scoreTeamA >= Number(match?.maxPoints) ||
                    match?.teamBScore + scoreTeamB >= Number(match?.maxPoints) ||
                    (scoreTeamB !== 0 && isSetScore) || scoreTeamA === 8 ?
                    colors.gray :
                    colors.white
                  }
                >
                  +1
                </Text>
              </Button>
              <Box
                justifyContent='center'
                alignItems='center'
                w='50%'
                h={50}
                borderWidth={1}
                borderRadius={10}
                borderColor={colors.creoleStartGame.teamSelectedTextColor}
              >
                <Text
                  bold
                  fontSize='xl'
                  color={colors.creoleStartGame.scoreColor}
                >
                  {scoreTeamA}
                </Text>
              </Box>
              <Button
                w='50%'
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={scoreTeamA === 0 ?
                  colors.gray2 :
                  colors.button.bgPrimary
                }
                _pressed={colors.bgSecondary}
                disabled={scoreTeamA === 0}
                onPress={() => {
                  if (scoreTeamA > 0) {
                    setScoreTeamA(scoreTeamA - 1)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={scoreTeamA === 0 ?
                    colors.gray :
                    colors.white
                  }
                >
                  -1
                </Text>
              </Button>
            </VStack>

            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
              minW='50%'
            >
              <Button
                w='50%'
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={match?.teamAScore + scoreTeamA >= Number(match?.maxPoints) ||
                  match?.teamBScore + scoreTeamB >= Number(match?.maxPoints) ||
                    (scoreTeamA !== 0 && isSetScore) || scoreTeamB === 8 ?
                  colors.gray2 :
                  colors.button.bgPrimary
                }
                _pressed={colors.bgSecondary}
                disabled={match?.teamAScore + scoreTeamA >= Number(match?.maxPoints) ||
                  match?.teamBScore + scoreTeamB >= Number(match?.maxPoints) ||
                    (scoreTeamA !== 0 && isSetScore) || scoreTeamB === 8
                }
                onPress={() => {
                  console.log(match?.teamBScore)
                  if (scoreTeamA === 0 || !isSetScore || scoreTeamB < 8) {
                    setScoreTeamB(scoreTeamB + 1)
                    setIsSetScore(true)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={match?.teamAScore + scoreTeamA >= Number(match?.maxPoints) ||
                    match?.teamBScore + scoreTeamB >= Number(match?.maxPoints) ||
                      (scoreTeamA !== 0 && isSetScore) || scoreTeamB === 8 ?
                    colors.gray :
                    colors.white
                  }
                >
                  +1
                </Text>
              </Button>
              <Box
                justifyContent='center'
                alignItems='center'
                w='50%'
                h={50}
                borderWidth={1}
                borderRadius={10}
                borderColor={colors.creoleStartGame.teamSelectedTextColor}
              >
                <Text
                  bold
                  fontSize='xl'
                  color={colors.creoleStartGame.scoreColor}
                >
                  {scoreTeamB}
                </Text>
              </Box>
              <Button
                w='50%'
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={scoreTeamB === 0 ?
                  colors.gray2 :
                  colors.button.bgPrimary
                }
                disabled={scoreTeamB === 0}
                _pressed={colors.bgSecondary}
                onPress={() => {
                  if (scoreTeamB > 0) {
                    setScoreTeamB(scoreTeamB - 1)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={scoreTeamB === 0 ?
                    colors.gray :
                    colors.white
                  }
                >
                  -1
                </Text>
              </Button>
            </VStack>
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
            justifyContent='center'
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
              bgColor={colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {

                let rounds = match?.rounds
                let len = match?.rounds?.length
                let round = match?.rounds[len - 1]

                round['teamAScore'] = scoreTeamA
                round['teamBScore'] = scoreTeamB

                rounds[len - 1] = round

                const game = {
                  started: match?.started,
                  completed: match?.completed,
                  tournamentId: match?.tournamentId,
                  id: match?.id,
                  title: match?.title,
                  date: match?.date,
                  maxPoints: Number(match?.maxPoints),
                  forfeit: match?.forfeit,
                  maxTime: match?.maxTime,
                  selectedTeam: match?.selectedTeam,
                  initialTeam: match?.initialTeam,
                  teamA: match?.teamA,
                  teamB: match?.teamB,
                  teamAScore: match?.teamAScore + scoreTeamA,
                  teamBScore: match?.teamBScore + scoreTeamB,
                  colorTeamA: match?.colorTeamA,
                  colorTeamB: match?.colorTeamB,
                  teamAMembers: match?.teamAMembers,
                  teamBMembers: match?.teamBMembers,
                  rosterTeamA: match?.rosterTeamA,
                  rosterTeamB: match?.rosterTeamB,
                  rounds: rounds
                }

                handleSubmit(game)

                navigation?.navigate('RoundNextPage', game)

              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Finalizar tiro
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

export default connect(mapStateToProps)(ScoreSetPage)