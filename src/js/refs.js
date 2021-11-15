export default {
  //header
  header: document.querySelector('.header'),
  btnLogOut: document.querySelector('.js-log-out'),
  logoRef: document.querySelector('.js-logo'),
  btnHomeRef: document.querySelector('.js-home'),
  btnLybraryRef: document.querySelector('.js-lybrary'),
  btnAuthRef: document.querySelector('.js-auth'),
  blockLoginRef: document.querySelector('.js-auth-button'),
  watchedBtnRef: document.querySelector('.js-button-watched'),
  queueBtnRef: document.querySelector('.js-button-queue'),
  inputRef: document.querySelector('.input_header'),
  inputFormRef: document.querySelector('.js-search-form'),
  btnLangRef: document.querySelector('.translater'),

  //main
  main: document.querySelector('main'),
  listUlFilms: document.querySelector('.js-film-list'),
  // list: document.querySelector('.js-film-list'),
  paginationCase: document.getElementById('tui-pagination-container'),

  //footer
  footer: document.querySelector('.footer'),
  linkModalTeamRef: document.querySelector('.js-modal-team'),

  //modal
  modalContainer: document.querySelector('.card__js-killer-container--modal'),
  modalRef: document.querySelector('.modal'),
  modalCardRef: document.querySelector('.card__container--modal'),
  btnClose: document.querySelector('.modal__button'),
  backdrop: document.querySelector('.backdrop'),
  itemAddWatched: document.querySelector('.js-add-watched'),
  itemRemoveWatched: document.querySelector('.js-remove-watched'),
  itemAddQueue: document.querySelector('.js-add-queue'),
  itemRemoveQueue: document.querySelector('.js-remove-queue'),
  buttonContainer: document.querySelector('.button-container'),
  buttonGetVideos: document.querySelector('.js-add-video'),
  trailerContainer: document.querySelector('.js-video-trailer'),
};
