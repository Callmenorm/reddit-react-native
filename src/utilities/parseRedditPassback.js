'use strict';

const parseRedditPassback = (url) => {
  const codeParam = url.split('&').filter(item => {
    return item.startsWith('code');
  });
  return codeParam[0].split('=')[1];
}

export default parseRedditPassback;
