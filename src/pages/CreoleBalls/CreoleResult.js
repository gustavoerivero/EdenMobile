import React, { useCallback, useState } from 'react'

import { useDispatch, connect } from 'react-redux'
import { deleteMatch } from '../../redux/config/actions'

import { useWindowDimensions } from 'react-native'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'
import { useFocusEffect } from '@react-navigation/native'
import TournamentService from '../../services/tournaments/TournamentsService'
import useCustomToast from '../../hooks/useCustomToast'

const CreoleResult = ({ navigation, match }) => {

  const layout = useWindowDimensions()

  const dispatch = useDispatch()

  const Tournament = new TournamentService()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const [isLoading, setIsLoading] = useState(false)

  const sendData = async (match = {}) => {
    
    setIsLoading(true)
    try {
      const { data, status } = await Tournament.save(match)

      console.log({ data, status })

      if (status >= 200 && status <= 299) {
        dispatch(deleteMatch(match?.id))
        showSuccessToast('El partido ha sido registrado con éxito.')
        navigation?.navigate('Home')
        setIsLoading(false)
      } else {
        showErrorToast('No se pudo registrar el partido. Intente más tarde.')
        navigation?.navigate('Home')
        setIsLoading(false)
      }

    } catch (error) {
      console.log(`Error sending data: ${error}`)
      showErrorToast('No se pudo registrar el partido. Intente más tarde.')
      setIsLoading(false)
      navigation?.navigate('Home')
    }
  }

  useFocusEffect(
    useCallback(() => {
      //console.log(match)
    }, [match])
  )

  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        maxW='100%'
        minH='100%'
        maxH='100%'
        justifyContent='space-between'
      >
        <Stack
          minH='91%'
          maxH='91%'
        >
          <Stack
            minH='10%'
            maxH='10%'
            py={5}
            alignItems='center'
            justifyContent='space-between'
          >
            <Text
              fontSize='xl'
              color={colors.creoleStartGame.scoreColor}
              textAlign='left'
              bold
            >
              Resultados finales
            </Text>
          </Stack>

          <VStack
            space={4}
          >
            <Box
              borderRadius={10}
              borderWidth={3}
              mx={2}
              borderColor={colors.gray3}
              h={150}
            >
              <HStack
                justifyContent='space-between'
              >
                <Stack
                  minW='30%'
                  maxW='30%'
                >
                  <Box
                    bgColor={match?.teamA?.nombre === match?.initialTeam?.nombre ? match?.colorTeamA : match?.colorTeamB}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={colors.gray}
                      size={120}
                    />
                  </Box>
                </Stack>
                <VStack
                  minW='60%'
                  maxW='60%'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='md'
                    color={colors.creoleStartGame.teamSelectedTextColor}
                    textAlign='center'
                    pt={1}
                  >
                    {match?.teamA?.nombre}
                  </Text>
                  <Text
                    bold
                    fontSize='6xl'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {match?.teamAScore}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box
              borderRadius={10}
              borderWidth={3}
              mx={2}
              borderColor={colors.gray3}
              h={150}
            >
              <HStack
                justifyContent='space-between'
              >
                <Stack
                  minW='30%'
                  maxW='30%'
                >
                  <Box
                    bgColor={match?.teamA?.nombre !== match?.initialTeam?.nombre ? match?.colorTeamA : match?.colorTeamB}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={colors.gray}
                      size={120}
                    />
                  </Box>
                </Stack>
                <VStack
                  minW='60%'
                  maxW='60%'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='md'
                    color={colors.creoleStartGame.teamSelectedTextColor}
                    textAlign='center'
                    pt={1}
                  >
                    {match?.teamB?.nombre}
                  </Text>
                  <Text
                    bold
                    fontSize='6xl'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {match?.teamBScore}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>

          <Stack
            my={6}
            w='100%'
            alignItems='center'
          >
            <Box
              mx={3}
              my={5}
              h={100}
              borderRadius={10}
              bgColor={colors.creoleStartGame.winner}
              w='90%'
            >
              <VStack>
                <Stack
                  minW='100%'
                  maxW='100%'
                  minH='26%'
                  maxH='26%'
                  pl={3}
                  justifyContent='center'
                  alignItems='flex-start'
                >
                  <HStack
                    alignItems='center'
                    space={1}
                    mt={1}
                  >
                    <Icon
                      name='star'
                      color={colors.creoleStartGame.textWinner}
                      size={15}
                    />
                    <Text
                      bold
                      fontSize='md'
                      color={colors.creoleStartGame.textWinner}
                    >
                      Ganador
                    </Text>
                  </HStack>
                </Stack>
                <Stack
                  minW='100%'
                  maxW='100%'
                  minH='74%'
                  maxH='74%'
                  pt={2}
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='xl'
                    textAlign='center'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {match?.teamAScore === match?.teamBScore ? 'Empate' :
                      match?.teamAScore > match?.teamBScore ?
                        `Equipo ${match?.teamA?.nombre}` :
                        `Equipo ${match?.teamB?.nombre}`
                    }
                  </Text>
                </Stack>
              </VStack>
            </Box>
          </Stack>

        </Stack>

        <VStack
          space={2}
          px={5}
          alignItems='center'
          minH='9%'
          maxH='9%'
        >
          <Divider
            bgColor={colors.divider.primary}
            borderRadius={50}
          />
          <HStack
            justifyContent='center'
            minW='100%'
            space={2}
          >
            <Button
              w={layout.width * .8}
              h={layout.height * .055}
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={isLoading ? colors.gray2 : colors.button.bgPrimary}
              _pressed={colors.bgSecondary}
              onPress={() => {
                sendData(match)
              }}
              isLoading={isLoading}
            >
              <Text
                bold
                fontSize='md'
                color={isLoading ? colors.gray : colors.white}
              >
                Registrar juego
              </Text>
            </Button>
          </HStack>
        </VStack>

      </VStack>
    </Container >
  )
}

const mapStateToProps = (state) => ({
  match: state.match
})

export default connect(mapStateToProps)(CreoleResult)