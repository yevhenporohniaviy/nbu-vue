<template>
  <section>
    <h1>Головна</h1>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">Завантаження...</p>

    <div v-if="!loading && !error">
      <LocalSearch v-model.trim="searchTerm" placeholder="Пошук за назвою чи кодом" />
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

  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useCurrencyStore } from '../store/nbu.js';
import {fetchCurrenciesByDate} from '../services/currencyService';
import CurrencyList from '../components/CurrencyList.vue';
import Pagination from '../components/Pagination.vue';
import LocalSearch from '../components/LocalSearch.vue';

const ITEMS_PER_PAGE = 10;
const currentPage = ref(1);
const store = useCurrencyStore();

const loading = ref(false);
const error = ref(null);
const searchTerm = ref('');

const filteredCurrencies = computed(() => {
  if (!searchTerm.value) return store.currencies;
  const lowerSearch = searchTerm.value.toLowerCase();
  return store.currencies.filter(
    (c) => c.cc.toLowerCase().includes(lowerSearch) || c.txt.toLowerCase().includes(lowerSearch)
  );
});

const paginatedFilteredCurrencies = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredCurrencies.value.slice(start, end);
});

watch(searchTerm, () => {
  currentPage.value = 1;
});


onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

    const data = await fetchCurrenciesByDate();
    store.setCurrencies(data);
  } catch (err) {
    error.value = 'Не вдалося завантажити дані. Спробуйте пізніше.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
