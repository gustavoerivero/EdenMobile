import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button, ScrollView, FlatList } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'

const PlayerTeam = ({ item }) => {

  return (
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
  )
}

const PlayTeamBPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const game = route?.params

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
                color={game?.initialTeam === game?.teamA ? game?.colorTeamA : game?.colorTeamB}
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
                color={game?.initialTeam === game?.teamB ? game?.colorTeamA : game?.colorTeamB}
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
            minW={layout.width}
            justifyContent='center'
          >
            <Stack
              minW={layout.width * .25}
              maxW={layout.width * .25}
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
                  color={game?.initialTeam === game?.selectedTeam ? game?.colorTeamA : game?.colorTeamB}
                  size={50}
                />
              </Box>
            </Stack>
            <Stack
              minW={layout.width * .5}
              maxW={layout.width * .5}
            >
              <Text
                bold
                fontSize='2xl'
                color={colors.creoleStartGame.teamSelectedTextColor}
                textAlign='left'
                pt={1}
              >
                {game?.selectedTeam}
              </Text>
            </Stack>
          </HStack>

          <Stack
            minH={5}
            bgColor={game?.initialTeam === game?.selectedTeam ? game?.colorTeamA : game?.colorTeamB}
            mb={2}
          >
          </Stack>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={game?.selectedTeam === game?.teamA ? game?.rosterA : game?.rosterB}
            minH='52%'
            maxH='50%'
            keyExtractor={item => item?.id}
            renderItem={PlayerTeam}
          />

          <Stack
            minW='100%'
            maxW='100%'
            minH='8%'
            maxH='8%'
            justifyContent='center'
            alignItems='center'
            my={2}
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
          minH={layout.height * .05}
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
                console.log('Select team')
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
                console.log('Select team')
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