import { http } from '../http'

const BASE_URL = '/instalaciones'

class FacilitiesService {
  async getFacilities() {
    const { data, status } = await http.get(BASE_URL)
    return { data, status }
  }

  async getFacilitiesByID(ID = 1) {
    const { data, status } = await http.get(`${BASE_URL}/${ID}`)
    return { data, status }
  }
}

export default FacilitiesService