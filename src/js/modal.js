import AuthForm from './authForm';
import DataSaver from './dataSaver';
import Message from './message.js';
import refs from './refs.js';

export default class Modal {
  constructor() {
    this.refs = refs;
    this.dataSaver = new DataSaver();
  }

  init = () => {
    console.log('Modal');
  };

  onOpenModal = id => {
    if (id) {
      this.id = id;
      this.getRefs();
      this.checkQueue(id);
      this.checkWatched(id);
    }

    // || 'queue')
    // this.dataSaver.setFilmToQueue(id);
    // this.dataSaver.setFilmToWatched(id);
    // и;
    // this.dataMarkup.getCurrentFilmsQueue();
    // this.dataMarkup.getCurrentFilmsWatched();

    // if (typeModal = film) {
    //добавляем класс на модальное окно дла фильмов
    //   } esle if (typeModal = auth) {
    // добавляем класс для стилей аунтефикации
    //   } esle if (typeModal = team) {
    //  добавляем класс для стилей команды
    //   }
    // this.checkWatched();
    refs.btnClose.addEventListener('click', this.onBtnClosePress);
    refs.backdrop.addEventListener('click', this.onBackdropClick);
    refs.backdrop.classList.remove('visually-hidden');
    window.addEventListener('keydown', this.onEscKeyPress);
    this.addBtnListeners();
  };

  onCloseModal = () => {
    refs.btnClose.removeEventListener('click', this.onBtnClosePress);
    refs.backdrop.removeEventListener('click', this.onBackdropClick);
    refs.backdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', this.onEscKeyPress);
    this.removeBtnListeners();
    if (this.modalAuth) {
      this.modalAuth.removeListeners();
      this.modalAuth = null;
    }
    refs.modalCardRef.innerHTML = '';
    // team
    refs.modalContainer.innerHTML = '';
  };

  onBtnClosePress = () => {
    this.onCloseModal();
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.onCloseModal();
    }
  };

  onOpenModalTeam = () => {
    console.log('Open modal team');
  };

  onEscKeyPress = event => {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
      this.onCloseModal();
    }
  };

  getRefs = () => {
    refs.itemAddWatched = document.querySelector('.js-add-watched');
    refs.itemRemoveWatched = document.querySelector('.js-remove-watched');
    refs.itemAddQueue = document.querySelector('.js-add-queue');
    refs.itemRemoveQueue = document.querySelector('.js-remove-queue');
  };

  addBtnListeners = () => {
    // this.getRefs();
    refs.itemAddWatched.addEventListener('click', this.onBtnAddWatchedPress);
    refs.itemRemoveWatched.addEventListener('click', this.onBtnRemoveWatchedPress);
    refs.itemAddQueue.addEventListener('click', this.onBtnAddQueuePress);
    refs.itemRemoveQueue.addEventListener('click', this.onBtnRemoveQueuePress);
  };

  removeBtnListeners = () => {
    // this.getRefs();
    refs.itemAddWatched.removeEventListener('click', this.onBtnAddWatchedPress);
    console.log(refs.itemAddWatched);
    refs.itemRemoveWatched.removeEventListener('click', this.onBtnRemoveWatchedPress);
    refs.itemAddQueue.removeEventListener('click', this.onBtnAddQueuePress);
    refs.itemRemoveQueue.removeEventListener('click', this.onBtnRemoveQueuePress);
  };

  onBtnAddWatchedPress = event => {
    console.log('onBtnAddWatchedPress');
    // this.dataSaver.setFilmToQueue(this.id);
    console.log('itemAddWatched', event.target.value);
    refs.itemAddWatched.classList.add('hidden');
    refs.itemRemoveWatched.classList.remove('hidden');
  };

  onBtnRemoveWatchedPress = () => {
    console.log('onBtnRemoveWatchedPress');
    // this.dataSaver.setFilmToWatched(id);
    console.log('itemRemoveWatched');
    refs.itemAddWatched.classList.remove('hidden');
    refs.itemRemoveWatched.classList.add('hidden');
  };

  onBtnAddQueuePress = () => {
    // this.dataMarkup.getCurrentFilmsQueue();
    console.log('itemAddQueue');
    refs.itemAddQueue.classList.add('hidden');
    refs.itemRemoveQueue.classList.remove('hidden');
  };

  onBtnRemoveQueuePress = () => {
    // this.dataMarkup.getCurrentFilmsWatched();
    console.log('itemRemoveQueue');
    refs.itemAddQueue.classList.remove('hidden');
    refs.itemRemoveQueue.classList.add('hidden');
  };

  checkWatched = id => {
    console.log(this.dataSaver.isFilmInList(id, 'watched'));
    if (this.dataSaver.isFilmInList(id, 'watched')) {
      refs.itemAddWatched.classList.add('hidden');
      refs.itemRemoveWatched.classList.remove('hidden');
    } else {
      refs.itemAddWatched.classList.remove('hidden');
      refs.itemRemoveWatched.classList.add('hidden');
    }
  };

  checkQueue = id => {
    if (this.dataSaver.isFilmInList(id, 'queue')) {
      refs.itemAddQueue.classList.add('hidden');
      refs.itemRemoveQueue.classList.remove('hidden');
    } else {
      refs.itemAddQueue.classList.remove('hidden');
      refs.itemRemoveQueue.classList.add('hidden');
    }
  };

  addAuth = callback => {
    this.modalAuth = new AuthForm(callback, this.onCloseModal);
    this.modalAuth.renderModalAuth();
  };
}
