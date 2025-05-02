import { defineStore } from 'pinia'
import { translations } from '@/utils/locales'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    isDarkTheme: localStorage.getItem('theme') === 'dark',
    locale: localStorage.getItem('locale') || 'ru',
    translations
  }),
  actions: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', this.isDarkTheme)
    },
    setLocale(newLocale) {
      this.locale = newLocale
      localStorage.setItem('locale', newLocale)
    },
    t(key) {
      const keys = key.split('.')
      let result = this.translations[this.locale]
      
      for (const k of keys) {
        if (!result) break
        result = result[k]
      }
      
      return result || key
    }
  },
  getters: {
    currentTranslations: (state) => state.translations[state.locale]
  }
})