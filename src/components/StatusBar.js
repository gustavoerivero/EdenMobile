import React from 'react'
import { SafeAreaView, StatusBar as Bar } from 'react-native'
import colors from '../styled-components/colors'
import styles from './styled-components/styles'

const StatusBar = ({ backgroundColor = colors.bgSecondary, hidden = false, statusBarStyle = 'default'}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Bar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={statusBarStyle}
        hidden={hidden} />
    </SafeAreaView>
  )
}

export default StatusBar