import refs from './modal-refs.js';

export default class Modal {
  constructor() {
    this.refs = refs;
  }

  init = () => {
    console.log('Modal');
    this.createModal();
  };

  createModal = () => {
    refs.list.addEventListener('click', event => {
      event.preventDefault();
      const isModalCard = event.target.classList.contains('card__image');

      if (!isModalCard) {
        return;
      }

      this.onOpenModal();
    });
  };

  onOpenModal = () => {
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

  addBtnListeners = () => {
    refs.itemAddWatched.addEventListener('click', this.onBtnAddWatchedPress());
    refs.itemRemoveWatched.addEventListener('click', this.onBtnRemoveWatchedPress());
    refs.itemAddQueue.addEventListener('click', this.onBtnAddQueuePress());
    refs.itemRemoveQueue.addEventListener('click', this.onBtnRemoveQueuePress());
  };

  removeBtnListeners = () => {
    refs.itemAddWatched.removeEventListener('click', this.onBtnAddWatchedPress());
    refs.itemRemoveWatched.removeEventListener('click', this.onBtnRemoveWatchedPress());
    refs.itemAddQueue.removeEventListener('click', this.onBtnAddQueuePress());
    refs.itemRemoveQueue.removeEventListener('click', this.onBtnRemoveQueuePress());
  };

  onBtnAddWatchedPress = event => {
    // refs.itemAddWatched.classList.toggle('hidden');

    // refs.itemAddWatched.classList.add('hidden');
    // refs.itemRemoveWatched.classList.remove('hidden');
    console.log(refs.itemAddWatched);
    console.log('event', event);
  };

  onBtnRemoveWatchedPress = () => {
    console.log('onBtnRemoveWatchedPress');
    refs.itemAddWatched.classList.remove('hidden');
    // refs.itemRemoveWatched.classList.add('hidden');
  };

  onBtnAddQueuePress = () => {
    console.log('onBtnAddQueuePress');
    refs.itemAddQueue.classList.remove('hidden');
    // refs.itemRemoveQueue.classList.add('hidden');
  };

  onBtnRemoveQueuePress = () => {
    console.log('onBtnRemoveQueuePress');
    // refs.itemAddQueue.classList.add('hidden');
    // refs.itemRemoveQueue.classList.remove('hidden');
  };
}

// js-film-list
const modalWindow = new Modal();
modalWindow.init();
