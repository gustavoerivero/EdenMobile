import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'

import { useDispatch, connect } from 'react-redux'
import { deleteDomino } from '../../redux/config/actions'

import { VStack, HStack, Stack, Text, Divider, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import Container from '../../components/Container'
import colors from '../../styled-components/colors'
import useCustomToast from '../../hooks/useCustomToast'
import TournamentService from '../../services/tournaments/TournamentsService'

const DominoResult = ({ navigation, route, match, domino }) => {

  const layout = useWindowDimensions()

  const Tournament = new TournamentService()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const sendData = async (domino = {}) => {

    setIsLoading(true)
    try {
      console.log(domino)
      const { data, status } = await Tournament.saveDomino(domino)

      console.log({ data, status })

      if (status >= 200 && status <= 299) {
        dispatch(deleteDomino(domino?.id))
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
                    bgColor={colors.gray1}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={domino?.teamAScore === domino?.teamBScore ? colors.gray :
                        domino?.teamAScore > domino?.teamBScore ?
                          colors.creoleStartGame.textWinner :
                          colors.gray
                      }
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
                    {domino?.teamA?.nombre}
                  </Text>
                  <Text
                    bold
                    fontSize='6xl'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {domino?.teamAScore}
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
                    bgColor={colors.gray1}
                    borderRadius={10}
                    shadow={7}
                    w={150}
                    h={150}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Icon
                      name='people'
                      color={domino?.teamAScore === domino?.teamBScore ? colors.gray :
                        domino?.teamAScore < domino?.teamBScore ?
                          colors.creoleStartGame.textWinner :
                          colors.gray
                      }
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
                    {domino?.teamB?.nombre}
                  </Text>
                  <Text
                    bold
                    fontSize='6xl'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {domino?.teamBScore}
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
                  minH='20%'
                  maxH='20%'
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
                  minH='80%'
                  maxH='80%'
                  pt={3}
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  <Text
                    bold
                    fontSize='xl'
                    textAlign='center'
                    color={colors.creoleStartGame.scoreColor}
                  >
                    {domino?.teamAScore === domino?.teamBScore ? 'Empate' :
                      domino?.teamAScore > domino?.teamBScore ?
                        `Equipo ${domino?.teamA?.nombre}` :
                        `Equipo ${domino?.teamB?.nombre}`
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
                sendData(domino)
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
  match: state.match,
  domino: state.domino
})

export default connect(mapStateToProps)(DominoResult)