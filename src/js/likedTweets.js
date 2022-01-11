import { root, tweets, tmplMain, tmplAlert } from './controller.js';
import { handleRemoveTweet, handleLike, handleEditTweet, handleGoBack } from './handlers.js';
import '../scss/likedTweets.scss'

export default () => {
  root.innerHTML = '';
  let divLiked = tmplMain.cloneNode(true);
  let header = divLiked.querySelector('#tweetItems h1');
  header.innerText = 'Liked Tweets';
  let ul = divLiked.querySelector('#list');
  divLiked.classList.add('section-liked');
  header.classList.add('section-liked__header');
  ul.classList.add('section-liked__tweets-list');

  tweets
    .filter(tweet => tweet.liked)
    .forEach(tweet => {
      let li = document.createElement('li');
      let pTweet = document.createElement('p');
      li.classList.add('section-liked__tweet');
      pTweet.classList.add('section-liked__tweet-text');
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
      btnRemove.classList.add('section-liked__button');
      let btnLike = document.createElement('button');
      btnLike.innerText = tweet.liked ? 'unlike' : 'like';
      btnLike.dataset.id = tweet.id;
      btnLike.classList.add('section-liked__button');
      btnRemove.addEventListener('click', handleRemoveTweet);
      btnLike.addEventListener('click', handleLike);
      pTweet.addEventListener('click', handleEditTweet);
      li.appendChild(pTweet);
      li.appendChild(btnRemove);
      li.appendChild(btnLike);
      ul.appendChild(li);
    });

  let nav = divLiked.querySelector('#navigationButtons');
  nav.classList.add('section-liked__nav');
  let btnAdd = nav.querySelector('#addTweet');
  btnAdd.remove();
  let btnBack = document.createElement('button');
  btnBack.innerText = 'back';
  btnBack.classList.add('section-liked__button');
  btnBack.addEventListener('click', handleGoBack);
  nav.appendChild(btnBack);

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divLiked);
};