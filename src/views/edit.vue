<template>
  <div>
    <h2>Редагування валюти: {{ currencyCode }}</h2>
    <p v-if="!currencyData">Валюта не знайдена</p>
    <div v-else>
      <p>Назва: {{ currencyData.txt }} ({{ currencyData.cc }})</p>
      <label>
        Новий курс:
        <input type="number" v-model.number="editedRate" step="0.0001" />
      </label>
      <button @click="saveChanges">Зберегти</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrencyStore } from '../store/nbu';

const route = useRoute();
const router = useRouter();
const store = useCurrencyStore();

const currencyCode = route.params.currencyCode;
const currencyData = computed(() => store.getCurrencyByCode(currencyCode));
const editedRate = ref(currencyData.value ? currencyData.value.rate : 0);
const error = ref(null);

function saveChanges() {
  if (isNaN(editedRate.value) || editedRate.value <= 0) {
    error.value = 'Будь ласка, введіть коректний курс.';
    return;
  }
  const updatedCurrency = {
    ...currencyData.value,
    rate: editedRate.value,
  };

  store.addModifiedCurrency(updatedCurrency);
  router.push('/');
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
