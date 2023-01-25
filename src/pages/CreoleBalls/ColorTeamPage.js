import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const ColorTeamPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

  const [isColorSelected, setIsColorSelected] = useState(false)
  const [colorSelected, setColorSelected] = useState(false)

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
                color={colors.creoleStartGame.text}
              >
                {`${game?.teamA.slice(0, 3).toUpperCase()}`}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.scoreColor}
              >
                0
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
                0
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={colors.creoleStartGame.text}
              >
                {`${game?.teamB.slice(0, 3).toUpperCase()}`}
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
              {game?.initialTeam}
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
            minW={layout.width * .75}
            justifyContent='space-between'
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
          alignItems='center'
          minH={layout.height * .05}
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
              navigation?.navigate('PlayTeamAPage', {
                selectedTeam: game?.selectedTeam,
                initialTeam: game?.initialTeam,
                teamA: game?.teamA,
                colorTeamA: colorSelected ? colors.creoleStartGame.teamAColor : colors.creoleStartGame.teamBColor,
                teamB: game?.teamB,
                colorTeamB: !colorSelected ? colors.creoleStartGame.teamAColor : colors.creoleStartGame.teamBColor,
                scoreTeamA: 0,
                scoreTeamB: 0,
                rosterA: game?.rosterA,
                rosterB: game?.rosterB,
              })              
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

export default ColorTeamPage