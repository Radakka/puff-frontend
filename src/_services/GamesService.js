import config from './config'
import userService from './UserService'

export default {
	getGames,
};

function getGames() {
	const requestOptions = {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': 'Bearer ' + localStorage.getItem('token')
		}
	};
	
	return fetch(`${config.apiUrl}/game/list`, requestOptions)
	  .then(handleResponse)
	  .then(response => {
        return response;
	  });
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if(!response.ok) {
			if(response.status === 401) {
				userService.logout();
			}
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		
		return data;
	});
}