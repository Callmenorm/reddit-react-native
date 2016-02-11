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

import parseRedditPassback from './src/utilities/parseRedditPassback';
const randomState = Math.floor(1000000 * Math.random());
const uri = `https://ssl.reddit.com/api/v1/authorize?client_id=t7x3gcvSp8A0_A&response_type=code&state=${randomState}&redirect_uri=reactNativeReddit://response&duration=permanent&scope=read`

var Reddit = React.createClass({
  displayName: 'Reddit',
  componentWillMount() {
    AsyncStorage.getItem('redditToken')
      .then(token => {
        console.log('asyncstorage token', token);
      });
    LinkingIOS.canOpenURL(uri, (supported) => {
      if (!supported) {
        AlertIOS.alert('Can\'t handle url: ' + uri);
      } else {
        LinkingIOS.openURL(uri);
      }
    });
  },
  componentDidMount() {
    LinkingIOS.addEventListener('url', this._handleURL);
  },
  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleURL);
  },
  _handleURL(event) {
    AsyncStorage.setItem('redditToken', parseRedditPassback(event.url));
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
