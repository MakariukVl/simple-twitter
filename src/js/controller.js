import route from './router.js';
import '../scss/root.scss';
import '../scss/alert.scss';

const root = document.getElementById('root');

const tweets = [];
const generateID = {
  current: 0,
  next: function () {
    return ++this.current;
  }
};
let tmplAlert, tmplMain, tmplEdit;
let prevPage = {
  _pageName: 'home',
  getPrevPage: function () {
    return this['_pageName'];
  },
  setPrevPage: function (pageName) {
    this['_pageName'] = pageName;
  }
};

window.onload = () => {
  tmplAlert = root.querySelector('#alertMessage');
  tmplMain = root.querySelector('#tweetItems');
  tmplEdit = root.querySelector('#modifyItem');

  const tweetsJSON = localStorage.getItem('tweets');
  const idStorage = localStorage.getItem('id');
  if (tweetsJSON && idStorage) {
    tweets.push(...JSON.parse(tweetsJSON));
    generateID.current = +idStorage;
  }

  tmplEdit.classList.remove('hidden');
  history.pushState(null, 'home', location.pathname);
  const render = route('/');
  prevPage.setPrevPage('home');
  render();
};

window.onunload = () => {
  const tweetsJSON = JSON.stringify(tweets);
  localStorage.setItem('tweets', tweetsJSON);
  localStorage.setItem('id', generateID.current);
};

window.onpopstate = () => {
  const render = /^#\/edit\/:(\d+)$/.test(location.hash)
    ? route(location.hash).bind(null, RegExp.$1)
    : route(location.hash);
  if (location.hash === '') {
    prevPage.setPrevPage('home');
  } else if (location.hash === '#/liked') {
    prevPage.setPrevPage('liked');
  }
  render();
};

export { root, tweets, generateID, prevPage, tmplAlert, tmplMain, tmplEdit };
