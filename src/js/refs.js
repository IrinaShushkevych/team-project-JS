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
  btnLangRef: document.querySelector('.js-translater'),
  listLangRef: document.querySelector('.js-translater-list'),
  toggle: document.querySelector('.toggle-mask'),
  toggleIcons: document.querySelectorAll('.icon-wrap'),

  body: document.querySelector('body'),

  //main
  main: document.querySelector('main'),
  listUlFilms: document.querySelector('.js-film-list'),
  paginationCase: document.getElementById('tui-pagination-container'),
  mask: document.querySelector('.mask'),
  modalMask: document.querySelector('.modal-mask'),

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

  modalWindowOpener: document.querySelector('.js-modal-team'),
  modalCleaner: document.querySelector('.card__container--modal'),

  buttonRemover: document.querySelector('.button__container-modal'),
  memberPhoto: document.querySelector('.killer__image'),

  buttonContainer: document.querySelector('.button-container'),

  yearList: document.querySelector('.year-list'),
  genreBtn: document.querySelector('.genre'),
  sortGenreList: document.querySelector('.category-list'),
  filterButtons: document.querySelector('.filter-buttons'),
  sortPopulary: document.querySelector('.sort'),
  yearBtn: document.querySelector('.year'),
  sortWrapper: document.querySelector('.sort-wrapper'),
  genreWrapper: document.querySelector('.genre-wrapper'),
  topRating: document.querySelector('.rating-wrapper'),
  yearsWrapper: document.querySelector('.year-wrapper'),
  svgIconBtn: document.querySelector('.svg-icon'),

  buttonGetVideos: document.querySelector('.js-add-video'),
  trailerContainer: document.querySelector('.js-video-trailer'),

  btnBackRef: document.querySelector('.block-arrow'),
  divModalRef: document.querySelector('.card__modal-thumb'),
};
