import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const RoundNextPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [scoreTeamA, setScoreTeamA] = useState(0)
  const [scoreTeamB, setScoreTeamB] = useState(0)
  const [selectedTeam, setSelectedTeam] = useState(null)

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW={layout.width}
        minH={layout.height * .9}
        maxH={layout.height}
        my={5}
        justifyContent='space-between'
      >
        <Stack>
          <HStack
            minH={layout.height * .05}
            maxH={layout.height * .05}
            alignItems='center'
            justifyContent='space-between'
          >
            <HStack
              pt={1}
              pl={5}
              minH={layout.height * .05}
              maxH={layout.height * .05}
              minW={layout.width * .333}
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
              minW={layout.width * .333}
              minH={layout.height * .05}
              maxH={layout.height * .05}
              justifyContent='center'
              alignItems='center'
            >
              <Text
                bold
                fontSize='md'
                color={colors.creoleStartGame.timeColor}
              >
                30:00
              </Text>
            </Stack>

            <Stack
              minW={layout.width * .333}
              minH={layout.height * .05}
              maxH={layout.height * .05}
            >

            </Stack>

          </HStack>
          <HStack
            minH={layout.height * .1}
            maxH={layout.height * .1}
            minW={layout.width}
            divider={
              <Divider
                bgColor={colors.divider.primary}
                borderRadius={50}
              />
            }
            space={2}
          >
            <HStack
              minW={layout.width * .48}
              alignItems='center'
              justifyContent='center'
              space={10}
            >
              <Text
                bold
                fontSize='4xl'
                color={game?.colorTeamA}
              >
                {`${game?.teamA.slice(0, 3).toUpperCase()}`}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                {game?.scoreTeamA}
              </Text>
            </HStack>

            <HStack
              minW={layout.width * .45}
              alignItems='center'
              justifyContent='center'
              space={10}
            >
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                {game?.scoreTeamB}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={game?.colorTeamB}
              >
                {`${game?.teamB.slice(0, 3).toUpperCase()}`}
              </Text>

            </HStack>
          </HStack>

          <Stack
            minH={5}
            mb={10}
            minW={layout.width}
            maxW={layout.width}
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
            minH={layout.height * .54}
            justifyContent='center'
          >
            <HStack
              minW={layout.width}
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
                    setSelectedTeam(game?.teamA)
                  }}
                >
                  <Box
                    bgColor={selectedTeam === game?.teamA ? game?.colorTeamA : colors.gray3}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={selectedTeam !== game?.teamA ? game?.colorTeamA : colors.gray}
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
                  {game?.teamA}
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
                    setSelectedTeam(game?.teamB)
                  }}
                >
                  <Box
                    bgColor={selectedTeam === game?.teamB ? game?.colorTeamB : colors.gray3}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={selectedTeam !== game?.teamB ? game?.colorTeamB : colors.gray}
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
                  {game?.teamB}
                </Text>
              </VStack>

            </HStack>
          </VStack>


        </Stack>

        <VStack
          space={2}
          px={5}
          alignItems='center'
          minH={layout.height * .05}
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
                navigation?.navigate(selectedTeam === game?.teamA ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  selectedTeam: selectedTeam,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  scoreTeamA: game?.scoreTeamA,
                  scoreTeamB: game?.scoreTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
                })
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

export default RoundNextPage