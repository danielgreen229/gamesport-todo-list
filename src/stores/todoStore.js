import { defineStore } from 'pinia'
import { useStorage } from '@/utils/storage'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: useStorage('todos', []),
    filter: 'all',
    searchQuery: ''
  }),
  
  actions: {
    validatePriority(priority) {
      const allowedPriorities = ['low', 'medium', 'high']
      return allowedPriorities.includes(priority) ? priority : 'medium'
    },
    importTasks(tasks) {
      const validatedTasks = tasks.map(task => ({
        id: task.id || this.generateId(),
        text: task.text?.trim() || 'Новая задача',
        done: !!task.done,
        priority: this._validatePriority(task.priority),
        createdAt: task.createdAt || Date.now(),
        updatedAt: Date.now()
      }))
      this.todos = validatedTasks
      return validatedTasks.length
    },
    _validatePriority(priority) {
      const allowed = ['low', 'medium', 'high']
      return allowed.includes(priority) ? priority : 'medium'
    },
    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    },
    addTodo({ text, priority }) {
      if (typeof text !== 'string' || text.trim() === '') {
        throw new Error('Текст задачи должен быть непустой строкой')
      }
      
      if (!['low', 'medium', 'high'].includes(priority)) {
        priority = 'medium'
      }
      
      this.todos.unshift({
        id: Date.now(),
        text: String(text).trim(),
        done: false,
        priority: priority,
        createdAt: new Date().toISOString()
      })
    },
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.done = !todo.done
    },
    
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    
    updateTodo(id, newText, newPriority) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.text = newText
        todo.priority = ['low', 'medium', 'high'].includes(newPriority) 
          ? newPriority 
          : 'medium'
        todo.updatedAt = new Date()
      }
    }
  },
  getters: {
    totalTasks: (state) => state.todos.length,
    completionPercentage: (state) => {
      if (state.todos.length === 0) return 0
      return Math.round((state.doneCount / state.todos.length) * 100)
    },
    getPaginatedTodos: (state) => (page, perPage) => {
      const start = (page - 1) * perPage
      const end = start + perPage
      return state.filteredTodos.slice(start, end)
    },
    getTotalPages: (state) => (perPage) => {
      return Math.ceil(state.filteredTodos.length / perPage)
    },
    paginatedTodos: (state) => (page, perPage) => {
      const start = (page - 1) * perPage
      const end = start + perPage
      return state.filteredTodos.slice(start, end)
    },
    totalPages: (state) => (perPage) => {
      return Math.ceil(state.filteredTodos.length / perPage)
    },
    filteredTodos() {
      return this.todos.filter(t => {
        const matchesFilter = this.filter === 'all' || 
          (this.filter === 'done' ? t.done : !t.done)
        const matchesSearch = t.text.toLowerCase()
          .includes(this.searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
      })
    },
    doneCount() {
      return this.todos.filter(t => t.done).length
    }
  }
})