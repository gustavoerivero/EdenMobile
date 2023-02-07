import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addDomino } from '../../redux/config/actions'

import Container from '../../components/Container'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Stack, VStack, HStack, Text, Divider, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import PlayersTeam from '../../components/DominoComponents/PlayersTeam'
import { useFocusEffect } from '@react-navigation/native'

const DominoRoster = ({ navigation, route, domino, match }) => {

  const layout = useWindowDimensions()

  const dispatch = useDispatch()

  const handleSubmit = (domino = {}) => {
    dispatch(addDomino(domino))
  }

  useFocusEffect(
    useCallback(() => {
      console.log(domino)
    }, [domino])
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
            fontSize='2xl'
            bold
            lineHeight={25}
            color={colors.text.primary}
            alignContent='center'
          >
            {domino?.title}
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
            name={domino?.teamA?.nombre}
            team={domino?.teamAMembers}
          />
          <PlayersTeam
            id={2}
            teamID={2}
            name={domino?.teamB?.nombre}
            team={domino?.teamBMembers}
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
              bgColor={domino?.teamAMembers?.length < 2 || domino?.teamBMembers?.length < 2 ? colors.gray2 : colors.button.bgPrimary}
              disabled={domino?.teamAMembers?.length < 2 || domino?.teamBMembers?.length < 2}
              onPress={() => {

                const round = {
                  id: domino?.rounds?.length > 0 ? domino?.rounds?.length + 1 : 1,
                  number: domino?.rounds?.length > 0 ? domino?.rounds?.length + 1 : 1,
                  teamAScore: 0,
                  teamBScore: 0,
                  isLocked: false,
                  teamAMembers: domino?.teamAMembers,
                  teamBMembers: domino?.teamBMembers
                }

                const game = {
                  started: true,
                  completed: domino?.completed,
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
                  teamAScore: domino?.teamAScore,
                  teamBScore: domino?.teamBScore,
                  teamAMembers: domino?.teamAMembers,
                  teamBMembers: domino?.teamBMembers,
                  rounds: domino?.rounds?.length > 0 ? domino?.rounds : [round]
                }
      
                handleSubmit(game)

                navigation?.navigate('StartedDominoGamePage', game)
              }}
            >
              <Text
                bold
                fontSize='md'
                color={domino?.teamAMembers?.length < 2 || domino?.teamBMembers?.length < 2 ? colors.gray : colors.white}
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

export default connect(mapStateToProps)(DominoRoster)