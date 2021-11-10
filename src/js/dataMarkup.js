import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
// import refs from './refs';
import filmTpl from '../templates/modalFilmCard.hbs';
import refs from '../js/refs';

import listCardTpl from '../templates/list-card.hbs';
import DataSaver from './dataSaver.js';
import Message from './message.js';
import LoadSpinner from './loadSpinner';


export default class DataMarkup {
  constructor() {
    this.messsage = new Message();
    this.dataSaver = new DataSaver();
    this.dataAPI = new APIService();
    this.spinner = new LoadSpinner();
    this.listRef = refs.listUlFilms;

    this.refs = refs;
    this.filmTpl = filmTpl;
    this.listCardTpl = listCardTpl;
  }
  // Рисование списка карточек
  renderMarkup = data => {
    this.listRef.innerHTML = template(data);    
  };

  // Отрисовка популярных
  renderPopularFilms = async () => {
    const dataPopular = await this.dataAPI.fetchPopularFilms();
    this.renderMarkup(dataPopular);
    this.spinner.hideSpinner();
  }
    
  // Отрисовка по запросу
  renderSearchingFilms = async query => {
    const currentQuerySeach = await this.dataAPI.fetchFilmsByQuery(query);
    this.renderMarkup(currentQuerySeach);
    this.spinner.hideSpinner();
  };

  // Отрисовка очереди
  getCurrentFilmsWatched = async id => {
    const currentFilmsWatched = await this.dataSaver.getFilmWatched();
    this.renderMarkup(currentFilmsWatched);
    this.spinner.hideSpinner();
  };
  //
  // Отрисовка просмотренных
  getCurrentFilmsQueue = async id => {
    const currentFilmsQueue = await this.dataSaver.getFilmQueue();
    this.renderMarkup(currentFilmsQueue);
    this.spinner.hideSpinner();
  };

  // listener на список

  renderModalTeam = () => {
    try {
      const markup = jsKillerTemplate(jsKillerTeam);
      refs.modalContainer.innerHTML = markup;
    } catch (error) {
      console.error('Yes, babe, the error has been appeared here. Check your code. 🤷‍♂️');
    }
  };
  // Отрисовка карточки фильма для модалки

  modalFilmMurcup = film => {
    //   refs.modalContainer.innerHTML = '';
    // this.refs.modalRef.insertAdjacentHTML('beforeend', filmTpl(film));
    this.refs.modalCardRef.innerHTML = filmTpl(film);
  };
}
