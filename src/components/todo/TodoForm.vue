<template>
  <form class="todo-form" @submit.prevent="handleSubmit">
    <input
      v-model.trim="newTodo"
      class="todo-form__input"
      :class="{ 'todo-form__input--error': inputError }"
      :placeholder="settingsStore.t('home.addTaskPlaceholder')"
      @input="clearError"
      maxlength="40"
    >
    
    <select 
      v-model="selectedPriority"
      class="todo-form__priority"
    >
      <option value="high">{{ settingsStore.t('todoItem.highPriority') }}</option>
      <option value="medium">{{ settingsStore.t('todoItem.mediumPriority') }}</option>
      <option value="low">{{ settingsStore.t('todoItem.lowPriority') }}</option>
    </select>

    <button 
      class="todo-form__button"
      :disabled="!newTodoValid"
    >
      {{ settingsStore.t('home.addTask') }}
    </button>
    
    <div v-if="inputError" class="todo-form__error">
      {{ inputError }}
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useSettingsStore } from '@/stores/settingsStore'

const newTodo = ref('')
const selectedPriority = ref('medium')
const inputError = ref('')
const store = useTodoStore()
const notificationStore = useNotificationStore()
const settingsStore = useSettingsStore()

const newTodoValid = computed(() => {
  return newTodo.value.length > 0 && newTodo.value.trim().length > 0
})

const clearError = () => {
  inputError.value = ''
}

const handleSubmit = async () => {
  try {
    if (!newTodoValid.value) {
      throw new Error(settingsStore.t('notification.emptyTask'))
    }
    
    await store.addTodo({
      text: newTodo.value,
      priority: selectedPriority.value
    })
    
    newTodo.value = ''
    selectedPriority.value = 'medium'
    notificationStore.show(settingsStore.t('notification.taskAdded'), 'success')
  } catch (error) {
    inputError.value = error.message
    notificationStore.show(error.message, 'error')
  }
}
</script>

<style scoped>
.todo-form__priority {
  @apply px-4 py-2 border-2 mr-0 border-gray-200 rounded-lg 
         focus:outline-none focus:border-blue-500 
         dark:border-gray-600 dark:bg-gray-800 
         transition-all duration-200 cursor-pointer;
}

.todo-form {
  @apply flex flex-col sm:flex-row gap-4 mb-8 relative;
}

.todo-form__input {
  @apply flex-1 p-3 border-2 border-gray-200 rounded-lg 
         focus:outline-none focus:border-blue-500
         dark:border-gray-600 dark:bg-gray-800
         transition-all duration-200;
}

.todo-form__input--error {
  @apply border-red-500 dark:border-red-400 
         focus:border-red-700 dark:focus:border-red-500;
}

.todo-form__button {
  @apply px-6 py-3 bg-blue-500 text-white rounded-lg 
         hover:bg-blue-600 disabled:opacity-50 
         disabled:cursor-not-allowed transition-colors
         dark:bg-blue-600 dark:hover:bg-blue-700;
}

.todo-form__error {
  @apply absolute top-full mt-2 text-sm text-red-500 
         dark:text-red-400;
}
</style>