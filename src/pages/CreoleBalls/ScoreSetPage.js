import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const ScoreSetPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [scoreTeamA, setScoreTeamA] = useState(route?.params?.scoreTeamA || 0)
  const [scoreTeamB, setScoreTeamB] = useState(route?.params?.scoreTeamB || 0)
  const [isSetScore, setIsSetScore] = useState(false)

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

          <HStack
            alignItems='center'
            mt={2}
            mb={2}
            space={2}
            minW={layout.width}
            justifyContent='center'
          >
            <Stack
              minW={layout.width}
              maxW={layout.width}
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
              Tiro Nro. 1
            </Text>
          </Stack>

          <VStack
            space={3}
            mb={3}
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
                    color={game?.colorTeamA}
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
                  {game?.teamA}
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
                    color={game?.colorTeamB}
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
                  {game?.teamB}
                </Text>
              </VStack>

            </HStack>
          </VStack>

          <HStack
            justifyContent='space-between'
            mx={10}
            my={2}
            minH={layout.height * .2}
          >
            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
            >
              <Button
                w={layout.width * .25}
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={colors.button.bgPrimary}
                _pressed={colors.bgSecondary}
                onPress={() => {
                  if (scoreTeamB === 0 || !isSetScore) {
                    setScoreTeamA(scoreTeamA + 1)
                    setIsSetScore(true)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={colors.white}
                >
                  +1
                </Text>
              </Button>
              <Box
                justifyContent='center'
                alignItems='center'
                w={layout.width * .25}
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
                w={layout.width * .25}
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={colors.button.bgPrimary}
                _pressed={colors.bgSecondary}
                onPress={() => {
                  if (scoreTeamA > 0) {
                    setScoreTeamA(scoreTeamA - 1)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={colors.white}
                >
                  -1
                </Text>
              </Button>
            </VStack>

            <VStack
              space={1}
              justifyContent='center'
              alignItems='center'
            >
              <Button
                w={layout.width * .25}
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={colors.button.bgPrimary}
                _pressed={colors.bgSecondary}
                onPress={() => {
                  if (scoreTeamA === 0 || !isSetScore) {
                    setScoreTeamB(scoreTeamB + 1)
                    setIsSetScore(true)
                  }
                }}
              >
                <Text
                  bold
                  fontSize='md'
                  color={colors.white}
                >
                  +1
                </Text>
              </Button>
              <Box
                justifyContent='center'
                alignItems='center'
                w={layout.width * .25}
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
                w={layout.width * .25}
                h={layout.height * .055}
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={colors.button.bgPrimary}
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
                  color={colors.white}
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
              w={layout.width * .45}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate('RoundNextPage', {
                  selectedTeam: game?.selectedTeam,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  scoreTeamA: scoreTeamA,
                  scoreTeamB: scoreTeamB,
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
                Finalizar tiro
              </Text>
            </Button>
          </HStack>
        </VStack>

      </VStack>
    </Container >
  )
}

export default ScoreSetPage