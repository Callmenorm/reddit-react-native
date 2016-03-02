'use strict'
import React, {ScrollView, StyleSheet, Text, View} from 'react-native';
import redditFetcher from '../../utilities/redditFetcher';
import Container from '../items/container';

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  }
});

const Hot = React.createClass({
  displayName: 'Hot',
  getInitialState() {
    return {
      hot: []
    };
  },
  componentDidMount() {
    redditFetcher('/hot')
    .then(json => {
      console.log(json.data.children);
      this.setState({
        hot: json.data.children
      });
    });
  },
  _renderHot() {
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scroll}
        >
          {this.state.hot.map((item, idx) => {
            return (
              <Container
                item={item.data}
                key={idx}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  },
  _renderNothing() {
    return (
      <Text>
        Waiting for Hot
      </Text>
    );
  },
  render() {
    if (!this.state.hot) {
      return this._renderNothing();
    } else {
      return this._renderHot();
    }
  }
});

export default Hot;
