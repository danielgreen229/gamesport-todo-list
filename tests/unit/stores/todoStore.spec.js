import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should add new todo', () => {
    const store = useTodoStore()
    const initialCount = store.todos.length
    
    store.addTodo({ text: 'New task', priority: 'medium' })
    
    expect(store.todos.length).toBe(initialCount + 1)
    expect(store.todos[0].text).toBe('New task')
    expect(store.todos[0].done).toBe(false)
  })

  it('should toggle todo status', () => {
    const store = useTodoStore()
    store.addTodo({ text: 'Test task', priority: 'medium' })
    const todo = store.todos[0]
    
    expect(todo.done).toBe(false)
    store.toggleTodo(todo.id)
    expect(todo.done).toBe(true)
  })

  it('should filter todos correctly', () => {
    const store = useTodoStore()
    store.todos = [
      { id: 1, text: 'Task 1', done: false },
      { id: 2, text: 'Task 2', done: true }
    ]
    
    store.filter = 'active'
    expect(store.filteredTodos.length).toBe(1)
    expect(store.filteredTodos[0].id).toBe(1)
    
    store.filter = 'done'
    expect(store.filteredTodos.length).toBe(1)
    expect(store.filteredTodos[0].id).toBe(2)
  })
})