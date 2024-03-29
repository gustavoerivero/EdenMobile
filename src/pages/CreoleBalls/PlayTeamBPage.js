import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/config/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'
import { useFocusEffect } from '@react-navigation/native'
import useCustomToast from '../../hooks/useCustomToast'

const PlayTeamBPage = ({ navigation, match }) => {

  const layout = useWindowDimensions()

  const { showWarningToast } = useCustomToast()

  const dispatch = useDispatch()

  const handleSubmit = (match = {}) => {
    dispatch(addMatch(match))
  }

  const [teamAShoots, setTeamAShoots] = useState(0)
  const [teamBShoots, setTeamBShoots] = useState(0)
  const [totalShoots, setTotalShoots] = useState(0)

  const [isMingoOut, setIsMingoOut] = useState(false)

  const [endingRound, setEndingRound] = useState(false)

  const [isChecked, setIsChecked] = useState(false)

  const getShootCount = (rounds = [], roundNumber = 0) => {
    let teamAShootCount = 0
    let teamBShootCount = 0

    rounds?.forEach(round => {

      if (round?.number === roundNumber) {
        round?.teamAMembers?.forEach(member => {
          if (member?.firstShoot) teamAShootCount++
          if (member?.secondShoot) teamAShootCount++
        })

        round?.teamBMembers?.forEach(member => {
          if (member?.firstShoot) teamBShootCount++
          if (member?.secondShoot) teamBShootCount++
        })
      }

    })

    return {
      teamAShootCount,
      teamBShootCount
    }
  }

  const hasShoot = (rounds, roundId, value) => {
    const round = rounds.find(r => r.id === roundId);
    return round.teamAMembers.some(p => p.firstShoot === value || p.secondShoot === value) ||
      round.teamBMembers.some(p => p.firstShoot === value || p.secondShoot === value);
  }

  const check = () => {
    if (true) {

      const shootsA = getShootCount(match?.rounds, match?.rounds?.length)?.teamAShootCount
      const shootsB = getShootCount(match?.rounds, match?.rounds?.length)?.teamBShootCount

      const total = shootsA + shootsB

      setTeamAShoots(shootsA)
      setTeamBShoots(shootsB)

      setTotalShoots(total)

      const mingoOut = hasShoot(match?.rounds, match?.rounds?.length, 'F')
      setIsMingoOut(mingoOut)

      if (mingoOut) {
        showWarningToast('¡Alguien ha sacado el mingo!')
      }

      console.log(hasShoot(match?.rounds, match?.rounds?.length, 'F'))
      console.log(total)

      setEndingRound(mingoOut || (total >= 9 && shootsA > 0 && shootsB > 0))

      setIsChecked(true)
    }
  }

  useFocusEffect(
    useCallback(() => {
      check()
    }, [match])
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
              justifyContent='center'
              alignItems='flex-end'
            >
              <Text
                pr={5}
                bold
                fontSize='md'
                color={colors.gray}
              >
                {`Tiro Nro. ${match?.rounds?.length}`}
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
                color={match?.selectedTeam?.abreviatura === match?.teamB?.abreviatura ? match?.colorTeamA : match?.colorTeamB}
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
                color={match?.selectedTeam?.abreviatura === match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB}
              >
                {match?.teamB?.abreviatura}
              </Text>

            </HStack>
          </HStack>

          <HStack
            alignItems='center'
            mt={4}
            mb={2}
            space={2}
            minW='100%'
            justifyContent='center'
          >
            <Stack
              minW='25%'
              maxW='25%'
            >
              <Box
                borderRadius={10}
                bgColor={colors.creoleStartGame.backgroundIconColor}
                w='65'
                h='65'
                justifyContent='center'
                alignItems='center'
              >
                <Icon
                  name='people'
                  color={match?.colorTeamB}
                  size={50}
                />
              </Box>
            </Stack>
            <Stack
              minW='50%'
              maxW='50%'
            >
              <Text
                bold
                fontSize='2xl'
                color={match?.colorTeamB}
                textAlign='left'
                pt={1}
                lineHeight={22}
              >
                {match?.selectedTeam?.nombre}
              </Text>
            </Stack>
          </HStack>

          <Stack
            minH={5}
            bgColor={match?.colorTeamB}
          >
          </Stack>

          <Divider />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={match?.selectedTeam?.nombre === match?.teamA?.nombre ? match?.rosterTeamA : match?.rosterTeamB}
            minH='50%'
            maxH='50%'
            keyExtractor={item => item?.id}
            renderItem={({ item }) =>
              <Stack
                minW='100%'
                maxW='100%'
                justifyContent='center'
                alignItems='center'
                py={2}
              >
                <Stack
                  shadow={5}
                  minW='85%'
                  h={39}
                  borderRadius={10}
                >
                  <TouchableOpacity
                    activeOpacity={.9}
                    disabled={match?.teamAScore >= Number(match?.maxPoints) || match?.teamBScore >= Number(match?.maxPoints)}
                    onPress={() => {

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

                      navigation?.navigate('PlayerShootDataPage', { ...game, selectedPlayer: item?.usuario.id })
                    }}
                  >
                    <Box
                      bgColor={match?.teamAScore >= Number(match?.maxPoints) || match?.teamBScore >= Number(match?.maxPoints) ? colors.gray2 : colors.gray1}
                      justifyContent='center'
                      alignItems='center'
                      borderRadius={10}
                      h={39}
                    >
                      <Text
                        bold
                        fontSize='md'
                        color={colors.gray}
                        textAlign='center'
                      >
                        {cutText(`${item?.usuario?.nombres} ${item?.usuario?.apellidos}`, 35)}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </Stack>
              </Stack >
            }
          />
          <Divider />

          <Stack
            minH='15%'
            maxH='15%'
            justifyContent='center'
            alignItems='center'
          >
            <Button
              w={layout.width * .6}
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
                  maxPoints: Number(match?.maxPoints),
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

                navigation?.navigate('PlayTeamAPage', game)

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

                const game = {
                  started: match?.started,
                  completed: true,
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

                navigation?.navigate('CreoleResult', game)
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.gray}
              >
                Finalizar juego
              </Text>
            </Button>
            <Button
              w={layout.width * .45}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              disabled={!endingRound || match?.teamAScore >= Number(match?.maxPoints) || match?.teamBScore >= Number(match?.maxPoints)}
              bgColor={endingRound && match?.teamAScore < Number(match?.maxPoints) && match?.teamBScore < Number(match?.maxPoints) ?
                colors.button.bgPrimary : colors.gray2}
              _pressed={colors.bgSecondary}
              onPress={() => {

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

                navigation?.navigate('ScoreSetPage', game)
              }}
            >
              <Text
                bold
                fontSize='md'
                color={endingRound && match?.teamAScore < Number(match?.maxPoints) && match?.teamBScore < Number(match?.maxPoints) ?
                  colors.white : colors.gray}
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

export default connect(mapStateToProps)(PlayTeamBPage)