import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Box, HStack, Image, Stack, Text, VStack } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'
import useConnection from '../../hooks/useConnection'
import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'

import { cutText } from '../../utilities/functions'

import Goose from '../../assets/images/goose.jpg'

const ProfileComponent = ({ navigation }) => {

  const { isConnected, recognizeConnection } = useConnection()
  const { dispatch } = useAuthContext()
  const { showSuccessToast } = useCustomToast()

  const [image, setImage] = useState(1)

  const [userData, setUserData] = useState(null)

  const getData = async () => {
    setUserData(JSON.parse(await AsyncStorage.getItem('@user')))
  }

  useEffect(() => {
    if (!userData) {
      getData()
    }
  }, [userData])

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
              if (isConnected) {
                console.log('User logout')
                dispatch({ type: 'LOGOUT' })
                showSuccessToast('¡Esperamos verte proximamente por acá!')
              } else {
                recognizeConnection()
              }
            }}
          >
            <Box
              h={35}
              w={35}
              borderRadius={50}
              bgColor={isConnected ? colors.navBar.activeColor : colors.navBar.inactiveColor}
              justifyContent='center'
              alignItems='center'
            >
              <Icon
                name='log-out-outline'
                size={20}
                color={colors.white}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(userData)
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
                name='pencil'
                size={20}
                color={colors.white}
              />
            </Box>
          </TouchableOpacity>
        </HStack>
        <VStack
          alignItems='center'
          h={150}
          bgColor={colors.white}
          borderBottomRadius={15}
          shadow={5}
        >
          <Stack
            top='-40%'
          >
            <TouchableOpacity
              activeOpacity={.5}
            >
              <Box
                minW={125}
                maxW={125}
                minH={125}
                maxH={125}
                borderColor={colors.navBar.activeColor}
                borderWidth={2}
                borderRadius={100}
                bgColor={colors.white}
                justifyContent='center'
                alignItems='center'
              >
                {!image ?
                  <Icon
                    name='person'
                    size={65}
                    color={colors.gray2}
                  />
                  :
                  <Image
                    source={Goose}
                    w={120}
                    h={120}
                    alt='profile'
                    borderRadius={100}
                  />
                }
              </Box>
            </TouchableOpacity>
            <Text
              bold
              fontSize='lg'
              textAlign='center'
              color={colors.gray}
            >
              {cutText(userData?.name, 50)}
            </Text>
            <Text
              fontSize='md'
              textAlign='center'
              opacity={.5}
              color={colors.gray}
            >
              {userData?.role}
            </Text>
            <Text
              fontSize='sm'
              textAlign='center'
              opacity={.5}
              color={colors.gray}
            >
              {cutText(userData?.description, 100)}
            </Text>
          </Stack>

        </VStack>
      </VStack>
    </Box>
  )
}

export default ProfileComponent