<template>
  <section>
    <h1>Змінені курси</h1>
    <p v-if="!modifiedRates.length">Немає змінених валют.</p>
    <ul v-else>
      <li
        v-for="currency in modifiedRates"
        :key="currency.cc"
      >
        <div v-if="editRow && editRow.cc === currency.cc">
          {{ currency.cc }} - {{ currency.txt }}:
          <input
            type="number"
            v-model.number="editRate"
            step="0.0001"
          />
          <button @click="saveEdit">Зберегти</button>
          <button @click="cancelEdit">Скасувати</button>
        </div>
        <div v-else>
          {{ currency.cc }} - {{ currency.txt }}: {{ currency.rate }}
          <button @click="startEdit(currency)">Редагувати</button>
          <button @click="handleRemove(currency.cc)">Видалити</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCurrencyStore } from '../store/nbu';

const store = useCurrencyStore();

const modifiedRates = computed(() => store.modifiedRates);

const editRow = ref(null);
const editRate = ref(0);

function startEdit(currency) {
  editRow.value = { ...currency };
  editRate.value = currency.rate;
}

function saveEdit() {
  if (isNaN(editRate.value) || editRate.value <= 0) {
    alert('Будь ласка, введіть коректний курс.');
    return;
  }

  const updatedCurrency = {
    ...editRow.value,
    rate: editRate.value,
  };

  store.addModifiedCurrency(updatedCurrency);
  editRow.value = null;
  editRate.value = 0;
}

function cancelEdit() {
  editRow.value = null;
  editRate.value = 0;
}

function handleRemove(currencyCode) {
  store.removeModifiedCurrency(currencyCode);
}
</script>
