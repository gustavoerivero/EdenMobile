import React, { useEffect, useState } from 'react'
import { TouchableOpacity, useWindowDimensions, Modal } from 'react-native'

import { Box, Button, HStack, Image, Stack, Text, VStack, Divider } from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import CalendarPicker from 'react-native-calendar-picker'

import colors from '../../styled-components/colors'
import useConnection from '../../hooks/useConnection'
import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'

import { cutText } from '../../utilities/functions'

import Goose from '../../assets/images/goose.jpg'
import StyledModal from '../Modal'
import StyledField from './StyledField'

import { formatDate } from '../../utilities/functions'

const ProfileComponent = ({ navigation }) => {

  const {
    state: { user },
    dispatch
  } = useAuthContext()

  const initialDate = new Date(`${new Date().getFullYear() - 16}-${new Date().getDay() + 1}-${new Date().getMonth() + 1}`)
  const endDate = new Date(`${new Date().getFullYear() - 99}-${new Date().getDay() + 1}-${new Date().getMonth() + 1}`)

  const { isConnected, recognizeConnection } = useConnection()
  const { showSuccessToast } = useCustomToast()

  const [image, setImage] = useState(1)

  const [edit, setEdit] = useState(false)

  const [names, setNames] = useState(user?.user?.usuario?.name || '')
  const [lastNames, setLastNames] = useState('')
  const [birthday, setBirthday] = useState(initialDate)

  const calculateAge = (date = new Date()) => {
    let ageDifMs = Date.now() - date.getTime()
    let ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const [modalDateVisible, setModalDateVisible] = useState(false)

  const openModalDate = () => setModalDateVisible(true)
  const closeModalDate = () => setModalDateVisible(false)

  const handleDateSelection = (data) => {
    const date = new Date(data)
    setBirthday(date)
    console.log(date)
    //closeModalDate()
  }

  const layout = useWindowDimensions()

  useEffect(() => {
    console.log(user)
  }, [])

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
              {isConnected ?
                <Icon
                  name='log-out-outline'
                  size={20}
                  color={colors.white}
                /> :
                <MaterialIcon
                  name='connection'
                  size={20}
                  color={colors.white}
                />
              }
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(user)
              setEdit(!edit)
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
            alignItems='center'
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
              {cutText(`${names} ${lastNames}`, 50)}
            </Text>
            <Text
              fontSize='md'
              textAlign='center'
              opacity={.5}
              color={colors.gray}
            >
              {user?.role ? user?.role : 'Usuario'}
            </Text>
            <Text
              fontSize='sm'
              textAlign='center'
              opacity={.5}
              color={colors.gray}
            >
              {calculateAge(birthday)} años
            </Text>
          </Stack>

        </VStack>
      </VStack>
      {edit &&
        <StyledModal
          top={layout.height / 10}
        >
          <VStack
            maxW='80%'
          >
            <Text
              bold
              fontSize='sm'
              color={colors.gray}
            >
              Editar perfil
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
                  w='25%'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    fontSize='xs'
                    textAlign='right'
                    color={colors.gray}
                  >
                    Nombres
                  </Text>
                </Stack>
                <Stack
                  w='75%'
                >
                  <StyledField
                    value={names}
                    onChangeText={(text) => setNames(text)}
                  />
                </Stack>
              </HStack>
              <HStack
                justifyContent='center'
                alignItems='center'
                space={1}
              >
                <Stack
                  w='25%'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    fontSize='xs'
                    textAlign='right'
                    color={colors.gray}
                  >
                    Apellidos
                  </Text>
                </Stack>
                <Stack
                  w='75%'
                >
                  <StyledField
                    value={lastNames}
                    onChangeText={text => setLastNames(text)}
                  />
                </Stack>
              </HStack>
              <HStack
                justifyContent='center'
                alignItems='center'
                space={1}
              >
                <Stack
                  w='25%'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text
                    fontSize='xs'
                    textAlign='right'
                    lineHeight={12}
                    color={colors.gray}
                  >
                    Fecha de nacimiento
                  </Text>
                </Stack>
                <Stack
                  w='50%'
                >
                  <Box
                    mx={1}
                    h={8}
                    px={3}
                    borderRadius={12}
                    bgColor={colors.textField.bgSecondColor}
                    borderColor={colors.base}
                    justifyContent='center'
                  >
                    <Text
                      fontSize='xs'
                      color={colors.textField.text}
                    >
                      {formatDate(birthday.toISOString())}
                    </Text>
                  </Box>
                </Stack>
                <Stack
                  w='25%'
                >
                  <TouchableOpacity
                    onPress={openModalDate}
                  >
                    <Icon
                      name='calendar'
                      size={20}
                      color={colors.navBar.activeColor}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={modalDateVisible}
                    animationType='slide'
                  >
                    <VStack
                      p={5}
                      space={2}
                      divider={
                        <Divider
                          bgColor={colors.navBar.activeColor}
                          borderRadius={50}
                        />
                      }
                    >
                      <Text
                        bold
                        fontSize='xl'
                        color={colors.gray}
                      >
                        Fecha de nacimiento
                      </Text>

                      <CalendarPicker
                        onDateChange={handleDateSelection}
                        months={[
                          'Enero', 'Febrero', 'Marzo', 'Abril',
                          'Mayo', 'Junio', 'Julio', 'Agosto',
                          'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                        ]}
                        weekdays={[
                          'Lun', 'Mar', 'Miér',
                          'Jue', 'Vie', 'Sáb',
                          'Dom'
                        ]}
                        previousTitle='Anterior'
                        nextTitle='Siguiente'
                        selectYearTitle='Seleccione el año'
                        selectMonthTitle='Seleccione el mes en '
                        date={birthday}
                        minDate={endDate}
                        maxDate={initialDate}
                        initialDate={birthday}
                        selectedDayColor={colors.navBar.activeColor}
                        todayBackgroundColor={colors.gray2}
                      />
                      <Stack
                        w='100%'
                        alignItems='center'
                      >
                        <Button
                          onPress={closeModalDate}
                          w='40%'
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
                            Cerrar
                          </Text>
                        </Button>
                      </Stack>
                    </VStack>
                  </Modal>
                </Stack>
              </HStack>
            </VStack>
            <HStack
              minW='100%'
              justifyContent='center'
            >
              <Stack></Stack>
              <Button
                onPress={() => setEdit(false)}
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
        </StyledModal>
      }
    </Box>
  )
}

export default ProfileComponent