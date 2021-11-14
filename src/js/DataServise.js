import img from '../images/no-image.jpg';
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

  fetchPopularFilms = async () => {
    let popularFilms = 'trending/movie/day?';
    this.url =
      this.baseUrl + popularFilms + this.keyAPI + `&page=${this.dataSaver.getCurrentPage()}`;
    const dataObj = await this.fetchData(this.url);
    const dataPopular = dataObj.results;
    await this.fixFetchObject(dataPopular);
    let totalPages = dataObj.total_pages;
    this.dataSaver.setTotalPages(totalPages);
    this.dataSaver.setHomeFilms(dataPopular);
    // this.dataSaver.setCurrentPage(this.page);
    // console.log(dataPopular);
    return dataPopular;
  };

  decodeGenres = async genreIds => {
    let genres = this.dataSaver.getFilmsGenres();
    if (genres === null) {
      genres = await this.fetchFilmsGenres();
    }
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

  fixFetchObject = async response => {
    const genreIds = response.map(film => film.genre_ids);
    await this.decodeGenres(genreIds);
    this.fixImagePath(response);
    response.map(film => (film.genre_ids = film.genre_ids.slice(0, 3)));
  };

  fetchFilmsByQuery = async query => {
    let queryEndpoint = `search/movie?query=${query}&`;
    this.url =
      this.baseUrl + queryEndpoint + this.keyAPI + `&page=${this.dataSaver.getCurrentPage()}`;
    const queryFilmsResult = await this.fetchData(this.url);
    const dataQuery = queryFilmsResult.results;
    await this.fixFetchObject(dataQuery);
    const totalPages = queryFilmsResult.total_pages;
    this.dataSaver.setTotalPages(totalPages);
    this.dataSaver.setCurrentPage(this.page);
    this.dataSaver.setHomeFilms(dataQuery);
    return dataQuery;
  };

  fetchFilmsGenres = async () => {
    let genresEndpoint = 'genre/movie/list?';
    this.url = this.baseUrl + genresEndpoint + this.keyAPI;
    const result = await this.fetchData(this.url);
    this.dataSaver.setFilmsGenres(result);
    return result.genres;
  };

  fetchFilmVideos = async movieId => {
    let movieVideousEndpoint = `/movie/${movieId}/videos?`;
    let fetchMovieVideosUrl = this.baseUrl + movieVideousEndpoint + this.keyAPI;
    const result = await this.fetchData(fetchMovieVideosUrl);
    console.log(result.results);
    return result.results;
  };

  fixImagePath = obj => {
    console.log(img);
    obj.map(film => {
      if (film.poster_path || film.backdrop_path) {
        film.poster_path = 'https://image.tmdb.org/t/p/w500' + film.poster_path;
      } else {
        film.poster_path = `${img}`;
      }
    });
  };
}
