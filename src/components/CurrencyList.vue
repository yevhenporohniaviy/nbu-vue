<template>
  <div>
    <p v-if="!currencies.length">Список пустий</p>

    <ul v-else>
      <li
        v-for="currency in currencies"
        :key="currency.r030"
        class="currency-item"
      >
        <span>{{ currency.cc }} - {{ currency.txt }}: {{ currency.rate }}</span>
        <button @click="handleEdit(currency.cc)">Редагувати</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  currencies: {
    type: Array,
    required: true,
  }
});

const router = useRouter();

function handleEdit(currencyCode) {
  router.push(`/edit/${currencyCode}`);
}
</script>

<style scoped>
.currency-item {
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
}
</style>
