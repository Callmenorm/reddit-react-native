import React, {
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HeaderOption from './headerOption';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#4285f4',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10
  }
});

const headerOptions = [
  'Home',
  'Hot'
];

const Header = React.createClass({
  displayName: 'Header',
  propTypes: {
    navigator: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  },
  handleNavigate() {
    this.props.navigator.push({
      name: 'App'
    });
  },
  render() {
    return (
      <View style={styles.toolbar}>
        {headerOptions.map((name, idx) => {
          return (
            <HeaderOption
              key={idx}
              name={name}
              navigator={this.props.navigator}
            />
          );
        })}
        <Text>Back</Text>
      </View>
    );
  }
});

export default Header;
