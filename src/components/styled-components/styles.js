import { StyleSheet } from 'react-native'
import colors from '../../styled-components/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  containerOut: {
    minHeight: '100%',
    backgroundColor: colors.gray1
  },
  buttonsContainer: {
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8
  },

})

export default styles