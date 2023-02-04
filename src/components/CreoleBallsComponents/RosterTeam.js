import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { VStack, Text, Box, HStack, FlatList } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'

const RosterTeam = ({ id = 0, teamID = 0, name = '', team = [], roster = [], setRoster, add, remove, r }) => {

  const layout = useWindowDimensions()

  const [checked, setChecked] = useState(false)

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setChecked(!checked)

          if (roster.some(member => member?.persona?.id === item?.persona?.id)) {
            remove(item)
          } else {
            add(item)
          }
        }}
      >
        <HStack
          alignItems='center'
          space={2}
        >
          <Box
            w={4}
            h={4}
            bgColor={
              roster.some(member => member?.persona?.id === item?.persona?.id) ?
                colors.creoleRoster.checkboxColor :
                colors.creoleRoster.checkboxBackgroundColor
            }
            borderWidth={2}
            borderRadius={2}
            borderColor={
              roster.some(member => member?.persona?.id === item?.persona?.id) ?
                colors.creoleRoster.checkboxColor :
                colors.creoleRoster.checkboxInactiveBorderColor
            }
            alignItems='center'
          >
            {roster.some(member => member?.persona?.id === item?.persona?.id) &&
              <Icon
                name='md-checkmark-sharp'
                size={10}
                color='white'
              />
            }
          </Box>
          <Text
            bold
            fontSize='md'
            color={roster.some(member => member?.persona?.id === item?.persona?.id) ?
              colors.creoleRoster.checkboxColor :
              colors.creoleRoster.textColor}
          >
            {item?.persona?.nombres} {item?.persona?.apellidos}
          </Text>
        </HStack>
      </TouchableOpacity>
    )
  }

  return (
    <VStack
      minH={275}
      maxH={275}
      space={2}
    >
      <HStack
        minW={layout.width}
        space={2}
        alignItems='center'
      >
        <Text
          bold
          fontSize='lg'
          color={colors.creoleRoster.titleTextColor}
        >
          Equipo {id}:
        </Text>
        <Text
          bold
          fontSize='lg'
          color={colors.creoleRoster.teamTextColor}
        >
          {name}
        </Text>
      </HStack>

      <Box
        bgColor={colors.creoleRoster.backgroundColor}
        minH='85%'
        maxH='85%'
        borderRadius={10}
        pl={2}
      >
        <FlatList
          p={1}
          showsVerticalScrollIndicator={false}
          data={team}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
        />
      </Box>
    </VStack>
  )
}

export default RosterTeam