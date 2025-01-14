import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'https://bank.gov.ua/NBUStatService/v1/statdirectory',
	timeout: 5000,
});

// Тут можна додати tokenn авторизації або інші заголовки
httpClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

httpClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {

		if (error.response) {
			return Promise.reject(error.response);
		}
		else if (error.request) {
			return Promise.reject(error.request);
		}
		else {
			return Promise.reject(error);
		}
	}
);

export default httpClient;
