import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
import imgNull from '../images/filmsNull.jpg';

import filmTpl from '../templates/modalFilmCard.hbs';
import refs from '../js/refs';
import images from '../images/*.jpg';

import listCardTpl from '../templates/list-card.hbs';
import DataSaver from './dataSaver.js';
import Message from './message.js';
import LoadSpinner from './loadSpinner';
import FilterBtn from './filterBtn.js';
import CustomPagination from './pagination.js';

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
    this.delay = 0;
  }

  setNullList = (texten, textuk, textru) => {
    const lang = this.dataSaver.getLanguage();
    switch (lang) {
      case 'en':
        this.listRef.innerHTML = `<li class ="card-my-library"><p class = "title-card-my-library">${texten}</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
        break;
      case 'uk':
        this.listRef.innerHTML = `<li class ="card-my-library"><p class = "title-card-my-library">${textuk}</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
        break;
      case 'ru':
        this.listRef.innerHTML = `<li class ="card-my-library"><p class = "title-card-my-library">${textru}</p><img class="icon-empty-my-library" src="${imgNull}" alt ="not films here"></img></li>`;
        break;
    }
  };

  // рендер років
  addYearsList = () => {
    this.refs.yearList.innerHTML = '';
  };

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
      this.setNullList(
        'No such film was found',
        'Інформації по запиту не знайдено',
        'Информацию по запросу не найдено',
      );
      this.refs.inputRef.value = '';
      this.spinner.hideSpinner(this.refs.mask);
      return;
    }
    this.renderMarkup(currentQuerySeach);
    this.spinner.hideSpinner(this.refs.mask);
  };
  // отрисовка по фільтру за день

  // renderFilmsFilterDay = async query => {
  //   const filmsDay = await this.dataAPI.filterPopularFilmsDay(query);
  //   this.renderMarkup(filmsDay);
  //   this.spinner.hideSpinner();
  // };

  // Отрисовка просмотренных

  getCurrentFilmsWatched = async id => {
    const currentFilmsWatched = await this.dataSaver.getFilmWatched();

    if (currentFilmsWatched.length === 0) {
      this.setNullList(
        'You  have not watched films yet',
        'Ви ще не переглянули жодного фільму',
        'Вы еще не просмотрели ни одного фильма',
      );
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
      this.setNullList(
        'No such film was found',
        'В черзі для перегляду не додано жодного фільму',
        'В очереди для просмотра фильмов нет',
      );
      this.spinner.hideSpinner(this.refs.mask);
      return;
    }

    this.renderMarkup(currentFilmsQueue);
    this.spinner.hideSpinner(this.refs.mask);
  };

  renderModalTeam = () => {
    try {
      const lang = this.dataSaver.getLanguage();
      const arr = jsKillerTeam[lang].map(el => {
        el.superPhoto = images[el.superPhotoName];
        return el;
      });
      const markup = jsKillerTemplate(jsKillerTeam[lang]);
      this.refs.modalContainer.innerHTML = markup;
    } catch (error) {
      console.error('Yes, babe, the error has been appeared here. Check your code. 🤷‍♂️');
    }
  };

  // Отрисовка карточки фильма для модалки
  modalFilmMarkup = (film, trailer) => {
    this.refs.modalCardRef.innerHTML = filmTpl(film, trailer);
  };

  filterFilmsQuery = () => {
    this.btnSort = document.querySelector('.sort-btn');
    btnSort.addEventListener('click', addHiddenNavBtn);
  };

  addHiddenNavBtn = () => {
    this.boxNavBtn = document.querySelector('.nav-section');
    boxNavBtn.classList.remove('hidden');
  };

  updatePage = () => {
    const filterBtnCons = new FilterBtn();
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
      case 'filterGenres':
        filterBtnCons.filterFechGenresID();
        break;
      case 'filterYears':
        filterBtnCons.filterFechYearsId();
        break;
      case 'filterTopRating':
        filterBtnCons.fechIdRating();
        break;
      case 'filterPopularyWeek':
        filterBtnCons.fechPopularyWeek();
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
    this.delay = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target) {
          this.appearCardsWithDelay(entry.target, this.delay);
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

  appearCardsWithDelay = (element, delay) => {
    element.classList.add('card-animation');
    delay += 200;
    this.delay = delay;
    element.style.transitionDelay = `${delay}ms`;
  };

  // відображення на сторінці кількість фільмів
  delSvgButton = () => {
    this.refs.btnLybraryRef.addEventListener('click', () => {
      this.refs.svgIconDiv.classList.add('hidden');
      this.refs.numberLibraryBtn.classList.toggle('hidden');
    });
    this.refs.btnHomeRef.addEventListener('click', () => {
      this.refs.numberLibraryBtn.classList.add('hidden');
      this.refs.svgIconDiv.classList.remove('hidden');
    });
    this.refs.logoRef.addEventListener('click', () => {
      this.refs.numberLibraryBtn.classList.add('hidden');
      this.refs.svgIconDiv.classList.remove('hidden');
    });
    this.refs.numberLibraryBtn.addEventListener('click', el => {
      const numberIdBtn = el.target.dataset.id;
      this.dataSaver.setNumberBtn(numberIdBtn);
      this.dataSaver.setCurrentPage(1);
      if (this.dataSaver.getActivePage() === 'watched') {
        this.dataSaver.setTotalPageWatched();
        this.s1();
      } else {
        this.dataSaver.setTotalPageQueue();
      }
      this.updatePage();
    });
  };

  s1 = () => {
    pagination.initPagination();
  };
  // ******
}
