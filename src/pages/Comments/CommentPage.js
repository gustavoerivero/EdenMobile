import React, { useState, useCallback } from 'react'
import {
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native'

import {
  VStack,
  Stack,
  HStack,
  Text,
  Divider,
  FlatList,
  Box,
  Button,
} from 'native-base'

import { AirbnbRating } from '@rneui/themed'

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
import useAuthContext from '../../hooks/useAuthContext'
import { useFocusEffect } from '@react-navigation/native'
import CommentService from '../../services/comments/CommentService'
import useCustomToast from '../../hooks/useCustomToast'

const CommentPage = ({ navigation, route }) => {
  const event = route?.params

  const Comment = new CommentService()

  const { isLoading, startLoading, stopLoading } = useLoading()
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const [comments, setComments] = useState([])

  const { showSuccessToast, showWarningToast, showErrorToast } = useCustomToast()

  const {
    state: { user }
  } = useAuthContext()

  const calculateAge = (date = new Date()) => {
    let ageDifMs = Date.now() - date.getTime()
    let ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const [age, setAge] = useState(calculateAge(new Date()))

  const getData = async () => {
    try {
      startLoading()
      const { data, status } = await Comment.getComment(event?.id, event?.type)

      setComments(data)
      status >= 200 && status <= 299 && stopLoading()

    } catch (error) {
      console.log(`Event page error: ${error}`)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData()
      if (user?.token) {
        setAge(calculateAge(new Date(user?.user?.usuario?.fecha_nacimiento)))
      }
      console.log(event?.type)
    }, [user, isCommentLoading])
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [year, setYear] = useState(0)
  const [partner, setPartner] = useState(false)

  const [text, setText] = useState('')

  const [valoration, setValoration] = useState(5)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setIsNextPage(true)
    setCurrentPage(1)
    getData()
    setRefreshing(false)
  }, [])

  const renderItem = ({ item }) => {
    return (
      <Stack m={1}>
        <CommentCard
          userID={item.id}
          name={item.nombre}
          years={item.edad}
          partner={item.es_socio === '0' ? false : true}
          comment={item.comentario}
          valoration={item?.valoracion}
          date={item?.creado || new Date()}
        />
      </Stack>
    )
  }

  const renderLoader = () => {
    return (
      isLoading && (
        <Stack
          my={2}
          alignItems="center"
          justifyContent="center"
          alignContent="center"
          alignSelf="center">
          <ActivityIndicator size="large" color={colors.primary} />
        </Stack>
      )
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1)
  }

  const submitValidation = () => {
    if (user?.token) {
      return text?.length > 0
    }
    return name?.length > 0 && year >= 12 && text?.length > 0
  }

  const defaultValues = () => {
    if (submitValidation) {
      setName('')
      setYear(0)
      setPartner(false)
      setText('')
      setOpen(false)
      setValoration(5)
    }
  }

  const submit = async () => {

    try {

      setIsCommentLoading(true)

      let auxComment = {
        nombre: user?.token ? `${user?.user?.usuario?.nombres} ${user?.user?.usuario?.apellidos}` : name,
        edad: user?.token ? calculateAge(new Date(user?.user?.usuario?.fecha_nacimiento)) : year,
        comentario: text,
        es_socio: partner,
        valoracion: valoration
      }

      const { data, status } = await Comment.saveComment(event?.id, auxComment, event?.type)

      console.log(data)

      if (status >= 200 && status <= 299) {
        showSuccessToast('El comentario ha sido registrado con éxito.')
        defaultValues()
        navigation?.navigate('Comentarios', event)
        setIsCommentLoading(false)
      } else {
        showErrorToast('No se pudo registrar el comentario.')
        setIsCommentLoading(false)
      }

    } catch (error) {
      showErrorToast('No se pudo registrar el comentario.')
      setIsCommentLoading(false)
      console.log(`Comment save error: ${error}`)
    }
  }

  return (
    <Container hiddenNavBar={true}>
      <VStack h="100%" maxW="100%">
        <KeyboardAvoidingView
          keyboardShouldPersistTaps="true"
          behavior="height">
          <Stack pt={2} px={2}>
            <HStack px={3} my={1} alignItems="center" maxW="95%">
              <TouchableOpacity onPress={() => navigation?.goBack()}>
                <Icon
                  name="arrow-back-outline"
                  color={colors.text.description}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                ml="1"
                fontSize="lg"
                bold
                color={colors.text.primary}
                alignContent="center">
                Comentarios de {cutText(event?.title, 22)}
              </Text>
            </HStack>
            <Divider bgColor={colors.navBar.activeColor} borderRadius={50} />
          </Stack>
        </KeyboardAvoidingView>

        <Stack h="85%" pb="6">
          {isLoading ?
            <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
              <ActivityIndicator size='large' color={colors.primary} />
            </Stack>
            :
            <FlatList
              px={2}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={comments}
              keyExtractor={item => item?.id}
              renderItem={renderItem}
              ListFooterComponent={renderLoader}
              onEndReached={loadMoreItem}
            />
          }

        </Stack>

        <Stack position="absolute" bottom="0">
          <Divider bgColor={colors.gray4} borderRadius={50} />
          <StyledArea
            placeholder="Escribe un comentario..."
            value={text}
            onChangeText={data => setText(data)}
            InputRightElement={
              <TouchableOpacity
                onPress={() => {
                  setOpen(true)
                }}
                disabled={text?.length <= 0}>
                <Box pr={4}>
                  <FontIcon
                    name="location-arrow"
                    color={
                      text?.length <= 0
                        ? colors.text.description
                        : colors.navBar.activeColor
                    }
                    size={30}
                  />
                </Box>
              </TouchableOpacity>
            }
          />
        </Stack>
      </VStack>

      {open && (
        <StyledModal top={6} left={1}>
          <VStack maxW="80%">
            <Text bold fontSize="sm" color={colors.gray}>
              Comentario
            </Text>
            <Divider bgColor={colors.navBar.activeColor} borderRadius={50} />
          </VStack>
          <VStack maxW="80%" p={1} space={2}>
            <Text
              fontSize="xs"
              textAlign="justify"
              color={colors.gray}
              lineHeight={13}
            >
              {user?.token ?
                `${user?.user?.usuario?.nombres} ${user?.user?.usuario?.apellidos}, ¿Podrías darnos más información para agregarla a tu comentario?`
                :
                'Notamos que aún no eres usuario en nuestra aplicación, ¿Podrías darnos más información para agregarla a tu comentario?'
              }
            </Text>
            <HStack space={1} alignItems="center">
              <Stack w="20%">
                <Text
                  bold
                  fontSize="xs"
                  textAlign="right"
                  color={colors.text.description}>
                  Tu nombre
                </Text>
              </Stack>
              <Stack minW="80%">
                <StyledField
                  isDisabled={user?.token}
                  value={user?.token ? `${user?.user?.usuario?.nombres} ${user?.user?.usuario?.apellidos}` : name}
                  onChangeText={data => {
                    if (!user?.token) {
                      setName(data)
                    }
                  }}
                />
              </Stack>
            </HStack>
            <HStack space={1} alignItems="center">
              <Stack w="20%">
                <Text
                  bold
                  fontSize="xs"
                  textAlign="right"
                  lineHeight={12}
                  color={colors.text.description}>
                  ¿Cuál es tu edad?
                </Text>
              </Stack>
              <Stack w="25%">
                {user?.token ?
                  <Box
                    bgColor={colors.textField.bgSecondColor}
                    borderColor={colors.base}
                    borderRadius={12}
                    h={7}
                    m={1}
                    px={2}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Text
                      color={colors.gray}
                      fontSize='sm'
                    >
                      {age}
                    </Text>
                  </Box>
                  :
                  <StyledField
                    value={year}
                    onChangeText={data => {
                      if (!user?.token) {
                        setYear(data)
                      }
                    }}
                  />
                }
              </Stack>
              <Stack w="25%">
                <Text
                  bold
                  fontSize="xs"
                  textAlign="right"
                  lineHeight={12}
                  color={colors.text.description}>
                  ¿Eres socio del club?
                </Text>
              </Stack>
              <Stack w="27%" alignItems="center" justifyContent="center">
                <StyledSwitch value={partner} setValue={setPartner} />
              </Stack>
            </HStack>
            <Text
              bold
              pl={1}
              fontSize="xs"
              lineHeight={12}
              color={colors.text.description}>
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
              inputW="100%"
              inputMD="10%"
              textSize="sm"
              inputH={7}
              w="100%"
              value={text}
              onChangeText={data => setText(data)}
            />
            <Text
              bold
              pl={1}
              fontSize="xs"
              lineHeight={12}
              color={colors.text.description}>
              Tu valoración
            </Text>
            <AirbnbRating
              count={5}
              showRating={false}
              size={15}
              defaultRating={valoration}
              onFinishRating={(value) => setValoration(value)}
              minValue={1}
              selectedColor={colors.primary}
              unSelectedColor={colors.gray2}
            />
          </VStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            pt={3}
            pl={2}
            pr={1}>
            <Button
              w="40%"
              h="100%"
              borderRadius={10}
              shadow={3}
              justifyContent="center"
              alignItems="center"
              bgColor={colors.gray1}
              onPress={() => setOpen(false)}>
              <Text bold fontSize="md" color={colors.gray}>
                Cancelar
              </Text>
            </Button>
            <Button
              disabled={
                name?.length <= 0 &&
                (year < 12 || year > 99) &&
                text?.length <= 0
              }
              w="40%"
              h="100%"
              borderRadius={10}
              shadow={3}
              justifyContent="center"
              alignItems="center"
              isLoading={isCommentLoading}
              bgColor={
                user?.token && text?.length > 0 ? colors.button.bgPrimary :
                  name?.length > 0 && year >= 12 && year <= 99 && text?.length > 0
                    ? colors.button.bgPrimary
                    : colors.gray
              }
              onPress={submit}>
              <Text bold fontSize="md" color={colors.white}>
                Comentar
              </Text>
            </Button>
          </HStack>
        </StyledModal>
      )}
    </Container>
  )
}

export default CommentPage
