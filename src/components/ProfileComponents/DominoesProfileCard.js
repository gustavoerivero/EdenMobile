import React from 'react'
import { Box, Divider, HStack, Stack, Text, VStack } from 'native-base'

import colors from '../../styled-components/colors'
import ProgressBar from './ProgressBar'
import DetailedData from './DetailedData'
import NumberGameData from './NumberGameData'

const DominoesProfileCard = ({
  navigation,
  gamesPlayed = 0,
  gamesWon = 0,
  points = 0,
  gamesLost = 0
}) => {

  return (
    <Box
      minW='100%'
      maxW='100%'
      minH={210}
      maxH={210}
      h={210}
      p={2}
      bgColor={colors.white}
      shadow={5}
      borderRadius={10}
    >
      <VStack
        minW='100%'
        space={1}
      >
        <Text
          bold
          fontSize='sm'
          color={colors.gray}
        >
          Perfil de jugador
        </Text>
        <Divider
          bgColor={colors.navBar.activeColor}
          borderRadius={50}
        />
        <VStack>
          <Text
            bold
            fontSize='md'
            color={colors.gray}
          >
            Dominó
          </Text>
          <HStack
            minH={90}
            h={90}
            maxH={90}
            minW='100%'
          >
            <VStack
              minW='25%'
              maxW='25%'
              h='100%'
              alignItems='center'
              justifyContent='center'
              p={0}
              m={0}
              space={0}
            >
              <Text
                bold
                fontSize='3xl'
                textAlign='center'
                color={colors.gray}
                lineHeight={30}
              >
                {gamesPlayed}
              </Text>
              <Text
                bold
                fontSize='xs'
                textAlign='center'
                lineHeight={15}
                color={colors.gray}
              >
                Juegos{`\n`}jugados
              </Text>
            </VStack>
            <Divider
              bgColor={colors.navBar.activeColor}
              borderRadius={50}
              orientation='vertical'
            />
            <VStack
              px={2}
              minW='75%'
              w='75%'
              maxW='75%'
              justifyContent='center'
            >
              <ProgressBar
                text='Ganados'
                progress={gamesWon}
                total={gamesPlayed}
              />
              <ProgressBar
                text='Perdidos'
                progress={gamesLost}
                total={gamesPlayed}
              />
            </VStack>
          </HStack>

          <HStack
            justifyContent='space-between'
            w='100%'
            my={2}
            px={1}
          >
            <Stack
              w={`${20}%`}
              justifyContent='center'
              alignItems='center'
            >
            </Stack>
            <Stack
              w={`${45}%`}
              justifyContent='center'
              alignItems='center'
            >
              <DetailedData
                title='Puntos acumulados'
                data={points}
              />
            </Stack>
            <Stack
              w={`${45}%`}
              justifyContent='center'
              alignItems='center'
            >
              <DetailedData
                title='Porc. de victorias'
                data={`${Math.round(gamesWon / (gamesPlayed === 0 ? 1 : gamesPlayed) * 100)}%`}
              />
            </Stack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default DominoesProfileCard