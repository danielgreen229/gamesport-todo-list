<template>
  <div class="about-view">
    <h1 class="about-view__title">{{ settingsStore.t('about.title') }}</h1>
    
    <div class="about-content">
      <div class="about-card">
        <h2 class="about-card__title">{{ settingsStore.t('about.version') }}</h2>
        <p class="about-card__text">1.0.0</p>
      </div>
      
      <div class="about-card">
        <h2 class="about-card__title">{{ settingsStore.t('about.technologies') }}</h2>
        <ul class="tech-list">
          <li class="tech-list__item">Vue 3</li>
          <li class="tech-list__item">Pinia</li>
          <li class="tech-list__item">Tailwind CSS</li>
          <li class="tech-list__item">Vite</li>
        </ul>
      </div>
      
      <div class="about-card">
        <h2 class="about-card__title">{{ settingsStore.t('about.contacts') }}</h2>
        <a 
          href="mailto:support@todolist.com"
          class="about-card__link"
        >
          https://t.me/dozer_stoun
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()
</script>

<style scoped>
.about-view {
  @apply max-w-3xl mx-auto;
}

.about-view__title {
  @apply text-2xl font-semibold mb-8 
         dark:text-white;
}

.about-content {
  @apply grid gap-6 md:grid-cols-2 lg:grid-cols-3;
}

.about-card {
  @apply p-6 bg-white rounded-lg shadow-sm
         dark:bg-gray-800;
}

.about-card__title {
  @apply text-lg font-medium mb-4 
         dark:text-white;
}

.about-card__text {
  @apply text-gray-600 dark:text-gray-400;
}

.tech-list {
  @apply space-y-2;
}

.tech-list__item {
  @apply pl-4 before:content-['-'] 
         before:mr-2 text-gray-600 
         dark:text-gray-400;
}

.about-card__link {
  @apply text-blue-500 hover:text-blue-600 
         dark:text-blue-400 transition-colors;
}
</style>