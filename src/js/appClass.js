import DataMarkup from './dataMarkup.js';
import refs from './refs.js';
import Modal from './modal.js';
import DataSaver from './dataSaver.js';

export default class App {
  constructor() {
    this.dataMarkup = new DataMarkup();
    this.modal = new Modal();
    this.refs = refs;
    this.dataSaver = new DataSaver();
  }

  //     listener(логотип, кнопки хедера(home, lybrary), инпут, ссылка футера)
  init = () => {
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
  };

  // Клик логотип и home

  // Клик lybrary
  onClickLibrary = () => {
    console.log('hide input, show button, markup queue');
  };

  // input  название = () => {}
}
