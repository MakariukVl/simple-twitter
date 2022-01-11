import { root } from './controller.js';
import '../scss/error.scss'

export default () => {
  root.innerHTML = '';
  let divError = document.createElement('div');
  divError.classList.add('error');
  divError.innerText = 'Ops! Error 404';
  root.appendChild(divError);
};
