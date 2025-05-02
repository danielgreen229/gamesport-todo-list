import { ref, watch } from 'vue'

export const useStorage = (key, defaultValue = []) => {
  const data = ref(
    JSON.parse(localStorage.getItem(key)) || 
    (Array.isArray(defaultValue) ? [...defaultValue] : defaultValue)
  )

  watch(data, (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, { deep: true })

  return data
}