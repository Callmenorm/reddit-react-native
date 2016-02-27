'use strict';
import React from 'react-native';

import redditFetcher from '../../utilities/redditFetcher';
import DumbToc from './dumbToc';

const Toc = React.createClass({
  displayName: 'Toc',
  getInitialState() {
    return {
      subscribed: []
    };
  },
  componentDidMount() {
    redditFetcher('/subreddits/mine/subscriber')
    .then(json => {
      const filteredData = json.data.children
      .reduce((state, child) => {
        state.push({
          title: child.data.title,
          url: child.data.url
        });
        return state;
      }, []);
      this.setState({subscribed: filteredData});
    });
  },
  render() {
    return (
      <DumbToc subscribed={this.state.subscribed} />
    );
  }
});

export default Toc;
