<template>
  <label class="toggle-switch">
    <input
      type="checkbox"
      :checked="value"
      @change="$emit('update:value', $event.target.checked)"
      class="toggle-switch__input"
    >
    <span class="toggle-switch__slider" />
  </label>
</template>

<script setup>
defineProps(['value'])
</script>

<style scoped>
.toggle-switch {
  @apply relative inline-block w-12 h-6;
}

.toggle-switch__input {
  @apply opacity-0 w-0 h-0;
}

.toggle-switch__slider {
  @apply absolute cursor-pointer inset-0 bg-gray-300 
         rounded-full transition-colors 
         before:absolute before:h-4 before:w-4 
         before:left-1 before:bottom-1 before:bg-white 
         before:rounded-full before:transition-transform;
}

.toggle-switch__input:checked + .toggle-switch__slider {
  @apply bg-blue-500;
}

.toggle-switch__input:checked + .toggle-switch__slider:before {
  @apply translate-x-6;
}
</style>