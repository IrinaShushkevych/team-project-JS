export default
class APIService {
  constructor() {
    this.keyAPI = 'api_key=a907caf8c46067564d1786718be1cb84';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.popularFilms = 'trending/movie/week?';
    this.page = 1;
    this._query = 'bad boys';
    this.queryEndpoint = `search/movie?query=${this._query}&`;
    this.url = '';
  }

  get query() {
    return this._query
  }

  set query(value) {
    return this._query = value;
  }

  async getPopularFilms() {
    this.url = this.baseUrl + this.popularFilms + this.keyAPI;
    const response = await fetch(this.url);
    return response.json()
  }

  
  async getFilmsByQuery() {
    this.url = this.baseUrl + this.queryEndpoint + this.keyAPI;
    const response = await fetch(this.url);
    return response.json();
  }

}
