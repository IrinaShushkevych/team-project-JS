import DataMarkup from './dataMarkup.js';
import refs from './refs.js';
import Modal from './modal.js';
import DataSaver from './dataSaver.js';
import DataService from './DataServise';
import LoadSpinner from './loadSpinner';
import Message from './message.js';
import CustomPagination from './pagination';
import Translater from './translater.js';

export default class App {
  constructor() {
    this.dataMarkup = new DataMarkup();
    this.modal = new Modal();
    this.refs = refs;
    this.dataSaver = new DataSaver();
    this.dataService = new DataService();
    this.spinner = new LoadSpinner();
    this.dataPagination = new CustomPagination();
    this.translater = new Translater();
  }

  init = async () => {
    this.spinner.showSpinner();
    this.translater.translate(document);
    this.checkSession();
    this.dataSaver.clearLocalstoredge();
    this.dataSaver.setActivePage('home');
    await this.dataMarkup.renderPopularFilms();
    this.listIO();
    this.dataPagination.initPagination();
    this.refs.linkModalTeamRef.addEventListener('click', this.onOpenMdalTeam);
    this.refs.btnHomeRef.addEventListener('click', this.onClickLogoHome);
    this.refs.logoRef.addEventListener('click', this.onClickLogoHome);
    this.refs.btnLybraryRef.addEventListener('click', this.onClickLibrary);
    this.refs.btnAuthRef.addEventListener('click', this.onClickAuth);
    this.refs.inputFormRef.addEventListener('submit', this.onKeyWordSearch);
    this.refs.btnLogOut.addEventListener('click', this.onClickLogOut);
    this.refs.listUlFilms.addEventListener('click', this.onClickCardItem);
    this.refs.btnLangRef.addEventListener('click', this.translater.onClickLangBtn);
  };

  listIO = () => {
    const option = {
      rootMargin: '50px',
      threshold: 0.2,
    };
    this.observer = new IntersectionObserver(this.onObservCard, option);
    this.refs.listUlFilms.querySelectorAll('.card').forEach(el => {
      this.observer.observe(el);
    });
  };

  onObservCard = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target) {
          console.log(entry.target);
          const el = entry.target.querySelector('.card__image');
          const img = document.createElement('img');
          img.setAttribute('src', el.dataset.src);
          img.setAttribute('alt', el.dataset.alt);
          img.classList.add('card__image');
          el.parentNode.replaceChild(img, el);
        }
      }
    });
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
    this.refs.btnLogOut.classList.remove('hidden');
  };

  onOpenMdalTeam = () => {
    this.refs.modalCardRef.innerHTML = '';
    this.dataMarkup.renderModalTeam();
    this.modal.onOpenModal(null, 'team');
    this.dataSaver.setActivePage('home');
  };

  // Клик логотип и home

  showPopularPage = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('home');
    await this.dataMarkup.renderPopularFilms();
    this.dataPagination.initPagination();
    this.refs.btnLybraryRef.classList.remove('btn__header--current-page');
    this.refs.btnHomeRef.classList.add('btn__header--current-page');
    this.refs.buttonContainer.classList.add('hidden');
    this.refs.inputFormRef.classList.remove('hidden');
    this.refs.header.classList.replace('header-library', 'header-home');
    this.refs.queueBtnRef.removeEventListener('click', this.onClickQueue);
    this.refs.watchedBtnRef.removeEventListener('click', this.onClickWatched);
  };

  onClickLogoHome = e => {
    e.preventDefault();
    this.clearInput();
    this.showPopularPage();
  };

  // Клик lybrary
  onClickLibrary = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setActivePage('queue');
    this.dataSaver.setCurrentPage(1);
    this.clearInput();
    try {
      await this.dataSaver.setTotalPageFilms('queue');
      await this.dataMarkup.getCurrentFilmsQueue();
      this.dataPagination.initPagination();
    } catch (error) {
      Message.error(error);
    }
    this.refs.buttonContainer.classList.remove('hidden');
    this.refs.inputFormRef.classList.add('hidden');
    this.refs.header.classList.replace('header-home', 'header-library');
    this.refs.btnHomeRef.classList.remove('btn__header--current-page');
    this.refs.btnLybraryRef.classList.add('btn__header--current-page');
    this.refs.queueBtnRef.addEventListener('click', this.onClickQueue);
    this.refs.watchedBtnRef.addEventListener('click', this.onClickWatched);
    this.refs.watchedBtnRef.classList.remove('btn-cover-library');
    this.refs.queueBtnRef.classList.add('btn-cover-library');
  };

  // Клик LOG OUT
  onClickLogOut = () => {
    sessionStorage.removeItem('user');
    this.refs.btnLogOut.classList.add('hidden');
    this.refs.btnLybraryRef.classList.add('hidden');
    this.refs.btnAuthRef.classList.remove('hidden');
    this.showPopularPage();
  };

  // input
  onKeyWordSearch = async e => {
    e.preventDefault();
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    const inputValue = e.currentTarget.elements.query.value;
    try {
      if (inputValue) {
        await this.dataMarkup.renderSearchingFilms(inputValue);
      } else {
        await this.dataMarkup.renderPopularFilms();
      }
      this.dataPagination.initPagination();
    } catch (err) {
      Message.error(error);
    }
  };

  clearInput = () => {
    this.refs.inputRef.value = '';
  };

  onClickWatched = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('watched');
    try {
      await this.dataSaver.setTotalPageFilms('watched');
      await this.dataMarkup.getCurrentFilmsWatched();
      this.dataPagination.initPagination();
      this.refs.queueBtnRef.classList.remove('btn-cover-library');
      this.refs.watchedBtnRef.classList.add('btn-cover-library');
    } catch (error) {
      Message.error(error);
    }
  };

  onClickQueue = async () => {
    this.spinner.showSpinner();
    this.dataSaver.setCurrentPage(1);
    this.dataSaver.setActivePage('queue');
    try {
      await this.dataSaver.setTotalPageFilms('queue');
      await this.dataMarkup.getCurrentFilmsQueue();
      this.dataPagination.initPagination();
      this.refs.watchedBtnRef.classList.remove('btn-cover-library');
      this.refs.queueBtnRef.classList.add('btn-cover-library');
    } catch (error) {
      Message.error(error);
    }
  };

  onClickCardItem = async event => {
    event.preventDefault();
    const card = event.target.closest('li');
    if (!card) {
      return;
    }
    const id = Number(card.dataset.id);
    const film = await this.dataSaver.getFilm(id);
    const filmVideos = await this.dataService.fetchFilmVideos(id);
    // const trailer = filmVideos.find(function (item) {
    //   return item.name.toUpperCase().includes('TRAILER');
    // });
    const trailer = filmVideos[0];
    this.dataMarkup.modalFilmMarkup(film, trailer);
    this.modal.onOpenModal(card.dataset.id, 'film', trailer);
  };
}
