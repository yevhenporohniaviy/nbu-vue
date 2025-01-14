<template>
  <div class="search-wrapper">
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Пошук...',
  },
});

const emit = defineEmits(['update:modelValue']);

</script>

<style scoped>
.search-wrapper {
  margin: 1rem 0;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
</style>
