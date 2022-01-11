import { root, tmplEdit, tmplAlert } from './controller.js';
import { handleSaveItem, handleCancel } from './handlers.js';
import '../scss/addTweet.scss'

export default () => {
  root.innerHTML = '';
  let divAdd = tmplEdit.cloneNode(true);
  divAdd.id = 'addItem';
  divAdd.classList.add('add-form');
  let header = divAdd.querySelector('#modifyItemHeader');
  header.id = 'addItemHeader';
  header.innerText = 'Add tweet';
  header.classList.add('add-form__header');
  let txtArea = divAdd.querySelector('#modifyItemInput');
  txtArea.id = 'addItemInput';
  txtArea.classList.add('add-form__textarea');
  let btnCancel = divAdd.querySelector('#cancelModification');
  btnCancel.id = 'cancelAdding';
  btnCancel.classList.add('add-form__button');
  let btnSave = divAdd.querySelector('#saveModifiedItem');
  btnSave.id = 'saveAddedItem';
  btnSave.classList.add('add-form__button');
  btnSave.dataset.action = 'add';
  let btnPanel = divAdd.querySelector('.formButtons');
  btnPanel.classList.remove('formButtons');
  btnPanel.classList.add('add-form__btn-panel');

  btnSave.addEventListener('click', handleSaveItem);
  btnCancel.addEventListener('click', handleCancel);

  root.appendChild(tmplAlert.cloneNode(true));
  root.appendChild(divAdd);
};
