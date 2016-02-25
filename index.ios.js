import React, {
  AppRegistry,
  AsyncStorage,
  Navigator,
  LinkingIOS,
  StyleSheet,
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
import Toc from './src/views/toc/toc';
import Header from './src/shared/header';

delete GLOBAL.XMLHttpRequest;

const App = React.createClass({
  displayName: 'Reddit',
  componentWillMount() {
    AsyncStorage.getItem(REDDIT_ACCESS_TOKEN_KEY)
      .then(token => {
        return token === null ? getOauthTokens() : undefined;
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
        <Toc/>
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

var Reddit = React.createClass({
  renderScene(route, navigator) {
    switch (route.name) {
      case 'Reddit':
        return (
          <View>
            <Header />
            <App navigator={navigator} />
          </View>
        );
      default:
        return (
          <View>
            <Header />
            <App navigator={navigator} />
          </View>
        );
    }
  },
  render() {
    return (
      <Navigator
        initialRoute={{name: 'App'}}
        renderScene={this.renderScene}
        style={{flex: 1}}
      />
    );
  }
});

AppRegistry.registerComponent('Reddit', () => Reddit);
