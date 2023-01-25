import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const CreoleResult = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

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
          <Stack
            minH={5}
            mt={5}
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
              Resultados finales
            </Text>
          </Stack>

          <VStack
            space={4}
          >
            <Box
              borderRadius={10}
              borderWidth={3}
              mx={2}
              borderColor={colors.gray3}
              h={150}
            >
              <HStack
                justifyContent='space-between'
              >
                <Stack
                  minW='30%'
                  maxW='30%'
                >
                  <Box
                    bgColor={colors.creoleStartGame.teamAColor}
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
                </Stack>
                <VStack
                  minW='60%'
                  maxW='60%'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='md'
                    color={colors.creoleStartGame.teamSelectedTextColor}
                    textAlign='center'
                    pt={1}
                  >
                    {game?.teamA}
                  </Text>
                  <Text
                    bold
                    fontSize='6xl'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {game?.scoreTeamA}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              borderRadius={10}
              borderWidth={3}
              mx={2}
              borderColor={colors.gray3}
              h={150}
            >
              <HStack
                justifyContent='space-between'
              >
                <Stack
                  minW='30%'
                  maxW='30%'
                >
                  <Box
                    bgColor={colors.creoleStartGame.teamBColor}
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
                </Stack>
                <VStack
                  minW='60%'
                  maxW='60%'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='md'
                    color={colors.creoleStartGame.teamSelectedTextColor}
                    textAlign='center'
                    pt={1}
                  >
                    {game?.teamB}
                  </Text>
                  <Text
                    bold
                    fontSize='6xl'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {game?.scoreTeamB}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>

          <Stack
            my={6}
          >
            <Box
              mx={3}
              my={5}
              h={100}
              borderRadius={10}
              bgColor={colors.creoleStartGame.winner}
            >
              <HStack>
                <Stack
                  minW={layout.width / 3}
                  maxW={layout.width / 3}
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  <HStack
                    alignItems='center'
                    space={1}
                    mt={1}
                  >
                    <Icon
                      name='star'
                      color={colors.creoleStartGame.textWinner}
                      size={15}
                    />
                    <Text
                      bold
                      fontSize='md'
                      color={colors.creoleStartGame.textWinner}
                    >
                      Ganador
                    </Text>
                  </HStack>
                </Stack>
                <Stack
                  minW={layout.width / 3}
                  maxW={layout.width / 3}
                  h={100}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='xl'
                    textAlign='center'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {game?.scoreTeamA === game?.scoreTeamB ? 'Empate' :
                      game?.scoreTeamA > game?.scoreTeamB ?
                        `Equipo ${game?.teamA}` :
                        `Equipo ${game?.teamB}`
                    }
                  </Text>
                </Stack>
                <Stack
                  minW={layout.width / 3}
                  maxW={layout.width / 3}
                  justifyContent='center'
                  alignItems='center'
                >

                </Stack>
              </HStack>
            </Box>
          </Stack>

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
                navigation?.navigate('Home')
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Registrar juego
              </Text>
            </Button>
          </HStack>
        </VStack>

      </VStack>
    </Container >
  )
}

export default CreoleResult