const root = document.getElementById('root');

let tweets = [];
let id = 0;
let tmplAlert, tmplMain, tmplEdit;
const TIMEOUT = 2000; // 2sec
const MAX_LENGTH = 140; // chars
let from = 'home';

const handleAddTweet = () => {
  const path = location.pathname;
  // go to 'Add tweet' page
  history.pushState(null, 'add', path + '#/add');
  const render = route('#/add');
  render();
};

const handleGoLiked = () => {
  const path = location.pathname;
  // go to 'Liked tweets' page
  history.pushState(null, 'liked', path + '#/liked');
  const render = route('#/liked');
  from = 'liked';
  render();
};

const handleGoBack = () => {
  let render;

  history.pushState(null, 'home', location.pathname);
  render = route('/');
  from = 'home';
  render();
};

const handleLike = event => {
  let id = +event.target.dataset.id;
  let found = tweets.find(tweet => tweet.id === id);
  found.liked = !found.liked;

  const render = from === 'liked' ? route('#/liked') : route('/');
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
  tweets = tweets.filter(tweet => tweet.id !== id);
  const render = from === 'liked' ? route('#/liked') : route('/');
  render();
};

const handleEditTweet = event => {
  const path = location.pathname;
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
      //save newTweet
      let newTweet = {
        id: id++,
        text: textarea.value,
        liked: false
      };
      tweets.push(newTweet);
    } else {
      //save edited tweet
      let itemId = location.hash.split(':')[1];
      let found = tweets.find(tweet => tweet.id === +itemId);
      found.text = textarea.value;
    }

    // return to home or liked page
    let render;
    if (from === 'liked') {
      history.pushState(null, 'liked', location.pathname + '#/liked');
      render = route('#/liked');
    } else {
      history.pushState(null, 'home', location.pathname);
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
  if (from === 'liked') {
    history.pushState(null, 'liked', location.pathname + '#/liked');
    render = route('#/liked');
  } else {
    history.pushState(null, 'home', location.pathname);
    render = route('/');
  }
  render();
};

const main = () => {
  root.innerHTML = '';
  let divMain = tmplMain.cloneNode(true);
  let ul = divMain.querySelector('#list');

  tweets.forEach(tweet => {
    let li = document.createElement('li');
    let pTweet = document.createElement('p');
    pTweet.classList.add('tweet');
    pTweet.innerText = tweet.text;
    pTweet.dataset.id = tweet.id;
    if (tweet.liked) {
      pTweet.classList.add('liked');
    }
    let btnRemove = document.createElement('button');
    btnRemove.innerText = 'remove';
    btnRemove.dataset.id = tweet.id;
    btnRemove.classList.add('tweet-button');
    let btnLike = document.createElement('button');
    btnLike.innerText = tweet.liked ? 'unlike' : 'like';
    btnLike.dataset.id = tweet.id;
    btnLike.classList.add('tweet-button');
    btnRemove.addEventListener('click', handleRemoveTweet);
    btnLike.addEventListener('click', handleLike);
    pTweet.addEventListener('click', handleEditTweet);
    li.appendChild(pTweet);
    li.appendChild(btnRemove);
    li.appendChild(btnLike);
    ul.appendChild(li);
  });

  let nav = divMain.querySelector('#navigationButtons');
  let btnAdd = nav.querySelector('button.addTweet');
  btnAdd.addEventListener('click', handleAddTweet);
  if (tweets.some(tweet => tweet.liked)) {
    let btnLiked = document.createElement('button');
    btnLiked.innerText = 'Go to liked';
    btnLiked.classList.add('tweet-button');
    btnLiked.addEventListener('click', handleGoLiked);
    nav.appendChild(btnLiked);
  }

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divMain);
};

const add = () => {
  root.innerHTML = '';
  let divAdd = tmplEdit.cloneNode(true);
  divAdd.id = 'addItem';
  let header = divAdd.querySelector('#modifyItemHeader');
  header.id = 'addItemHeader';
  header.innerText = 'Add tweet';
  let txtArea = divAdd.querySelector('#modifyItemInput');
  txtArea.id = 'addItemInput';
  let btnCancel = divAdd.querySelector('#cancelModification');
  btnCancel.id = 'cancelAdding';
  let btnSave = divAdd.querySelector('#saveModifiedItem');
  btnSave.id = 'saveAddedItem';
  btnSave.dataset.action = 'add';

  btnSave.addEventListener('click', handleSaveItem);
  btnCancel.addEventListener('click', handleCancel);

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divAdd);
};

const edit = id => {
  root.innerHTML = '';
  let found = tweets.find(tweet => tweet.id === +id);
  let divEdit = tmplEdit.cloneNode(true);
  let txtArea = divEdit.querySelector('#modifyItemInput');
  txtArea.value = found.text;

  let btnCancel = divEdit.querySelector('#cancelModification');
  let btnSave = divEdit.querySelector('#saveModifiedItem');
  btnSave.dataset.action = 'edit';
  btnSave.addEventListener('click', handleSaveItem);
  btnCancel.addEventListener('click', handleCancel);

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divEdit);
};

const liked = () => {
  root.innerHTML = '';
  let divLiked = tmplMain.cloneNode(true);
  let header = divLiked.querySelector('#tweetItems h1');
  header.innerText = 'Liked Tweets';
  let ul = divLiked.querySelector('#list');

  tweets
    .filter(tweet => tweet.liked)
    .forEach(tweet => {
      let li = document.createElement('li');
      let pTweet = document.createElement('p');
      pTweet.classList.add('tweet');
      pTweet.innerText = tweet.text;
      pTweet.dataset.id = tweet.id;
      if (tweet.liked) {
        pTweet.classList.add('liked');
      }
      let btnRemove = document.createElement('button');
      btnRemove.innerText = 'remove';
      btnRemove.dataset.id = tweet.id;
      btnRemove.classList.add('tweet-button');
      let btnLike = document.createElement('button');
      btnLike.innerText = tweet.liked ? 'unlike' : 'like';
      btnLike.dataset.id = tweet.id;
      btnLike.classList.add('tweet-button');
      btnRemove.addEventListener('click', handleRemoveTweet);
      btnLike.addEventListener('click', handleLike);
      pTweet.addEventListener('click', handleEditTweet);
      li.appendChild(pTweet);
      li.appendChild(btnRemove);
      li.appendChild(btnLike);
      ul.appendChild(li);
    });

  let nav = divLiked.querySelector('#navigationButtons');
  let btnAdd = nav.querySelector('button.addTweet');
  btnAdd.remove();
  let btnBack = document.createElement('button');
  btnBack.innerText = 'back';
  btnBack.classList.add('tweet-button');
  btnBack.addEventListener('click', handleGoBack);
  nav.appendChild(btnBack);

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divLiked);
};

const error = () => {
  root.innerHTML = '';
  let divError = document.createElement('div');
  divError.style.textAlign = 'center';
  divError.style.padding = '0.5em';
  divError.style.fontSize = '160%';
  divError.innerText = 'Ops! Error 404';
  root.appendChild(divError);
};

const route = path => {
  // static routes
  const routes = {
    '': main,
    '/': main,
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

window.onload = () => {
  tmplAlert = root.querySelector('#alertMessage');
  tmplMain = root.querySelector('#tweetItems');
  tmplEdit = root.querySelector('#modifyItem');

  const tweetsJSON = localStorage.getItem('tweets');
  const idStorage = localStorage.getItem('id');
  if (tweetsJSON && idStorage) {
    tweets = JSON.parse(tweetsJSON);
    id = +idStorage;
  }

  tmplEdit.classList.remove('hidden');
  history.pushState(null, 'home', location.pathname);
  const render = route('/');
  from = 'home';
  render();
};

window.onunload = () => {
  const tweetsJSON = JSON.stringify(tweets);
  localStorage.setItem('tweets', tweetsJSON);
  localStorage.setItem('id', id);
};

window.onpopstate = () => {
  const render = /^#\/edit\/:(\d+)$/.test(location.hash)
    ? route(location.hash).bind(null, RegExp.$1)
    : route(location.hash);
  if (location.hash === '') {
    from = 'home';
  } else if (location.hash === '#/liked') {
    from = 'liked';
  }
  render();
};
