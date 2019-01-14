import config from './config'
import { EventSourcePolyfill } from 'event-source-polyfill'

export default {
  setupEventsListener
};

function setupEventsListener(gameId, successCb, errorCb) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };

  const source = new EventSourcePolyfill(`${config.apiUrl}/game/${gameId}/events`, requestOptions);
  source.addEventListener('message', message =>{
    if(message.data) {
        successCb(JSON.parse(message.data));
    }
    errorCb('No data received');
  });
  source.addEventListener('error', errorCb);
}