import React from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

import { HStack, Box, Text, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import { cutText, getDate } from '../../utilities/functions'

const EventItem = ({ navigation, date, hour, location, area, description, image, tournament, name, type, id }) => {

  const layout = useWindowDimensions()

  const { dayWeek, day, month, year } = getDate(date)
  const eventMonth = month.slice(0, 3)
  const eventDay = `${dayWeek}, ${day} de ${month.toLowerCase()} de ${year}`

  return (
    <Box
      borderRadius={10}
      bgColor='white'
      shadow={5}
      minW={layout.width * .9}
      maxW={layout.width * .9}
      minH='100'
      maxH='100'
    >
      <TouchableOpacity
        onPress={() => {
          if (type === 'B') {
            navigation?.navigate('CreoleBallsTournamentPage', {
              id: id,
              type: type,
              title: name,
              date: eventDay,
              hour: hour,
              location: location,
              area: area,
              description: description,
              image: image,
              tournament: tournament
            })
          } else if (type === 'D') {
            navigation?.navigate('DominoTournamentPage', {
              id: id,
              type: type,
              title: name,
              date: eventDay,
              hour: hour,
              location: location,
              area: area,
              description: description,
              image: image,
              tournament: tournament
            })
          } else {
            navigation?.navigate('EventPage', {
              id: id,
              type: type,
              title: name,
              date: eventDay,
              hour: hour,
              location: location,
              area: area,
              description: description,
              image: image,
            })
          }
        }}      
      >
        <HStack
          minW={layout.width * .9}
          maxW={layout.width * .9}
          minH='100%'
          maxH='100%'
        >
          <Box
            minH='100%'
            minW={layout.width * .05}
            bgColor={colors.navBar.activeColor}
            borderLeftRadius={10}
          >
          </Box>
          <VStack
            minH='100%'
            minW={layout.width * .15}
            alignItems='center'
            justifyContent='center'
            bgColor={colors.gray1}
          >
            <Text
              bold
              fontSize='lg'
              color={colors.text.secondary}
              textAlign='center'
            >
              {cutText(eventMonth.toUpperCase(), 3)}
              <Text
                bold
                fontSize='3xl'
                color={colors.text.secondary}
              >
                {`\n${day}`}
              </Text>
            </Text>
          </VStack>
          <VStack
            minH='100%'
            minW={layout.width * .6}
            maxW={layout.width * .6}
            justifyContent='center'
            bg='white'
            px={3}
          >
            <Text
              bold
              fontSize='md'
              color={colors.text.secondary}
            >
              {cutText(name, 30)}
              <Text
                fontWeight='normal'
                fontSize='xs'
                color={colors.text.description}
              >
                {`\n${cutText(eventDay, 45)}`}
              </Text>
            </Text>

          </VStack>
          <Box
            minH='100%'
            minW={layout.width * .1}
            bgColor='white'
            borderRightRadius={10}
            justifyContent='center'
            alignItems='center'
          >
            <Icon
              name='chevron-forward'
              color={colors.text.secondary}
              size={25}
            />
          </Box>
        </HStack>
      </TouchableOpacity>
    </Box>
  )

}

export default EventItem