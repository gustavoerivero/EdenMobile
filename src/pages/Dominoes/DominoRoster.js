import React, { useState, useReducer } from 'react'
import Container from '../../components/Container'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Stack, VStack, HStack, Text, Divider, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import { firstTeamData } from './data/teamA'
import { secondTeamData } from './data/teamB'
import PlayersTeam from '../../components/DominoComponents/PlayersTeam'

const DominoRoster = ({ navigation, route }) => {

  const game = route?.params

  const layout = useWindowDimensions()

  const [firstRoster, setFirstRoster] = useState(firstTeamData)
  const [secondRoster, setSecondRoster] = useState(secondTeamData)

  const [teamA, setTeamA] = useState(game?.teamA || '')
  const [firstTeam, setFirstTeam] = useState(firstTeamData || [])

  const [teamB, setTeamB] = useState(game?.teamB || '')
  const [secondTeam, setSecondTeam] = useState(secondTeamData || [])

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
          <PlayersTeam
            id={1}
            teamID={1}
            name={teamA}
            team={firstTeam}
            roster={firstRoster}
          />
          <PlayersTeam
            id={2}
            teamID={2}
            name={teamB}
            team={secondTeam}
            roster={secondRoster}
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
              bgColor={colors.button.bgPrimary}
              onPress={() => {
                navigation?.navigate('StartedDominoGamePage', {
                  round: 1,
                  points: 50,
                  teamA: teamA,
                  teamB: teamB,
                  rosterA: firstRoster,
                  rosterB: secondRoster,
                  colorTeamA: colors.creoleStartGame.teamAColor,
                  colorTeamB: colors.creoleStartGame.teamBColor,
                  scoreTeamA: 0,
                  scoreTeamB: 0,
                })
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
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

export default DominoRoster