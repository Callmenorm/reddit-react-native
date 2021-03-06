import React,{
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {DEVICE_WIDTH} from '../../utilities/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 50,
    justifyContent: 'flex-start',
    marginBottom: 1,
    width: DEVICE_WIDTH
  },
  score: {
    paddingRight: 5,
    fontSize: 10,
    fontWeight: 'bold',
    width: 50
  },
  title: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'left',
    width: DEVICE_WIDTH - 50
  }
});

const Container = React.createClass({
  displayName: 'Container',
  propTypes: {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      score: PropTypes.number,
      ups: PropTypes.number,
      downs: PropTypes.number
    })
  },
  render() {
    const {title,  score} = this.props.item;
    return (
      <View style={styles.container}>
        <View>
          <Icon.Button name="angle-up" backgroundColor="#3b5998" />
          <Text style={styles.score}>{score}</Text>
          <Icon.Button name="angle-down" backgroundColor="#3b5998" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
});

export default Container;
