import React, { useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/creole/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const RoundNextPage = ({ navigation, route, match }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [selectedTeam, setSelectedTeam] = useState(null)

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
              minW='33%'
              minH='100%'
              maxH='100%'
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
              ¿Quién comienza el siguiente tiro?
            </Text>
          </Stack>

          <VStack
            space={3}
            mb={3}
            minH='50%'
            justifyContent='center'
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
                <TouchableOpacity
                  activeOpacity={.9}
                  onPress={() => {
                    setSelectedTeam(match?.teamA?.nombre)
                  }}
                >
                  <Box
                    bgColor={selectedTeam === match?.teamA?.nombre ?
                      match?.initialTeam?.abreviatura === match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB :
                      colors.gray3}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={selectedTeam !== match?.teamA?.nombre ?
                        match?.initialTeam?.abreviatura === match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB :
                        colors.gray}
                      size={120}
                    />
                  </Box>
                </TouchableOpacity>
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
                <TouchableOpacity
                  activeOpacity={.9}
                  onPress={() => {
                    setSelectedTeam(match?.teamB?.nombre)
                  }}
                >
                  <Box
                    bgColor={selectedTeam === match?.teamB?.nombre ?
                      match?.initialTeam?.abreviatura !== match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB :
                      colors.gray3}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={selectedTeam !== match?.teamB?.nombre ?
                        match?.initialTeam?.abreviatura !== match?.teamA?.abreviatura ? match?.colorTeamA : match?.colorTeamB :
                        colors.gray}
                      size={120}
                    />
                  </Box>
                </TouchableOpacity>
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
              w={layout.width * .8}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {

                const len = match?.rounds?.length

                const round = {
                  id: len + 1,
                  number: len + 1,
                  teamAScore: 0,
                  teamBScore: 0,
                  teamAMembers: [],
                  teamBMembers: []
                }

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
                  rounds: [...match?.rounds, round]
                }

                handleSubmit(game)

                navigation?.navigate(selectedTeam === match?.teamA.nombre &&
                  match?.initialTeam?.nombre === match?.teamA?.nombre ?
                  'PlayTeamAPage' : 'PlayTeamBPage'
                )

              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Comenzar con selección
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

export default connect(mapStateToProps)(RoundNextPage)