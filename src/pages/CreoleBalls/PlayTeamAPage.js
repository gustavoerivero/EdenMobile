import React from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/creole/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const PlayTeamAPage = ({ navigation, match }) => {

  const layout = useWindowDimensions()

  const dispatch = useDispatch()

  const handleSubmit = (match = {}) => {
    dispatch(addMatch(match))
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
                  color={match?.colorTeamA}
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
                color={match?.colorTeamA}
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
            bgColor={match?.colorTeamA}
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

                      navigation?.navigate('PlayerShootDataPage', { ...game, selectedPlayer: item?.usuario.id })
                    }}
                  >
                    <Box
                      bgColor={colors.gray3}
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

                navigation?.navigate('PlayTeamBPage', game)

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

export default connect(mapStateToProps)(PlayTeamAPage)