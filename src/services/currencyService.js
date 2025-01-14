import httpClient from './httpClient';

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}${month}${day}`;
}

export async function fetchCurrenciesByDate(date = new Date()) {
	let dateObj = date;

	if (!(dateObj instanceof Date)) {
		dateObj = new Date(date);
	}

	const dateString = formatDate(dateObj);


	const response = await httpClient.get(`/exchange?date=${dateString}&json`);
	return response.data;
}

