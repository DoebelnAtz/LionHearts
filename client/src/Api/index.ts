import axios from 'axios';

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
			},
		});
	} catch (e) {
		if (!e.response) {
			//window.location.replace('/505');
		}
		else {
			throw e;
		}
	}
	return resp;
};