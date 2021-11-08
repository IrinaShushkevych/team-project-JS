export default class DataSaver {
  //     сохранение текущей страницы
  // сохранение типа отрисованных данных(основная, очередь, просмотренные
  // выдача текущей страницы
  // set популярные фильмы
  // get популярные фильмы
  // set просмотренные фильмы
  // get просмотренные фильмы
  // set очередь фильмов
  // get очередь фильмов
  // get одна карточка
  // Записать фильм в очередь
  // Удалить фильм из очереди
  // Проверка наличия фильма в очереди
  constructor() {}

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

  setTotalPages=(pages) => {
    localStorage.setItem('totalPages', JSON.stringify(pages));    
  }

  getTotalPages = () => {
    const totalPages = localStorage.getItem('totalPages');
    return JSON.parse(totalPages)
  }
}
