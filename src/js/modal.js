import refs from './modal-refs.js';

export default class Modal {
  container() {
    this.refs = refs;
  }

  init = () => {
    console.log('Modal');
    console.log(refs.backdrop);
    this.createModal();
  };

  createModal = () => {
    refs.list.addEventListener('click', event => {
      event.preventDefault();
      console.log(refs);
      this.onOpenModal();
    });
  };

  onOpenModal = () => {
    refs.btnClose.addEventListener('click', this.onBtnClosePress);
    refs.backdrop.addEventListener('click', this.onBackdropClick);
    refs.backdrop.classList.remove('visually-hidden');
    window.addEventListener('keydown', this.onEscKeyPress);
  };

  onCloseModal = () => {
    refs.btnClose.removeEventListener('click', this.onBtnClosePress);
    refs.backdrop.removeEventListener('click', this.onBackdropClick);
    refs.backdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', this.onEscKeyPress);
  };

  onBtnClosePress = () => {
    this.onCloseModal();
  };

  onBackdropClick = event => {
    console.log(event);
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
}

// js-film-list
const modalWindow = new Modal();
modalWindow.init();
