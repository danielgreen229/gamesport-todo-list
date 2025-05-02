import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { useTodoStore } from '@/stores/todoStore'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders todo list', () => {
    const todoStore = useTodoStore()
    // Используем actions для изменения состояния
    todoStore.addTodo({ text: 'Task 1', priority: 'medium' })
    todoStore.addTodo({ text: 'Task 2', priority: 'medium', done: true })
    
    const wrapper = mount(HomeView)
    const items = wrapper.findAllComponents({ name: 'TodoItem' })
    
    expect(items.length).toBe(2)
  })

  it('shows empty state when no todos', () => {
    const todoStore = useTodoStore()
    todoStore.todos = []
    
    const wrapper = mount(HomeView)
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })

  it('displays correct stats', () => {
    const todoStore = useTodoStore()
    todoStore.todos = [
      { id: 1, text: 'Task 1', done: false },
      { id: 2, text: 'Task 2', done: true }
    ]
    
    const wrapper = mount(HomeView)
    const stats = wrapper.findAll('.stats__item')
    
    expect(stats[0].text()).toContain('2')
    expect(stats[1].text()).toContain('1 (50%)')
  })
})