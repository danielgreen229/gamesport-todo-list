import { mount } from '@vue/test-utils'
import TodoItem from '@/components/todo/TodoItem.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test task',
    done: false,
    priority: 'medium',
    createdAt: new Date().toISOString()
  }

  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it('renders todo item correctly', () => {
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo }
    })
    
    expect(wrapper.text()).toContain('Test task')
    expect(wrapper.find('.todo-item__priority-select').exists()).toBe(true)
    expect(wrapper.find('.todo-item__date').exists()).toBe(true)
  })

  it('toggles todo status on checkbox change', async () => {
    const todoStore = useTodoStore()
    todoStore.toggleTodo = vi.fn()
    
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo }
    })
    
    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(todoStore.toggleTodo).toHaveBeenCalledWith('1')
  })

  it('enters edit mode on double click', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo }
    })
    
    await wrapper.find('.todo-item__text').trigger('dblclick')
    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.find('.todo-item__edit-input').exists()).toBe(true)
  })

  it('saves edited text on enter', async () => {
    const todoStore = useTodoStore()
    todoStore.updateTodo = vi.fn()
    
    const wrapper = mount(TodoItem, {
      props: { 
        todo: {
          id: '1',
          text: 'Test task',
          done: false,
          priority: 'medium',
          createdAt: new Date().toISOString()
        }
      },
      global: {
        plugins: [pinia]
      }
    })
    
    await wrapper.find('.todo-item__text').trigger('dblclick')
    await wrapper.find('.todo-item__edit-input').setValue('Updated task')
    await wrapper.find('.todo-item__edit-input').trigger('keyup.enter')
    
    expect(todoStore.updateTodo).toHaveBeenCalledWith('1', 'Updated task')
    expect(wrapper.vm.isEditing).toBe(false)
  })

  it('deletes todo on delete button click', async () => {
    const todoStore = useTodoStore()
    todoStore.deleteTodo = vi.fn()
    window.confirm = vi.fn(() => true)
    
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo }
    })
    
    await wrapper.find('.todo-item__delete').trigger('click')
    expect(todoStore.deleteTodo).toHaveBeenCalledWith('1')
  })
})