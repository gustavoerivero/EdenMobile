import { http } from "../http"

const BASE_URL = `/user`

class UserService {
  async getUser() {
    const { data, status } = await http.get(`${BASE_URL}`, {
      validateStatus: (status) => {
        return status < 500
      }
    })
    return { data, status }
  }
}

export default UserService
