'use strict'
import React, {Text} from 'react-native';
import redditFetcher from '../../utilities/redditFetcher';

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
      console.log('hot', json);
    });
  },
  render() {
    return (
      <Text>Nothing</Text>
    );
  }
});

export default Hot;
