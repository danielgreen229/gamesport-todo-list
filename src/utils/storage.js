import { ref, watch } from 'vue'

export const useStorage = (key, defaultValue) => {
  const value = ref(JSON.parse(localStorage.getItem(key)) || defaultValue)
  
  watch(value, () => {
    localStorage.setItem(key, JSON.stringify(value.value))
  }, { deep: true })
  
  return value
}