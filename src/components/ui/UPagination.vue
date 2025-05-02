<template>
  <div class="pagination">
    <button 
      @click="prevPage"
      :disabled="currentPage === 1"
      class="pagination-btn"
    >
      ←
    </button>
    
    <span class="page-indicator">
      Страница {{ currentPage }} из {{ totalPages }}
    </span>
    
    <button 
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="pagination-btn"
    >
      →
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

const emit = defineEmits(['page-changed'])

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-changed', props.currentPage + 1)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background: #e2e8f0;
}

.page-indicator {
  font-size: 14px;
  color: #64748b;
}
</style>