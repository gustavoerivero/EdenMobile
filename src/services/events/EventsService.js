import { http } from "../http"

const BASE_URL = `/eventos`

const getEvents = async (page = 1) => {
  const { data, status } = await http.get(`${BASE_URL}?page=${page}`, {
    validateStatus: (status) => {
      return status < 500
    }
  })
  return { data, status }
}

const getEventByID = async (ID) => {
  const { data, status } = await http.get(`${BASE_URL}/${ID}`, {
    validateStatus: (status) => {
      return status < 500
    }
  })
  return { data, status }
}

export {
  getEvents,
  getEventByID
}

class EventService {
  async getFeed (page = 1) {
    const { data, status } = await http.get(`/feed?page=${page}`)
    return { data, status }
  }
}

export default EventService