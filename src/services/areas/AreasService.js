import { http } from '../http'

const BASE_URL = '/areas'

class AreasService {
  async getAreas () {
    const { data, status } = await http.get(BASE_URL) 
    return { data, status }
  }

  async getAreaByID(ID = 1) {
    const { data, status } = await http.get(`${BASE_URL}/${ID}`)
    return { data, status }
  }
}

export default AreasService