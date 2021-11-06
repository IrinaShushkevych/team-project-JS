export default
class APIService {
  constructor() {
    this.keyAPI = 'api_key=a907caf8c46067564d1786718be1cb84';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.popularFilms = 'trending/movie/week?';
    this.page = 1;
    this._query = '';
  }

  async getPopularFilms() {
    let url = this.baseUrl + this.popularFilms + this.keyAPI;
    console.log(url);
    const response = await fetch(url);
    return response.json()
  }

}
