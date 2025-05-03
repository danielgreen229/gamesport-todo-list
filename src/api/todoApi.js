import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001' 
})

export default {
  async getTodos() {
    const { data } = await api.get('/todos')
    return data
  },

  async createTodo(todo) {
    const { data } = await api.post('/todos', todo)
    return data
  },

  async updateTodo(id, updates) {
    const { data } = await api.patch(`/todos/${id}`, updates)
    return data
  },

  async deleteTodo(id) {
    await api.delete(`/todos/${id}`)
  }
}