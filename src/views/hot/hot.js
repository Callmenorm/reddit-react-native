'use strict'
import React, {ListView, StyleSheet, Text, View} from 'react-native';
import redditFetcher from '../../utilities/redditFetcher';
import Container from '../items/container';

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});

const Hot = React.createClass({
  displayName: 'Hot',
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },
  componentDidMount() {
    redditFetcher('/hot')
    .then(json => {
      console.log(json.data.children);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(json.data.children),
        loaded: true
      });
    });
  },
  _renderHot() {
    return (
      <View style={styles.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => <Container item={row.data} />}
        />
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
    if (!this.state.loaded) {
      return this._renderNothing();
    } else {
      return this._renderHot();
    }
  }
});

export default Hot;
