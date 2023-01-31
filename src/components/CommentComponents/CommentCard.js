import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, VStack, Stack, HStack, Text } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import useAuthContext from '../../hooks/useAuthContext'

import { formatDate } from '../../utilities/functions'

const CommentCard = ({ userID = null, name = '', years = 0, partner = false, date = new Date(), comment = '' }) => {

  const {
    state: { user }
  } = useAuthContext()

  return (
    <Box
      bgColor={colors.white}
      minH={20}
      borderRadius={10}
      shadow={2}
    >
      <VStack
        m={2}
      >
        <HStack
          w='100%'
          justifyContent='space-between'
          alignItems='center'
        >
          <HStack
            minW='70%'
            maxW='70%'
            alignItems='center'
          >
            <Stack
              minW='50%'
              maxW='60%'
              justifyContent='center'
            >
              <Text
                bold
                fontSize='xs'
                color={colors.text.description}
              >
                {name}
              </Text>
            </Stack>
            <Stack
              minW='50%'
              maxW='40%'
              justifyContent='center'
            >
              <Text
                fontSize='2xs'
                color={colors.text.description}
              >
                {years} años {partner && '(Socio)'}
              </Text>
            </Stack>
          </HStack>
          <HStack
            minW='30%'
            maxW='30%'
            justifyContent='flex-end'
            alignItems='center'
            space={3}
          >
            {userID == user?.id &&
              <HStack
                alignItems='center'
                space={1}
              >
                <TouchableOpacity>
                  <Icon
                    name='pencil'
                    color={colors.text.description}
                    size={15}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    name='trash-outline'
                    color={colors.text.description}
                    size={15}
                  />
                </TouchableOpacity>
              </HStack>
            }
            <Text
              fontSize='2xs'
              color={colors.text.description}
            >
              {formatDate(date)}
            </Text>
          </HStack>
        </HStack>
        <Stack>
          <Text
            fontSize='xs'
            color={colors.text.description}
          >
            {comment}
          </Text>
        </Stack>
      </VStack>
    </Box>
  )
}

export default CommentCard