<template>
  <div class="home-view">
    <TodoForm />
    <TodoFilter />
    
    <TransitionGroup 
      name="todo-list"
      tag="div"
      class="todo-list"
      v-if="store.filteredTodos.length"
    >
      <TodoItem
        v-for="todo in store.filteredTodos"
        :key="todo.id"
        :todo="todo"
        class="todo-list__item"
      />
    </TransitionGroup>

    <div v-else class="empty-state">
      <p class="empty-state__text">
        {{ settingsStore.t(store.searchQuery ? 'home.nothingFound' : 'home.addTaskPlaceholder') }}
      </p>
    </div>

    <div class="stats">
      <div class="stats__item">
        <span class="stats__label">{{ settingsStore.t('home.totalTasks') }}</span>
        {{ store.todos.length }}
      </div>
      <div class="stats__item">
        <span class="stats__label">{{ settingsStore.t('home.completed') }}</span>
        {{ doneCount }} ({{ completionPercentage }}%)
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import TodoForm from '@/components/todo/TodoForm.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoFilter from '@/components/todo/TodoFilter.vue'

const store = useTodoStore()
const settingsStore = useSettingsStore()

const doneCount = computed(() => 
  store.todos.filter(t => t.done).length
)

const completionPercentage = computed(() => {
  if (store.todos.length === 0) return 0
  return Math.round((doneCount.value / store.todos.length) * 100)
})
</script>

<style scoped>
.home-view {
  @apply flex flex-col gap-6 max-w-3xl mx-auto px-4;
}

.todo-list {
  @apply grid gap-2;
}

.todo-list-move {
  @apply transition-transform duration-300;
}

.empty-state {
  @apply flex flex-col items-center justify-center 
         py-12 text-gray-500 dark:text-gray-400 
         text-center;
}

.empty-state__text {
  @apply text-lg font-medium;
}

.stats {
  @apply flex flex-wrap gap-4 mt-6 text-sm;
}

.stats__item {
  @apply px-4 py-2 bg-gray-100 rounded-full 
         dark:bg-gray-700 dark:text-gray-300;
}

.stats__label {
  @apply font-medium mr-1;
}

/* Анимации */
.todo-list-enter-active,
.todo-list-leave-active {
  @apply transition-all duration-300 ease-out;
}

.todo-list-enter-from,
.todo-list-leave-to {
  @apply opacity-0 transform -translate-x-4;
}

.todo-list-leave-active {
  @apply absolute;
}
</style>