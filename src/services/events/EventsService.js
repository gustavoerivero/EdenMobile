import { http } from "../http"

const BASE_URL = `/eventos`
class EventService {
  async getFeed(page = 1, search = '') {
    const { data, status } = await http.get(`/feed?page=${page}&busqueda=${search}`)
    return { data, status }
  }

  async getTypeEvents() {
    const { data, status } = await http.get(`/feed/tiposdeevento`)
    return { data, status }
  }
}

export default EventService