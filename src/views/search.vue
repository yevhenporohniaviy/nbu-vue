<template>
  <div>
    <h1>Пошук курсу за датою</h1>

    <p v-if="loading">Завантаження...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-if="!loading && !error">
      <div>
        <input type="date" v-model="selectedDate" />
        <button @click="handleSearch">Пошук</button>
      </div>
      <LocalSearch v-model="searchTerm" placeholder="Пошук у знайденому списку..." />
      <CurrencyList
        :currencies="paginatedFilteredCurrencies"
      />
      <Pagination
        v-if="filteredCurrencies.length"
        :currentPage="currentPage"
        :itemsPerPage="ITEMS_PER_PAGE"
        :totalItems="filteredCurrencies.length"
        @update:currentPage="(newPage) => currentPage = newPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fetchCurrenciesByDate } from '../services/currencyService';
import CurrencyList from '../components/CurrencyList.vue';
import Pagination from '../components/Pagination.vue';
import LocalSearch from '../components/LocalSearch.vue';

const ITEMS_PER_PAGE = 10;
const currentPage = ref(1);
const selectedDate = ref('');
const searchTerm = ref('');

const loading = ref(false);
const error = ref(null);
const currenciesByDate = ref([]);

const filteredCurrencies = computed(() => {
  if (!searchTerm.value) {
    return currenciesByDate.value;
  }
  const lowerSearchValue = searchTerm.value.toLowerCase();
  return currenciesByDate.value.filter(
    (currency) => currency.cc.toLowerCase().includes(lowerSearchValue) || currency.txt.toLowerCase().includes(lowerSearchValue)
  );
});

const paginatedFilteredCurrencies = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredCurrencies.value.slice(start, end);
});

function handleSearch() {
  if (!selectedDate.value) {
    error.value = 'Будь ласка, виберіть дату';
    return;
  }
  loading.value = true;
  error.value = null;

  fetchCurrenciesByDate(selectedDate.value)
    .then((data) => {
      currenciesByDate.value = data;
      currentPage.value = 1;
    })
    .catch(() => {
      error.value = 'Не вдалося отримати дані за обраною датою';
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
