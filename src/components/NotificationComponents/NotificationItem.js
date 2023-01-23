import React from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { HStack, Box, Text, VStack, Stack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import { cutText, getDate, formatDate } from '../../utilities/functions'

const NotificationItem = ({ navigation, date, name, type, id, read = false }) => {

  const layout = useWindowDimensions()

  const { dayWeek, day, month, year } = getDate(date)
  const eventMonth = month.slice(0, 3)
  const eventDay = `${dayWeek}, ${day} de ${month.toLowerCase()} de ${year}`

  return (
    <Box
      borderRadius={10}
      bgColor={colors.notification.backgroundColor}
      shadow={5}
      minW={layout.width * .9}
      maxW={layout.width * .9}
      minH='75'
      maxH='75'
    >
      <TouchableOpacity>
        <HStack
          minW={layout.width * .9}
          maxW={layout.width * .9}
          minH='100%'
          maxH='100%'
        >
          <Box
            borderLeftRadius={10}
            minH='100%'
            maxH='100%'
            minW={layout.width * .15}
            maxW={layout.width * .15}
            justifyContent='center'
            alignItems='center'
            pl={1}
          >
            <Icon
              name={read ? 'notifications-circle-outline' : 'notifications-circle'}
              color={read ? colors.notification.inactive : colors.notification.active}
              size={50}
            />
          </Box>
          <VStack
            minH='100%'
            maxH='100%'
            minW={layout.width * .75}
            maxW={layout.width * .75}
            justifyContent='center'
            borderRightRadius={10}
          >
            <Stack
              minH='75%'
              maxH='75%'
              justifyContent='center'
              pr={2}
            >
              <Text
                bold
                fontSize='sm'
                color={read ? colors.notification.textInactive : colors.notification.textActive}
              >
                {cutText(name, 75)}
              </Text>
            </Stack>
            <Stack
              minH='25%'
              maxH='25%'
              justifyContent='center'
              alignItems='flex-end'
              mr={3}
            >
              <Text
                fontWeight='normal'
                fontSize='xs'
                color={read ? colors.notification.textInactive : colors.notification.textActive}
              >
                {formatDate(date)}
              </Text>
            </Stack>

          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  )

}

export default NotificationItem