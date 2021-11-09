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

  //     listener(логотип, кнопки хедера(home, lybrary), инпут, ссылка футера)
  init = () => {
    this.dataSaver.clearLocalstoredge();
    this.refs.linkModalTeamRef.addEventListener('click', this.modal.onOpenModalTeam);
    this.refs.btnHomeRef.addEventListener('click', () => {
      console.log('Markup popular films, hide button, show input');
    });
    this.refs.logoRef.addEventListener('click', e => {
      e.preventDefault();
      console.log('Markup popular films, hide button, show input');
    });
    this.refs.btnLybraryRef.addEventListener('click', this.onClickLibrary);
    this.dataSaver.setActivePage('home');
    this.refs.inputFormRef.addEventListener('submit', this.onKeyWordSearch);
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
