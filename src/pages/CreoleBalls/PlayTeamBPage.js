import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const PlayTeamBPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

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
                30:00
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
                {`${game?.teamB.slice(0, 3).toUpperCase()}`}
              </Text>

            </HStack>
          </HStack>

          <HStack
            alignItems='center'
            mt={4}
            mb={2}
            space={2}
            minW='100%'
            justifyContent='center'
          >
            <Stack
              minW='25%'
              maxW='25%'
            >
              <Box
                borderRadius={10}
                bgColor={colors.creoleStartGame.backgroundIconColor}
                w='65'
                h='65'
                justifyContent='center'
                alignItems='center'
              >
                <Icon
                  name='people'
                  color={game?.colorTeamB}
                  size={50}
                />
              </Box>
            </Stack>
            <Stack
              minW='50%'
              maxW='50%'
            >
              <Text
                bold
                fontSize='2xl'
                color={game?.colorTeamB}
                textAlign='left'
                pt={1}
              >
                {game?.selectedTeam}
              </Text>
            </Stack>
          </HStack>

          <Stack
            minH={5}
            bgColor={game?.colorTeamB}
          >
          </Stack>

          <Divider />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={game?.selectedTeam === game?.teamA ? game?.rosterA : game?.rosterB}
            minH='50%'
            maxH='50%'
            keyExtractor={item => item?.id}
            renderItem={({ item }) =>
              <Stack
                minW='100%'
                maxW='100%'
                justifyContent='center'
                alignItems='center'
                py={2}
              >
                <Stack
                  shadow={5}
                  minW='85%'
                  h={39}
                  borderRadius={10}
                >
                  <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => {
                      navigation?.navigate('PlayerShootDataPage', {
                        selectedTeam: game?.selectedTeam,
                        selectedPlayer: item.id,
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
                    <Box
                      bgColor={colors.gray3}
                      justifyContent='center'
                      alignItems='center'
                      borderRadius={10}
                      h={39}
                    >
                      <Text
                        bold
                        fontSize='md'
                        color={colors.gray}
                        textAlign='center'
                      >
                        {item.name}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </Stack>
              </Stack >
            }
          />
          <Divider />

          <Stack
            minH='15%'
            maxH='15%'
            justifyContent='center'
            alignItems='center'
          >
            <Button
              w={layout.width * .6}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate('PlayTeamAPage', {
                  selectedTeam: game?.selectedTeam !== game?.teamA ? game?.teamA : game?.teamB,
                  initialTeam: game?.initialTeam,
                  teamA: game?.teamA,
                  colorTeamA: game?.colorTeamA,
                  teamB: game?.teamB,
                  colorTeamB: game?.colorTeamB,
                  rosterA: game?.rosterA,
                  rosterB: game?.rosterB,
                  scoreTeamA: game?.scoreTeamA,
                  scoreTeamB: game?.scoreTeamB,
                })
              }}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Cambio de equipo
              </Text>
            </Button>
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
            justifyContent='space-between'
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
              bgColor={colors.gray3}
              _pressed={colors.bgSecondary}
              onPress={() => {
                navigation?.navigate('CreoleResult', {
                  selectedTeam: game?.selectedTeam,
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
                color={colors.gray}
              >
                Finalizar juego
              </Text>
            </Button>
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
                navigation?.navigate('ScoreSetPage', {
                  selectedTeam: game?.selectedTeam,
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
                Finalizar tiro
              </Text>
            </Button>
          </HStack>
        </VStack>

      </VStack>
    </Container >
  )
}

export default PlayTeamBPage