import { root, tweets, tmplMain, tmplAlert } from './controller.js';
import {
  handleRemoveTweet,
  handleLike,
  handleEditTweet,
  handleAddTweet,
  handleGoLiked
} from './handlers.js';
import '../scss/tweets.scss'

export default () => {
  root.innerHTML = '';
  let divMain = tmplMain.cloneNode(true);
  let ul = divMain.querySelector('#list');
  let header = divMain.querySelector('#tweetItems h1');
  divMain.classList.add('section-tweets');
  header.classList.add('section-tweets__header');
  ul.classList.add('section-tweets__tweets-list');

  tweets.forEach(tweet => {
    let li = document.createElement('li');
    let pTweet = document.createElement('p');
    li.classList.add('section-tweets__tweet');
    pTweet.classList.add('section-tweets__tweet-text');
    pTweet.innerText = tweet.text;
    pTweet.dataset.id = tweet.id;
    if (tweet.liked) {
      pTweet.classList.add('liked');
    } else {
      pTweet.classList.add('disliked');
    }
    let btnRemove = document.createElement('button');
    btnRemove.innerText = 'remove';
    btnRemove.dataset.id = tweet.id;
    btnRemove.classList.add('section-tweets__button');
    let btnLike = document.createElement('button');
    btnLike.innerText = tweet.liked ? 'unlike' : 'like';
    btnLike.dataset.id = tweet.id;
    btnLike.classList.add('section-tweets__button');
    btnRemove.addEventListener('click', handleRemoveTweet);
    btnLike.addEventListener('click', handleLike);
    pTweet.addEventListener('click', handleEditTweet);
    li.appendChild(pTweet);
    li.appendChild(btnRemove);
    li.appendChild(btnLike);
    ul.appendChild(li);
  });

  let nav = divMain.querySelector('#navigationButtons');
  nav.classList.add('section-tweets__nav');
  let btnAdd = nav.querySelector('#addTweet');
  btnAdd.addEventListener('click', handleAddTweet);
  btnAdd.classList.add('section-tweets__button');
  if (tweets.some(tweet => tweet.liked)) {
    let btnLiked = document.createElement('button');
    btnLiked.innerText = 'Go to liked';
    btnLiked.addEventListener('click', handleGoLiked);
    btnLiked.classList.add('section-tweets__button');
    nav.appendChild(btnLiked);
  }

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divMain);
};
