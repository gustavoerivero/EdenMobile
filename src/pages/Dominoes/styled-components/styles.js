import { StyleSheet } from 'react-native'
import colors from '../../../styled-components/colors'

const styles = StyleSheet.create({
  imageBackground: {
    opacity: 1,
    minHeight: 200,
  },
  gradient: {
    flex: 1,
    minHeight: 200,
  },

  bookmarkGradient: [
    'rgba(255, 255, 255, .3)', 
    'rgba(244, 244, 244, .4)'
  ],

  bookmarkContainer: {
    borderRadius: 15,
  },

  winnerInfo: {
    backgroundColor: '#C0F2F3',
    fontColor: '#054D50',
  },

  button: {
    backgroundColor: colors.button.bgPrimary,
    width: 125,
    borderRadius: 10
  }
})

export default styles