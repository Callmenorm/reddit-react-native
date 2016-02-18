'use strict';
import {AsyncStorage} from 'react-native';
import {REDDIT_ACCESS_TOKEN_KEY} from './constants';
import {refreshRedditToken} from './authentication';

const refreshAndTryAgain = ({url, config}) => {
  return refreshRedditToken()
    .then(() => {
      return redditFetcher(url, config);
    });
}

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
      })
      .then((response) => {
        const status = response.status;
        if (status >= 200 && status < 300) {
          return response.json();
        } else if (status === 401 || status === 403) {
          return refreshAndTryAgain({url, config});
        }
      });
};

export default redditFetcher;
