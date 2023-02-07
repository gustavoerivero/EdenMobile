import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const RoundNextPage = ({ navigation, route }) => {

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
                {`${game?.maxTime}:00` || '00:00'}
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
                color={game?.colorTeamA}
              >
                {game?.teamA?.abreviatura}
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
                {game?.scoreTeamB}
              </Text>
              <Text
                bold
                fontSize='4xl'
                color={game?.colorTeamB}
              >
                {game?.teamB?.abreviatura}
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
                    setSelectedTeam(game?.teamA?.nombre)
                  }}
                >
                  <Box
                    bgColor={selectedTeam === game?.teamA?.nombre ? game?.colorTeamA : colors.gray3}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={selectedTeam !== game?.teamA?.nombre ? game?.colorTeamA : colors.gray}
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
                  {game?.teamA?.nombre}
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
                    setSelectedTeam(game?.teamB?.nombre)
                  }}
                >
                  <Box
                    bgColor={selectedTeam === game?.teamB?.nombre ? game?.colorTeamB : colors.gray3}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={selectedTeam !== game?.teamB?.nombre ? game?.colorTeamB : colors.gray}
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
                  {game?.teamB?.nombre}
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
                navigation?.navigate(selectedTeam === game?.teamA?.nombre ? 'PlayTeamAPage' : 'PlayTeamBPage', {
                  id: game?.id,
                  title: game?.title,
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
                  date: game?.date,
                  maxPoints: game?.maxPoints,
                  forfeit: game?.forfeit,
                  maxTime: game?.maxTime
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