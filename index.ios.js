/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View
  // WebView
} from 'react-native';

// const WEBVIEW_REF = 'webview';
// const renderRedditAuth = ({state}) => {
//   return (
//     <WebView
//       automaticallyAdjustContentInsets={false}
//       decelerationRate="normal"
//       domStorageEnabled={true}
//       javaScriptEnabled={true}
//       // onNavigationStateChange={this.onNavigationStateChange}
//       // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
//       ref={WEBVIEW_REF}
//       scalesPageToFit={this.state.scalesPageToFit}
//       source={{uri: state.url}}
//       startInLoadingState={true}
//       style={styles.webView}
//     />
//   );
// };

var Reddit = React.createClass({
  displayName: 'Reddit',
  getInitialState() {
    return {
      url: 'https://ssl.reddit.com/api/v1/authorize?client_id=t7x3gcvSp8A0_A&response_type=code&state=TEST&redirect_uri=reactNativeReddit://response&duration=permanent&scope=read'
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          I'm dying to do something good!
        </Text>
      </View>
        // {renderRedditAuth(this.state)}
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10
  // },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('Reddit', () => Reddit);
