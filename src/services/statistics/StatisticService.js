import { http } from "../http"

const BASE_URL = `/estadisticas`

class StatisticService {
  async getBallStatisticByID(ID = 0) {
    const { data, status } = await http.get(`${BASE_URL}/bolas/${ID}`)
    return { data, status }
  }

  async getDominoStatisticByID(ID = 0) {
    const { data, status } = await http.get(`${BASE_URL}/domino/${ID}`)
    return { data, status }
  }
}

export default StatisticService
