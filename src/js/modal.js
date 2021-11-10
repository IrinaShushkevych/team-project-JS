// import refs from './modal-refs.js';
import refs from './refs.js';

export default class Modal {
  constructor() {
    this.refs = refs;
  }

  init = () => {
    console.log('Modal');
  };

  onOpenModal = typeModal => {
    // if (typeModal = film) {
    //добавляем класс на модальное окно дла фильмов
    //   } esle if (typeModal = auth) {
    // добавляем класс для стилей аунтефикации
    //   } esle if (typeModal = team) {
    //  добавляем класс для стилей команды
    //   }
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

  addBtnListeners = () => {
    refs.itemAddWatched = document.querySelector('.js-add-watched');
    refs.itemRemoveWatched = document.querySelector('.js-remove-watched');
    refs.itemAddQueue = document.querySelector('.js-add-queue');
    refs.itemRemoveQueue = document.querySelector('.js-remove-queue');

    refs.itemAddWatched.addEventListener('click', () => {
      this.onBtnAddWatchedPress();
    });

    refs.itemRemoveWatched.addEventListener('click', () => {
      this.onBtnRemoveWatchedPress();
    });

    refs.itemAddQueue.addEventListener('click', () => {
      this.onBtnAddQueuePress();
    });

    refs.itemRemoveQueue.addEventListener('click', () => {
      this.onBtnRemoveQueuePress();
    });
  };

  removeBtnListeners = () => {
    // refs.itemAddWatched = document.querySelector('.js-add-watched');
    // refs.itemRemoveWatched = document.querySelector('.js-remove-watched');
    // refs.itemAddQueue = document.querySelector('.js-add-queue');
    // refs.itemRemoveQueue = document.querySelector('.js-remove-queue');

    refs.itemAddWatched.removeEventListener('click', () => {
      this.onBtnAddWatchedPress();
    });

    refs.itemRemoveWatched.removeEventListener('click', () => {
      this.onBtnRemoveWatchedPress();
    });

    refs.itemAddQueue.removeEventListener('click', () => {
      this.onBtnAddQueuePress();
    });

    refs.itemRemoveQueue.removeEventListener('click', () => {
      this.onBtnRemoveQueuePress();
    });
  };

  onBtnAddWatchedPress = () => {
    console.log('itemAddWatched');
    refs.itemAddWatched.classList.add('hidden');
    refs.itemRemoveWatched.classList.remove('hidden');
  };

  onBtnRemoveWatchedPress = () => {
    console.log('itemRemoveWatched');
    refs.itemAddWatched.classList.remove('hidden');
    refs.itemRemoveWatched.classList.add('hidden');
  };

  onBtnAddQueuePress = () => {
    console.log('itemAddQueue');
    refs.itemAddQueue.classList.add('hidden');
    refs.itemRemoveQueue.classList.remove('hidden');
  };

  onBtnRemoveQueuePress = () => {
    console.log('itemRemoveQueue');
    refs.itemAddQueue.classList.remove('hidden');
    refs.itemRemoveQueue.classList.add('hidden');
  };
}
