<template>
  <div class="home-view" data-testid="todo-list">
    <div class="connection-status__container">
      <div 
        class="connection-status" 
        :class="{ offline: !store.isOnline }"
      >
        {{ store.isOnline ? 'Online' : 'Offline' }}
      </div>
      <div v-if="store.isLoading" class="loading-overlay">
        Синхронизация с сервером...
      </div>
    </div>

    <div class="toolbar">
      <button 
        @click="handleExport"
        class="toolbar-btn"
        :aria-label="settingsStore.t('home.exportButton')"
      >
        {{ settingsStore.t('home.exportButton') }}
      </button>
      
      <label class="toolbar-btn">
        {{ settingsStore.t('home.importButton') }}
        <input 
          type="file" 
          @change="handleImport"
          accept=".json" 
          class="file-input"
          :aria-label="settingsStore.t('home.importButton')"
        >
      </label>
    </div>

    <TodoForm />
    <TodoFilter @tab-changed="changeTab" />
    
    <TransitionGroup 
      name="todo-list" 
      tag="div" 
      class="todo-list"
      role="list"
    >
      <TodoItem
        v-for="todo in paginatedTodos"
        :key="todo.id"
        :todo="todo"
        role="listitem"
      />
    </TransitionGroup>


    <div 
      v-if="store.filteredTodos.length === 0" 
      class="empty-state"
      data-testid="empty-state"
    >
      <p class="empty-state__text">
        {{ settingsStore.t(store.searchQuery ? 'home.nothingFound' : 'home.addTaskPlaceholder') }}
      </p>
    </div>

    <UPagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="changePage"
    />

    <div class="stats">
      <div class="stats__item">
        <span class="stats__label">{{ settingsStore.t('home.totalTasks') }}</span>
        {{ store.totalTasks }}
      </div>
      <div class="stats__item">
        <span class="stats__label">{{ settingsStore.t('home.completed') }}</span>
        {{ store.doneCount }} ({{ store.completionPercentage }}%)
      </div>
      <div class="stats__item">
        <span class="stats__label">{{ settingsStore.t('home.visible') }}</span>
        {{ paginatedTodos.length }} {{ settingsStore.t('home.of') }} {{ store.filteredTodos.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { defineAsyncComponent } from 'vue'
import TodoForm from '@/components/todo/TodoForm.vue'
const TodoItem = defineAsyncComponent(() =>
  import('@/components/todo/TodoItem.vue')
)
const TodoFilter = defineAsyncComponent(() =>
  import('@/components/todo/TodoFilter.vue')
)
import UPagination from '@/components/ui/UPagination.vue'
import { useImportExport } from '@/composables/useImportExport'
import { useFileHandling } from '@/composables/useFileHandling'
const { exportTasks } = useImportExport()
const settingsStore = useSettingsStore()
const store = useTodoStore()
const { exportData } = useImportExport()
const { readTasksFile } = useFileHandling()
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(async () => {
  await store.fetchTodos()
  store.setupNetworkListener?.();
  window.addEventListener('online', () => store.setOnlineStatus(true));
  window.addEventListener('offline', () => store.setOnlineStatus(false));
})

onBeforeUnmount(() => {
  window.removeEventListener('online', () => store.setOnlineStatus(true));
  window.removeEventListener('offline', () => store.setOnlineStatus(false));
});

const currentPage = ref(1)
const perPage = 10

const paginatedTodos = computed(() => 
  store.getPaginatedTodos(currentPage.value, perPage)
)

const totalPages = computed(() => 
  store.getTotalPages(perPage)
)

const changePage = (page) => {
  currentPage.value = page
  scrollToTop()
}


const changeTab = () => {
  currentPage.value = 1
  scrollToTop()
}

const handleExport = () => {
  if (store.totalTasks === 0) {
    return alert(settingsStore.t('alerts.noTasks'))
  }
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    exportTasks(`tasks-${timestamp}.json`)
  } catch (error) {
    alert(`Ошибка экспорта: ${error.message}`)
  }
}

const handleImport = async (event) => {
  try {
    const confirmed = confirm(settingsStore.t('alerts.importConfirm'))
    if (!confirmed) return

    const file = event.target.files[0]
    if (!file) return

    const tasks = await readTasksFile(file)
    const importedCount = store.importTasks(tasks)
    
    alert(settingsStore.t('alerts.importSuccess', { count: importedCount }))
    currentPage.value = 1
  } catch (error) {
    alert(`${settingsStore.t('alerts.importError')}: ${error.message}`)
  } finally {
    event.target.value = ''
  }
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.connection-status {
  @apply w-min pl-2 pr-2  rounded-full text-sm bg-green-500 text-white shadow-md;
}

.connection-status.offline {
  @apply bg-red-500; 
}

.connection-status__container {
  @apply fixed bottom-5 right-5 px-3 py-2  bg-[#9bbff9] text-white rounded-[1rem] p-10 z-50;
}

.empty-state {
  @apply text-gray-500 dark:text-gray-400 py-8 text-center;
}
.home-view {
  @apply flex flex-col gap-6 max-w-3xl mx-auto px-4;
}

.toolbar {
  @apply flex gap-3 mb-5;
}

.toolbar-btn {
  @apply relative px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg 
         cursor-pointer transition-colors duration-200 hover:bg-gray-200 
         dark:hover:bg-gray-600 text-sm font-medium;
}

.file-input {
  @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer;
}

.todo-list {
  @apply grid gap-2;
}

.todo-list-move {
  @apply transition-transform duration-300 ease-in-out;
}

.stats {
  @apply flex flex-wrap gap-4 mt-6 text-sm;
}

.stats__item {
  @apply px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full 
         flex items-center gap-2;
}

.stats__label {
  @apply font-medium text-gray-600 dark:text-gray-300;
}

.todo-list-enter-active,
.todo-list-leave-active {
  @apply transition-all duration-300 ease-out;
}

.todo-list-enter-from,
.todo-list-leave-to {
  @apply opacity-0 -translate-x-4;
}

.todo-list-leave-active {
  @apply absolute w-full;
}

@media (max-width: 640) {
  .connection-status__container {
    @apply pr-5 pl-5;
  }
}
</style>