<template>
  <div class="todo-filter">
    <div class="todo-filter__group">
      <button
        v-for="filter in filters"
        :key="filter.value"
        :class="['todo-filter__button', { 'todo-filter__button--active': store.filter === filter.value }]"
        @click="handleFilterChange(filter.value)"
      >
        {{ getFilterLabel(filter.value) }}
      </button>
    </div>
    <input
      v-model="store.searchQuery"
      class="todo-filter__search"
      :placeholder="settingsStore.t('home.search')"
    >
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'

const store = useTodoStore()
const settingsStore = useSettingsStore()
const emit = defineEmits(['tab-changed'])

const filters = [
  { value: 'all' },
  { value: 'active' },
  { value: 'done' }
]

const getFilterLabel = computed(() => (filterValue) => {
  switch(filterValue) {
    case 'all': return settingsStore.t('home.allTasks')
    case 'active': return settingsStore.t('home.activeTasks')
    case 'done': return settingsStore.t('home.completedTasks')
    default: return filterValue
  }
})

const handleFilterChange = (filterValue) => {
  store.filter = filterValue
  emit('tab-changed', filterValue) 
}
</script>

<style scoped>
.todo-filter {
  @apply flex flex-col md:flex-row gap-4 mb-8;
}

.todo-filter__group {
  @apply flex gap-2;
}

.todo-filter__button {
  @apply px-4 py-2 rounded-md text-sm transition-colors
         bg-gray-100 hover:bg-gray-200 text-gray-700;
}

.todo-filter__button--active {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.todo-filter__search {
  @apply px-4 py-2 border rounded-md focus:outline-none 
         focus:ring-2 focus:ring-blue-500 flex-1;
}
</style>