import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home.vue';
import SearchView from '../views/search.vue';
import ModifiedRatesView from '../views/modified.vue';
import EditCurrencyView from '../views/edit.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchView,
	},
	{
		path: '/modified',
		name: 'Modified',
		component: ModifiedRatesView,
	},
	{
		path: '/edit/:currencyCode',
		name: 'EditCurrency',
		component: EditCurrencyView,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
