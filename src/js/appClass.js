import DataMarkup from './dataMarkup.js';
import refs from './refs.js';
import Modal from './modal.js';
import DataSaver from './dataSaver.js';
import DataService from './DataServise';
import LoadSpinner from './loadSpinner';

export default class App {
  constructor() {
    this.dataMarkup = new DataMarkup();
    this.modal = new Modal();
    this.refs = refs;
    this.dataSaver = new DataSaver();
    this.dataService = new DataService();
    this.spinner = new LoadSpinner();
  }

  init = () => {
    this.spinner.showSpinner();
    this.dataSaver.clearLocalstoredge();
    this.dataSaver.setActivePage('home');
    this.dataMarkup.renderPopularFilms();
    this.refs.linkModalTeamRef.addEventListener('click', this.onOpenMdalTeam);
    this.refs.btnHomeRef.addEventListener('click', this.onClickLogoHome);
    this.refs.logoRef.addEventListener('click', this.onClickLogoHome);
    this.refs.btnLybraryRef.addEventListener('click', this.onClickLibrary);
    this.refs.btnAuthRef.addEventListener('click', this.onClickAuth);
    this.refs.inputFormRef.addEventListener('submit', this.onKeyWordSearch);
    this.refs.list.addEventListener('click', this.onClickCardItem);
  };

  onClickAuth = () => {
    this.modal.addAuth(this.onValiAuth);
    this.modal.onOpenModal();
  };

  onValiAuth = () => {
    this.refs.btnAuthRef.classList.add('hidden');
    this.refs.btnLybraryRef.classList.remove('hidden');
  };

  onOpenMdalTeam = () => {
    this.refs.modalCardRef.innerHTML = '';
    this.dataMarkup.renderModalTeam();
    this.modal.onOpenModal();
    this.dataSaver.setActivePage('home');
  };

  // Клик логотип и home

  onClickLogoHome = e => {
    e.preventDefault();
    this.dataMarkup.renderPopularFilms();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('home');
    this.refs.header.classList.replace('header-library', 'header-home');
    this.refs.buttonContainer.classList.add('hidden');
    this.refs.inputFormRef.classList.remove('hidden');
    //pagination
    console.log('Markup popular films, hide button, show input');
    this.refs.btnLybraryRef.classList.remove('btn__header--current-page');
    this.refs.btnHomeRef.classList.add('btn__header--current-page');
  };

  // Клик lybrary
  onClickLibrary = () => {
    this.dataSaver.setActivePage('library');
    this.refs.buttonContainer.classList.remove('hidden');
    this.refs.inputFormRef.classList.add('hidden');
    this.refs.header.classList.replace('header-home', 'header-library');
    this.dataMarkup.getCurrentFilmsWatched();
    this.refs.btnHomeRef.classList.remove('btn__header--current-page');
    this.refs.btnLybraryRef.classList.add('btn__header--current-page');

    // console.log('hide input, show button, markup queue');
  };

  // input  название = () => {}
  onKeyWordSearch = async e => {
    this.spinner.showSpinner();
    e.preventDefault();
    const inputValue = e.currentTarget.elements.query.value;
    inputValue
      ? this.dataMarkup.renderSearchingFilms(inputValue)
      : this.dataMarkup.renderPopularFilms();
  };

  onClickWatched = () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('watched');
    this.dataMarkup.getCurrentFilmsWatched();
    //pagination
  };

  onClickQueue = () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('queue');
    this.dataMarkup.getCurrentFilmsQueue();
    //pagination
  };

  onClickCardItem = event => {
    event.preventDefault();
    const card = event.target.closest('li');
    if (!card) {
      return;
    }
    const id = Number(card.dataset.id);
    const film = this.dataSaver.getFilm(id);
    this.dataMarkup.modalFilmMurcup(film);
    this.modal.onOpenModal(card.dataset.id);
  };
}
