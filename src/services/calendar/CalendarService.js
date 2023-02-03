import { http } from '../http'

class CalendarService {
  async get(page = 1) {
    const { data, status } = await http.get(`/calendario?page=${page}`)
    return { data, status }
  }
}

export default CalendarService