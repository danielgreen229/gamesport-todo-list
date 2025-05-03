import { mount } from '@vue/test-utils'
import TodoFilter from '@/components/todo/TodoFilter.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('TodoFilter', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    
    const settingsStore = useSettingsStore()
    settingsStore.locale = 'en'
  })

  it('renders filter buttons correctly', () => {
    const wrapper = mount(TodoFilter, {
      global: {
        plugins: [pinia]
      }
    })
    
    const buttons = wrapper.findAll('.todo-filter__button')
    expect(buttons.length).toBe(3)
    expect(buttons[0].text()).toContain('All')
    expect(buttons[1].text()).toContain('Active')
    expect(buttons[2].text()).toContain('Completed')
  })

  it('changes filter on button click', async () => {
    const todoStore = useTodoStore()
    const wrapper = mount(TodoFilter)
    
    await wrapper.findAll('.todo-filter__button')[1].trigger('click')
    expect(todoStore.filter).toBe('active')
    expect(wrapper.emitted('tab-changed')).toBeTruthy()
  })

  it('shows active filter button with correct class', () => {
    const todoStore = useTodoStore()
    todoStore.filter = 'done'
    
    const wrapper = mount(TodoFilter)
    const buttons = wrapper.findAll('.todo-filter__button')
    expect(buttons[2].classes()).toContain('todo-filter__button--active')
  })

  it('updates search query on input', async () => {
    const todoStore = useTodoStore()
    const wrapper = mount(TodoFilter)
    
    await wrapper.find('.todo-filter__search').setValue('test')
    expect(todoStore.searchQuery).toBe('test')
  })
})