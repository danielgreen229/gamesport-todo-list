<template>
  <div class="settings-view">
    <h1 class="settings-view__title">{{ settingsStore.t('settings.title') }}</h1>
    
    <div class="settings-group">
      <div class="setting-item">
        <label class="setting-item__label">{{ settingsStore.t('settings.darkTheme') }}</label>
        <ToggleSwitch
          :value="settingsStore.isDarkTheme"
          @update:value="settingsStore.toggleTheme"
        />
      </div>
      
      <div class="setting-item">
        <label class="setting-item__label">{{ settingsStore.t('settings.language') }}</label>
        <select
          v-model="settingsStore.locale"
          @change="settingsStore.setLocale(settingsStore.locale)"
          class="setting-item__select"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settingsStore'
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue'

const settingsStore = useSettingsStore()
</script>

<style scoped>
.settings-view {
  @apply max-w-xl mx-auto;
}

.settings-view__title {
  @apply text-2xl font-semibold mb-8 
         dark:text-white;
}

.settings-group {
  @apply space-y-6;
}

.setting-item {
  @apply flex items-center justify-between 
         p-4 bg-white rounded-lg shadow-sm
         dark:bg-gray-800;
}

.setting-item__label {
  @apply text-gray-700 dark:text-white;
}

.setting-item__select {
  @apply px-3 py-2 border rounded-md bg-transparent
         dark:text-white dark:border-gray-600 dark:bg-gray-700;
}
</style>