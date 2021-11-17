import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
import imgNull from '../images/filmsNull.jpg';

// import refs from './refs';

import filmTpl from '../templates/modalFilmCard.hbs';
import refs from '../js/refs';
import images from '../images/*.jpg';

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

  // рендер років
  addYearsList = () => {
    this.refs.yearList.innerHTML = '';
  };
  // *****

  // Рисование списка карточек
  renderMarkup = data => {
    this.listRef.innerHTML = template(data);
    this.spinner.hideSpinner(this.refs.modalMask);
    this.listIO();
  };

  // Отрисовка популярных
  renderPopularFilms = async () => {
    const dataPopular = await this.dataAPI.fetchPopularFilms();
    this.renderMarkup(dataPopular);
    this.spinner.hideSpinner(this.refs.mask);
  };

  // Отрисовка по запросу
  renderSearchingFilms = async query => {
    const currentQuerySeach = await this.dataAPI.fetchFilmsByQuery(query);
    if (currentQuerySeach.length === 0) {
      this.listRef.innerHTML = `<li class ="card-my-library"><p class = "title-card-my-library">No such film was found</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
      this.spinner.hideSpinner();
      return;
    }
    this.spinner.hideSpinner();
    this.renderMarkup(currentQuerySeach);

    this.spinner.hideSpinner(this.refs.mask);
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

    console.log(currentFilmsWatched);

    if (currentFilmsWatched.length === 0) {
      this.listRef.innerHTML = `<li class ="card-my-library"><p class = "title-card-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
      this.spinner.hideSpinner(this.refs.mask);
      return;
    }
    this.spinner.hideSpinner(this.refs.mask);
    this.renderMarkup(currentFilmsWatched);
  };

  // Отрисовка очереди
  getCurrentFilmsQueue = async () => {
    const currentFilmsQueue = await this.dataSaver.getFilmQueue();

    if (currentFilmsQueue.length === 0) {
      this.listRef.innerHTML = `<li class ="card-my-library"><p class = "title-card-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
      this.spinner.hideSpinner(this.refs.mask);
      return;
    }

    this.renderMarkup(currentFilmsQueue);
    this.spinner.hideSpinner(this.refs.mask);
  };

  renderModalTeam = () => {
    try {
      const arr = jsKillerTeam.map(el => {
        el.superPhoto = images[el.superPhoto];
        return el;
      });
      const markup = jsKillerTemplate(jsKillerTeam);
      this.refs.modalContainer.innerHTML = markup;
    } catch (error) {
      console.error('Yes, babe, the error has been appeared here. Check your code. 🤷‍♂️');
    }
  };

  // Отрисовка карточки фильма для модалки
  modalFilmMarkup = (film, trailer) => {
    this.refs.modalCardRef.innerHTML = filmTpl(film, trailer);
  };

  // trailerFilmMarkup = (film, trailer) => {
  //   this.refs.trailerContainer.innerHTML = `
  //       <iframe class='trailer' width="560" height="315" src='https://www.youtube.com/embed/${this.trailer.key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  //   `;
  //   // this.refs.modalCardRef.innerHTML = filmTpl(film, trailer);
  // };

  filterFilmsQuery = () => {
    this.btnSort = document.querySelector('.sort-btn');
    btnSort.addEventListener('click', addHiddenNavBtn);
  };

  addHiddenNavBtn = () => {
    this.boxNavBtn = document.querySelector('.nav-section');
    boxNavBtn.classList.remove('hidden');
  };

  updatePage = () => {
    const activePage = this.dataSaver.getActivePage();
    switch (activePage) {
      case 'home':
        if (refs.inputRef.value) {
          this.renderSearchingFilms(refs.inputRef.value);
        } else {
          this.renderPopularFilms();
        }
        break;
      case 'watched':
        this.getCurrentFilmsWatched();
        break;
      case 'queue':
        this.getCurrentFilmsQueue();
        break;
    }
  };

  listIO = () => {
    if (this.observer) {
      this.observer.disconnect();
    }
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
          const el = entry.target.querySelector('.card__image');
          if (el.nodeName === 'P') {
            const img = document.createElement('img');
            img.setAttribute('src', el.dataset.src);
            img.setAttribute('alt', el.dataset.alt);
            img.classList.add('card__image');
            el.parentNode.replaceChild(img, el);
          }
        }
      }
    });
  };
}
