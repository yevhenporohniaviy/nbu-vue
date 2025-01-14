import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCurrencyStore = defineStore(
	'currencyStore',
	() => {
		const currencies = ref([]);
		const modifiedRates = ref([]);

		function getCurrencyByCode(code) {
			return currencies.value.find((c) => c.cc === code);
		}

		function setCurrencies(data) {
			currencies.value = data;
		}

		function addModifiedCurrency(editedCurrency) {
			const existingIndex = modifiedRates.value.findIndex(
				(m) => m.cc === editedCurrency.cc
			);
			if (existingIndex !== -1) {
				modifiedRates.value[existingIndex] = editedCurrency;
			} else {
				modifiedRates.value.push(editedCurrency);
			}
		}

		function removeModifiedCurrency(currencyCode) {
			const index = modifiedRates.value.findIndex(
				(m) => m.cc === currencyCode
			);
			if (index !== -1) {
				modifiedRates.value.splice(index, 1);
			}
		}

		return {
			currencies,
			modifiedRates,
			getCurrencyByCode,
			setCurrencies,
			addModifiedCurrency,
			removeModifiedCurrency,
		};
	},
	{
		persist: {
			key: 'nbu',
			storage: window.localStorage,
			paths: ['currencies', 'modifiedRates'],
		},
	}
);
