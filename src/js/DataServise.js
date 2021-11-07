export default class APIService {
  constructor() {
    this.keyAPI = 'api_key=a907caf8c46067564d1786718be1cb84';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.page = 1;
    this.url = '';
  }

  fetchData = async url => {
    const response = await fetch(url);
    return response.json();
  };

  getPopularFilms = () => {
    let popularFilms = 'trending/movie/week?';
    this.url = this.baseUrl + popularFilms + this.keyAPI;
    return this.fetchData(this.url);
  };

  getFilmsByQuery = query => {
    let queryEndpoint = `search/movie?query=${query}&`;
    this.url = this.baseUrl + queryEndpoint + this.keyAPI + `&page=${this.page}`;
    return this.fetchData(this.url);
  };

  getFilmsGenres = () => {
    let genresEndpoint = 'genre/movie/list?';
    this.url = this.baseUrl + genresEndpoint + this.keyAPI;
    return this.fetchData(this.url);
  };
}
