import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
import imgNull from '../images/filmsNull.jpg'
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
    this.spinner.hideSpinner();
  };

  // Отрисовка популярных
  renderPopularFilms = async () => {
    const dataPopular = await this.dataAPI.fetchPopularFilms();
    this.renderMarkup(dataPopular);
    this.spinner.hideSpinner();
  };

  // Отрисовка по запросу
  renderSearchingFilms = async query => {
    const currentQuerySeach = await this.dataAPI.fetchFilmsByQuery(query);
    this.renderMarkup(currentQuerySeach);
    this.spinner.hideSpinner();
  };
  // отрисовка по фільтру за день 

  // renderFilmsFilterDay = async query => {
  //   const filmsDay = await this.dataAPI.filterPopularFilmsDay(query);
  //   this.renderMarkup(filmsDay);
  //   this.spinner.hideSpinner();
  // };

  // *****
   
  
  
  // Отрисовка просмотренных

  getCurrentFilmsWatched = async id => {
    const currentFilmsWatched = await this.dataSaver.getFilmWatched();
    if (currentFilmsWatched.length === 0) {
      this.listRef.innerHTML =
        `<li class ="card-my-library"><p class = "title-card-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
      return;
    }

    this.renderMarkup(currentFilmsWatched);
    this.spinner.hideSpinner();
  };
  //
 // Отрисовка очереди
  getCurrentFilmsQueue = async () => {
    const currentFilmsQueue = await this.dataSaver.getFilmQueue();
    if (currentFilmsQueue.length === 0) {
      this.listRef.innerHTML =
        `<li class ="card-my-library"><p class = "title-card-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
      return;
    }
    this.renderMarkup(currentFilmsQueue);
    this.spinner.hideSpinner();
  };

  // listener на список

  renderModalTeam = () => {
    try {
      const markup = jsKillerTemplate(jsKillerTeam);
      this.refs.modalContainer.innerHTML = markup;
    } catch (error) {
      console.error('Yes, babe, the error has been appeared here. Check your code. 🤷‍♂️');
    }
  };

  // Отрисовка карточки фильма для модалки
  modalFilmMurcup = film => {
    this.refs.modalCardRef.innerHTML = filmTpl(film);
  };
  
  filterFilmsQuery = ()=>{
    this.btnSort = document.querySelector('.sort-btn')
    btnSort.addEventListener('click', addHiddenNavBtn )
  }

  addHiddenNavBtn = ()=>{
    this.boxNavBtn = document.querySelector('.nav-section')
    boxNavBtn.classList.remove('hidden')
  }
  
}
