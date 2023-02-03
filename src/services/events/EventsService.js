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

  async getAllEvents (page = 1, search = '') {
    const { data, status } = await http.get(`/feed/eventos?page=${page}&busqueda=${search}`)
    return { data, status }
  }

  async getAllActivities (page = 1, search = '') {
    const { data, status } = await http.get(`/feed/actividades?page=${page}&busqueda=${search}`)
    return { data, status }
  }

  async getAllByType (type = 1, page = 1, search) {
    const { data, status } = await http.get(`/feed/eventosactividades/tipo/${type}?page=${page}&busqueda=${search}`)
    return { data, status }
  }

}

export default EventService