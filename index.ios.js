/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
  REDIRECT_URI,
  CLIENT_ID,
  REDDIT_ACCESS_TOKEN_KEY
} from './src/utilities/constants';
import parseRedditPassback from './src/utilities/parseRedditPassback';
import redditFetcher from './src/utilities/redditFetcher';
import refreshRedditToken from './src/utilities/authentication';
const randomState = Math.floor(1000000 * Math.random());
const uri = `https://ssl.reddit.com/api/v1/authorize.compact?client_id=${CLIENT_ID}&response_type=code&state=${randomState}&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=read`
delete GLOBAL.XMLHttpRequest;

var Reddit = React.createClass({
  displayName: 'Reddit',
  componentWillMount() {
    AsyncStorage.getItem(REDDIT_ACCESS_TOKEN_KEY)
      .then(token => {
        if (token !== null) {
          return redditFetcher('/api/info')
        } else {
          LinkingIOS.canOpenURL(uri, (supported) => {
            if (!supported) {
              AlertIOS.alert('Can\'t handle url: ' + uri);
            } else {
              LinkingIOS.openURL(uri);
            }
          });
        }
      })
      .then(response => {
        return response.json();
      })
      .catch(() => {
        console.log('about to open oauth');
        LinkingIOS.canOpenURL(uri, (supported) => {
          if (!supported) {
            AlertIOS.alert('Can\'t handle url: ' + uri);
          } else {
            LinkingIOS.openURL(uri);
          }
        });
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
    refreshRedditToken(accessCode);
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
