<template>
  <div class="min-h-screen transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-dark-primary dark:text-dark-text">
    <nav class="flex justify-center gap-6 p-4 shadow-md bg-white dark:bg-dark-secondary">
      <router-link 
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="px-4 py-2 rounded-md transition-colors whitespace-nowrap"
        :class="{
          'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200': $route.path === link.path,
          'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700': $route.path !== link.path
        }"
      >
        {{ settingsStore.t(link.translationKey) }}
      </router-link>
    </nav>

    <main class="container mx-auto p-4 max-w-4xl">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <ToastNotificationContainer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { useRoute } from 'vue-router'
import ToastNotificationContainer from '@/components/ui/ToastNotificationContainer.vue'

const route = useRoute()
const settingsStore = useSettingsStore()

const navLinks = [
  { path: '/', label: 'Задачи', translationKey: 'app.title' },
  { path: '/settings', label: 'Настройки', translationKey: 'app.settings' },
  { path: '/about', label: 'О программе', translationKey: 'app.about' }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>