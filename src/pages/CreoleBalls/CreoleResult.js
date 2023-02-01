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
        maxW='100%'
        minH='100%'
        maxH='100%'
        justifyContent='space-between'
      >
      <Stack
        minH='91%'
        maxH='91%'
      >
          <Stack
            minH='10%'
            maxH='10%'
            py={5}
            alignItems='center'
            justifyContent='space-between'
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
            w='100%'
            alignItems='center'
          >
            <Box
              mx={3}
              my={5}
              h={100}
              borderRadius={10}
              bgColor={colors.creoleStartGame.winner}
              w='90%'
            >
              <HStack>
                <Stack
                  minW='33%'
                  maxW='33%'
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
                  minW='33%'
                  maxW='33%'
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
                  minW='33%'
                  maxW='33%'
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