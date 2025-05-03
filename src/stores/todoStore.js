import { defineStore } from 'pinia'
import { useStorage } from '@/utils/storage'
import { computed } from 'vue'
import todoApi from '@/api/todoApi'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: useStorage('todos', []),
    isOnline: navigator.onLine,
    filter: 'all',
    searchQuery: '',
    isLoading: false
  }),
  
  actions: {
    setOnlineStatus(status) {
      this.isOnline = status;
    },
    setupNetworkListener() {
      window.addEventListener('online', () => this.setOnlineStatus(true));
      window.addEventListener('offline', () => this.setOnlineStatus(false));
    },
    async fetchTodos() {
      try {
        this.isLoading = true
        const data = await todoApi.getTodos()
        this.todos = data
      } catch (error) {
        console.error('Ошибка загрузки:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async syncWithServer() {
      await this.fetchTodos()
    },

    validatePriority(priority) {
      const allowedPriorities = ['low', 'medium', 'high']
      return allowedPriorities.includes(priority) ? priority : 'medium'
    },

    async importTasks(tasks) {
      try {
        const validatedTasks = tasks.map(task => ({
          id: task.id || this.generateId(),
          text: task.text?.trim() || 'Новая задача',
          done: !!task.done,
          priority: this._validatePriority(task.priority),
          createdAt: task.createdAt || Date.now(),
          updatedAt: Date.now()
        }))
        
        await Promise.all(
          validatedTasks.map(task => todoApi.createTodo(task))
        )
        await this.syncWithServer()
        return validatedTasks.length
      } catch (error) {
        console.error('Ошибка импорта:', error)
        throw error
      }
    },

    _validatePriority(priority) {
      const allowed = ['low', 'medium', 'high']
      return allowed.includes(priority) ? priority : 'medium'
    },

    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    },

    async addTodo({ text, priority }) {
      try {
        if (typeof text !== 'string' || text.trim() === '') {
          throw new Error('Текст задачи должен быть непустой строкой')
        }
        
        const validatedPriority = this.validatePriority(priority)
        const newTodo = {
          id: Date.now(),
          text: text.trim(),
          done: false,
          priority: validatedPriority,
          createdAt: new Date().toISOString()
        }
        
        await todoApi.createTodo(newTodo)
        await this.syncWithServer()
      } catch (error) {
        console.error('Ошибка создания:', error)
        throw error
      }
    },

    async toggleTodo(id) {
      try {
        const todo = this.todos.find(t => t.id === id)
        if (todo) {
          const updatedTodo = { ...todo, done: !todo.done }
          await todoApi.updateTodo(id, updatedTodo)
          await this.syncWithServer()
        }
      } catch (error) {
        console.error('Ошибка обновления:', error)
        throw error
      }
    },

    async deleteTodo(id) {
      try {
        await todoApi.deleteTodo(id)
        await this.syncWithServer()
      } catch (error) {
        console.error('Ошибка удаления:', error)
        throw error
      }
    },

    async updateTodo(id, newText, newPriority) {
      try {
        const todo = this.todos.find(t => t.id === id)
        if (todo) {
          const updates = {
            text: newText,
            priority: this.validatePriority(newPriority),
            updatedAt: new Date().toISOString()
          }
          await todoApi.updateTodo(id, updates)
          await this.syncWithServer()
        }
      } catch (error) {
        console.error('Ошибка обновления:', error)
        throw error
      }
    }
  },

  getters: {
    totalTasks: (state) => state.todos.length,
    doneCount: (state) => state.todos.filter(t => t.done).length,
    completionPercentage: (state) => {
      if (state.todos.length === 0) return 0
      return Math.round((state.doneCount / state.todos.length) * 100)
    },
    filteredTodos: (state) => {
      return computed(() => {
        return state.todos.filter(t => {
          const matchesFilter = state.filter === 'all' || 
            (state.filter === 'done' ? t.done : !t.done)
          const matchesSearch = t.text?.toLowerCase()
            .includes(state.searchQuery.toLowerCase())
          return matchesFilter && matchesSearch
        })
      }).value
    },
    getPaginatedTodos: (state) => (page, perPage) => {
      const start = (page - 1) * perPage
      const end = start + perPage
      return state.filteredTodos.slice(start, end)
    },
    getTotalPages: (state) => (perPage) => {
      return Math.ceil(state.filteredTodos.length / perPage)
    }
  }
})