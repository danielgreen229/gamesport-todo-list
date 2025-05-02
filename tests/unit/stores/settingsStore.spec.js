import { setActivePinia, createPinia } from 'pinia'
import { useSettingsStore } from '@/stores/settingsStore'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should toggle theme', () => {
    const store = useSettingsStore()
    expect(store.isDarkTheme).toBe(false)
    
    store.toggleTheme()
    expect(store.isDarkTheme).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    
    store.toggleTheme()
    expect(store.isDarkTheme).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('should change locale', () => {
    const store = useSettingsStore()
    expect(store.locale).toBe('ru')
    
    store.setLocale('en')
    expect(store.locale).toBe('en')
    expect(localStorage.getItem('locale')).toBe('en')
  })

  it('should translate text', () => {
    const store = useSettingsStore()
    expect(store.t('app.title')).toBe('Список задач')
    
    store.setLocale('en')
    expect(store.t('app.title')).toBe('Todo List')
  })
})