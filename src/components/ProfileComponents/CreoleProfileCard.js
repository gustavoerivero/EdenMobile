import React from 'react'
import { Box, Divider, HStack, Stack, Text, VStack } from 'native-base'

import colors from '../../styled-components/colors'
import ProgressBar from './ProgressBar'
import DetailedData from './DetailedData'
import NumberGameData from './NumberGameData'

const CreoleProfileCard = ({
  navigation,
  gamesPlayed = 0,
  gamesWon = 0,
  gamesLost = 0,
  arrimeBueno = 0,
  arrimeMalo = 0,
  bocheBueno = 0,
  bocheMalo = 0,
  marranaBuena = 0,
  marranaMala = 0,
  mingoFuera = 0
}) => {

  const gameDetails = [
    {
      id: 1,
      title: 'Arrime bueno',
      number: arrimeBueno,
    },
    {
      id: 2,
      title: 'Arrime malo',
      number: arrimeMalo,
    },
    {
      id: 3,
      title: 'Boche bueno',
      number: bocheBueno,
    },
    {
      id: 4,
      title: 'Boche malo',
      number: bocheMalo,
    },
    {
      id: 5,
      title: 'Marrana buena',
      number: marranaBuena,
    },
    {
      id: 6,
      title: 'Marrana mala',
      number: marranaMala,
    },
    {
      id: 7,
      title: 'Mingo fuera',
      number: mingoFuera,
    },
  ]

  return (
    <Box
      minW='100%'
      maxW='100%'
      minH={295}
      maxH={295}
      h={280}
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
            Bolas criollas
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
              w={`${100 / 4}%`}
              justifyContent='center'
              alignItems='center'
            >
              <Text
                fontSize='xs'
                lineHeight={12}
                color={colors.gray}
                textAlign='center'
              >
                Capitán de equipo
              </Text>
            </Stack>
            <Stack
              w={`${100 / 2.5}%`}
              justifyContent='center'
              alignItems='center'
            >
              <DetailedData
                title='Jugador del equipo'
                data='DCyT'
              />
            </Stack>
            <Stack
              w={`${100 / 2.75}%`}
              justifyContent='center'
              alignItems='center'
            >
              <DetailedData
                title='Porc. de victorias'
                data={`${Math.round(gamesWon / (gamesPlayed === 0 ? 1 : gamesPlayed) * 100)}%`}
              />
            </Stack>
          </HStack>

          <VStack
            mt={1}
          >
            <Text
              fontSize='xs'
              color={colors.gray}
            >
              Estadísticas personales
            </Text>
            <HStack
              w='100%'
              justifyContent='center'
              alignItems='center'
              divider={
                <Divider
                  bg={colors.navBar.activeColor}
                  orientation='vertical'
                  h={8}
                />
              }
            >
              {gameDetails.map((item, key) => (
                <HStack
                  key={key}
                  mx={1}
                  maxW={`${1 / gameDetails.length * 100}%`}
                  justifyContent='center'
                >
                  <NumberGameData
                    title={item.title}
                    number={item.number}
                  />
                </HStack>
              ))}
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default CreoleProfileCard