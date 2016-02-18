'use strict';
import {
  OAUTH_URI,
  REDIRECT_URI,
  CLIENT_ID,
  REDDIT_ACCESS_TOKEN_KEY,
  REDDIT_REFRESH_TOKEN_KEY
} from './constants';
import {
  AsyncStorage,
  LinkingIOS
} from 'react-native';

const getBasicAuth = () => {
  const base64ClientID = btoa(`${CLIENT_ID}:`);
  return `Basic ${base64ClientID}`;
};

const getRedditToken = (accessCode) => {
  return fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: getBasicAuth()
    },
    body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=${REDIRECT_URI}`
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return AsyncStorage.multiSet([[REDDIT_ACCESS_TOKEN_KEY, json.access_token], [REDDIT_REFRESH_TOKEN_KEY, json.refresh_token]]);
  })
};

const refreshRedditToken = () => {
  return AsyncStorage.getItem(REDDIT_REFRESH_TOKEN_KEY)
    .then((refreshToken) => {
      return fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          Authorization: getBasicAuth()
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
      });
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return AsyncStorage.setItem(REDDIT_REFRESH_TOKEN_KEY, json.access_token);
    });
};

const getOauthToken = () => {
  return new Promise((fulfill, reject) => {
    LinkingIOS.canOpenURL(OAUTH_URI, (supported) => {
      if (!supported) {
        reject(`Can\'t handle url: ${OAUTH_URI}`);
      } else {
        fulfill(LinkingIOS.openURL(OAUTH_URI));
      }
    });
  })
};

export {
  getOauthToken,
  getRedditToken,
  refreshRedditToken
};
