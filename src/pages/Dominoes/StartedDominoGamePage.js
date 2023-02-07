import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addDomino } from '../../redux/config/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'
import StyledDominoNumberField from '../../components/DominoComponents/StyledDominoNumberField'
import StyledSwitch from '../../components/StyledSwitch'
import { useFocusEffect } from '@react-navigation/native'

const StartedDominoGamePage = ({ navigation, route, domino, match }) => {

  const layout = useWindowDimensions()

  const [scoreTeamA, setScoreTeamA] = useState(0)
  const [scoreTeamB, setScoreTeamB] = useState(0)

  const [isCharged, setIsCharged] = useState(false)

  const [isLocked, setIsLocked] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (domino = {}) => {
    dispatch(addDomino(domino))
  }

  useFocusEffect(
    useCallback(() => {
      setScoreTeamA(0)
      setScoreTeamB(0)
      setIsLocked(false)
      setIsCharged(true)
    }, [domino, isCharged])
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
                {`${domino?.maxTime}:00` || '00:00'}
              </Text>
            </Stack>

            <Stack
              minW='33%'
              minH='100%'
              maxH='100%'
              justifyContent='flex-end'
              alignItems='center'
            >
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.timeColor}
              >
                {`Hasta ${domino?.maxPoints} ptos`}
              </Text>
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
                color={colors.creoleStartGame.teamAColor}
              >
                {domino?.teamA?.abreviatura}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                {domino?.teamAScore}
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
                {domino?.teamBScore}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.teamBColor}
              >
                {domino?.teamB?.abreviatura}
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
              Ronda Nro. {domino?.rounds?.length}
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
                    color={colors.gray}
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
                  {domino?.teamA?.nombre}
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
                    color={colors.gray}
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
                  {domino?.teamB?.nombre}
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
              <StyledDominoNumberField
                value={scoreTeamA}
                onChangeText={text => {
                  const value = Number(text)
                  if (value >= 0 || value <= domino?.maxPoints) {
                    setScoreTeamA(value);
                  }
                }}
                w='50%'
                borderWidth={1}
                borderRadius={10}
              />
            </VStack>

            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
              minW='50%'
            >
              <StyledDominoNumberField
                value={scoreTeamB}
                onChangeText={text => {
                  const value = Number(text)
                  if (value >= 0 || value <= domino?.maxPoints) {
                    setScoreTeamB(value);
                  }
                }}
                w='50%'
                borderWidth={1}
                borderRadius={10}
              />
            </VStack>
          </HStack>

          <HStack
            justifyContent='center'
            alignItems='center'
            space={3}
          >
            <Text
              bold
              fontSize='md'
              color={colors.text.description}
              textAlign='center'
              pt={1}
            >
              Partida trancada
            </Text>
            <StyledSwitch
              value={isLocked}
              setValue={setIsLocked}
            />
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
              disabled={(!scoreTeamA && scoreTeamA > 0) ||
                (!scoreTeamB && scoreTeamB > 0) ||
                domino?.teamAScore + scoreTeamA > domino?.maxPoints ||
                domino?.teamBScore + scoreTeamB > domino?.maxPoints
              }
              bgColor={(!scoreTeamA && scoreTeamA > 0) ||
                (!scoreTeamB && scoreTeamB > 0) ||
                domino?.teamAScore + scoreTeamA > domino?.maxPoints ||
                domino?.teamBScore + scoreTeamB > domino?.maxPoints
                ? colors.gray2 : colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {



                const round = {
                  id: domino?.rounds?.length + 1,
                  number: domino?.rounds?.length + 1,
                  teamAScore: Number(scoreTeamA) >= 0 ? Number(scoreTeamA) : 0,
                  teamBScore: Number(scoreTeamB) >= 0 ? Number(scoreTeamB) : 0,
                  isLocked: isLocked,
                  teamAMembers: domino?.teamAMembers,
                  teamBMembers: domino?.teamBMembers
                }

                const totalScoreTeamA = (Number(scoreTeamA) >= 0 ? Number(scoreTeamA) : 0) + Number(domino?.teamAScore)
                const totalScoreTeamB = (Number(scoreTeamB) >= 0 ? Number(scoreTeamB) : 0) + Number(domino?.teamBScore)

                const game = {
                  started: domino?.started,
                  completed: totalScoreTeamA >= domino?.maxPoints ||
                    totalScoreTeamB >= domino?.maxPoints ?
                    true : domino?.completed,
                  tournamentId: domino?.tournamentId,
                  id: domino?.id,
                  title: domino?.title,
                  date: domino?.date,
                  maxTime: domino?.maxTime,
                  maxPoints: domino?.maxPoints,
                  selectedTeam: null,
                  initialTeam: null,
                  teamA: domino?.teamA,
                  teamB: domino?.teamB,
                  teamAScore: totalScoreTeamA,
                  teamBScore: totalScoreTeamB,
                  teamAMembers: domino?.teamAMembers,
                  teamBMembers: domino?.teamBMembers,
                  rounds: [...domino?.rounds, round]
                }

                handleSubmit(game)

                setScoreTeamA(0)
                setScoreTeamB(0)
                setIsLocked(false)
                setIsCharged(false)

                const route = totalScoreTeamA >= domino?.maxPoints || totalScoreTeamB >= domino?.maxPoints ?
                  'DominoResult' : 'StartedDominoGamePage'

                navigation?.navigate(route, game)

              }}
            >
              <Text
                bold
                fontSize='md'
                color={(!scoreTeamA && scoreTeamA > 0) ||
                  (!scoreTeamB && scoreTeamB > 0) ||
                  domino?.teamAScore + scoreTeamA > domino?.maxPoints ||
                  domino?.teamBScore + scoreTeamB > domino?.maxPoints ?
                  colors.gray : colors.white
                }
              >
                Finalizar ronda
              </Text>
            </Button>
          </HStack>
        </VStack>

      </VStack>
    </Container >
  )
}

const mapStateToProps = (state) => ({
  match: state.match,
  domino: state.domino
})

export default connect(mapStateToProps)(StartedDominoGamePage)