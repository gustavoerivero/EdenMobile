import AsyncStorage from '@react-native-async-storage/async-storage'

import { http } from './http'

const setSession = async (token = null, user = {}) => {
  if (token) {
    await AsyncStorage.setItem('@token', token)
    await AsyncStorage.setItem('@user', JSON.stringify(user)) 
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    await AsyncStorage.removeItem('@token')
    await AsyncStorage.removeItem('@user')
    delete http.defaults.headers.common['Authorization']
  }
}

export { setSession }