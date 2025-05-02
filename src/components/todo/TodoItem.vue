<template>
  <div 
    class="todo-item"
    :class="{
      'todo-item--done': todo.done,
      'todo-item--editing': isEditing
    }"
  >
    <div class="todo-item__content">
      <label class="todo-item__checkbox-label">
        <input 
          type="checkbox"
          :checked="todo.done"
          @change="toggleTodoStatus"
          class="sr-only"
        >
        <span class="custom-checkbox"></span>
      </label>
        
      <div class="todo-item__body">
        <div class="todo-item__main">
          <input
            v-if="isEditing"
            v-model.trim="editedText"
            ref="editInput"
            class="todo-item__edit-input"
            @keyup.esc="cancelEdit"
            @keyup.enter="handleEditSave"
            @blur="handleEditSave"
          >
          <div
            v-else
            class="todo-item__text"
            @dblclick="startEdit"
          >
            {{ todo.text }}
          </div>
          
          <div class="todo-item__meta">
            <select
              v-model="todo.priority"
              @change="handlePriorityChange"
              class="todo-item__priority-select"
              :disabled="todo.done"
            >
              <option value="high">{{ settingsStore.t('todoItem.highPriority') }}</option>
              <option value="medium">{{ settingsStore.t('todoItem.mediumPriority') }}</option>
              <option value="low">{{ settingsStore.t('todoItem.lowPriority') }}</option>
            </select>
            <span class="todo-item__date">
              {{ formattedDate }}
            </span>
          </div>
        </div>
        
        <button 
          class="todo-item__delete"
          @click="deleteTodo"
          aria-label="Удаление"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useNotificationStore } from '@/stores/notificationStore'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const store = useTodoStore()
const settingsStore = useSettingsStore()
const notificationStore = useNotificationStore()
const editInput = ref(null)
const isEditing = ref(false)
const editedText = ref(props.todo.text)

const handlePriorityChange = () => {
  store.updateTodo(props.todo.id, props.todo.text, props.todo.priority)
  notificationStore.show(settingsStore.t('notification.priorityUpdated'), 'success')
}

const formattedDate = computed(() => {
  const date = new Date(props.todo.createdAt)
  return date.toLocaleDateString(settingsStore.locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const startEdit = async () => {
  if (props.todo.done) {
    notificationStore.show(settingsStore.t('todoItem.cantEditCompleted'), 'warn')
    return
  }
  isEditing.value = true
  await nextTick()
  editInput.value?.focus()
}

const handleEditSave = () => {
  if (editedText.value.trim() === '') {
    notificationStore.show(settingsStore.t('notification.emptyTask'), 'error')
    cancelEdit()
    return
  }
  
  if (editedText.value !== props.todo.text) {
    store.updateTodo(props.todo.id, editedText.value.trim())
    notificationStore.show(settingsStore.t('notification.taskUpdated'), 'success')
  }
  isEditing.value = false
}

const cancelEdit = () => {
  editedText.value = props.todo.text
  isEditing.value = false
}

const toggleTodoStatus = () => {
  store.toggleTodo(props.todo.id)
  const status = props.todo.done 
    ? settingsStore.t('notification.activated') 
    : settingsStore.t('notification.completed')
  notificationStore.show(`${settingsStore.t('notification.task')} ${status}`, 'success')
}

const deleteTodo = () => {
  if (confirm(settingsStore.t('todoItem.deleteConfirm'))) {
    store.deleteTodo(props.todo.id)
    notificationStore.show(settingsStore.t('notification.taskDeleted'), 'warn')
  }
}
</script>


<style scoped>
.todo-item {
  @apply flex items-center p-3 sm:p-4 mb-2 bg-white rounded-lg 
         shadow-sm hover:shadow-md transition-all
         duration-200 dark:bg-gray-800;
}

.todo-item__content {
  @apply flex items-start sm:items-center gap-3 sm:gap-4 w-full;
}

.todo-item__body {
  @apply flex justify-between items-start sm:items-center flex-1 gap-2 flex-col sm:flex-row relative;
}

.todo-item__main {
  @apply flex flex-col flex-1 w-full gap-1;
}

.todo-item__text {
  @apply break-words pr-2 dark:text-gray-200 text-sm sm:text-base truncate max-w-[calc(100%-2rem)];
}

.todo-item__meta {
  @apply flex gap-2 mt-1 sm:mt-0 items-center w-full sm:w-auto;
}

.todo-item__priority-select {
  @apply text-xs px-2 py-1 rounded-full bg-gray-100 
         border border-transparent focus:border-blue-500 
         cursor-pointer dark:bg-gray-700 dark:text-gray-300 
         transition-colors;
}

.todo-item__date {
  @apply text-xs text-gray-400 dark:text-gray-500;
}

.todo-item__delete {
  @apply text-xl sm:text-2xl text-red-500 hover:text-red-700 
         transition-colors cursor-pointer
         dark:text-red-400 dark:hover:text-red-500
         w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center
         self-end sm:self-auto;
}

.todo-item__edit-input {
  @apply w-full bg-transparent border-b-2 
         border-blue-500 outline-none 
         dark:text-gray-200 text-sm sm:text-base
         focus:ring-0 focus:border-blue-700
         dark:focus:border-blue-400;
}

.todo-item--done {
  @apply opacity-75 bg-gray-50 dark:bg-gray-700;
  
  .todo-item__checkmark {
    @apply bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-600;
  }

  .todo-item__text {
    @apply line-through text-gray-500 dark:text-gray-400;
  }

  .todo-item__priority-select {
    @apply opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-600;
  }

  .todo-item__delete {
    @apply opacity-50 hover:opacity-100;
  }
}

.todo-item__priority-select:disabled {
  @apply opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700;
}



.todo-item__checkbox-label {
  @apply relative flex-shrink-0 cursor-pointer;
}

.custom-checkbox {
  @apply w-8 h-8 border-2 border-gray-300 rounded 
         flex items-center justify-center
         transition-all dark:border-gray-600 duration-300;
}

.custom-checkbox::after {
  content: '';
  @apply absolute w-3 h-4 border-r-2 border-b-2 border-white 
         transform rotate-45 opacity-0 transition-opacity
         translate-y-[-0.2rem];
}

input:checked ~ .custom-checkbox {
  @apply bg-blue-500 border-blue-500;
}

input:checked ~ .custom-checkbox::after {
  @apply opacity-100;
}





@media (max-width: 640px) {
  .todo-item__checkmark {
    @apply w-5 h-5;
  }
  
  .todo-item__checkbox:checked ~ .todo-item__checkmark::after {
    @apply left-1 top-0;
    width: 3px;
    height: 6px;
  }
  
  .todo-item__meta {
    @apply justify-between w-full;
  }

  .todo-item__delete {
    @apply absolute top-0;
  }

  .custom-checkbox {
    @apply w-7 h-7 mt-auto;
  }
  
  .custom-checkbox::after {
    @apply w-2 h-3 translate-y-[-0.1rem]; 
  }

  .todo-item__main {
    @apply gap-0;
  }

  .todo-item__checkbox-label {
    @apply mt-auto mb-auto;
  }
}
</style>