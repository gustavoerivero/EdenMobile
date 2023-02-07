import { Dimensions } from 'react-native'
import { useToast, Avatar, Text, HStack } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../styled-components/colors'

const { width } = Dimensions.get('window')

const Toast = ({ id = 0, bgIconColor = null, iconColor = 'white', outline = false, text = 'Hello World!', color = colors.primary, bgColor = colors.secundary }) => (
  <HStack
    id={id}
    h='20'
    w={width}
    bottom={-50}
    backgroundColor={bgColor}
    px={10}
    pr={20}
    space={2}
    alignItems='center'
  >
    <Avatar bgColor={bgIconColor || color}>
      <Icon
        name={`information`}
        size={30}
        color={iconColor}
      />
    </Avatar>
    <Text color={color} bold pr={2} textAlign='justify' >
      {text}
    </Text>
  </HStack>
)

const useCustomToast = () => {
  const toast = useToast()

  const showSuccessToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} bgColor={colors.bgPrimary} />
      },
    })
  }

  const showWarningToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast
          id={id}
          text={text}
          color={colors.error.warningText}
          bgColor={colors.error.warning}
        />
      },
    })
  }

  const showErrorToast = (text = '') => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} color={colors.error.primary} bgColor={colors.error.bgError} />
      },
    })
  }

  const showCustomToast = (text = '', color = colors.gray, bgColor = colors.bgPrimary) => {
    toast.show({
      render: ({ id }) => {
        return <Toast id={id} text={text} color={color} bgColor={bgColor} />
      },
    })
  }

  return {
    showSuccessToast,
    showWarningToast,
    showErrorToast,
    showCustomToast,
  }
}

export default useCustomToast