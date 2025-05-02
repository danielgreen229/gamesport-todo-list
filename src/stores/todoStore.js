import { defineStore } from 'pinia'
import { useStorage } from '@/utils/storage'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: useStorage('todos', []),
    filter: 'all',
    searchQuery: ''
  }),
  
  actions: {
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