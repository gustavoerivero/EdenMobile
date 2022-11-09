import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from './src/context/AuthContext'
import StackNavigation from './src/navigation/StackNavigation'

const App = () => {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <AuthProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StackNavigation />
              </SafeAreaView>
            </AuthProvider>
          </NativeBaseProvider>
        </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App