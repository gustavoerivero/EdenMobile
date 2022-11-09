import React, { useState } from 'react'

import { TouchableOpacity } from 'react-native'

import {
  View,
  Box,
  Text,
  VStack,
  Stack,
  Image,
  FormControl,
  WarningOutlineIcon,
  Button,
  Divider,
  Link,
  HStack,
} from 'native-base'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import StyledField from '../StyledField'

import { loginDefaultValues, loginSchema } from '../../utilities/formValidations/loginValidation'

import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import useLoading from '../../hooks/useLoading'

import Icon from 'react-native-vector-icons/Ionicons'

import { emailValidator, passwordValidator } from '../../utilities/functions'

import EdenLogo from '../../assets/logo/eden.png'

import colors from '../../styled-components/colors'

const LoginForm = () => {

  const { showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultvalue: loginDefaultValues,
  })

  const onSubmit = async (value) => {
    startLoading()

    try {
      console.log('Hello moto')

      reset(loginDefaultValues)
    } catch (error) {
      console.log(`Error: ${error}`)
      showErrorToast(`Error: ${error}`)
    }

    stopLoading()

  }

  const [show, setShow] = useState(false)

  return (
    <View
      alignItems='center'
      justifyContent='center'
      minW='100%'
      minH='100%'
    >
        <Box
          bg={colors.base}
          minH='85%'
          minW='90%'
          rounded={25}
          shadow={8}
          alignItems='center'
          justifyContent='center'
          my={10}
        >
          <VStack
            alignItems='center'
            maxW='90%'
          >
            <Stack
              pb={3}
            >
              <Text
                fontSize='lg'
                bold
                color={colors.text.primary}
              >
                Bienvenido a
              </Text>
            </Stack>
            <Stack>
              <Image
                source={EdenLogo}
                alt='Logo Eden'
                size='md'
                w='250'
              />
            </Stack>

            <VStack
              maxW='75%'
            >
              <Stack
                pt={7}
              >
                <Text
                  textAlign='center'
                  color={colors.text.secondary}
                  fontSize='sm'
                >
                  Ingresa tu usuario y contraseña para entrar a tu perfil
                </Text>
              </Stack>
            </VStack>

            <VStack
              pt={3}
              maxW='90%'
              space={4}
            >
              <Controller
                name='email'
                control={control}
                render={({ field: { onChange, value = '' } }) => (
                  <FormControl
                    isInvalid={
                      !emailValidator(value) && value !== ''
                    }
                  >
                    <FormControl.Label>
                      Correo electrónico
                    </FormControl.Label>
                    <StyledField
                      placeholder='Correo electrónico'
                      onChangeText={onChange}
                      borderColor={(!emailValidator(value) && value !== '') ? 'red.500' : null}
                      InputLeftElement={
                        <Stack
                          pl={2}
                        >
                          <Icon
                            name='person'
                            size={20}
                            color={(!emailValidator(value) && value !== '') ? colors.error.primary : colors.textField.placeholder}
                          />
                        </Stack>
                      }
                    />
                    {emailValidator(value) ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        El correo electrónico no es válido
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field: { onChange, value = '', ...field } }) => (
                  <FormControl
                    isInvalid={
                      !passwordValidator(value) && value !== ''
                    }
                  >
                    <FormControl.Label>
                      Contraseña
                    </FormControl.Label>
                    <StyledField
                      placeholder='Contraseña'
                      onChangeText={onChange}
                      secureTextEntry={!show}
                      {...field}
                      borderColor={(!passwordValidator(value) && value !== '') ? 'red.500' : null}
                      InputLeftElement={
                        <Stack
                          pl={2}
                        >
                          <Icon
                            name='lock-closed'
                            size={20}
                            color={(!passwordValidator(value) && value !== '') ? colors.error.primary : colors.textField.placeholder}
                          />
                        </Stack>
                      }
                      InputRightElement={
                        <Stack
                          pr={2}
                        >
                          <TouchableOpacity
                            onPress={() => setShow(!show)}
                          >
                            <Icon
                              name={show ? 'eye-outline' : 'eye-off-outline'}
                              size={20}
                              color={(!passwordValidator(value) && value !== '') ? colors.error.primary : colors.textField.placeholder}
                            />
                          </TouchableOpacity>
                        </Stack>
                      }
                    />
                    {passwordValidator(value) ? null : (
                      <FormControl.ErrorMessage
                        leftIcon={
                          <WarningOutlineIcon
                            size='xs'
                          />
                        }
                      >
                        La contraseña no es válida
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Button
                isLoading={isLoading}
                isDisabled={isLoading || !isValid}
                onPress={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: colors.button.bgPrimary,
                }}
                shadow={5}
                rounded={50}
              >
                Ingresar
              </Button>

              <VStack>
                <Text
                  textAlign='center'
                  color={colors.text.secondary}
                  fontSize='sm'
                >
                  ¿No recuerdas alguno de tus datos?
                </Text>
                <HStack
                  justifyContent='center'
                  space={1}
                >
                  <Text
                    textAlign='center'
                    color={colors.text.secondary}
                    fontSize='sm'
                  >
                    No te preocupes,
                  </Text>
                  <Link
                    _text={{
                      color: colors.link.color
                    }}
                    isUnderlined={false}
                  >
                    ingresa aquí
                  </Link>
                </HStack>

                <Divider
                  mt={3}
                />

              </VStack>



              <HStack
                justifyContent='center'
                space={1}
              >

                <Text
                  textAlign='center'
                  color={colors.text.secondary}
                  fontSize='sm'
                >
                  ¿No tienes cuenta?
                </Text>
                <Link
                  _text={{
                    color: colors.link.color
                  }}
                  isUnderlined={false}
                >
                  Regístrate aquí
                </Link>
              </HStack>

            </VStack>

          </VStack>

        </Box>
    </View>
  )
}

export default LoginForm