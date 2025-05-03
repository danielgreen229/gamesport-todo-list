import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.scrollTo = vi.fn()
  })

  it('renders connection status', async () => {
    const todoStore = useTodoStore()
    const wrapper = mount(HomeView)
    
    todoStore.isOnline = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.connection-status').text()).toBe('Online')
    
    todoStore.isOnline = false
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.connection-status').text()).toBe('Offline')
  })
  
  it('changes page on pagination click', async () => {
    const todoStore = useTodoStore()
    todoStore.todos = Array.from({ length: 15 }, (_, i) => ({
      id: `${i}`,
      text: `Task ${i}`,
      done: false
    }))
    
    const wrapper = mount(HomeView)
    await wrapper.vm.changePage(2)
    expect(wrapper.vm.currentPage).toBe(2)
  })

  it('shows empty state when no todos', () => {
    const todoStore = useTodoStore()
    todoStore.todos = []
    
    const wrapper = mount(HomeView)
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })
})