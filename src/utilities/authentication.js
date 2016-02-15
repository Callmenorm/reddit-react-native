'use strict';
import {
  REDIRECT_URI,
  CLIENT_ID,
  REDDIT_ACCESS_TOKEN_KEY,
  REDDIT_REFRESH_TOKEN_KEY
} from './constants';
import {AsyncStorage} from 'react-native';

const refreshRedditToken = (accessCode) => {
  const basicAuth = btoa(`${CLIENT_ID}:`);
  return fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`
    },
    body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=${REDIRECT_URI}`
  })
  .then(response => {
    console.log('refresh response', response);
    return response.json();
  })
  .then(json => {
    console.log('refresh response', json);
    return AsyncStorage.multiSet([[REDDIT_ACCESS_TOKEN_KEY, json.access_token], [REDDIT_REFRESH_TOKEN_KEY, json.refresh_token]]);
  })
}

export default refreshRedditToken;
