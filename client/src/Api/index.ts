import axios from 'axios';
import { getLocal, setLocal } from '../Utils';

//const backendUrl = 'https://lionhearts.fi';
const backendUrl = 'http://localhost:5000';

export const makeRequest = async (url: string, method: any, data: any = {}) => {
	let resp;

	try {
		resp = await axios({
			url: `${backendUrl}/api${url}`,
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
					? getLocal('user')?.refreshToken
					: '',
			},
		});
	} catch (e) {
		console.log(e);
		if (!e.response) {
			//window.location.replace('/505');
		} else if (e.response.status === 401) {
			let refreshAttempt = await axios({
				url: `${backendUrl}/api/auth/refresh_token`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						(localStorage.getItem('user')
							? getLocal('user').token
							: ''),
					'x-refresh-token': localStorage.getItem('user')
						? getLocal('user')?.refreshToken
						: '',
				},
			});
			if (refreshAttempt.data) {
				setLocal('token', refreshAttempt.data);
			}
		} else {
			throw e;
		}
	}
	return resp;
};
