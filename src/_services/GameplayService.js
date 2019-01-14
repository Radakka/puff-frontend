import config from './config'
import userService from './UserService'

export default {
  getGame,
  playCard
};

function getGame(gameId) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };
  
  return fetch(`${config.apiUrl}/game/${gameId}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
  });
}

function playCard(gameId, cardSource, cardPositions, targetPlayer) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({cardSource, cardPositions, targetPlayer})
  };

  return fetch(`${config.apiUrl}/game/${gameId}/play`, requestOptions)
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
        location.reload(true);
      }
      let error = (data && data.errorMessages) || response.statusText;
      if(!Array.isArray(error)) {
        error = [error];
      }
      return Promise.reject(error);
    }
    
    return data;
  });
}