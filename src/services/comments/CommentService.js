import { http } from '../http'

const urlType = (type = 'E') => {
  return `${type ? type === 'E' ? 'eventos' : type === 'T' ? 'torneos' : 'eventos' : 'eventos'}`
}

class CommentService { 

  async saveComment (id = 0, comment = {}, type = 'E') {
    const { data, status } = await http.post(`/${urlType(type)}/${id}/comentarios`, comment)
    return { data, status}
  }

  async getComment (id = 0, type = 'E') {
    const { data, status } = await http.get(`/${urlType(type)}/${id}/comentarios`)
    return { data, status}
  }

}

export default CommentService