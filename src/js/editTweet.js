import { root, tweets, tmplEdit, tmplAlert } from './controller.js';
import { handleSaveItem, handleCancel } from './handlers.js';
import '../scss/editTweet.scss'

export default id => {
  root.innerHTML = '';
  let found = tweets.find(tweet => tweet.id === +id);
  let divEdit = tmplEdit.cloneNode(true);
  divEdit.classList.add('edit-form');
  let header = divEdit.querySelector('#modifyItemHeader');
  header.classList.add('edit-form__header');
  let txtArea = divEdit.querySelector('#modifyItemInput');
  txtArea.value = found.text;
  txtArea.classList.add('edit-form__textarea');

  let btnCancel = divEdit.querySelector('#cancelModification');
  let btnSave = divEdit.querySelector('#saveModifiedItem');
  btnSave.dataset.action = 'edit';
  btnSave.addEventListener('click', handleSaveItem);
  btnCancel.addEventListener('click', handleCancel);
  btnSave.classList.add('edit-form__button');
  btnCancel.classList.add('edit-form__button');
  let btnPanel = divEdit.querySelector('.formButtons');
  btnPanel.classList.remove('formButtons');
  btnPanel.classList.add('edit-form__btn-panel');

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divEdit);
};
