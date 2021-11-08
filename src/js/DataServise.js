import DataSaver from './dataSaver.js';
export default class APIService {
  constructor() {
    this.keyAPI = 'api_key=a907caf8c46067564d1786718be1cb84';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.page = 1;
    this.url = '';
    this.query = '';
    this.dataSaver = new DataSaver();
  }

  fetchData = async url => {
    const response = await fetch(url);
    return response.json();
  };

  getPopularFilms = async () => {
    let popularFilms = 'trending/movie/week?';
    this.url = this.baseUrl + popularFilms + this.keyAPI;
    const response = this.fetchData(this.url);
    const dataObj = await response;
    const dataPopular = dataObj.results;
    const genreIds = dataPopular.map(film => film.genre_ids);
    this.decodeGenres(genreIds);
    dataPopular.map(film => (film.genre_ids = film.genre_ids.slice(0, 3)));
    return dataPopular;
  };

  decodeGenres = genreIds => {
    const genres = this.dataSaver.getFilmsGenres();
    const genreNames = genreIds.map(array => {
      for (let i = 0; i < array.length; i += 1) {
        genres.map(obj => (array[i] === obj.id ? (array[i] = obj.name) : array[i]));
      }
      if (array.length > 3) {
        array.splice(2, 0, 'other');        
      }
      return array;
    });
    return genreNames;
  };

  getFilmsByQuery =async query => {
    let queryEndpoint = `search/movie?query=${query}&`;
    this.url = this.baseUrl + queryEndpoint + this.keyAPI + `&page=${this.page}`;
    const response = this.fetchData(this.url);
    const queryFilmsResult = await response;
    return queryFilmsResult.results;
  };

  getFilmsGenres = () => {
    let genresEndpoint = 'genre/movie/list?';
    this.url = this.baseUrl + genresEndpoint + this.keyAPI;
    const result = this.fetchData(this.url);
    this.dataSaver.setFilmsGenres(result);
    return this.dataSaver.getFilmsGenres();
  };
}
