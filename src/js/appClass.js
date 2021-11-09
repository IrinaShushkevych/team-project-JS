import DataMarkup from './dataMarkup.js';
import refs from './refs.js';
import Modal from './modal.js';
import DataSaver from './dataSaver.js';
import DataService from './DataServise';

export default class App {
  constructor() {
    this.dataMarkup = new DataMarkup();
    this.modal = new Modal();
    this.refs = refs;
    this.dataSaver = new DataSaver();
    this.dataService = new DataService();
  }

  init = () => {
    this.dataSaver.clearLocalstoredge();
    this.dataSaver.setActivePage('home');
    this.dataMarkup.renderPopularFilms();
    this.refs.linkModalTeamRef.addEventListener('click', this.onOpenMdalTeam);
    this.refs.btnHomeRef.addEventListener('click', () => {
      o;
      console.log('Markup popular films, hide button, show input');
    });
    this.refs.logoRef.addEventListener('click', e => {
      e.preventDefault();
      console.log('Markup popular films, hide button, show input');
    });
    this.refs.btnLybraryRef.addEventListener('click', this.onClickLibrary);
    this.refs.inputFormRef.addEventListener('submit', this.onKeyWordSearch);
    refs.list.addEventListener('click', event => {
      event.preventDefault();
      const card = event.target.closest('li');
      if (!card) {
        return;
      }
      const id = Number(card.dataset.id);
      const film = this.dataSaver.getFilm(id);
      this.dataMarkup.modalFilmMurcup(film);
      this.modal.onOpenModal();

      //   const isModalCard = event.target.classList.contains('card__image');

      //   if (!isModalCard) {
      //     return;
      //   }
      // if (!card) {
      //   return;
      // }
    });
  };
  onOpenMdalTeam = () => {
    this.dataMarkup.renderModalTeam();
    this.modal.onOpenModal();
    this.dataSaver.setActivePage('home');
  };

  // Клик логотип и home

  // Клик lybrary
  onClickLibrary = () => {
    console.log('hide input, show button, markup queue');
  };

  // input  название = () => {}
  onKeyWordSearch = e => {
    e.preventDefault();
    // const ApiService = this.dataService;
    const inputValue = e.currentTarget.elements.query.value;
    console.log(inputValue);
    // console.log(ApiService.getFilmsByQuery(inputValue));
  };
}
