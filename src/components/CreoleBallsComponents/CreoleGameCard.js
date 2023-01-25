import React from 'react'
import { Box, HStack, Stack, VStack, Text, Divider } from 'native-base'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import colors from '../../styled-components/colors'
import { cutText } from '../../utilities/functions'

const CreoleGameCard = ({ navigation, id, title, teamA, teamB }) => {

  const layout = useWindowDimensions()

  return (
    <Box
      border='1'
      borderRadius='lg'
      bgColor='white'
      shadow={1}
      minH={130}
    >

      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('PlayerRoster', {
            id: id,
            title: title,
            teamA: teamA,
            teamB: teamB,
          })
          console.log(`Game ID: ${id} pressed...`)
        }}
      >
        <VStack
          minH={130}
          p={2}
          justifyContent='space-between'
        >
          <HStack
            p={2}
            minH={70}
            alignItems='center'
          >
            <Stack
              w={layout.width * .35}     >
              <Text
                fontSize='md'
                bold
                color={colors.text.primary}
              >
                Juego N°{id}
              </Text>
            </Stack>
            <Stack
              w={layout.width * .45}
            >
              <HStack
                space={2}
                justifyContent='center'
                minW={layout.width * .45}
                maxW={layout.width * .45}
              >
                <VStack
                  alignItems='center'
                  minW={layout.width * .225}
                  maxW={layout.width * .225}
                >
                  <Text
                    color={colors.text.primary}
                    bold
                    fontSize='3xl'
                    textAlign='center'
                  >
                    0
                  </Text>
                  <Text
                    color={colors.text.primary}
                    fontSize='md'
                    fontWeight='thin'
                    textAlign='center'
                  >
                    {cutText(teamA, 10)}
                  </Text>
                </VStack>
                <Divider
                  orientation='vertical'
                  bgColor={colors.divider.primary}
                  borderRadius={50}
                />
                <VStack
                  alignItems='center'
                  minW={layout.width * .225}
                  maxW={layout.width * .225}
                >
                  <Text
                    bold
                    fontSize='3xl'
                    textAlign='center'
                    color={colors.text.primary}
                  >
                    0
                  </Text>
                  <Text
                    fontSize='md'
                    fontWeight='thin'
                    textAlign='center'
                    color={colors.text.primary}
                  >
                    {cutText(teamB, 10)}
                  </Text>
                </VStack>
              </HStack>
            </Stack>
          </HStack>
          <Stack
            pb={2}
            pl={2}
          >
            <Text
              color={colors.text.primary}
              fontSize='sm'
            >
              El juego no ha finalizado...
            </Text>
          </Stack>
        </VStack>
      </TouchableOpacity>
    </Box>
  )
}

export default CreoleGameCard