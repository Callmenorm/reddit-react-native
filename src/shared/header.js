import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#4285f4',
    flexDirection: 'row',
    height: 50,
    paddingTop: 20
  }
});

const Header = React.createClass({
  displayName: 'Header',
  render() {
    return (
      <View style={styles.toolbar}>
        <Text>ShamWow</Text>
      </View>
    );
  }
});

export default Header;
