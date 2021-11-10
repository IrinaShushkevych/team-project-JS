import refs from './refs';
import authTpl from '../templates/modalAuth.hbs';
import Save from './auth';
import Message from './message.js';

export default class AuthForm {
  constructor(
    callback,
    callbackModal,
    modalContainer = refs.modalCardRef,
    modalForm = refs.modalRef,
  ) {
    this.callback = callback;
    this.callbackModal = callbackModal;
    this.modalCardRef = modalContainer;
    this.modalRef = modalForm;
  }

  addListener = () => {
    this.inputEmail.addEventListener('input', this.onInputEmail);
    this.inputPassword.addEventListener('input', this.onInputPassword);
    this.buttons.addEventListener('click', this.onClickAuth);
  };

  removeListeners = () => {
    this.modalRef.classList.remove('modal-auth');
    document.querySelector('.js-auth-button').removeEventListener('click', this.onClickAuth);
  };

  getRefs = () => {
    this.inputEmail = document.querySelector('.js-auth-register');
    this.inputPassword = document.querySelector('.js-auth-login');
    this.buttons = document.querySelector('.js-auth-button');
  };

  renderModalAuth = () => {
    const markup = authTpl();
    this.modalCardRef.innerHTML = markup;
    this.modalRef.classList.add('modal-auth');
    this.getRefs();
    this.addListener();
  };

  addClassValid = (elem, flag) => {
    if (flag) {
      if (!elem.classList.contains('valid')) {
        elem.classList.add('valid');
        elem.classList.remove('invalid');
        this.checkInput();
      }
    } else {
      if (!elem.classList.contains('invalid')) {
        elem.classList.remove('valid');
        elem.classList.add('invalid');
        this.checkInput();
      }
    }
  };

  clearClassValid = elem => {
    elem.classList.remove('invalid');
    elem.classList.remove('valid');
    this.checkInput();
  };

  checkInput = () => {
    if (
      this.inputPassword.classList.contains('valid') &&
      this.inputEmail.classList.contains('valid')
    ) {
      [...this.buttons.children].forEach(el => {
        el.disabled = false;
      });
    } else {
      [...this.buttons.children].forEach(el => {
        el.disabled = true;
      });
    }
  };

  onValidation = (elem, expression) => {
    if (elem.value.trim().length > 0) {
      let isvalid = false;
      if (expression.test(elem.value)) {
        isvalid = true;
      }
      this.addClassValid(elem, isvalid);
    } else {
      this.clearClassValid(elem);
    }
  };

  onInputEmail = e => {
    const expression = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    this.onValidation(e.target, expression);
  };

  onInputPassword = e => {
    const expression = /[0-9a-zA-Z!@#$%^&*]{6,}/;
    this.onValidation(e.target, expression);
  };

  onClickAuth = async e => {
    console.dir(this);
    if (e.target.classList.contains('js-btn-register')) {
      const auth = new Save();
      const result = await auth.register(this.inputEmail.value, this.inputPassword.value);
      if (result.type === 0) {
        Message.error(result.text);
      } else {
        Message.success('You are registry!!!');
        this.callback();
        this.callbackModal();
      }
    } else if (e.target.classList.contains('js-btn-login')) {
      const auth = new Save();
      const result = await auth.login(this.inputEmail.value, this.inputPassword.value);

      if (result.type === 0) {
        Message.error(result.text);
        console.log(result);
      } else {
        Message.success('You are log in!!!');
        this.callback();
        this.callbackModal();
      }
    }
  };
}
