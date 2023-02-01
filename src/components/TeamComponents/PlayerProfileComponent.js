import React from 'react'
import { TouchableOpacity } from 'react-native'

import { Box, HStack, Image, Stack, Text, VStack, Divider } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const PlayerProfileComponent = ({ navigation, player = {}, image = '' }) => {

  return (
    <Box
      minW='100%'
      maxW='100%'
    >
      <VStack>
        <HStack
          justifyContent='space-between'
          alignItems='center'
          minH={50}
          maxH={50}
          px={3}
        >
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack()
            }}
          >
            <Box
              h={35}
              w={35}
              borderRadius={50}
              bgColor={colors.navBar.activeColor}
              justifyContent='center'
              alignItems='center'
            >
              <Icon
                name='arrow-back'
                size={20}
                color={colors.white}
              />
            </Box>
          </TouchableOpacity>
        </HStack>
        <VStack
          w='100%'
          alignItems='center'
          h={150}
          bgColor={colors.white}
          borderBottomRadius={15}
          shadow={5}
        >
          <Stack
            top='-40%'
            alignItems='center'
          >
            <Box
              minW={125}
              maxW={125}
              minH={125}
              maxH={125}
              borderColor={colors.navBar.activeColor}
              borderWidth={player?.playerImage ? 0 : 2}
              borderRadius={player?.playerImage ? 0 : 100}
              bgColor={player?.playerImage ? null : colors.white}
              justifyContent='center'
              alignItems='center'
            >
              {!player?.playerImage ?
                <Icon
                  name='person'
                  size={65}
                  color={colors.gray2}
                />
                :
                <Image
                  source={{ uri: player?.playerImage }}
                  w={120}
                  h={120}
                  alt={player?.playerName}
                />
              }
            </Box>
            <Text
              bold
              fontSize='lg'
              textAlign='center'
              color={colors.gray}
            >
              {cutText(player?.playerName, 50)}
            </Text>
            <Text
              fontSize='sm'
              textAlign='center'
              opacity={.5}
              color={colors.gray}
            >
              {player?.playerPosition}
            </Text>
          </Stack>

        </VStack>
      </VStack>

    </Box>
  )
}

export default PlayerProfileComponent