import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, VStack, Text, Divider, Stack, Button, Checkbox } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'
import Modal from '../Modal'
import StyledField from './StyledField'
import StyledSwitch from '../StyledSwitch'

const ContactCard = ({ }) => {

  const [email, setEmail] = useState('gustavoerivero.p63@gmail.com')
  const [phones, setPhones] = useState('+584149561231')
  const [activePhones, setActivePhones] = useState(true)

  const [editModal, setEditModal] = useState(false)

  const handleActivePhones = (key) => (value) => {
    let aux = phones

    aux.forEach(item => {
      if (item.id === key) {
        aux[key].status = value
      }
    })

    setPhones(aux)
  }

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
            {activePhones &&
              <HStack
                key={phones}
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
                  {cutText(phones, 42)}
                </Text>
              </HStack>
            }
          </VStack>
        </VStack>
        <TouchableOpacity
          onPress={() => {
            console.log('is Pressed')
            setEditModal(true)
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
      {editModal &&
        <Modal>
          <VStack
            maxW='80%'
            isOpened={editModal}
          >
            <Text
              bold
              fontSize='sm'
              color={colors.gray}
            >
              Editar información de contacto
            </Text>
            <Divider
              bgColor={colors.navBar.activeColor}
              borderRadius={50}
            />
            <VStack
              p={2}
              pb={3}
              space={1}
            >
              <HStack
                justifyContent='center'
                alignItems='center'
                space={1}
              >
                <Stack
                  w='20%'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    fontSize='xs'
                    color={colors.gray}
                  >
                    Correo
                  </Text>
                </Stack>
                <Stack
                  w='80%'
                  justifyContent='center'
                  alignItems='center'
                >
                  <StyledField
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                  />
                </Stack>
              </HStack>
              {phones &&
                <HStack
                  key={phones}
                  justifyContent='center'
                  alignItems='center'
                  space={1}
                >
                  <Stack
                    w='20%'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {phones &&
                      <Text
                        fontSize='xs'
                        color={colors.gray}
                      >
                        Teléfonos
                      </Text>
                    }
                  </Stack>
                  <Stack
                    w='60%'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <StyledField
                      value={phones}
                      onChangeText={text => setPhones(text)}
                    />
                  </Stack>
                  <Stack
                    w='20%'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <StyledSwitch
                      value={activePhones}
                      setValue={setActivePhones}
                    />
                  </Stack>
                </HStack>
              }
            </VStack>
            <HStack
              minW='100%'
              justifyContent='center'
            >
              <Stack></Stack>
              <Button
                onPress={() => setEditModal(false)}
                w='40%'
                h='100%'
                borderRadius={10}
                shadow={3}
                justifyContent='center'
                alignItems='center'
                bgColor={colors.button.bgPrimary}
              >
                <Text
                  bold
                  fontSize='md'
                  color={colors.white}
                >
                  Guardar
                </Text>
              </Button>
            </HStack>

          </VStack>

        </Modal>
      }
    </Box >
  )
}

export default ContactCard