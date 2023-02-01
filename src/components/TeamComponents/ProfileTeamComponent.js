import React from 'react'
import { TouchableOpacity } from 'react-native'

import { Box, HStack, Image, Stack, Text, VStack, Divider } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const ProfileTeamComponent = ({ navigation, team = {}, image = '' }) => {

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
              borderWidth={team?.teamImage ? 0 : 2}
              borderRadius={team?.teamImage ? 0 : 100}
              bgColor={team?.teamImage ? null : colors.white}
              justifyContent='center'
              alignItems='center'
            >
              {!team?.teamImage ?
                <Icon
                  name='person'
                  size={65}
                  color={colors.gray2}
                />
                :
                <Image
                  source={{ uri: team?.teamImage }}
                  w={120}
                  h={120}
                  alt={team?.teamName}
                />
              }
            </Box>
            <Text
              bold
              fontSize='lg'
              textAlign='center'
              color={colors.gray}
            >
              {cutText(team?.teamName, 50)}
            </Text>
            <Text
              fontSize='sm'
              textAlign='center'
              opacity={.5}
              color={colors.gray}
            >
              {team?.teamMembers?.length} jugadores
            </Text>
          </Stack>

        </VStack>
      </VStack>

    </Box>
  )
}

export default ProfileTeamComponent