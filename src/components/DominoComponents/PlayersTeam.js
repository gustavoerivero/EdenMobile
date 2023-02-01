import React from 'react'
import { VStack, Text, Box, HStack, FlatList } from 'native-base'

import colors from '../../styled-components/colors'

const PlayersTeam = ({ id = 0, teamID = 0, name = '', team = [], roster = [], setRoster, add, remove, r }) => {

  const renderItem = ({ item }) => {
    return (
      <HStack
        alignItems='center'
        space={2}
      >
        <Text
          bold
          fontSize='md'
          color={colors.creoleRoster.textColor}
        >
          {item.name}
        </Text>
      </HStack>
    )
  }

  return (
    <VStack
      minH={275}
      maxH={275}
      space={2}
    >
      <HStack
        minW='100%'
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

export default PlayersTeam