import tweets from './tweets.js';
import liked from './likedTweets.js';
import add from './addTweet.js';
import edit from './editTweet.js';
import error from './error.js';

export default path => {
  // static routes
  const routes = {
    '': tweets,
    '/': tweets,
    '#/add': add,
    '#/liked': liked,
    '#/error': error // 404
  };
  let view = routes[path] || error;
  // dynamic routes
  if (/^#\/edit\/:(\d+)$/.test(path)) {
    view = edit;
  }

  return view;
};