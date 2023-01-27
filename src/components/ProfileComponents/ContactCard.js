import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, VStack, Text, Divider } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'

const ContactCard = ({ }) => {

  const [email, setEmail] = useState('gustavoerivero.p63@gmail.com')
  const [phones, setPhones] = useState(['+584149561231', '+584128501231'])

  return (
    <Box
      minW='100%'
      maxW='100%'
      minH={120}
      p={2}
      pb={3}
      bgColor={colors.white}
      shadow={5}
      borderRadius={10}
    >
      <HStack
        w='100%'
      >
        <VStack
          w='90%'
          space={1}
        >
          <Text
            bold
            fontSize='sm'
            color={colors.gray}
          >
            Contacto
          </Text>
          <Divider
            bgColor={colors.navBar.activeColor}
            borderRadius={50}
          />
          <VStack
            mx={3}
            space={1}
          >
            <HStack
              alignItems='center'
              space={2}
            >
              <Icon
                name='mail-outline'
                size={20}
                color={colors.gray}
              />
              <Text
                fontSize='xs'
                color={colors.gray}
              >
                {cutText(email, 42)}
              </Text>
            </HStack>
            {phones?.map((item, key) => (
              <HStack
                key={key}
                alignItems='center'
                space={2}
              >
                <Icon
                  name='phone-portrait-outline'
                  size={20}
                  color={colors.gray}
                />
                <Text
                  fontSize='xs'
                  color={colors.gray}
                >
                  {cutText(item, 42)}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <TouchableOpacity
          onPress={() => {
            console.log('is Pressed')
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
    </Box >
  )
}

export default ContactCard