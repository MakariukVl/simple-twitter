import { prevPage, tweets, generateID } from './controller.js';
import route from './router.js';

const TIMEOUT = 2000; // 2sec
const MAX_LENGTH = 140; // chars

const handleAddTweet = () => {
  const path =
    location.protocol !== 'file:'
      ? location.pathname.slice(0, location.pathname.length - '1')
      : location.pathname;
  // go to 'Add tweet' page
  history.pushState(null, 'add', path + '#/add');
  const render = route('#/add');
  render();
};

const handleGoLiked = () => {
  const path =
    location.protocol !== 'file:'
      ? location.pathname.slice(0, location.pathname.length - '1')
      : location.pathname;
  // go to 'Liked tweets' page
  history.pushState(null, 'liked', path + '#/liked');
  const render = route('#/liked');
  prevPage.setPrevPage('liked');
  render();
};

const handleGoBack = () => {
  let render;
  history.pushState(null, 'home', location.pathname || '/');
  render = route('/');
  prevPage.setPrevPage('home');
  render();
};

const handleLike = event => {
  let id = +event.target.dataset.id;
  let found = tweets.find(tweet => tweet.id === id);
  found.liked = !found.liked;

  const render =
    prevPage.getPrevPage() === 'liked' ? route('#/liked') : route('/');
  render();

  let msgAlert = document.querySelector('#alertMessageText');
  let alert = document.querySelector('#alertMessage');

  alert.classList.remove('hidden');
  if (found.liked) {
    msgAlert.innerText = `Hooray! You liked tweet with id ${id}!`;
  } else {
    msgAlert.innerText = `Sorry you no longer like tweet with id ${id}`;
  }
  setTimeout(() => {
    alert.classList.add('hidden');
  }, TIMEOUT);
};

const handleRemoveTweet = event => {
  let id = +event.target.dataset.id;
  const tweetsLeft = tweets.filter(tweet => tweet.id !== id);
  tweets.splice(0);
  tweets.push(...tweetsLeft);
  const render =
    prevPage.getPrevPage() === 'liked' ? route('#/liked') : route('/');
  render();
};

const handleEditTweet = event => {
  const path =
    prevPage.getPrevPage() === 'home' && location.protocol !== 'file:'
      ? location.pathname.slice(0, location.pathname.length - '1')
      : location.pathname;
  let id = event.target.dataset.id;
  history.pushState(null, 'edit', path + '#/edit/:' + id);
  const render = route('#/edit/:' + id);
  render(+id);
};

const handleSaveItem = event => {
  const textarea =
    document.querySelector('#addItemInput') ||
    document.querySelector('#modifyItemInput');

  if (
    tweets.every(tweet => tweet.text !== textarea.value) &&
    textarea.value.length > 0 &&
    textarea.value.length < MAX_LENGTH
  ) {
    if (event.target.dataset.action === 'add') {
      let newTweet = {
        id: generateID.next(),
        text: textarea.value,
        liked: false
      };
      tweets.push(newTweet);
    } else {
      let itemId = location.hash.split(':')[1];
      let found = tweets.find(tweet => tweet.id === +itemId);
      found.text = textarea.value;
    }

    // return to home or liked page
    let render;
    if (prevPage.getPrevPage() === 'liked') {
      history.pushState(null, 'liked', location.pathname + '#/liked');
      render = route('#/liked');
    } else {
      history.pushState(null, 'home', location.pathname || '/');
      render = route('/');
    }
    render();
  } else {
    let msgAlert = document.querySelector('#alertMessageText');
    msgAlert.innerText = "Error! You can't tweet about that";
    let alert = document.querySelector('#alertMessage');
    alert.classList.remove('hidden');
    setTimeout(() => {
      alert.classList.add('hidden');
    }, TIMEOUT);
  }
};

const handleCancel = () => {
  // return to home or liked page
  let render;
  if (prevPage.getPrevPage() === 'liked') {
    history.pushState(null, 'liked', location.pathname + '#/liked');
    render = route('#/liked');
  } else {
    history.pushState(null, 'home', location.pathname || '/');
    render = route('/');
  }
  render();
};

export {
  handleAddTweet,
  handleGoLiked,
  handleGoBack,
  handleLike,
  handleRemoveTweet,
  handleEditTweet,
  handleSaveItem,
  handleCancel
};
