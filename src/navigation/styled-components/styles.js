import { StyleSheet } from 'react-native'
import colors from '../../styled-components/colors'

const styles = StyleSheet.create({
  postPage: {
    backgroundColor: colors.navBar.activeColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.bgPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  stackStyles: {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.secondary,
  },
})

export default styles