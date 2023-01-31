import React from 'react'
import { TouchableOpacity } from 'react-native'

import { Box, HStack, VStack, Text, Image, Stack } from 'native-base'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import colors from '../styled-components/colors'
import styles from './styled-components/styles'

const TeamPreviewCard = ({ navigation, route, teamID = 0, teamName = '', teamMembers = [], teamImage = '' }) => {

  return (
    <Box
      minW='100%'
      maxW='100%'
      minH='65'
      borderRadius={15}
    >
      <HStack
        minW='100%'
        maxW='100%'
        minH='65'
        maxH='65'
      >
        <Stack
          minW='20%'
          maxW='20%'
          minH='100%'
          maxH='100%'
          justifyContent='center'
          alignItems='center'
        >
          {teamImage ?
            <Image
              src={teamImage}
              alt={teamName}
              h='50'
              w='50'
            />
            :
            <Box
              w='50'
              h='50'
              borderRadius={50}
              bgColor={colors.navBar.activeColor}
              justifyContent='center'
              alignItems='center'
            >
              <MaterialIcon
                name='group'
                color={colors.white}
                size={30}
              />
            </Box>
          }

        </Stack>
        <VStack
          minW='60%'
          maxW='60%'
          minH='65'
          justifyContent='center'
        >
          <Stack
            space={0}
          >
            <Text
              bold
              fontSize='sm'
              color={colors.text.description}
            >
              {teamName}
            </Text>
            <Text
              fontSize='xs'
              italic
              color={colors.text.description}
            >
              {teamMembers?.length} jugadores
            </Text>
          </Stack>

        </VStack>
        <TouchableOpacity
          style={styles.teamCard.buttonSection}
        >
          <Box
            minW='100%'
            maxW='100%'
            minH='65'
            borderRightRadius={15}
            justifyContent='center'
            alignItems='center'
            bgColor={colors.teamCard.buttonBackground}
          >
            <MaterialIcon
              name='arrow-forward-ios'
              color={colors.white}
              size={25}
            />
          </Box>
        </TouchableOpacity>

      </HStack>
    </Box>
  )
}

export default TeamPreviewCard