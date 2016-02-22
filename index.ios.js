import React, {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  LinkingIOS,
  Text,
  View
} from 'react-native';

import {
  REDDIT_ACCESS_TOKEN_KEY
} from './src/utilities/constants';
import {
  getRedditToken,
  getOauthTokens
} from './src/utilities/authentication';
import parseRedditPassback from './src/utilities/parseRedditPassback';
import redditFetcher from './src/utilities/redditFetcher';

delete GLOBAL.XMLHttpRequest;

var Reddit = React.createClass({
  displayName: 'Reddit',
  componentWillMount() {
    AsyncStorage.getItem(REDDIT_ACCESS_TOKEN_KEY)
      .then(token => {
        return token === null ? getOauthTokens() : undefined;
      })
      .then(() => {
        return redditFetcher('/api/v1/me');
      })
      .then(json => {
        console.log(json);
      })
      .catch((reason) => {
        console.log(reason);
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
