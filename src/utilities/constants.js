'use strict';

import {Dimensions} from 'react-native';

const REDIRECT_URI = 'reactNativeReddit://response';
const CLIENT_ID = 't7x3gcvSp8A0_A';
const REDDIT_ACCESS_TOKEN_KEY = 'redditAccessToken';
const REDDIT_REFRESH_TOKEN_KEY = 'redditRefreshToken';
const OAUTH_SCOPES = [
  'identity',
  'edit',
  'flair',
  'history',
  'mysubreddits',
  'privatemessages',
  'read',
  'report',
  'save',
  'submit',
  'subscribe',
  'vote',
  'wikiedit',
  'wikiread'
];

const OAUTH_URI = `https://ssl.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.floor(10000 * Math.random())}&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=${OAUTH_SCOPES.join('%20')}`

const DEVICE_WIDTH = Dimensions.get('window').width;

export {
  CLIENT_ID,
  DEVICE_WIDTH,
  OAUTH_URI,
  REDDIT_ACCESS_TOKEN_KEY,
  REDDIT_REFRESH_TOKEN_KEY,
  REDIRECT_URI
};
