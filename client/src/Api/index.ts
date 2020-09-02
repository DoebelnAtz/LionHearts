import axios from 'axios';
import { getLocal, setLocal } from '../Utils';
import config from '../config.json';

export const makeRequest = async (url: string, method: any, data: any = {}) => {
	let resp;

	try {
		resp = await axios({
			url: `${config.url}/api${url}`,
			method: method,
			data: data,
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' +
					(localStorage.getItem('user')
						? getLocal('user').token
						: ''),
				'x-refresh-token': localStorage.getItem('user')
					? getLocal('user').refreshToken
					: '',
			},
		});
	} catch (e) {
		console.log(e);
		if (!e.response) {
			//window.location.replace('/505');
		} else if (e.response.status === 401) {
			try {
				let refreshAttempt = await axios({
					url: `${config.url}/api/auth/refresh_token`,
					method: method,
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer ' +
							(localStorage.getItem('user')
								? getLocal('user').token
								: ''),
						'x-refresh-token': localStorage.getItem('user')
							? getLocal('user').refreshToken
							: '',
					},
				});
				if (refreshAttempt.data) {
					setLocal('user', refreshAttempt.data);
				}
				try {
					resp = await axios({
						url: `${config.url}/api${url}`,
						method: method,
						data: data,
						headers: {
							'Content-Type': 'application/json',
							Authorization:
								'Bearer ' +
								(localStorage.getItem('user')
									? getLocal('user').token
									: ''),
							'x-refresh-token': localStorage.getItem('user')
								? getLocal('user').refreshToken
								: '',
						},
					});
				} catch (e) {
					if (e.response.status === 401) {
						window.location.replace('/');
					}
				}
			} catch (e) {
				if (e.response.status === 401) {
					window.location.replace('/');
				}
			}
		} else {
			throw e;
		}
	}
	return resp;
};
