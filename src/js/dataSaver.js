import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get, child, remove, push } from 'firebase/database';
import Message from './message.js';

export default class DataSaver {
  constructor() {
    this.countFilmModal = 4;
    this.countFilmTablet = 8;
    this.countFilmDesktop = 9;
    const firebaseConfig = {
      apiKey: 'AIzaSyA-7YNXt4BkV_VbA7lry0dxhTz2XrvRAIo',
      authDomain: 'team-project-js-bf3c2.firebaseapp.com',
      databaseURL: 'https://team-project-js-bf3c2-default-rtdb.firebaseio.com',
      projectId: 'team-project-js-bf3c2',
      storageBucket: 'team-project-js-bf3c2.appspot.com',
      messagingSenderId: '666264362443',
      appId: '1:666264362443:web:152a253140bc5479f1aa4e',
      measurementId: 'G-DVKFPK03GX',
    };
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
    this.dbRef = ref(getDatabase(app));
  }

  clearLocalstoredge = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('genres');
    localStorage.setItem('numberListPage', 1);
    localStorage.setItem('totalPages', 0);
  };

  setLanguage = lang => {
    localStorage.setItem('lang', lang);
  };

  getLanguage = () => {
    return localStorage.getItem('lang');
  };

  setCurrentPage = page => {
    localStorage.setItem('numberListPage', JSON.stringify(page));
  };

  // выдача текущей страницы
  getCurrentPage = () => {
    const savedPage = localStorage.getItem('numberListPage');
    return JSON.parse(savedPage);
  };

  setFilmsGenres = async data => {
    const genresResult = await data;
    const dataGenres = genresResult.genres;
    dataGenres.map(obj => (obj.name === 'Science Fiction' ? (obj.name = 'Sci-Fi') : obj.name));
    localStorage.setItem('genres', JSON.stringify(dataGenres));
  };

  getFilmsGenres = () => {
    const savedGenres = localStorage.getItem('genres');
    return JSON.parse(savedGenres);
  };

  setTotalPages = pages => {
    localStorage.setItem('totalPages', JSON.stringify(pages));
  };

  getTotalPages = () => {
    const totalPages = localStorage.getItem('totalPages');
    return JSON.parse(totalPages);
  };

  // set популярные фильмы или по ключевому слову с инпута
  setHomeFilms = dataObj => {
    localStorage.setItem('home', JSON.stringify(dataObj));
  };

  // get популярные фильмы или по ключевому слову с инпута
  getHomeFilms = () => {
    const savedFilms = localStorage.getItem('home');
    const popularFilms = JSON.parse(savedFilms);
    return popularFilms;
  };

  getActivePage = () => {
    return localStorage.getItem('activePage');
  };

  // сохранение текущей страницы
  setActivePage = page => {
    if (page) {
      localStorage.setItem('activePage', page);
    }
  };

  // get одна карточка
  //*********/
  getFilm = async id => {
    let result = null;
    const page = this.getActivePage();
    if (page === 'home') {
      let films = localStorage.getItem(page);
      if (films) {
        films = JSON.parse(films);
        result = films.find(el => el.id === Number(id));
      }
    } else {
      result = await this.getFilmFromBase(id, page);
    }
    return result;
  };

  // Проверка наличия фильма в очереди
  /***********/
  isFilmInHome = id => {
    let films = localStorage.getItem('home');
    if (films) {
      films = JSON.parse(films);
      const isfilms = films.find(el => el.id === Number(id));
      if (isfilms) return true;
    }
    return false;
  };

  // get просмотренные фильмы
  //************/
  getCountFilmOnPage = () => {
    const display = window.innerWidth;
    if (display < 768) {
      return this.countFilmModal;
    }
    if (display < 1024) {
      return this.countFilmTablet;
    }
    return this.countFilmDesktop;
  };

  setTotalPageFilms = async page => {
    try {
      const countFilm = this.getCountFilmOnPage();
      const arr = await this.getData(page);
      let cnt = Math.trunc(arr.length / countFilm);
      if (arr.length > cnt * countFilm) {
        cnt += 1;
      }
      this.setTotalPages(cnt);
    } catch (error) {
      message(error.message);
    }
  };

  setTotalPageWatched = () => {
    this.setTotalPageFilms('watched');
  };

  setTotalPageQueue = () => {
    this.setTotalPageFilms('queue');
  };

  //***********/

  getFilmWatched = async () => {
    const films = await this.getData('watched');
    //порахувати кількість сторінок
    const countFilm = this.getCountFilmOnPage();
    const page = this.getCurrentPage();
    const begin = (page - 1) * countFilm;
    // let end = begin
    return films.slice(begin, begin + countFilm);
  };

  //***********/
  getFilmQueue = async () => {
    try {
      const films = await this.getData('queue');
      //порахувати кількість сторінок
      const countFilm = this.getCountFilmOnPage();
      const page = this.getCurrentPage();
      const begin = (page - 1) * countFilm;
      // let end = begin
      return films.slice(begin, begin + countFilm);
    } catch (error) {
      Message.error(error.code);
    }
  };

  // Удалить фильм из очереди
  removeFilmFromLocalstorage = (id, page) => {
    const arr = JSON.parse(localStorage.getItem(page));
    const idArr = arr.indexOf(el => el.id === id);
    if (idArr >= 0) {
      arr.splice(idArr, 1);
    }
    localStorage.setItem(page, JSON.stringify(arr));
  };

  removeFilmToWatched = id => {
    this.removeFilmFromLocalstorage(id, 'watched');
  };

  removeFilmToQueue = id => {
    this.removeFilmFromLocalstorage(id, 'queue');
  };

  //=================================================================
  //**********
  getData = async page => {
    const result = await get(
      child(this.dbRef, `users/${sessionStorage.getItem('user')}/${page}`),
    ).then(data => {
      if (data.exists()) {
        return data.val();
      } else {
        return [];
      }
    });
    const res = [];
    for (let key in result) {
      res.push(JSON.parse(result[key]));
    }
    return res;
  };

  //***********/
  getFilmFromBase = async (id, page) => {
    const result = await get(
      child(this.dbRef, `users/${sessionStorage.getItem('user')}/${page}/${id}`),
    )
      .then(data => {
        if (data.exists()) {
          return data.val();
        } else {
          return null;
        }
      })
      .catch(this.getError);
    // if (result) return true;
    return JSON.parse(result);
  };

  //***********/
  isFilmInList = async (id, page) => {
    let result = false;
    if (page === 'home') {
      return this.isFilmInHome(id);
    } else {
      const film = await this.getFilmFromBase(id, page);
      result = film ? true : false;
    }
    return result;
  };

  //**********/
  addFilm = async (id, page, pageFrom) => {
    if (!pageFrom) {
      pageFrom = this.getActivePage();
    }
    try {
      const film = await this.getFilm(id, pageFrom);
      const result = await set(
        ref(this.db, `users/${sessionStorage.getItem('user')}/${page}/${id}`),
        JSON.stringify(film),
      );
    } catch (error) {
      this.getError(error.message);
    }
    // if (pageFrom !== 'home') {
    try {
      if (page === 'watched') {
        const res = await this.removeData(id, 'queue');
      }
      if (page === 'queue') {
        const res = await this.removeData(id, 'watched');
      }
    } catch (error) {
      this.getError(error.message);
    }
    // }
    return true;
    // }
    // this.getError(`This film is allrady in ${page}`);
  };

  //********/
  removeData = async (id, page) => {
    try {
      const refDB = ref(this.db, `users/${sessionStorage.getItem('user')}/${page}/${id}`);
      const result = await remove(refDB);
      return result;
    } catch (error) {
      this.getError(error.message);
    }
  };

  getError = error => {
    Message.error(error.message);
    return null;
  };
}
