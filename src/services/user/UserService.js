import { http } from "../http"

const BASE_URL = `/user`

const URL = `/usuarios`

class UserService {
  async getUser() {
    const { data, status } = await http.get(`${BASE_URL}`, {
      validateStatus: (status) => {
        return status < 500
      }
    })
    return { data, status }
  }

  async getUserByID(ID = 0) {
    const { data, status } = await http.get(`${URL}/${ID}`)
    return { data, status }
  }

  async updateUser(values) {
    const { data, status } = await http.post(`${URL}/actualizar/basico`, values )
    return { data, status }
  }
}

export default UserService
