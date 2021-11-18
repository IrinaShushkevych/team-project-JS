import APIService from './DataServise.js';
import template from '../templates/list-card.hbs';
import jsKillerTemplate from '../templates/jsKillerCard.hbs';
import jsKillerTeam from '../json/jsKillers.json';
import filmTpl from '../templates/modalFilmCard.hbs';
import refs from '../js/refs';

import listCardTpl from '../templates/list-card.hbs';
import DataSaver from './dataSaver.js';
import Message from './message.js';
import LoadSpinner from './loadSpinner';
import DataMarkup from './dataMarkup.js';
import DataService from './DataServise';
import { getIdTokenResult } from '@firebase/auth';
import CustomPagination from './pagination.js';

export default class FilterBtn {
  constructor() {
    this.DataService = new DataService();
    this.dataMarkup = new DataMarkup();
    this.messsage = new Message();
    this.dataSaver = new DataSaver();
    this.dataAPI = new APIService();
    this.spinner = new LoadSpinner();
    this.listRef = refs.listUlFilms;
    this.refs = refs;
    this.itemFilterBtn = refs.filterItem;
    this.iconFilterBtn = refs.iconSvg;
    this.filmTpl = filmTpl;
    this.listCardTpl = listCardTpl;
    this.dataPagination = new CustomPagination();
  }

  init = () => {
    this.addListFilterGenre();
    this.addListFilterYears();
    this.listFilterGenresRender();
    this.listFilterYearsRender();
    this.listFilterTopRatingRender();
    this.listFilterPopularyWeek();
    this.addListenersSvgBtn();
  };

  addListFilterGenre = () => {
    this.refs.genreBtn.addEventListener('click', e => {
      this.refs.genreBtn.classList.toggle('checked');
      this.refs.yearBtn.classList.remove('checked');
      this.refs.sortGenreList.classList.toggle('visually-hidden');
      this.refs.yearList.classList.add('visually-hidden');
    });
  };

  addListFilterYears = () => {
    this.refs.yearBtn.addEventListener('click', () => {
      this.refs.yearBtn.classList.toggle('checked');
      this.refs.genreBtn.classList.remove('checked');

      this.refs.yearList.classList.toggle('visually-hidden');
      this.refs.sortGenreList.classList.add('visually-hidden');
    });
  };

  listFilterYearsRender = () => {
    this.refs.yearList.addEventListener('click', async el => {
      this.spinner.showSpinner(this.refs.mask);
      this.dataSaver.setCurrentPage(1);
      this.dataSaver.setActivePage('filterYears');
      const id = el.target.dataset.id;
      const fechIdYears = await this.filterFechYearsId(id);
      this.refs.yearList.classList.add('visually-hidden');
      this.dataPagination.initPagination();
      this.spinner.hideSpinner(this.refs.mask);
    });
  };

  listFilterGenresRender = () => {
    this.refs.sortGenreList.addEventListener('click', async el => {
      this.spinner.showSpinner(this.refs.mask);
      this.dataSaver.setCurrentPage(1);
      const id = el.target.dataset.id;
      const fechIdGenres = await this.filterFechGenresID(id);
      this.dataSaver.setActivePage('filterGenres');
      this.refs.sortGenreList.classList.add('visually-hidden');
      this.dataPagination.initPagination();
      this.spinner.hideSpinner(this.refs.mask);
    });
  };

  listFilterTopRatingRender = () => {
    this.refs.topRating.addEventListener('click', async el => {
      this.spinner.showSpinner(this.refs.mask);
      this.dataSaver.setCurrentPage(1);
      const id = el.target.dataset.id;
      const fechIdTopRating = await this.fechIdRating(id);

      this.dataSaver.setActivePage('filterTopRating');
      this.dataPagination.initPagination();
      this.spinner.hideSpinner(this.refs.mask);
    });
  };

  listFilterPopularyWeek = () => {
    this.refs.sortWrapper.addEventListener('click', async el => {
      this.spinner.showSpinner(this.refs.mask);
      this.dataSaver.setCurrentPage(1);
      this.dataSaver.setActivePage('filterPopularyWeek');
      const id = el.target.dataset.id;
      const fechIdPopularyWeek = await this.fechPopularyWeek(id);

      this.dataPagination.initPagination();
      this.spinner.hideSpinner(this.refs.mask);
    });
  };

  filterFechGenresID = async id => {
    if (id) {
      this.dataSaver.setFilterIdGenre(id);
    }
    let popularFilms = 'discover/movie?';
    this.url =
      this.DataService.baseUrl +
      popularFilms +
      this.DataService.keyAPI +
      `&with_genres=${this.dataSaver.getFilterIdGenre()}&page=${this.dataSaver.getCurrentPage()}`;

    const result = await this.DataService.fetchData(this.url);
    await this.DataService.fixFetchObject(result.results);

    const genresResults = result.results;
    let totalPages = result.total_pages;
    this.dataSaver.setTotalPages(totalPages);
    this.dataSaver.setHomeFilms(genresResults);
    this.dataMarkup.renderMarkup(genresResults);
    return genresResults;
  };

  filterFechYearsId = async id => {
    if (id) {
      this.dataSaver.setFilterYear(id);
    }
    let popularFilms = 'discover/movie?';
    this.url =
      this.DataService.baseUrl +
      popularFilms +
      this.DataService.keyAPI +
      `&year=${this.dataSaver.getFilterYear()}&page=${this.dataSaver.getCurrentPage()}`;
    const result = await this.DataService.fetchData(this.url);
    await this.DataService.fixFetchObject(result.results);

    const yearsResults = result.results;
    let totalPages = result.total_pages;
    this.dataSaver.setTotalPages(totalPages);
    this.dataSaver.setHomeFilms(yearsResults);
    this.dataMarkup.renderMarkup(yearsResults);

    return yearsResults;
  };

  fechIdRating = async () => {
    let popularFilms = 'movie/top_rated?';
    this.url =
      this.DataService.baseUrl +
      popularFilms +
      this.DataService.keyAPI +
      `&page=${this.dataSaver.getCurrentPage()}`;
    console.log(this.url);
    const result = await this.DataService.fetchData(this.url);
    await this.DataService.fixFetchObject(result.results);

    const ratingTopResults = result.results;
    let totalPages = result.total_pages;
    this.dataSaver.setTotalPages(totalPages);
    this.dataSaver.setHomeFilms(ratingTopResults);
    this.dataMarkup.renderMarkup(ratingTopResults);

    return ratingTopResults;
  };

  fechPopularyWeek = async () => {
    let popularFilms = 'trending/movie/day?';
    this.url =
      this.DataService.baseUrl +
      popularFilms +
      this.DataService.keyAPI +
      `&page=${this.dataSaver.getCurrentPage()}`;
    const result = await this.DataService.fetchData(this.url);
    await this.DataService.fixFetchObject(result.results);

    const popuylaryWeekResults = result.results;
    let totalPages = result.total_pages;
    this.dataSaver.setTotalPages(totalPages);
    this.dataSaver.setHomeFilms(popuylaryWeekResults);
    this.dataMarkup.renderMarkup(popuylaryWeekResults);

    return popuylaryWeekResults;
  };

  // поява конопок по кліку на свг
  addListenersSvgBtn = () => {
    this.refs.svgIconBtn.addEventListener('click', () => {
      //   this.refs.sortWrapper.classList.toggle('hidden');
      //   this.refs.genreWrapper.classList.toggle('hidden');
      //   this.refs.yearsWrapper.classList.toggle('hidden');
      //   this.refs.topRating.classList.toggle('hidden');
      this.refs.filterButtons.classList.toggle('visually-hidden');
      window.addEventListener('click', this.onCloseList);
    });
  };

  onCloseList = e => {
    console.log(e.target);
    const el = e.target;
    if (el.classList.contains('genre')) {
      this.refs.yearList.classList.add('visually-hidden');
    } else if (el.classList.contains('year')) {
      this.refs.sortGenreList.classList.add('visually-hidden');
    } else {
      this.refs.yearList.classList.add('visually-hidden');
      this.refs.sortGenreList.classList.add('visually-hidden');
    }
    // window.innerWidth <= 767 &&
    if (!el.closest('.filter-buttons') && !el.closest('.svg-item')) {
      this.refs.filterButtons.classList.add('visually-hidden');
    }
  };
  // ****
}
// let menu = document.querySelector('#menu'),
//     isOpened = false;

// setInterval(() => {
//     if (isOpened) {
//         menu.classList.remove('-opened');
//     } else {
//         menu.classList.add('-opened');
//     }

//     isOpened = !isOpened;
// }, 1500);
