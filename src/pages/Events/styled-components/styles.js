import { StyleSheet } from 'react-native'

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
  }
})

export default styles