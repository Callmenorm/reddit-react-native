import React, {
  AlertIOS,
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  LinkingIOS,
  Text,
  View
} from 'react-native';

import {
  OAUTH_URI,
  REDDIT_ACCESS_TOKEN_KEY
} from './src/utilities/constants';
import {
  getRedditToken,
  getOauthToken
} from './src/utilities/authentication';
import parseRedditPassback from './src/utilities/parseRedditPassback';
import redditFetcher from './src/utilities/redditFetcher';
delete GLOBAL.XMLHttpRequest;

var mountCount = 0;
var Reddit = React.createClass({
  displayName: 'Reddit',
  componentWillMount() {
    mountCount += 1;
    console.log('mounCount', mountCount);
    AsyncStorage.getItem(REDDIT_ACCESS_TOKEN_KEY)
      .then(token => {
        if (token !== null) {
          return redditFetcher('/api/info');
        } else {
          return getOauthToken();
        }
      })
      .then(response => {
        return response.json();
      })
      .catch(() => {
      });
  },
  componentDidMount() {
    LinkingIOS.addEventListener('url', this._handleURL);
  },
  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleURL);
  },
  _handleURL(event) {
    const accessCode = parseRedditPassback(event.url);
    getRedditToken(accessCode);
  },
  render() {
    return (
      <View style={styles.container}>
        <Text>
          We have a winner
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('Reddit', () => Reddit);
