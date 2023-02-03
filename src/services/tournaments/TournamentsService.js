import { http } from '../http'

const BASE_URL = '/torneos'

class TournamentService {
  async getAll (page = 1, search = '') {
    const { data, status } = await http.get(`${BASE_URL}?page=${page}&busqueda=${search}`)
    return { data, status }
  }

  async get (ID = 0) {
    const { data, status } = await http.get(`${BASE_URL}/${ID}`)
    return { data, status }
  }

  async getByTournamentType (type = 'B', page = 1, search = '') {
    const { data, status } = await http.get(`/feed${BASE_URL}/disciplina/${type}?page=${page}&busqueda=${search}`)
    return { data, status }
  }
}

export default TournamentService