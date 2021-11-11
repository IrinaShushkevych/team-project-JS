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
    refs.list.addEventListener('click', this.onClickList);
  };

  onClickList = event => {
    event.preventDefault();
    const card = event.target.closest('li');
    if (!card) {
      return;
    }
    const id = Number(card.dataset.id);
    const film = this.dataSaver.getFilm(id);
    this.dataMarkup.modalFilmMurcup(film);
    this.modal.onOpenModal();
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
    console.log('Markup popular films, hide button, show input');
  };
  // Клик lybrary
  onClickLibrary = () => {
    console.log('hide input, show button, markup queue');
  };

  // input  название = () => {}
  onKeyWordSearch = async e => {
    this.spinner.showSpinner();
    e.preventDefault();
    const inputValue = e.currentTarget.elements.query.value;
    this.dataMarkup.renderSearchingFilms(inputValue);
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
}
