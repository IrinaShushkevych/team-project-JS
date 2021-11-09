export default class DataSaver {
  constructor() {
    this.countFilmModal = 4;
    this.countFilmTablet = 8;
    this.countFilmDesktop = 9;
  }

  clearLocalstoredge = () => {
    localStorage.removeItem('genres');
    localStorage.setItem('numberListPage', 0);
    localStorage.setItem('totalPages', 0);
    localStorage.setItem('currentList', '');
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
    const genres = JSON.parse(savedGenres);
    return genres;
  };

  setTotalPages = pages => {
    localStorage.setItem('totalPages', JSON.stringify(pages));
  };

  getTotalPages = () => {
    const totalPages = localStorage.getItem('totalPages');
    return JSON.parse(totalPages);
  };

  // set популярные фильмы
  setPopularFilms = dataObj => {
    localStorage.setItem('home', JSON.stringify(dataObj));
  };

  // get популярные фильмы
  getPopularFilms = () => {
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
  getFilm = id => {
    let result = null;
    const page = this.getActivePage();
    let films = localStorage.getItem(page);
    if (films) {
      films = JSON.parse(films);
      result = films.find(el => el.id === id);
    }
    return result;
  };

  // Проверка наличия фильма в очереди
  isFilmInList = (id, page) => {
    let films = localStorage.getItem(page);
    if (films) {
      films = JSON.parse(films);

      const isfilms = films.find(el => el.id === id);
      if (isfilms) return true;
    }
    return false;
  };

  // get просмотренные фильмы

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

  setTotalPageFilms = page => {
    const countFilm = this.getCountFilmOnPage();
    const arr = JSON.parse(localStorage.getItem(page));
    let cnt = arr.length % countFilm;
    if (arr.length > cnt * countFilm) {
      cnt += 1;
    }
    this.setTotalPages(cnt);
  };

  setTotalPageWatched = () => {
    this.setTotalPageFilms('watched');
  };

  setTotalPageWatched = () => {
    this.setTotalPageFilms('queue');
  };

  getFilms = page => {
    const numberPage = this.getCurrentPage();
    const countFilm = this.getCountFilmOnPage();
    const arr = JSON.parse(localStorage.getItem(page));
    return arr.slice(countFilm * (numberPage - 1), countFilm);
  };

  getFilmWatched = () => {
    return this.getFilms('watched');
  };

  getFilmQueue = () => {
    return this.getFilms('queue');
  };

  // get очередь фильмов

  // Записать фильм в очередь
  setFilmToLocalstorage = (id, page) => {
    const arr = JSON.parse(localStorage.getItem(page));
    if (!this.isFilmInList(id, page)) {
      arr.push(film);
    }
    localStorage.setItem(page, JSON.stringify(arr));
  };

  setFilmToWatched = id => {
    this.setFilmToLocalstorage(id, 'watched');
  };

  setFilmToQueue = id => {
    this.setFilmToLocalstorage(id, 'queue');
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
}
