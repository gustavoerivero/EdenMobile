import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const BASE_URL = 'https://medinajosedev.com/api'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

const checkData = async (error) => {
  const data = await AsyncStorage.getItem('@id')

  if (error.response && [401, 419].includes(error.response.status) && data) {
    await AsyncStorage.removeItem('@id')
    await AsyncStorage.removeItem('@token')
    await AsyncStorage.removeItem('@user')
    delete http.defaults.headers.common['Authorization']
  }

  return Promise.reject(error)
}

http.interceptors.response.use(response => {
  return response
}, error => {
  checkData(error)
    .then(response => console.log(response))
    .catch(error => console.log(error))
})

export const putToken = (token = null) => {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    console.log(`Token isn't exist.`)
  }
}

export const getConnection = async () => {
  const { data, status } = await http.get('/', {
    validateStatus: (status) => {
      return status < 500
    }
  })
  return { data, status }
}

