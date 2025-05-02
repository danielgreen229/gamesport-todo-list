import { mount } from '@vue/test-utils'
import TodoItem from '@/components/todo/TodoItem.vue'
import { useTodoStore } from '@/stores/todoStore'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('TodoItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const todo = {
    id: 1,
    text: 'Test task',
    done: false,
    priority: 'medium',
    createdAt: new Date().toISOString()
  }

  it('renders todo item', () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    
    expect(wrapper.text()).toContain('Test task')
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('toggles todo status', async () => {
    const todoStore = useTodoStore()
    todoStore.toggleTodo = vi.fn()
    
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    
    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(todoStore.toggleTodo).toHaveBeenCalledWith(1)
  })

  it('enters edit mode on double click', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    
    await wrapper.find('.todo-item__text').trigger('dblclick')
    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.find('.todo-item__edit-input').exists()).toBe(true)
  })
})