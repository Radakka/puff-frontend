import config from './config'

export default {
	login,
	logout
};

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ username, password})
	};
	
	return fetch(`${config.apiUrl}/login`, requestOptions)
	.then(handleResponse)
	.then(response => {
		if(response.token) {
			localStorage.setItem('user', username);
			localStorage.setItem('token', response.token);
		}
		return response;
	});
}

function logout() {
	localStorage.removeItem('user');
	localStorage.removeItem('token');
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if(!response.ok) {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		
		return data;
	});
}