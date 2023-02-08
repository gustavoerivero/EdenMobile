import { http } from '../http'

class ScheduleService {
  async get(page = 1) {
    const { data, status } = await http.get(`/calendario?page=${page}`)
    return { data, status }
  }

  async getCalendar(ID = 0) {
    const { data, status } = await http.get(`/torneos/${ID}/calendarios`)
    return { data, status }
  }
}

export default ScheduleService