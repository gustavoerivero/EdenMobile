import { http } from '../http'

const BASE_URL = '/api'

class AuthService {
  async login(payload = { email: null, password: null }) {
    const { data } = await http.post(`/sanctum/token`, payload)
    return data
  }
}

export default AuthService