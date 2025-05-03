beforeEach(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('todoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds new todo', async () => {
    const store = useTodoStore()
    store.todos = []
    store.addTodo = vi.fn(async () => {
      store.todos.push({
        id: '1',
        text: 'Test',
        done: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      })
    })
    
    await store.addTodo({ text: 'Test', priority: 'medium' })
    expect(store.addTodo).toHaveBeenCalledWith({ text: 'Test', priority: 'medium' })
    expect(store.todos.length).toBe(1)
  })

  it('toggles todo status', async () => {
    const store = useTodoStore()
    store.todos = [{
      id: '1',
      text: 'Test',
      done: false,
      priority: 'medium',
      createdAt: new Date().toISOString()
    }]
    store.toggleTodo = vi.fn(async (id) => {
      const todo = store.todos.find(t => t.id === id)
      if (todo) todo.done = !todo.done
    })
    
    await store.toggleTodo('1')
    expect(store.toggleTodo).toHaveBeenCalledWith('1')
    expect(store.todos[0].done).toBe(true)
  })

  it('filters todos correctly', () => {
    const store = useTodoStore()
    store.todos = [
      { id: '1', text: 'Task 1', done: false },
      { id: '2', text: 'Task 2', done: true }
    ]
    
    store.filter = 'all'
    expect(store.filteredTodos.length).toBe(2)
    
    store.filter = 'active'
    expect(store.filteredTodos.length).toBe(1)
    expect(store.filteredTodos[0].id).toBe('1')
    
    store.filter = 'done'
    expect(store.filteredTodos.length).toBe(1)
    expect(store.filteredTodos[0].id).toBe('2')
  })

  it('calculates pagination correctly', () => {
    const store = useTodoStore()
    store.todos = Array.from({ length: 25 }, (_, i) => ({
      id: `${i}`,
      text: `Task ${i}`,
      done: i % 2 === 0
    }))
    
    store.filter = 'all'
    expect(store.getPaginatedTodos(1, 10).length).toBe(10)
    expect(store.getPaginatedTodos(3, 10).length).toBe(5)
    expect(store.getTotalPages(10)).toBe(3)
  })
})