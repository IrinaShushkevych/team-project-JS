import DataMarkup from './dataMarkup.js';
import refs from './refs.js';
import Modal from './modal.js';
import DataSaver from './dataSaver.js';
import DataService from './DataServise';
import LoadSpinner from './loadSpinner';
import Message from './message.js';
import CustomPagination from './pagination';
export default class App {
  constructor() {
    this.dataMarkup = new DataMarkup();
    this.modal = new Modal();
    this.refs = refs;
    this.dataSaver = new DataSaver();
    this.dataService = new DataService();
    this.spinner = new LoadSpinner();
    this.dataPagination = new CustomPagination();
  }

  init = async () => {
    this.spinner.showSpinner();
    this.checkSession();
    this.dataSaver.clearLocalstoredge();
    this.dataSaver.setActivePage('home');
    await this.dataMarkup.renderPopularFilms();
    this.refs.linkModalTeamRef.addEventListener('click', this.onOpenMdalTeam);
    this.refs.btnHomeRef.addEventListener('click', this.onClickLogoHome);
    this.refs.logoRef.addEventListener('click', this.onClickLogoHome);
    this.refs.btnLybraryRef.addEventListener('click', this.onClickLibrary);
    this.refs.btnAuthRef.addEventListener('click', this.onClickAuth);
    this.refs.inputFormRef.addEventListener('submit', this.onKeyWordSearch);
    this.refs.list.addEventListener('click', this.onClickCardItem);
    this.dataPagination.initPagination(this.dataSaver.getTotalPages());
  };

  checkSession = () => {
    if (sessionStorage.getItem('user') !== null) {
      this.onValiAuth();
    }
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
    this.modal.onOpenModal(null, 'team');
    this.dataSaver.setActivePage('home');
  };

  // Клик логотип и home

  onClickLogoHome = e => {
    e.preventDefault();
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('home');
    this.dataMarkup.renderPopularFilms();
    this.refs.header.classList.replace('header-library', 'header-home');
    this.refs.buttonContainer.classList.add('hidden');
    this.refs.inputFormRef.classList.remove('hidden');
    //pagination
    this.refs.btnLybraryRef.classList.remove('btn__header--current-page');
    this.refs.btnHomeRef.classList.add('btn__header--current-page');

    this.refs.queueBtnRef.removeEventListener('click', this.onClickQueue);
    this.refs.watchedBtnRef.removeEventListener('click', this.onClickWatched);
  };

  // Клик lybrary
  onClickLibrary = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setActivePage('queue');
    this.dataSaver.setCurrentPage(1);
    try {
      await this.dataSaver.setTotalPageFilms('queue');
    } catch (error) {
      Message.error(error);
    }
    this.refs.buttonContainer.classList.remove('hidden');
    this.refs.inputFormRef.classList.add('hidden');
    this.refs.header.classList.replace('header-home', 'header-library');
    this.dataMarkup.getCurrentFilmsQueue();
    this.refs.btnHomeRef.classList.remove('btn__header--current-page');
    this.refs.btnLybraryRef.classList.add('btn__header--current-page');

    this.refs.queueBtnRef.addEventListener('click', this.onClickQueue);
    this.refs.watchedBtnRef.addEventListener('click', this.onClickWatched);
    this.refs.watchedBtnRef.classList.remove('btn-cover-library');
    this.refs.queueBtnRef.classList.add('btn-cover-library');
    // console.log('hide input, show button, markup queue');
  };

  // input  название = () => {}
  onKeyWordSearch = async e => {
    e.preventDefault();
    this.spinner.showSpinner();
    const inputValue = e.currentTarget.elements.query.value;
    inputValue
      ? this.dataMarkup.renderSearchingFilms(inputValue)
      : this.dataMarkup.renderPopularFilms();
  };

  onClickWatched = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('watched');
    try {
      await this.dataSaver.setTotalPageFilms('watched');
      this.dataMarkup.getCurrentFilmsWatched();
      this.refs.queueBtnRef.classList.remove('btn-cover-library');
      this.refs.watchedBtnRef.classList.add('btn-cover-library');
    } catch (error) {
      Message.error(error);
    }

    //pagination
  };

  onClickQueue = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('queue');
    try {
      await this.dataSaver.setTotalPageFilms('queue');
      this.dataMarkup.getCurrentFilmsQueue();
      this.refs.watchedBtnRef.classList.remove('btn-cover-library');
      this.refs.queueBtnRef.classList.add('btn-cover-library');
    } catch (error) {
      Message.error(error);
    }
    //pagination
  };

  onClickCardItem = async event => {
    event.preventDefault();
    const card = event.target.closest('li');
    if (!card) {
      return;
    }
    const id = Number(card.dataset.id);
    const film = await this.dataSaver.getFilm(id);
    this.dataMarkup.modalFilmMurcup(film);
    this.modal.onOpenModal(card.dataset.id, 'film');
  };
}
