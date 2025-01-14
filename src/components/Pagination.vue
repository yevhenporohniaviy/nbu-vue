<template>
  <div v-if="totalItems > 0" class="pagination-container">
    <button
      :disabled="currentPage === 1"
      @click="goToPrevPage"
    >
      <-
    </button>

    <span>Сторінка {{ currentPage }} з {{ totalPages }}</span>

    <button
      :disabled="currentPage === totalPages"
      @click="goToNextPage"
    >
      ->
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

function goToPrevPage() {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
}

function goToNextPage() {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1);
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
