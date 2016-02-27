import React, {
  PropTypes,
  Text,
  TouchableHighlight
} from 'react-native';
console.log('got header option');

const HeaderOption = React.createClass({
  displayName: 'HeaderOption',
  propTypes: {
    name: PropTypes.string.isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  },
  handlePress() {
    this.props.navigator.push({
      name: this.props.name
    });
  },
  render() {
    return (
      <TouchableHighlight onPress={this.handlePress}>
        <Text>{this.props.name}</Text>
      </TouchableHighlight>
    );
  }
});

export default HeaderOption;
