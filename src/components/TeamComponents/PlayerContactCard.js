import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Box, HStack, VStack, Text, Divider, Stack, Button, Checkbox } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const PlayerContactCard = ({playerEmail = '', playerPhones = ''}) => {


  return (
    <Box
      minW='100%'
      maxW='100%'
      minH={120}
      p={2}
      pb={3}
      bgColor={colors.white}
      shadow={5}
      borderRadius={10}
    >
      <HStack
        w='100%'
      >
        <VStack
          w='100%'
          space={1}
        >
          <Text
            bold
            fontSize='sm'
            color={colors.gray}
          >
            Contacto
          </Text>
          <Divider
            bgColor={colors.navBar.activeColor}
            borderRadius={50}
          />
          <VStack
            mx={3}
            space={1}
          >
            <HStack
              alignItems='center'
              space={2}
            >
              <Icon
                name='mail-outline'
                size={20}
                color={colors.gray}
              />
              <Text
                fontSize='xs'
                color={colors.gray}
              >
                {cutText(playerEmail, 42)}
              </Text>
            </HStack>
            {playerPhones &&
              <HStack
                key={playerPhones}
                alignItems='center'
                space={2}
              >
                <Icon
                  name='phone-portrait-outline'
                  size={20}
                  color={colors.gray}
                />
                <Text
                  fontSize='xs'
                  color={colors.gray}
                >
                  {cutText(playerPhones, 42)}
                </Text>
              </HStack>
            }
          </VStack>
        </VStack>
      </HStack>
    </Box >
  )
}

export default PlayerContactCard