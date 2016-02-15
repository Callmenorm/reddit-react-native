'use strict';
import {AsyncStorage} from 'react-native';
import {REDDIT_ACCESS_TOKEN_KEY} from './constants';

const redditFetcher = (url, config) => {
    const redditUrl = `https://oauth.reddit.com/${url}`;
    return AsyncStorage.getItem(REDDIT_ACCESS_TOKEN_KEY)
      .then((token) => {
        const requestConfig = config || {};
        const redditHeaders = Object.assign({}, requestConfig.headers, {
          Authorization: `bearer ${token}`
        });
        const redditConfig = Object.assign({}, config, {
          headers: redditHeaders
        });

        return fetch(redditUrl, redditConfig);
      });
}

export default redditFetcher;
