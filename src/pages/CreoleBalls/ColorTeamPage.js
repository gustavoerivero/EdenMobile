import React, { useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { addMatch } from '../../redux/config/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const ColorTeamPage = ({ navigation, route, match }) => {

  const layout = useWindowDimensions()

  const [isColorSelected, setIsColorSelected] = useState(match?.colorTeamA ? true : false)
  const [colorSelected, setColorSelected] = useState(match?.colorTeamA === colors.creoleStartGame.teamAColor ? true : false)

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
                color={colors.creoleStartGame.text}
              >
                {match?.teamA?.abreviatura}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                {match?.teamAScore || 0}
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
                {match?.teamBScore || 0}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.text}
              >
                {match?.teamB?.abreviatura}
              </Text>

            </HStack>
          </HStack>

          <Stack
            alignItems='center'
            mt={10}
            mb={5}
          >
            <Box
              borderRadius={10}
              bgColor={colors.creoleStartGame.backgroundIconColor}
              w='150'
              h='150'
              justifyContent='center'
              alignItems='center'
            >
              <Icon
                name='people'
                color={!isColorSelected ?
                  colors.creoleStartGame.scoreColor :
                  colorSelected ?
                    colors.creoleStartGame.teamAColor :
                    colors.creoleStartGame.teamBColor
                }
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
              {match?.initialTeam?.nombre}
            </Text>
          </Stack>

          <Stack
            alignItems='center'
            mt={5}
            mb={5}
          >
            <Text
              bold
              fontSize='lg'
              color={colors.creoleStartGame.scoreColor}
            >
              Color del equipo
            </Text>
          </Stack>

          <HStack
            minW='75%'
            justifyContent='space-around'
            mx={5}
            py={3}
            pb={10}
          >
            <VStack>
              <TouchableOpacity
                onPress={() => {
                  setIsColorSelected(true)
                  setColorSelected(true)
                }}
              >
                <Box
                  borderRadius={10}
                  bgColor={colors.creoleStartGame.teamAColor}
                  w='100'
                  h='100'
                  justifyContent='center'
                  alignItems='center'
                >
                </Box>
              </TouchableOpacity>
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.scoreColor}
                textAlign='center'
                pt={1}
              >
                Rojo
              </Text>
            </VStack>

            <VStack>
              <TouchableOpacity
                onPress={() => {
                  setIsColorSelected(true)
                  setColorSelected(false)
                }}
              >
                <Box
                  borderRadius={10}
                  bgColor={colors.creoleStartGame.teamBColor}
                  w='100'
                  h='100'
                  justifyContent='center'
                  alignItems='center'
                >
                </Box>
              </TouchableOpacity>
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.scoreColor}
                textAlign='center'
                pt={1}
              >
                Verde
              </Text>
            </VStack>

          </HStack>

        </Stack>

        <VStack
          space={2}
          px={5}
          minH='9%'
          maxH='9%'
          alignItems='center'
        >
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          <Button
            w={layout.width * .6}
            h={layout.height * .055}
            borderRadius={10}
            shadow={3}
            justifyContent='center'
            alignItems='center'
            bgColor={isColorSelected ? colors.button.bgPrimary : colors.gray2}
            _pressed={colors.bgSecondary}
            onPress={() => {

              const round = {
                id: 1,
                number: 1,
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
                selectedTeam: match?.selectedTeam || null,
                initialTeam: match?.initialTeam || null,
                teamA: match?.teamA,
                teamB: match?.teamB,
                teamAScore: match?.teamAScore || 0,
                teamBScore: match?.teamBScore || 0,
                colorTeamA: colorSelected ? colors.creoleStartGame.teamAColor : colors.creoleStartGame.teamBColor,
                colorTeamB: !colorSelected ? colors.creoleStartGame.teamAColor : colors.creoleStartGame.teamBColor,
                teamAMembers: match?.teamAMembers,
                teamBMembers: match?.teamBMembers,
                rosterTeamA: match?.rosterTeamA,
                rosterTeamB: match?.rosterTeamB,
                rounds: match?.rounds?.length > 0 ? match?.rounds : [round]
              }
    
              handleSubmit(game)

              navigation?.navigate('PlayTeamAPage', game)
            }}
            disabled={!isColorSelected}
          >
            <Text
              bold
              fontSize='md'
              color={isColorSelected ? colors.white : colors.gray}
            >
              Comenzar con selección
            </Text>
          </Button>
        </VStack>

      </VStack>
    </Container >
  )
}

const mapStateToProps = (state) => ({
  match: state.match
})

export default connect(mapStateToProps)(ColorTeamPage)