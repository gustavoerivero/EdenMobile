import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from './src/context/AuthContext'
import StackNavigation from './src/navigation/StackNavigation'

import store from './src/redux/config/store'

import 'moment-es6'

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Provider store={store} >
            <AuthProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StackNavigation />
              </SafeAreaView>
            </AuthProvider>
          </Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App