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

          if (roster.some(member => member.name === item.name)) {
            remove(item)
          } else {
            add(item)
          }
        }}
        disabled={!roster.some(member => member.id === item.id) && roster.length >= 8}
      >
        <HStack
          alignItems='center'
          space={2}
          opacity={!roster.some(member => member.id === item.id) && roster.length >= 8 ? 0.5 : 1}
        >
          <Box
            w={4}
            h={4}
            bgColor={
              roster.some(member => member.id === item.id) ?
                colors.creoleRoster.checkboxColor : !roster.some(member => member.id === item.id) && roster.length >= 8 ?
                  colors.creoleRoster.checkboxInactiveBorderColor :
                  colors.creoleRoster.checkboxBackgroundColor
            }
            borderWidth={2}
            borderRadius={2}
            borderColor={
              roster.some(member => member.id === item.id) ?
                colors.creoleRoster.checkboxColor :
                colors.creoleRoster.checkboxInactiveBorderColor
            }
            alignItems='center'
          >
            {roster.some(member => member.id === item.id) &&
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
            strikeThrough={!roster.some(member => member.id === item.id) && roster.length >= 8}
            color={roster.some(member => member.id === item.id) ?
              colors.creoleRoster.checkboxColor :
              colors.creoleRoster.textColor}
          >
            {item.name}
          </Text>
        </HStack>
      </TouchableOpacity>
    )
  }

  return (
    <VStack
      minH={layout.height * .35}
      maxH={layout.height * .35}
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
        pt={2}
        pl={2}
      >
        <FlatList
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