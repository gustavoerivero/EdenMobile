import React, { useState, useCallback } from 'react'
import { TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'

import { VStack, Stack, HStack, Text, Divider, FlatList, Box, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/FontAwesome'

import Container from '../../components/Container'
import CommentCard from '../../components/CommentComponents/CommentCard'

import colors from '../../styled-components/colors'

import { cutText } from '../../utilities/functions'
import useLoading from '../../hooks/useLoading'
import StyledArea from '../../components/CommentComponents/StyledArea'
import StyledModal from '../../components/Modal'
import StyledField from '../../components/CommentComponents/StyledField'
import StyledSwitch from '../../components/StyledSwitch'

const CommentPage = ({ navigation, route }) => {

  const event = route?.params

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [year, setYear] = useState(0)
  const [partner, setPartner] = useState(false)

  const [text, setText] = useState('')

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setIsNextPage(true)
    setCurrentPage(1)
    setRefreshing(false)
  }, [])

  const renderItem = ({ item }) => {
    return (
      <Stack
        m={1}
      >
        <CommentCard
          userID={item.id}
          name={item.username}
          years={item.years}
          partner={item.partner}
          comment={item.comment}
          date={item.date}
        />
      </Stack>
    )
  }

  const renderLoader = () => {
    return (
      isLoading &&
      <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
        <ActivityIndicator size='large' color={colors.primary} />
      </Stack>
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1)
  }

  const submitValidation = () => {
    return name?.length > 0 && year >= 12 && text?.length > 0
  }

  const submit = () => {
    if (submitValidation) {
      setName('')
      setYear(0)
      setPartner(false)
      setText('')
      setOpen(false)
    }
  }

  const comments = [
    {
      id: 0,
      username: 'Gustavo Rivero',
      years: 25,
      partner: true,
      date: '2023-01-30',
      comment: 'El torneo de dominó de este fin de semana fue emocionante de seguir. Aunque no pude asistir, vi algunos vídeos en línea y pude ver la emoción en las caras de los jugadores mientras competían.'
    },
    {
      id: 1,
      username: 'Amber Lopéz',
      years: 21,
      partner: false,
      date: '2023-01-29',
      comment: 'El torneo de dominó de este fin de semana fue emocionante de seguir. Aunque no pude asistir, vi algunos vídeos en línea y pude ver la emoción en las caras de los jugadores mientras competían.'
    },
    {
      id: 2,
      username: 'José Medina',
      years: 26,
      partner: false,
      date: '2023-01-29',
      comment: 'Lamentablemente no pude asistir al torneo de dominó este fin de semana, pero he estado siguiendo los resultados en línea. ¡Felicidades a todos los ganadores!'
    },
    {
      id: 3,
      username: 'Leo Messi',
      years: 35,
      partner: true,
      date: '2023-01-29',
      comment: '¡Acabé de regresar del torneo de dominó y fue increíble! Los niveles de habilidad eran impresionante y realmente disfruté ver a los mejores jugadores competir'
    },
    {
      id: 4,
      username: 'Luis Valladares',
      years: 25,
      partner: true,
      date: '2023-01-29',
      comment: 'El torneo de dominó fue impresionante, organizado y emocionante. Altamente recomendable para cualquier jugador de dominó...'
    },
    {
      id: 5,
      username: 'Christina Zanetti',
      years: 23,
      partner: false,
      date: '2023-01-29',
      comment: '¡Qué increíble cómo se desempeñó el toreno! Fue verdaderamente impresionante. Estoy a la espera de un próximo torneo y que en esta pronta ocasión se habiliten más puestos para competir. El dinamismo, la estrategia, el mismo desempeño de los integrantes, realmente fue maravilloso.'
    },
  ]


  return (
    <Container
      hiddenNavBar={true}
    >
      <VStack
        h='100%'
        maxW='100%'
        justifyContent='space-between'
      >
        <Stack
          h={10}
          px={2}
        >
          <HStack
            pt={1}
            px={3}
            alignItems='center'
            maxW='95%'
          >
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
            >
              <Icon
                name='arrow-back-outline'
                color={colors.text.description}
                size={30}
              />
            </TouchableOpacity>
            <Text
              fontSize='lg'
              bold
              color={colors.text.primary}
              alignContent='center'
            >
              Comentarios de {cutText(event?.title, 22)}
            </Text>
          </HStack>
          <Divider
            bgColor={colors.navBar.activeColor}
            borderRadius={50}
          />
        </Stack>
        <Stack>
          <FlatList
            px={2}
            h='84%'
            maxH='84%'
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={comments?.reverse()}
            keyExtractor={item => item?.id}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
          />
          <Stack
            minH='15%'
          >
            <Divider
              bgColor={colors.gray4}
              borderRadius={50}
            />
            <StyledArea
              placeholder='Escribe un comentario...'
              value={text}
              onChangeText={(data) => setText(data)}
              InputRightElement={
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true)
                  }}
                  disabled={text?.length <= 0}
                >
                  <Box
                    pr={3}
                  >
                    <FontIcon
                      name='location-arrow'
                      color={text?.length <= 0 ?
                        colors.text.description :
                        colors.navBar.activeColor
                      }
                      size={30}
                    />
                  </Box>
                </TouchableOpacity>
              }
            />
          </Stack>
        </Stack>

      </VStack>
      {open &&
        <StyledModal
          top={6}
          left={1}
        >
          <VStack
            maxW='80%'
          >
            <Text
              bold
              fontSize='sm'
              color={colors.gray}
            >
              Comentario
            </Text>
            <Divider
              bgColor={colors.navBar.activeColor}
              borderRadius={50}
            />
          </VStack>
          <VStack
            maxW='80%'
            p={1}
            space={2}
          >
            <Text
              fontSize='xs'
              textAlign='justify'
              color={colors.gray}
              lineHeight={13}
            >
              Notamos que aún no eres usuario en nuestra
              aplicación, ¿Podrías darnos más información
              para agregarla a tu comentario?
            </Text>
            <HStack
              space={1}
              alignItems='center'
            >
              <Stack
                w='20%'
              >
                <Text
                  bold
                  fontSize='xs'
                  textAlign='right'
                  color={colors.text.description}
                >
                  Tu nombre
                </Text>
              </Stack>
              <Stack
                minW='80%'
              >
                <StyledField
                  value={name}
                  onChangeText={data => setName(data)}
                />
              </Stack>
            </HStack>
            <HStack
              space={1}
              alignItems='center'
            >
              <Stack
                w='20%'
              >
                <Text
                  bold
                  fontSize='xs'
                  textAlign='right'
                  lineHeight={12}
                  color={colors.text.description}
                >
                  ¿Cuál es tu edad?
                </Text>
              </Stack>
              <Stack
                w='25%'
              >
                <StyledField
                  type='number'
                  value={year}
                  onChangeText={data => setYear(data)}
                />
              </Stack>
              <Stack
                w='25%'
              >
                <Text
                  bold
                  fontSize='xs'
                  textAlign='right'
                  lineHeight={12}
                  color={colors.text.description}
                >
                  ¿Eres socio del club?
                </Text>
              </Stack>
              <Stack
                w='27%'
                alignItems='center'
                justifyContent='center'
              >
                <StyledSwitch
                  value={partner}
                  setValue={setPartner}
                />
              </Stack>
            </HStack>
            <Text
              bold
              pl={1}
              fontSize='xs'
              lineHeight={12}
              color={colors.text.description}
            >
              Tu comentario
            </Text>
            <StyledArea
              px={0}
              py={0}
              m={0}
              minH={10}
              maxH={20}
              h={20}
              bgColor={colors.textField.bgSecondColor}
              inputW='100%'
              inputMD='10%'
              textSize='sm'
              inputH={7}
              w='100%'
              value={text}
              onChangeText={data => setText(data)}
            />
          </VStack>
          <HStack
            justifyContent='space-between'
            alignItems='center'
            pt={1}
            pl={2}
            pr={1}
          >
            <Button
              w='40%'
              h='100%'
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={colors.gray1}
              onPress={() => setOpen(false)}
            >
              <Text
                bold
                fontSize='md'
                color={colors.gray}
              >
                Cancelar
              </Text>
            </Button>
            <Button
              disabled={
                name?.length <= 0 &&
                year < 12 && text?.length <= 0
              }
              w='40%'
              h='100%'
              borderRadius={10}
              shadow={3}
              justifyContent='center'
              alignItems='center'
              bgColor={
                name?.length > 0 &&
                year >= 12 && text?.length > 0
                ? colors.button.bgPrimary : colors.gray}
              onPress={submit}
            >
              <Text
                bold
                fontSize='md'
                color={colors.white}
              >
                Comentar
              </Text>
            </Button>
          </HStack>
        </StyledModal>
      }
    </Container>
  )
}

export default CommentPage