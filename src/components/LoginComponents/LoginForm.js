import React, { useState, useRef } from 'react'

import { TouchableOpacity } from 'react-native'

import {
  View,
  Box,
  Text,
  VStack,
  Stack,
  FormControl,
  WarningOutlineIcon,
  Button,
  Divider,
  HStack,
} from 'native-base'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { setSession } from '../../services/jwt'

import StyledField from '../StyledField'

import { loginDefaultValues, loginSchema } from '../../utilities/formValidations/loginValidation'

import { loginData } from '../../adapters/User'

import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import useLoading from '../../hooks/useLoading'

import Icon from 'react-native-vector-icons/Ionicons'

import { emailValidator, passwordValidator } from '../../utilities/functions'

import Eden from '../../assets/logo/eden.svg'

import colors from '../../styled-components/colors'
import StyledLink from '../Link'

const LoginForm = ({ navigation }) => {

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const { dispatch } = useAuthContext()

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

      const response = { id: '1', ...loginData(value) }
      
      console.log(response)

      const token = '1253642'

      if (token) {
        showSuccessToast('¡Bienvenido!')
        const data = {
          name: 'Gustavo Rivero',
          role: 'Director del Club',
          description: '25 años'
        }
        setSession(response.id, token, data)
        dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              token: token,
              id: response.id,
              user: data
            }
          }
        })
      }

      reset(loginDefaultValues)
    } catch (error) {
      console.log(`Error: ${error}`)
      showErrorToast(`Error: ${error}`)
    }

    stopLoading()

  }

  const [show, setShow] = useState(false)

  const ref = useRef()

  return (
    <View
      alignItems='center'
      justifyContent='center'
      minW='100%'
      minH='100%'
    >
      <Box
        minH='85%'
        minW='90%'
        alignItems='center'
        justifyContent='center'
        my={10}
      >
        <VStack
          alignItems='center'
          maxW='90%'
        >
          <Stack>
            <Text
              fontSize='lg'
              bold
              color={colors.text.primary}
            >
              Bienvenido a
            </Text>
          </Stack>
          <Stack>
            <Eden width={275} height={125} />
          </Stack>

          <VStack
            maxW='80%'
          >
            <Stack
              pt={5}
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
                    ref={ref}
                    placeholder='Correo electrónico'
                    onChangeText={onChange}
                    borderColor={(!emailValidator(value) && value !== '') ? 'red.500' : emailValidator(value) && value !== '' ? colors.primary : null}
                    InputLeftElement={
                      <Stack
                        pl={2}
                      >
                        <Icon
                          name='person'
                          size={20}
                          color={(!emailValidator(value) && value !== '') ? colors.error.primary :
                            emailValidator(value) && value !== '' ? colors.primary : colors.textField.placeholder
                          }
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
                    ref={ref}
                    placeholder='Contraseña'
                    onChangeText={onChange}
                    secureTextEntry={!show}
                    {...field}
                    borderColor={(!passwordValidator(value) && value !== '') ? 'red.500' : passwordValidator(value) && value !== '' ? colors.primary : null}
                    InputLeftElement={
                      <Stack
                        pl={2}
                      >
                        <Icon
                          name='lock-closed'
                          size={20}
                          color={(!passwordValidator(value) && value !== '') ? colors.error.primary :
                            passwordValidator(value) && value !== '' ? colors.primary : colors.textField.placeholder
                          }
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
                            color={(!passwordValidator(value) && value !== '') ? colors.error.primary : show ? colors.primary : colors.textField.placeholder}
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
              rounded={5}
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
                <StyledLink
                  url={null}
                  text='ingresa aquí'
                />
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
              <StyledLink
                url={null}
                text='Regístrate aquí'
              />
            </HStack>

          </VStack>

        </VStack>

      </Box>
    </View>
  )
}

export default LoginForm