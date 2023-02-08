import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { deleteMatch, deleteDomino } from '../redux/config/actions'

import { ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native'
import { HStack, Stack, Text } from 'native-base'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import useConnection from '../hooks/useConnection'
import useAuthContext from '../hooks/useAuthContext'
import useCustomToast from '../hooks/useCustomToast'

import Eden from '../assets/logo/eden.svg'
import colors from '../styled-components/colors'
import { useFocusEffect } from '@react-navigation/native'
import TournamentService from '../services/tournaments/TournamentsService'

const NavBar = ({ hidden = false, logout = true, match, domino }) => {

  const { isConnected, recognizeConnection } = useConnection()
  const { dispatch } = useAuthContext()
  const { showSuccessToast, showWarningToast, showErrorToast } = useCustomToast()

  const reduxDispatch = useDispatch()

  const Tournament = new TournamentService()

  const {
    state: { isAuthenticated, user },
  } = useAuthContext()

  const layout = useWindowDimensions()

  const [isScorer, setIsScorer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  useFocusEffect(
    useCallback(() => {
      const scorer = user?.user?.roles?.find(item => item === 'anotador') || false
      setIsScorer(scorer)
      if (scorer && (match?.completed || domino?.completed)) {
        showWarningToast(`El partido ${match?.id ? match?.title : domino?.id ? domino?.title : null} no se ha registrado aún.`)
        console.log(match?.id ? match : domino?.id ? domino : 'No hay partidos')
      }
    }, [match, user, domino])
  )

  const sendData = async () => {
    try {
      console.log('Sending data...')
      setIsLoading(true)

      if (match?.id) {
        Tournament.save(match)
          .then(res => {
            console.log(res)
            const { data, status } = res

            console.log({ data, status })

            if (status >= 200 && status <= 299) {
              reduxDispatch(deleteMatch(match?.id))
              showSuccessToast('El partido ha sido registrado con éxito.')

              setIsLoading(false)
            } else {
              showErrorToast('No se pudo registrar el partido. Intente más tarde.')
              setIsLoading(false)
            }
          })
          .catch(error => {
            console.log(`Error creole scorer: ${error}`)
            showErrorToast('No se pudo registrar el partido. Intente más tarde.')
            setIsLoading(false)
          })
      }

      if (domino?.id) {
        Tournament.saveDomino(domino)
          .then(res => {
            const { data, status } = res

            console.log({ data, status })

            if (status >= 200 && status <= 299) {
              reduxDispatch(deleteDomino(domino?.id))
              showSuccessToast('El partido ha sido registrado con éxito.')

              setIsLoading(false)
            } else {
              showErrorToast('No se pudo registrar el partido. Intente más tarde.')
              setIsLoading(false)
            }
          })
          .catch(error => {
            console.log(`Error dominoes scorer: ${error}`)
            showErrorToast('No se pudo registrar el partido. Intente más tarde.')
            setIsLoading(false)
          })
      }





    } catch (error) {
      setIsLoading(false)
      console.log(`Error sending data: ${error}`)
      showErrorToast('No se pudo registrar el partido. Intente más tarde.')
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
            {isScorer && (match?.completed || domino?.completed) ?
              <TouchableOpacity
                disabled={!isScorer && (!match?.completed || !domino?.completed)}
                onPress={() => {
                  if (match?.completed || domino?.completed)
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
                  {isLoading ?
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      alignContent='center'
                      alignSelf='center'>
                      <ActivityIndicator size='large' color={colors.hard1} />
                    </Stack>
                    :
                    <MaterialIcon
                      name='celebration'
                      color={colors.hard1}
                      size={25}
                    />
                  }
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
  match: state.match,
  domino: state.domino
})

export default connect(mapStateToProps)(NavBar)