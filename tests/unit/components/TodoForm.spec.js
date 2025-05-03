import { mount } from '@vue/test-utils'
import TodoForm from '@/components/todo/TodoForm.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('TodoForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(TodoForm)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('submits new todo', async () => {
    const todoStore = useTodoStore()
    todoStore.addTodo = vi.fn() 
    
    const wrapper = mount(TodoForm)
    await wrapper.find('input').setValue('Test task')
    await wrapper.find('select').setValue('high')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(todoStore.addTodo).toHaveBeenCalledWith({
      text: 'Test task',
      priority: 'high'
    })
  })

  it('shows error for empty input', async () => {
    const wrapper = mount(TodoForm)
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.find('.todo-form__error').exists()).toBe(true)
    expect(wrapper.vm.inputError).toBeTruthy()
    expect(wrapper.vm.inputError).toBe('Текст задачи не может быть пустым') // Исправлено здесь
  })
})