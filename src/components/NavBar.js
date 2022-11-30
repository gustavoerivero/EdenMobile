import React from 'react'

import { HStack, Stack, Text } from 'native-base'

import Eden from '../assets/logo/eden.svg'
import useConnection from '../hooks/useConnection'
import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styled-components/colors'

const NavBar = ({ hidden = false }) => {

  const { isConnected, recognizeConnection } = useConnection()

  const layout = useWindowDimensions()

  return (
    <>
      {!hidden &&
        <HStack
          pt={2}
          pr={2}
          minW={layout.width}
        >
          <Stack
            alignItems='flex-start'
            justifyContent='center'
            minW={layout.width * .5}
          >
            {!isConnected &&
              <TouchableOpacity
                onPress={() => recognizeConnection()}
              >
                <HStack
                  borderRightRadius={50}
                  bgColor={colors.connection.backgroundColor}
                  minW={layout.width * .15}
                  minH={layout.height * .05}
                  justifyContent='flex-end'
                  alignItems='center'
                  pr={3}
                >
                  <Icon
                    name='connection'
                    color={colors.connection.iconColor}
                    size={25}
                  />
                </HStack>
              </TouchableOpacity>
            }
          </Stack>

          <Stack
            alignItems='flex-end'
            justifyContent='center'
            minW={layout.width * .5}
          >
            <Eden width={114} height={45} />
          </Stack>

        </HStack>
      }
    </>
  )
}

export default NavBar