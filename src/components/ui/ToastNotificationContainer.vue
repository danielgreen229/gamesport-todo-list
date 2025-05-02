<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast">
      <div 
        v-for="notification in notifications"
        :key="notification.id"
        class="flex items-center justify-between min-w-[250px] p-4 rounded-lg shadow-lg cursor-pointer"
        :class="{
          'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100': notification.type === 'success',
          'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100': notification.type === 'warn',
          'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100': notification.type === 'error',
          'bg-white text-gray-800 dark:bg-gray-800 dark:text-white': notification.type === 'info'
        }"
      >
        <span>{{ notification.message }}</span>
        <button 
          @click.stop="remove(notification.id)"
          class="ml-4 text-xl hover:opacity-70 transition-opacity"
        >
          &times;
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notificationStore';
import { storeToRefs } from 'pinia'; // Добавлено

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore); // Сохраняем реактивность
const { remove } = notificationStore; // Методы берём напрямую
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-300 ease-in-out;
}
.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 translate-x-full;
}
.toast-leave-active {
  @apply absolute;
}
</style>