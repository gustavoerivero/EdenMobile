import axios from 'axios'

export const BASE_URL = 'https://medinajosedev.com/api'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})