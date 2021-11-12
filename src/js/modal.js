import AuthForm from './authForm';
import DataMarkup from './dataMarkup';
import DataSaver from './dataSaver';
import LoadSpinner from './loadSpinner';
import Message from './message.js';
import refs from './refs.js';

export default class Modal {
  constructor() {
    this.refs = refs;
    this.dataSaver = new DataSaver();
    this.load = new LoadSpinner();
    this.dataMarkup = new DataMarkup();
  }

  init = () => {
    console.log('Modal');
  };

  onOpenModal = (id, page) => {
    this.page = page;
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
    if (page === 'film') {
      this.addBtnListeners();
    }
  };

  onCloseModal = () => {
    refs.btnClose.removeEventListener('click', this.onBtnClosePress);
    refs.backdrop.removeEventListener('click', this.onBackdropClick);
    refs.backdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', this.onEscKeyPress);
    if (this.page === 'film') {
      this.removeBtnListeners();
    }
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
    refs.itemRemoveWatched.removeEventListener('click', this.onBtnRemoveWatchedPress);
    refs.itemAddQueue.removeEventListener('click', this.onBtnAddQueuePress);
    refs.itemRemoveQueue.removeEventListener('click', this.onBtnRemoveQueuePress);
  };

  onBtnAddWatchedPress = async event => {
    try {
      this.load.showSpinner();
      const res = await this.dataSaver.addFilm(this.id, 'watched');
      console.log('itemAddWatched');
      refs.itemAddWatched.classList.add('hidden');
      refs.itemRemoveWatched.classList.remove('hidden');
      this.reRenderPage();
    } catch (error) {
      Message.error(error.message);
    } finally {
      this.load.hideSpinner();
    }
  };

  onBtnRemoveWatchedPress = async () => {
    try {
      this.load.showSpinner();
      const res = await this.dataSaver.removeData(this.id, 'watched');
      console.log('itemRemoveWatched');
      refs.itemAddWatched.classList.remove('hidden');
      refs.itemRemoveWatched.classList.add('hidden');
      this.reRenderPage();
    } catch (error) {
      Message.error(error.message);
    } finally {
      this.load.hideSpinner();
    }
  };

  onBtnAddQueuePress = async () => {
    try {
      this.load.showSpinner();
      const res = await this.dataSaver.addFilm(this.id, 'queue');
      refs.itemAddQueue.classList.add('hidden');
      refs.itemRemoveQueue.classList.remove('hidden');
      this.reRenderPage();
    } catch (error) {
      Message.error(error);
    } finally {
      this.load.hideSpinner();
    }
  };

  onBtnRemoveQueuePress = async () => {
    console.log('itemRemoveQueue');
    try {
      const res = await this.dataSaver.removeData(this.id, 'queue');
      refs.itemAddQueue.classList.remove('hidden');
      refs.itemRemoveQueue.classList.add('hidden');
      this.reRenderPage();
    } catch (error) {
      Message.error(error);
    } finally {
      this.load.hideSpinner();
    }
  };

  reRenderPage = async () => {
    const page = this.dataSaver.getActivePage();
    switch (page) {
      case 'watched':
        this.dataMarkup.getCurrentFilmsWatched();
        await this.dataSaver.setTotalPageFilms('watched');
        break;
      case 'queue':
        this.dataMarkup.getCurrentFilmsQueue();
        await this.dataSaver.setTotalPageFilms('queue');
        break;
    }
  };

  checkWatched = async id => {
    const filmInList = await this.dataSaver.isFilmInList(id, 'watched');
    if (filmInList) {
      refs.itemAddWatched.classList.add('hidden');
      refs.itemRemoveWatched.classList.remove('hidden');
    } else {
      refs.itemAddWatched.classList.remove('hidden');
      refs.itemRemoveWatched.classList.add('hidden');
    }
  };

  checkQueue = async id => {
    const filmInList = await this.dataSaver.isFilmInList(id, 'queue');
    if (filmInList) {
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
