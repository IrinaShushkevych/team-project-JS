export default class DataSaver {
  // сохранение текущей страницы
  // выдача текущей страницы
  // set популярные фильмы
  // get популярные фильмы
  // set просмотренные фильмы
  // get просмотренные фильмы
  // set очередь фильмов
  // get очередь фильмов
  // Записать фильм в очередь
  // Удалить фильм из очереди
  constructor() {}

  saveFilmsGenres = async data => {
    const genresResult = await data;
    const dataGenres = genresResult.genres;
    dataGenres.map(obj => (obj.name === 'Science Fiction' ? (obj.name = 'Sci-Fi') : obj.name));
    localStorage.setItem('genres', JSON.stringify(dataGenres));
  };

  getSavedGenres = () => {
    const savedGenres = localStorage.getItem('genres');
    const genres = JSON.parse(savedGenres);
    return genres;
  };

  getActivePage = () => {
    return localStorage.getItem('activePage');
  };

  // сохранение типа отрисованных данных(основная, очередь, просмотренные
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
}
