import React, { useCallback } from 'react'

import { useDispatch, connect } from 'react-redux'
import { deleteMatch } from '../redux/creole/actions'

import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { HStack, Stack, Text } from 'native-base'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import useConnection from '../hooks/useConnection'
import useAuthContext from '../hooks/useAuthContext'
import useCustomToast from '../hooks/useCustomToast'

import Eden from '../assets/logo/eden.svg'
import colors from '../styled-components/colors'
import { useFocusEffect } from '@react-navigation/native'

const NavBar = ({ hidden = false, logout = true, match }) => {

  const { isConnected, recognizeConnection } = useConnection()
  const { dispatch } = useAuthContext()
  const { showSuccessToast, showWarningToast, showErrorToast } = useCustomToast()

  const reduxDispatch = useDispatch()

  const {
    state: { isAuthenticated },
  } = useAuthContext()

  const layout = useWindowDimensions()

  useFocusEffect(
    useCallback(() => {
        if(match?.completed) {
          showWarningToast('Aún no se ha registrado el partido.')
          //console.log(match)
        }
      }, [match])
  )

  const sendData = async () => {
    try {
      showErrorToast('No se pudo registrar el partido.')
      reduxDispatch(deleteMatch(match?.id))
    } catch (error) {
      console.log(`Error sending data: ${error}`)
      showErrorToast('No se pudo registrar el partido.')
    }
  }

  return (
    <>
      {!hidden &&
        <HStack
          pt={2}
          pr={2}
          minW={layout.width}

        >
          <Stack
            alignItems='flex-start'
            justifyContent='center'
            minW={layout.width * .5}
          >
            {match?.completed ?
              <TouchableOpacity
                onPress={() => {
                  console.log('Se tiene un torneo')
                  sendData()
                }}
              >
                <HStack
                  borderRightRadius={50}
                  bgColor={colors.soft1}
                  minW={layout.width * .15}
                  minH={layout.height * .05}
                  justifyContent='flex-end'
                  alignItems='center'
                  pr={3}
                >
                  <MaterialIcon
                    name='celebration'
                    color={colors.hard1}
                    size={25}
                  />
                </HStack>
              </TouchableOpacity>
              : !isConnected ?
                <TouchableOpacity
                  onPress={() => recognizeConnection()}
                >
                  <HStack
                    borderRightRadius={50}
                    bgColor={colors.connection.backgroundColor}
                    minW={layout.width * .15}
                    minH={layout.height * .05}
                    justifyContent='flex-end'
                    alignItems='center'
                    pr={3}
                  >
                    <Icon
                      name='connection'
                      color={colors.connection.iconColor}
                      size={25}
                    />
                  </HStack>
                </TouchableOpacity>
                : isAuthenticated && logout &&
                <TouchableOpacity
                  onPress={() => {
                    console.log('User logout')
                    dispatch({ type: 'LOGOUT' })
                    showSuccessToast('¡Esperamos verte proximamente por acá!')
                  }}
                >
                  <HStack
                    borderRightRadius={50}
                    bgColor={colors.connection.backgroundColor}
                    minW={layout.width * .15}
                    minH={layout.height * .05}
                    justifyContent='flex-end'
                    alignItems='center'
                    pr={3}
                    space={2}
                  >
                    <Text
                      fontSize='sm'
                      bold
                      color={colors.connection.iconColor}
                      pl={2}
                    >
                      Cerrar sesión
                    </Text>
                    <Icon
                      name='logout'
                      color={colors.connection.iconColor}
                      size={25}
                    />
                  </HStack>
                </TouchableOpacity>
            }
          </Stack>

          <Stack
            alignItems='flex-end'
            justifyContent='center'
            minW={layout.width * .5}
          >
            <Eden width={114} height={45} />
          </Stack>

        </HStack>
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  match: state.match
})

export default connect(mapStateToProps)(NavBar)